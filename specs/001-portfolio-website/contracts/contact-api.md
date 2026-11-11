# Contract: Contact Form API Route (`POST /api/contact`)

**File**: `app/api/contact/route.ts`
**Shared Validation**: `lib/validations/contact.ts`
**Requirements Covered**: `FR-021`, `FR-022`, `FR-023`

---

## 1. Request Specification

- **Method**: `POST`
- **Path**: `/api/contact`
- **Headers**: `Content-Type: application/json`
- **Body Schema**:

```json
{
  "name": "Jane Recruiter",
  "email": "jane@example.com",
  "message": "Hi Ivan, we loved your hardware and software projects and would like to schedule an interview.",
  "website": ""
}
```

### Field Validation Rules (`contactSchema`)

| Field | Rule | Error Message Returned to Client |
| :--- | :--- | :--- |
| `name` | `string().trim().min(1).max(100)` | `"Name is required."` / `"Name must be 100 characters or fewer."` |
| `email` | `string().trim().min(1).email().max(254)` | `"Email is required."` / `"Please enter a valid email address."` |
| `message` | `string().trim().min(1).max(2000)` | `"Message is required."` / `"Message exceeds the 2,000-character limit."` |
| `website` | `string().optional()` (Honeypot) | If non-empty, request is rejected as spam (`400 Bad Request`). |

---

## 2. Response Specification

### 2.1 Success (`200 OK`)

Returned when validation passes and Resend confirms email dispatch.

```json
{
  "ok": true,
  "message": "Message sent! Thank you for reaching out—I'll get back to you soon."
}
```

### 2.2 Validation or Spam Error (`400 Bad Request`)

Returned when one or more fields fail validation or the honeypot/spam check triggers.

```json
{
  "ok": false,
  "message": "Please check the highlighted fields and try again.",
  "fieldErrors": {
    "name": "Name is required.",
    "email": "Please enter a valid email address.",
    "message": "Message exceeds the 2,000-character limit."
  }
}
```

### 2.3 Rate Limit Exceeded (`429 Too Many Requests`)

Returned when the same client IP submits more than 3 messages within a 10-minute window.

```json
{
  "ok": false,
  "message": "Too many messages sent recently. Please wait a few minutes and try again."
}
```

### 2.4 Delivery or Configuration Failure (`500 Internal Server Error`)

Returned when `RESEND_API_KEY` / `CONTACT_RECIPIENT_EMAIL` is missing/invalid or when the Resend API call fails.
- **Security & UX Rule (`FR-023`)**: The client receives the same safe, user-friendly error message regardless of whether the failure was a network drop or a missing API key, while the exact diagnostic error is logged via `console.error` on the server.

```json
{
  "ok": false,
  "message": "We couldn't send your message right now. Your text has been kept—please try again in a moment."
}
```

---

## 3. Resend Dispatch Contract

```ts
await resend.emails.send({
  from: process.env.CONTACT_FROM_EMAIL ?? "ICCañete Portfolio <onboarding@resend.dev>",
  to: [process.env.CONTACT_RECIPIENT_EMAIL],
  replyTo: validatedData.email,
  subject: `[Portfolio Inquiry] Message from ${validatedData.name}`,
  text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\n\nMessage:\n${validatedData.message}`,
});
```
