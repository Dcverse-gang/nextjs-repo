"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";

// Initialize Supabase Client directly
const supabaseUrl = "https://jlfvhhdjpdbiylyvseqd.supabase.co";
const supabaseAnonKey = "sb_publishable_sDMnE3sWNRVKdwMkSGDZqA_hJoRrM_c";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Waitlist() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("waitlist").insert([
        {
          full_name: formData.name,
          email: formData.email,
          company: formData.company,
          phone_number: formData.phone,
          use_case: formData.message || null,
        },
      ]);

      if (error) {
        if (error.code === "23505") {
          throw new Error("This email is already on the waitlist.");
        }
        throw error;
      }

      setSubmitted(true);
      toast.success("You're on the list!");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to join waitlist";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="waitlist-success" data-testid="waitlist-success">
        <div className="waitlist-success-inner">
          <div className="waitlist-success-icon">✓</div>
          <h1>You&apos;re on the list!</h1>
          <p>
            We&apos;ll reach out soon with exclusive early access and updates
            about CloneOS.
          </p>
          <Link
            href="/"
            className="btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            data-testid="back-home-btn"
          >
            <span aria-hidden="true">←</span>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="waitlist-page" data-testid="waitlist-page">
      <div className="waitlist-form-side">
        <Link
          href="/"
          className="waitlist-back-link"
          data-testid="back-to-home"
        >
          <span aria-hidden="true">←</span>
          <span>Back</span>
        </Link>

        <div className="waitlist-form-inner">
          <div className="waitlist-logo">
            Clone<span className="grad">OS</span>
          </div>

          <h1 data-testid="waitlist-title">Get Early Access</h1>
          <p>
            Join our waitlist to be the first to know when we launch new
            features and get exclusive access.
          </p>

          <form onSubmit={handleSubmit} className="waitlist-fields">
            <div className="waitlist-field">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-modern"
                placeholder="John Doe"
                data-testid="waitlist-name-input"
              />
            </div>

            <div className="waitlist-field">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-modern"
                placeholder="john@example.com"
                data-testid="waitlist-email-input"
              />
            </div>

            <div className="waitlist-field">
              <label>Company *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="input-modern"
                placeholder="Your company"
                data-testid="waitlist-company-input"
              />
            </div>

            <div className="waitlist-field">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input-modern"
                placeholder="1234567890"
                data-testid="waitlist-phone-input"
              />
            </div>

            <div className="waitlist-field">
              <label>How do you plan to use CloneOS? (Optional)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="input-modern"
                placeholder="Tell us about your use case..."
                data-testid="waitlist-message-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary waitlist-submit"
              style={{
                opacity: loading ? 0.55 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
              data-testid="waitlist-submit-btn"
            >
              {loading ? (
                "Joining…"
              ) : (
                <>
                  Join Waitlist <span aria-hidden="true">→</span>
                </>
              )}
            </button>
          </form>

          <p className="waitlist-disclaimer">
            We respect your privacy. No spam, ever.
          </p>
        </div>
      </div>

      <div className="waitlist-panel-side">
        <div className="waitlist-panel-icon">✦</div>
        <p className="waitlist-panel-label">Why Join the Waitlist?</p>

        <div className="waitlist-features">
          <div className="waitlist-feature">
            <div className="waitlist-feature-icon">⚡</div>
            <div className="waitlist-feature-text">
              <h3>Early Access</h3>
              <p>
                Be among the first to create your AI clone and start earning.
              </p>
            </div>
          </div>

          <div className="waitlist-feature">
            <div className="waitlist-feature-icon">↗</div>
            <div className="waitlist-feature-text">
              <h3>Exclusive Updates</h3>
              <p>
                Get insider information on new features and platform updates.
              </p>
            </div>
          </div>

          <div className="waitlist-feature">
            <div className="waitlist-feature-icon">✦</div>
            <div className="waitlist-feature-text">
              <h3>Founding Member Benefits</h3>
              <p>Special perks and pricing for early adopters.</p>
            </div>
          </div>
        </div>

        <div className="waitlist-count-card">
          <p>Current waitlist</p>
          <p className="count-number">356</p>
          <p>people on the list</p>
        </div>
      </div>
    </div>
  );
}
