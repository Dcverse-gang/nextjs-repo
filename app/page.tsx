"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { animate, motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Shield,
  Eye,
  DollarSign,
  Zap,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Check,
  Sparkles,
  Lock,
  TrendingUp,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Logo } from "@/components/logo";

// Smooth scroll with Framer Motion
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY;
  const start = window.scrollY;
  animate(start, top, {
    type: "tween",
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1],
    onUpdate: (v) => window.scrollTo(0, v),
  });
}

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();
      scrollToSection(sectionId);
      setMobileMenuOpen(false);
    },
    [],
  );

  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // If we're on the landing page, scroll to hero; otherwise navigate home
      if (window.location.pathname === "/") {
        e.preventDefault();
        scrollToSection("hero");
      }
      // Otherwise let the default href="/" handle navigation
    },
    [],
  );

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen ? "nav-sticky" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center shrink-0 p-0 m-0 cursor-pointer"
            data-testid="logo-link"
          >
            <Logo width={200} height={50} className="h-6 sm:h-7 md:h-8 w-auto" priority />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              onClick={(e) => handleNavClick(e, "features")}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              data-testid="nav-features"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => handleNavClick(e, "how-it-works")}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              data-testid="nav-how-it-works"
            >
              How it Works
            </a>
            <a
              href="#tech-partners"
              onClick={(e) => handleNavClick(e, "tech-partners")}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              data-testid="nav-tech-partners"
            >
              Partners
            </a>
            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, "faq")}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              data-testid="nav-faq"
            >
              FAQ
            </a>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/waitlist"
              className="btn btn-primary"
              data-testid="nav-waitlist"
            >
              Join Waitlist
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden py-6 border-t border-border mobile-menu-glass"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                onClick={(e) => handleNavClick(e, "features")}
                className="text-sm font-medium py-2 text-foreground/70 hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => handleNavClick(e, "how-it-works")}
                className="text-sm font-medium py-2 text-foreground/70 hover:text-foreground transition-colors"
              >
                How it Works
              </a>
              <a
                href="#tech-partners"
                onClick={(e) => handleNavClick(e, "tech-partners")}
                className="text-sm font-medium py-2 text-foreground/70 hover:text-foreground transition-colors"
              >
                Partners
              </a>
              <a
                href="#faq"
                onClick={(e) => handleNavClick(e, "faq")}
                className="text-sm font-medium py-2 text-foreground/70 hover:text-foreground transition-colors"
              >
                FAQ
              </a>
              <div className="flex flex-col gap-3 mt-4">
                <Link href="/waitlist" className="btn btn-primary text-center">
                  Join Waitlist
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero section motion variants (smooth ease: cubic-bezier)
const easeSmooth = [0.22, 1, 0.36, 1] as const;

const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeSmooth,
    },
  },
};

const heroImage = {
  hidden: { opacity: 0, x: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easeSmooth,
      delay: 0.2,
    },
  },
};

const heroScrollIndicator = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeSmooth,
      delay: 0.9,
    },
  },
};

// Hero Section
const Hero = () => {
  return (
    <motion.section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 hero-gradient relative overflow-hidden"
      data-testid="hero-section"
    >
      {/* Floating gradient orbs (AI SaaS style) */}
      <div className="hero-orb hero-orb-1 animate-glow-pulse" aria-hidden />
      <div className="hero-orb hero-orb-2 animate-glow-pulse" aria-hidden />
      <div className="hero-orb hero-orb-3" aria-hidden />

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-bg-subtle opacity-50" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="flex flex-col"
            variants={heroContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-border mb-6 w-fit"
              variants={heroItem}
            >
              <Sparkles size={16} className="text-primary" />
              <p className="text-sm font-medium text-foreground/70">
                Your Digital Twin Platform
              </p>
            </motion.div>

            <motion.h1
              className="font-heading text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
              data-testid="hero-title"
              variants={heroItem}
            >
              Own Your
              <br />
              <span className="gradient-text">AI Likeness</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-10 max-w-lg"
              data-testid="hero-description"
              variants={heroItem}
            >
              Create, control, and monetize your AI clone with complete
              transparency. Scale your presence while you sleep.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={heroItem}
            >
              <Link
                href="/waitlist"
                className="btn btn-primary btn-lg flex items-center justify-center gap-2"
                data-testid="hero-cta-waitlist"
              >
                Join Waitlist <ArrowRight size={20} />
              </Link>
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("how-it-works");
                }}
                className="btn btn-secondary btn-lg cursor-pointer"
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>

          {/* Right Visual: Phone cover on all screens */}
          <motion.div
            className="relative flex justify-center lg:justify-end w-full"
            variants={heroImage}
            initial="hidden"
            animate="visible"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl w-full max-w-[280px] lg:max-w-[420px] mx-auto">
              <div className="aspect-[2301/2846] relative">
                <Image
                  src="/Phone-CoverPhone.png"
                  alt="CloneOS"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 280px, 420px"
                  quality={90}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="flex justify-center mt-16"
          variants={heroScrollIndicator}
          initial="hidden"
          animate="visible"
        >
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("features");
            }}
            className="animate-bounce cursor-pointer"
            aria-label="Scroll to features"
          >
            <ChevronDown size={32} className="text-foreground/40" />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Features Section
