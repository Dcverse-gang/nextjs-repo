"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Check, Sparkles, TrendingUp, Zap } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Logo } from "@/components/logo";

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
      // Use direct Supabase insert instead of axios
      const { error } = await supabase
        .from('waitlist')
        .insert([
          { 
            full_name: formData.name, 
            email: formData.email, 
            company: formData.company,
            phone_number: formData.phone,
            use_case: formData.message || null 
          }
        ]);

      if (error) {
        // Handle unique constraint violation for existing emails
        if (error.code === '23505') {
          throw new Error("This email is already on the waitlist.");
        }
        throw error;
      }

      setSubmitted(true);
      toast.success("You're on the list!");
    } catch (error: any) {
      toast.error(error.message || "Failed to join waitlist");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6 bg-background"
        data-testid="waitlist-success"
      >
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-primary-foreground" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
            You&apos;re on the list!
          </h1>
          <p className="text-foreground/70 mb-8">
            We&apos;ll reach out soon with exclusive early access and updates about CloneOS.
          </p>
          <Link
            href="/"
            className="btn btn-primary inline-flex items-center gap-2"
            data-testid="back-home-btn"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background" data-testid="waitlist-page">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
        <Link
          href="/"
          className="link-light flex items-center gap-2 transition-colors mb-12 w-fit opacity-90 hover:opacity-100"
          data-testid="back-to-home"
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-medium">Back</span>
        </Link>

        <div className="max-w-md">
          <div className="mb-6">
            <Logo width={200} height={50} className="h-6 sm:h-7 md:h-8 w-auto" priority />
          </div>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground"
            data-testid="waitlist-title"
          >
            Get Early Access
          </h1>
          <p className="text-foreground/70 mb-8">
            Join our waitlist to be the first to know when we launch new features and exclusive
            access.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Full Name *
              </label>
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

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Email *</label>
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

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Company *
              </label>
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

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Phone Number *
              </label>
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

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                How do you plan to use CloneOS? (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="input-modern resize-none"
                placeholder="Tell us about your use case..."
                data-testid="waitlist-message-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="waitlist-submit-btn"
            >
              {loading ? (
                "Joining..."
              ) : (
                <>
                  Join Waitlist <Send size={16} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-foreground/60 text-center">
            We respect your privacy. No spam, ever.
          </p>
        </div>
      </div>

      {/* Right Panel - Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 flex-col justify-center px-16 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="relative z-10 max-w-md">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6">
              <Sparkles size={32} className="text-primary-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground/60 mb-6 uppercase tracking-wider">
              Why Join the Waitlist?
            </p>
          </div>

          <div className="space-y-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap size={20} className="text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">Early Access</h3>
              </div>
              <p className="text-foreground/70">
                Be among the first to create your AI clone and start earning.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp size={20} className="text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  Exclusive Updates
                </h3>
              </div>
              <p className="text-foreground/70">
                Get insider information on new features and platform updates.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles size={20} className="text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  Founding Member Benefits
                </h3>
              </div>
              <p className="text-foreground/70">Special perks and pricing for early adopters.</p>
            </div>
          </div>

          <div className="card bg-card/50 backdrop-blur-sm border-border">
            <p className="text-sm text-foreground/60 mb-2">Current waitlist</p>
            <p className="font-heading text-4xl font-bold text-foreground">356</p>
            <p className="text-foreground/60">people on the list</p>
          </div>
        </div>
      </div>
    </div>
  );
}
