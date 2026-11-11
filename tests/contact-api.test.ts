import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { POST } from "@/app/api/contact/route";
import { resetRateLimits } from "@/lib/rate-limit";

// Mock Resend with a constructible function
const mockSend = vi.fn();
vi.mock("resend", () => {
  return {
    Resend: vi.fn().mockImplementation(function () {
      return {
        emails: {
          send: mockSend,
        },
      };
    }),
  };
});

function createRequest(body: unknown, headers?: Record<string, string>): Request {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    resetRateLimits();
    mockSend.mockReset();
    process.env = {
      ...originalEnv,
      RESEND_API_KEY: "test-resend-key",
      CONTACT_RECIPIENT_EMAIL: "me@example.com",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("Validation Errors (400 Bad Request)", () => {
    it("returns 400 when required fields are missing or empty (FR-021)", async () => {
      const req = createRequest({ name: "", email: "", message: "" });
      const res = await POST(req);
      expect(res.status).toBe(400);

      const json = await res.json();
      expect(json.ok).toBe(false);
      expect(json.fieldErrors).toBeDefined();
      expect(json.fieldErrors.name).toBe("Name is required.");
      expect(json.fieldErrors.email).toBe("Email is required.");
      expect(json.fieldErrors.message).toBe("Message is required.");
    });

    it("returns 400 when email format is invalid (FR-021)", async () => {
      const req = createRequest({
        name: "Jane Doe",
        email: "not-an-email",
        message: "Hello world!",
      });
      const res = await POST(req);
      expect(res.status).toBe(400);

      const json = await res.json();
      expect(json.ok).toBe(false);
      expect(json.fieldErrors?.email).toBe("Please enter a valid email address.");
    });

    it("returns 400 when message exceeds 2,000 characters (FR-021)", async () => {
      const req = createRequest({
        name: "Jane Doe",
        email: "jane@example.com",
        message: "a".repeat(2001),
      });
      const res = await POST(req);
      expect(res.status).toBe(400);

      const json = await res.json();
      expect(json.ok).toBe(false);
      expect(json.fieldErrors?.message).toBe(
        "Message exceeds the 2,000-character limit."
      );
    });

    it("rejects non-empty website honeypot submission as spam with 400 (FR-022)", async () => {
      const req = createRequest({
        name: "Spam Bot",
        email: "bot@example.com",
        message: "Buy cheap crypto!",
        website: "https://spam.xyz",
      });
      const res = await POST(req);
      expect(res.status).toBe(400);

      const json = await res.json();
      expect(json.ok).toBe(false);
      expect(mockSend).not.toHaveBeenCalled();
    });
  });

  describe("Rate Limiting (429 Too Many Requests)", () => {
    it("allows up to 3 submissions from the same IP, then rejects the 4th with 429 (FR-022)", async () => {
      const validPayload = {
        name: "Jane Doe",
        email: "jane@example.com",
        message: "Legitimate inquiry",
        website: "",
      };

      mockSend.mockResolvedValue({ data: { id: "msg_123" }, error: null });

      const headers = { "x-forwarded-for": "198.51.100.1" };

      // Requests 1, 2, 3 should succeed
      for (let i = 0; i < 3; i++) {
        const res = await POST(createRequest(validPayload, headers));
        expect(res.status).toBe(200);
      }

      // Request 4 from the same IP must be rate-limited
      const res4 = await POST(createRequest(validPayload, headers));
      expect(res4.status).toBe(429);
      expect(res4.headers.get("Retry-After")).toBeDefined();

      const json4 = await res4.json();
      expect(json4.ok).toBe(false);
      expect(json4.message).toContain("Too many messages sent recently");
    });
  });

  describe("Delivery & Resend Integration", () => {
    it("returns 200 and passes replyTo to Resend on successful dispatch (FR-022, FR-023)", async () => {
      mockSend.mockResolvedValue({ data: { id: "msg_ok" }, error: null });

      const req = createRequest({
        name: "Alex Client",
        email: "alex@client.com",
        message: "Interested in hiring for a systems project.",
        website: "",
      });

      const res = await POST(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.ok).toBe(true);
      expect(json.message).toContain("Message sent!");

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          replyTo: "alex@client.com",
          to: ["me@example.com"],
        })
      );
    });

    it("returns 500 with a safe user error when RESEND_API_KEY is missing (FR-023)", async () => {
      delete process.env.RESEND_API_KEY;

      const req = createRequest({
        name: "Alex Client",
        email: "alex@client.com",
        message: "Hello there",
      });

      const res = await POST(req);
      expect(res.status).toBe(500);

      const json = await res.json();
      expect(json.ok).toBe(false);
      expect(json.message).toBe(
        "We couldn't send your message right now. Your text has been kept—please try again in a moment."
      );
      expect(mockSend).not.toHaveBeenCalled();
    });

    it("returns 500 with a safe user error when Resend API returns an error (FR-023)", async () => {
      mockSend.mockResolvedValue({
        data: null,
        error: { message: "Invalid API key" },
      });

      const req = createRequest({
        name: "Alex Client",
        email: "alex@client.com",
        message: "Hello there",
      });

      const res = await POST(req);
      expect(res.status).toBe(500);

      const json = await res.json();
      expect(json.ok).toBe(false);
      expect(json.message).toBe(
        "We couldn't send your message right now. Your text has been kept—please try again in a moment."
      );
    });
  });
});
