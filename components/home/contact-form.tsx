"use client";

import React, { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { contactSchema } from "@/lib/validations/contact";

interface StatusMessage {
  type: "success" | "error";
  message: string;
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot field
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<StatusMessage | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (fieldErrors.name) {
      setFieldErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (fieldErrors.email) {
      setFieldErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (fieldErrors.message) {
      setFieldErrors((prev) => ({ ...prev, message: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent duplicate submits while request is in flight (FR-022)
    if (isSubmitting) {
      return;
    }

    setStatus(null);

    // Client-side schema validation before sending (FR-021)
    const validation = contactSchema.safeParse({
      name,
      email,
      message,
      website,
    });

    if (!validation.success) {
      const errors: { name?: string; email?: string; message?: string } = {};
      for (const issue of validation.error.issues) {
        const field = issue.path[0] as "name" | "email" | "message";
        if (field && !errors[field]) {
          errors[field] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          website,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        // Success: clear all fields and display confirmation banner (FR-023)
        setName("");
        setEmail("");
        setMessage("");
        setWebsite("");
        setFieldErrors({});
        setStatus({
          type: "success",
          message:
            data.message ||
            "Message sent! Thank you for reaching out—I'll get back to you soon.",
        });
      } else {
        // Error: preserve visitor's typed input and display user-friendly error (FR-023)
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        setStatus({
          type: "error",
          message:
            data.message ||
            "We couldn't send your message right now. Your text has been kept—please try again in a moment.",
        });
      }
    } catch {
      // Network drop or unexpected error: preserve input and show retry banner (FR-023, SC-003)
      setStatus({
        type: "error",
        message:
          "We couldn't send your message right now. Your text has been kept—please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isOverLimit = message.length > 2000;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot field (hidden from assistive technologies and sighted users) */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="sr-only"
        />
      </div>

      {/* Global Status Banner (Success / Error) */}
      {status && (
        <div
          role={status.type === "success" ? "status" : "alert"}
          aria-live="polite"
          className={`rounded-xl border border-border-subtle p-4 text-sm flex items-start gap-3 transition-opacity duration-200 ${
            status.type === "success"
              ? "bg-status-success-bg text-status-success-text"
              : "bg-status-error-bg text-status-error-text"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
          )}
          <span className="leading-relaxed">{status.message}</span>
        </div>
      )}

      {/* Name & Email inputs in 2-column responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            Name <span aria-hidden="true" className="text-accent-primary">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
            disabled={isSubmitting}
            className={`w-full rounded-[10px] bg-muted border px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 transition-[border-color,box-shadow] ${
              fieldErrors.name
                ? "border-status-error-text focus:border-status-error-text focus:ring-status-error-text"
                : "border-border-subtle focus:border-accent-primary focus:ring-focus-ring"
            }`}
            placeholder="Jane Doe"
          />
          {fieldErrors.name && (
            <p
              id="contact-name-error"
              role="alert"
              className="text-xs text-status-error-text mt-1.5 font-medium"
            >
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            Email <span aria-hidden="true" className="text-accent-primary">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
            disabled={isSubmitting}
            className={`w-full rounded-[10px] bg-muted border px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 transition-[border-color,box-shadow] ${
              fieldErrors.email
                ? "border-status-error-text focus:border-status-error-text focus:ring-status-error-text"
                : "border-border-subtle focus:border-accent-primary focus:ring-focus-ring"
            }`}
            placeholder="jane@example.com"
          />
          {fieldErrors.email && (
            <p
              id="contact-email-error"
              role="alert"
              className="text-xs text-status-error-text mt-1.5 font-medium"
            >
              {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      {/* Message Textarea with Character Counter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium text-text-primary"
          >
            Message <span aria-hidden="true" className="text-accent-primary">*</span>
          </label>
          <span
            className={`font-mono text-xs tabular-nums ${
              isOverLimit ? "text-status-error-text font-semibold" : "text-text-muted"
            }`}
          >
            {message.length} / 2000
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          onChange={handleMessageChange}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          disabled={isSubmitting}
          className={`w-full rounded-[10px] bg-muted border px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 transition-[border-color,box-shadow] resize-y ${
            fieldErrors.message || isOverLimit
              ? "border-status-error-text focus:border-status-error-text focus:ring-status-error-text"
              : "border-border-subtle focus:border-accent-primary focus:ring-focus-ring"
          }`}
          placeholder="Tell me about your role, project, or question..."
        />
        {fieldErrors.message && (
          <p
            id="contact-message-error"
            role="alert"
            className="text-xs text-status-error-text mt-1.5 font-medium"
          >
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Action Row */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-accent-primary px-5 min-h-11 font-medium text-accent-on-primary hover:bg-accent-primary-hover active:scale-[0.96] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none disabled:transform-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Sending...</span>
            </>
          ) : (
            <span>Send Message</span>
          )}
        </button>
      </div>
    </form>
  );
}
