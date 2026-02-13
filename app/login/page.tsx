"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Sparkles, Shield, Zap, TrendingUp } from "lucide-react";
import { apiClient } from "@/lib/api";
import { auth } from "@/lib/auth";
import { getErrorMessage } from "@/lib/types";
import { toast } from "sonner";
import { Logo } from "@/components/logo";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiClient.post("/auth/login", formData);

      // Store token using auth utility
      auth.setAuth(response.data.token, response.data.user);

      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (error) {
      const message = getErrorMessage(error, "Invalid credentials");
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Shield, text: "Secure authentication" },
    { icon: Zap, text: "Instant access" },
    { icon: TrendingUp, text: "Track your earnings" },
  ];

  return (
    <div className="min-h-screen flex" data-testid="login-page">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 bg-background">
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-12 w-fit"
          data-testid="back-to-home"
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-medium">Back</span>
        </Link>

        <div className="max-w-md">
          <Logo width={200} height={50} className="h-6 sm:h-7 md:h-8 w-auto mb-8" priority />
          <h1
            className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground"
            data-testid="login-title"
          >
            Welcome Back
          </h1>
          <p className="text-foreground/70 mb-8">Sign in to access your dashboard.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-modern"
                placeholder="john@example.com"
                data-testid="login-email-input"
              />
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-modern pr-12"
                placeholder="Your password"
                data-testid="login-password-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-3 text-foreground/40 hover:text-foreground transition-colors"
                data-testid="toggle-password"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="login-submit-btn"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-foreground/70">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary hover:underline font-medium"
              data-testid="signup-link"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 flex-col justify-center px-16 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="relative z-10 max-w-md">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6">
              <Sparkles size={32} className="text-primary-foreground" />
            </div>
            <h2 className="font-heading text-3xl font-bold mb-4 text-foreground">
              Everything you need to <span className="gradient-text">manage your clones</span>
            </h2>
          </div>

          <ul className="space-y-4 mb-12">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon size={20} className="text-primary" />
                </div>
                <span className="text-foreground/80">{feature.text}</span>
              </li>
            ))}
          </ul>

          <div className="card bg-card/50 backdrop-blur-sm border-border">
            <p className="text-foreground/60 text-sm mb-2">Trusted by</p>
            <p className="font-heading text-4xl font-bold text-foreground">12,000+</p>
            <p className="text-foreground/60">creators worldwide</p>
          </div>
        </div>
      </div>
    </div>
  );
}