const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Full Transparency",
      description:
        "Know exactly where, when, and how your AI clone is used. Complete audit trails and consent management.",
      size: "large",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      icon: Eye,
      title: "Total Visibility",
      description:
        "Real-time dashboard showing all clone interactions and usage metrics.",
      size: "small",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: DollarSign,
      title: "Earn Passively",
      description:
        "Monetize every interaction. Set your rates, collect royalties automatically.",
      size: "small",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Zap,
      title: "Scale Infinitely",
      description:
        "Your clone can be everywhere at once. Engage millions simultaneously without lifting a finger.",
      size: "large",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section
      id="features"
      className="py-24 md:py-32 bg-bg-subtle"
      data-testid="features-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
          <p className="text-sm font-medium text-foreground/60 mb-4 uppercase tracking-wider">
            Features
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Control Your <span className="gradient-text">Digital Self</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Everything you need to create, manage, and monetize your AI clone
          </p>
        </div>

        <div className="bento-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`card retro-card card-hover-lift ${
                feature.size === "large"
                  ? "bento-item-large"
                  : "bento-item-small"
              } animate-fade-in group cursor-pointer`}
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`feature-card-${index}`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <feature.icon
                  size={24}
                  className="text-white"
                  strokeWidth={2}
                />
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-semibold mb-4">
                {feature.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Clone",
      description:
        "Upload your likeness data - voice samples, images, and personality traits. Our AI builds your digital twin.",
      icon: Sparkles,
    },
    {
      number: "02",
      title: "Set Your Terms",
      description:
        "Define how your clone can be used. Set pricing, approve use cases, and establish boundaries.",
      icon: Lock,
    },
    {
      number: "03",
      title: "Go Live & Earn",
      description:
        "Deploy your clone across platforms. Track usage, collect earnings, and scale your presence.",
      icon: TrendingUp,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 md:py-32"
      data-testid="how-it-works-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
          <p className="text-sm font-medium text-foreground/60 mb-4 uppercase tracking-wider">
            Process
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative animate-fade-in group"
              style={{ animationDelay: `${index * 0.15}s` }}
              data-testid={`step-${index}`}
            >
              <div className="card card-hover-lift h-full flex flex-col">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4">
                    <step.icon size={24} className="text-primary-foreground" />
                  </div>
                  <span className="font-heading text-6xl md:text-7xl font-bold text-foreground/10 block">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-semibold mb-4">
                  {step.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed flex-1">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 right-0 translate-x-1/2">
                  <ArrowRight size={24} className="text-foreground/20" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Tech Partners Section - Logo carousel (auto-scroll right to left)
const PARTNER_LOGOS = [
  {
    name: "NVIDIA",
    logoUrl:
      "https://toppng.com/uploads/preview/nvidia-logo-vector-11574170524xza1ggbhhk.png",
    subtitle: "AI & Compute",
  },
  {
    name: "ByteDance",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ad/ByteDance_logo.png",
    subtitle: "AI & Media",
  },
  {
    name: "AWS",
    logoUrl:
      "https://www.logo.wine/a/logo/Amazon_Web_Services/Amazon_Web_Services-Logo.wine.svg",
    subtitle: "Cloud",
  },
  {
    name: "Google Cloud",
    logoUrl:
      "https://purepng.com/public/uploads/large/google-cloud-logo-75o.png",
    subtitle: "GCP",
  },
  {
    name: "Nexus",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrHpNSRhHUTVr6ZH2COo0B8c5ctxcBNBezIw&s",
    subtitle: "American Center",
  },
  {
    name: "WaveX",
    logoUrl: "https://wavex.wavesbazaar.com/images/wave-x-logo1.png",
    subtitle: "Ministry of I&B",
  },
];

const TechPartners = () => {
  return (
    <section
      id="tech-partners"
      className="py-24 md:py-32 bg-bg-subtle overflow-hidden"
      data-testid="tech-partners-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
          <p className="text-sm font-medium text-foreground/60 mb-4 uppercase tracking-wider">
            Tech Partners
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Our <span className="gradient-text">Tech Partners</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Powered by industry-leading technology
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
            skipSnaps: false,
          }}
          plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
          className="w-full"
        >
          <CarouselContent className="-ml-6 md:-ml-8">
            {PARTNER_LOGOS.map((partner, index) => (
              <CarouselItem
                key={`${partner.name}-${index}`}
                className="pl-6 md:pl-8 basis-[min(180px,50%)] md:basis-[200px]"
                data-testid={`partner-${index}`}
              >
                <div className="flex flex-col items-center justify-center pt-6 pr-6 pb-6 rounded-2xl bg-card border border-card-border hover:border-border transition-colors min-h-[140px]">
                  {partner.logoUrl ? (
                    <div className="relative w-24 h-12 md:w-28 md:h-14 mb-3 flex items-center justify-center">
                      <Image
                        src={partner.logoUrl}
                        alt={partner.name}
                        width={112}
                        height={56}
                        className="object-contain object-center w-full h-full"
                        sizes="(max-width: 768px) 96px, 112px"
                        unoptimized
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          t.style.display = "none";
                          const wrap = t.closest(".relative");
                          if (
                            wrap &&
                            !wrap.querySelector(".partner-fallback")
                          ) {
                            const fallback = document.createElement("span");
                            fallback.className =
                              "partner-fallback font-heading font-semibold text-foreground text-lg";
                            fallback.textContent = partner.name;
                            wrap.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-12 md:w-28 md:h-14 mb-3 flex items-center justify-center rounded-lg bg-bg-elevated">
                      <span className="font-heading font-semibold text-foreground text-sm text-center leading-tight px-1">
                        {partner.name}
                      </span>
                    </div>
                  )}
                  <p className="text-xs text-foreground/60 text-center">
                    {partner.subtitle}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

// FAQ Section
const FAQ = () => {
  const faqs = [
    {
      question: "How does CloneOS protect my likeness?",
      answer:
        "CloneOS uses advanced AI watermarking and blockchain-based verification to ensure your clone is always traceable. Every interaction is logged, and you maintain full control over usage permissions.",
    },
    {
      question: "What can my AI clone do?",
      answer:
        "Your clone can engage in conversations, create personalized content, conduct virtual meetings, and represent you across digital platforms - all while maintaining your unique voice and personality.",
    },
    {
      question: "How do I earn money with my clone?",
      answer:
        "Set your own rates for different interaction types. Earnings are automatically collected through smart contracts and deposited directly to your account. You can also license your clone for specific campaigns.",
    },
    {
      question: "Can I control where my clone appears?",
      answer:
        "Absolutely. You approve every platform and use case. Our consent management system lets you whitelist or blacklist specific applications, brands, or content types.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Your likeness data is encrypted and stored securely. We never sell or share your data. You can delete your clone and all associated data at any time.",
    },
  ];

  return (
    <section id="faq" className="py-24 md:py-32" data-testid="faq-section">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
          <p className="text-sm font-medium text-foreground/60 mb-4 uppercase tracking-wider">
            FAQ
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Got <span className="gradient-text">Questions?</span>
          </h2>
          <p className="text-lg text-foreground/60">
            Everything you need to know about CloneOS
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="card border-border"
              data-testid={`faq-item-${index}`}
            >
              <AccordionTrigger className="font-heading text-left py-6 hover:no-underline text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70 pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

// CTA Section
const CTA = () => {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      data-testid="cta-section"
    >
      <div className="absolute inset-0 bg-gradient-primary opacity-10" />
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-8">
          Ready to Create Your{" "}
          <span className="gradient-text">Digital Twin?</span>
        </h2>
        <p className="text-xl text-foreground/70 mb-10 max-w-2xl mx-auto">
          Join thousands of creators who are scaling their presence and earning
          while they sleep.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/waitlist"
            className="btn btn-primary btn-lg flex items-center justify-center gap-2"
            data-testid="cta-waitlist"
          >
            Join Waitlist <ArrowRight size={20} />
          </Link>
          <Link href="/signup" className="btn btn-secondary btn-lg">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer
      className="py-16 border-t border-border bg-bg-subtle"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2 flex flex-col gap-8">
            <Logo width={200} height={50} className="h-6 sm:h-7 md:h-8 w-auto" />
            <p className="text-foreground/70 max-w-sm mt-0">
              The platform for creating, controlling, and monetizing your AI
              likeness with complete transparency.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-heading text-sm uppercase tracking-wider mb-4 font-semibold">
              Product
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-heading text-sm uppercase tracking-wider mb-4 font-semibold">
              Company
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/waitlist"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} CloneOS. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <TechPartners />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
