"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import {
  Shield, Lock, Database, Search, Sparkles, Workflow, Activity, Boxes,
  ArrowRight, Check, Globe, Layers, Code2, Box, Crown, Linkedin, Twitter,
  CheckCircle2, Mail, PhoneCall, MapPin, ExternalLink, MessageSquare, Zap,
  Users, BarChart3, ChevronDown, X, FileText, MousePointer2, Menu, Star,
  TrendingUp, Clock, ChevronRight, Play, Bot, BrainCircuit, Cpu, Network,
} from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";

/* ─── CONSTANTS ─────────────────────────────────────────────────────── */
const BRAND = {
  bg: "#04050d",
  bgSecondary: "#07091a",
  border: "rgba(255,255,255,0.08)",
  orange: "#f97316",
  amber: "#f59e0b",
  rose: "#f43f5e",
};

const COMPANY = {
  linkedin: "https://www.linkedin.com/company/golden-z-vision",
  email: "goldenzvisionin@gmail.com",
  phone: "+91 8148262395",
  location: "Tamil Nadu, India",
};

function cn(...c: (string | false | undefined | null)[]) { return c.filter(Boolean).join(" "); }

/* ─── ANIMATED COUNTER ───────────────────────────────────────────────── */
function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0; const duration = 1800; const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ─── GRADIENT TEXT ──────────────────────────────────────────────────── */
function GoldText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400 bg-clip-text text-transparent", className)}>
      {children}
    </span>
  );
}

/* ─── NOISE TEXTURE OVERLAY ──────────────────────────────────────────── */
function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.025]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px",
      }}
    />
  );
}

/* ─── ANIMATED BACKGROUND ────────────────────────────────────────────── */
function AnimatedBg() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10" style={{ background: BRAND.bg }}>
      {/* Grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
      }} />
      {/* Glows */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-60 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.28) 0%, rgba(244,63,94,0.15) 40%, transparent 70%)" }}
      />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -20, 0], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 -left-40 h-[700px] w-[700px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.22) 0%, transparent 65%)" }}
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 30, 0], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(244,63,94,0.18) 0%, transparent 65%)" }}
      />
    </div>
  );
}

/* ─── LOGO ───────────────────────────────────────────────────────────── */
function LogoMark() {
  return (
    <div className="relative flex items-center justify-center h-9 w-9 rounded-xl overflow-hidden"
      style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(244,63,94,0.1))", border: "1px solid rgba(249,115,22,0.3)" }}>
      <img src="/brand/logo.png" alt="GoldenZVision" className="h-[110%] w-[110%] object-contain" />
    </div>
  );
}

function BrandName() {
  return (
    <span className="font-bold tracking-tight">
      <GoldText>Golden</GoldText>
      <span className="text-white">Z</span>
      <span className="text-white/80">Vision</span>
    </span>
  );
}

/* ─── SECTION WRAPPER ────────────────────────────────────────────────── */
function Section({ id, children, className }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("relative border-t border-white/[0.06]", className)}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28 lg:px-8">{children}</div>
    </section>
  );
}

/* ─── EYEBROW + HEADING ──────────────────────────────────────────────── */
function Heading({ eyebrow, title, sub, accent = false }: { eyebrow: string; title: string; sub: string; accent?: boolean }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-400 mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white" style={{ fontFamily: "'DM Serif Display', Georgia, serif", letterSpacing: "-0.02em" }}>
        {accent ? <GoldText>{title}</GoldText> : title}
      </h2>
      <p className="mt-4 text-base sm:text-lg text-white/55 max-w-xl mx-auto leading-relaxed">{sub}</p>
    </div>
  );
}

/* ─── FLOATING CHAT DEMO ─────────────────────────────────────────────── */
function ChatDemo() {
  const messages = [
    { role: "user", text: "What courses do you offer?" },
    { role: "ai", text: "We offer B.Tech, MBA, and M.Tech programs across 12 departments. The admissions for 2025 batch are now open!" },
    { role: "user", text: "What is the fee structure?" },
    { role: "ai", text: "Annual fees range from ₹85,000 to ₹1,20,000 depending on the program. Scholarships are available for top performers." },
  ];
  const [visible, setVisible] = useState(1);
  useEffect(() => {
    if (visible < messages.length) {
      const t = setTimeout(() => setVisible(v => v + 1), 1200);
      return () => clearTimeout(t);
    }
  }, [visible]);

  return (
    <div className="relative rounded-2xl border border-white/10 bg-[#07091a]/90 backdrop-blur-xl p-4 w-full max-w-sm shadow-2xl shadow-black/50">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/8 pb-4 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">AI Assistant</div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Online · Powered by your docs
          </div>
        </div>
      </div>
      {/* Messages */}
      <div className="space-y-3 min-h-[160px]">
        <AnimatePresence>
          {messages.slice(0, visible).map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn("px-4 py-2.5 rounded-2xl text-sm max-w-[85%] leading-relaxed",
                m.role === "user" ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-br-sm" : "bg-white/8 border border-white/8 text-white/85 rounded-bl-sm"
              )}>{m.text}</div>
            </motion.div>
          ))}
        </AnimatePresence>
        {visible < messages.length && (
          <div className="flex gap-1 pl-1">
            {[0,1,2].map(i => <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} className="w-1.5 h-1.5 bg-white/30 rounded-full" />)}
          </div>
        )}
      </div>
      {/* Input */}
      <div className="mt-4 flex gap-2 border-t border-white/8 pt-4">
        <div className="flex-1 rounded-xl bg-white/6 border border-white/8 px-3 py-2 text-xs text-white/30">Ask anything…</div>
        <button className="w-8 h-8 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 flex items-center justify-center">
          <ArrowRight className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
    </div>
  );
}

/* ─── FLOATING CARDS ─────────────────────────────────────────────────── */
function FloatingCard({ icon: Icon, label, value, color, delay = 0 }: { icon: any; label: string; value: string; color: string; delay?: number }) {
  return (
    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      className="rounded-2xl border border-white/10 bg-[#07091a]/90 backdrop-blur-xl p-4 flex items-center gap-3 shadow-xl">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <div className="text-xs text-white/40 font-medium">{label}</div>
        <div className="text-sm font-bold text-white">{value}</div>
      </div>
    </motion.div>
  );
}

/* ─── FORM ───────────────────────────────────────────────────────────── */
function DemoForm({ onDone }: { onDone: () => void }) {
  const ic = "border-white/10 bg-white/[0.05] text-white placeholder:text-white/30 focus-visible:ring-orange-500/40 focus-visible:border-orange-500/40 rounded-xl h-11 text-sm";
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [status, setStatus] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const up = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [k]: e.target.value }));

  async function submit() {
    if (!form.name || !form.email || !form.phone) return setStatus({ type: "err", text: "Please fill name, email & phone." });
    setBusy(true);
    try {
      const res = await fetch("/api/client-request", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, requestType: "buy_product", productInterest: "assistant_rag" }),
      });
      if (res.ok) { setStatus({ type: "ok", text: "🎉 Request received! We'll reach out within 24h." }); setTimeout(onDone, 1800); }
      else throw new Error();
    } catch { setStatus({ type: "err", text: "Something went wrong. Please try again." }); }
    finally { setBusy(false); }
  }

  return (
    <div className="space-y-3 mt-2">
      <div className="grid grid-cols-2 gap-3">
        <Input placeholder="Your name *" className={ic} value={form.name} onChange={up("name")} />
        <Input placeholder="Email *" className={ic} value={form.email} onChange={up("email")} />
        <Input placeholder="Phone *" className={ic} value={form.phone} onChange={up("phone")} />
        <Input placeholder="Company / Institute" className={ic} value={form.company} onChange={up("company")} />
      </div>
      <Textarea placeholder="What do you need help with?" className={cn(ic, "h-24 py-3 resize-none")} value={form.message} onChange={up("message")} />
      <AnimatePresence>
        {status && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={cn("p-3 rounded-xl text-sm font-medium", status.type === "ok" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300" : "bg-rose-500/10 border border-rose-500/20 text-rose-300")}>
            {status.text}
          </motion.div>
        )}
      </AnimatePresence>
      <Button disabled={busy} onClick={submit}
        className="w-full h-12 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:opacity-90 transition shadow-lg shadow-orange-500/20">
        {busy ? "Sending…" : "Book Free Demo →"}
      </Button>
      <p className="text-center text-[11px] text-white/25">No credit card required · Setup in 24–48h</p>
    </div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────────────────── */
export default function AIAssistantPage() {
  const [open, setOpen] = useState(false);
  const [faq, setFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault(); setMobileNav(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const NAV = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Use Cases", href: "#use-cases" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  const PROBLEMS = ["What courses do you offer?", "What are the fees?", "How can I apply?", "What services are available?", "What are your timings?", "How do I contact support?"];

  const FEATURES = [
    { icon: FileText, title: "Document-Grounded Answers", desc: "Every response is sourced directly from your uploaded PDFs, brochures & FAQs — no hallucinations, no guesswork." },
    { icon: MousePointer2, title: "Embeddable Chat Widget", desc: "A sleek, fully customizable widget that integrates with any website or CMS in under 10 minutes." },
    { icon: Users, title: "Smart Lead Capture", desc: "Capture visitor intent, name, email, and phone number automatically — no forms required." },
    { icon: BarChart3, title: "Real-Time Analytics Dashboard", desc: "Track conversations, top questions, drop-off points, and lead quality in one clean interface." },
    { icon: Zap, title: "Sub-2s Response Speed", desc: "Optimized vector retrieval pipeline delivers intelligent answers before users finish reading the question." },
    { icon: Shield, title: "Enterprise Data Isolation", desc: "Each client's knowledge base is fully isolated. Your proprietary data never leaks to other tenants." },
  ];

  const USE_CASES = [
    { icon: "🎓", title: "Colleges & Universities", desc: "Automate admissions queries, course info, fee structures, and campus life FAQs — 24/7." },
    { icon: "📚", title: "Training Institutes", desc: "Guide students through program details, schedules, certification paths, and enrollment steps." },
    { icon: "🏢", title: "Enterprises", desc: "Automate internal knowledge bases, onboarding, HR policies, and customer support queues." },
    { icon: "⚙️", title: "Service Companies", desc: "Walk prospects through offerings, pricing, timelines, and case studies without human intervention." },
  ];

  const PLANS = [
    { name: "Starter", price: "₹3,999", setup: "₹20,000", color: "white/5", features: ["AI chatbot for website", "Document knowledge base", "Lead capture system", "Admin dashboard", "Hosting & maintenance"], hot: false },
    { name: "Growth", price: "₹6,999", setup: "₹25,000", color: "orange-500/10", features: ["Everything in Starter", "More documents & pages", "Priority support", "Advanced analytics", "Knowledge base updates"], hot: false },
    { name: "Pro", price: "₹9,999", setup: "₹40,000", color: "gradient", features: ["Everything in Growth", "WhatsApp integration", "Custom branding", "Higher usage limits", "Premium SLA support"], hot: true },
  ];

  const TECH = ["FastAPI", "RAG Pipeline", "Vector Search", "LLM Inference", "Secure Indexing", "Real-Time Sync"];

  const FAQS = [
    { q: "How does the chatbot learn about our organization?", a: "Upload brochures, FAQs, or PDFs. Our system processes them into a vector knowledge base that powers instant, accurate answers." },
    { q: "Does the chatbot replace our support team?", a: "No — it handles repetitive questions 24/7, freeing your team for complex, relationship-driven interactions that need a human touch." },
    { q: "Can we update documents later?", a: "Yes. Add or remove documents anytime through the admin dashboard. The AI knowledge base updates within minutes." },
    { q: "Is WhatsApp integration available?", a: "Yes, on the Pro plan. Customers can get AI-powered answers through WhatsApp — the world's most popular messaging platform." },
    { q: "How is our data protected?", a: "Every client's data is fully isolated in a private namespace. We use encryption at rest and in transit with enterprise-grade access controls." },
    { q: "How long does setup take?", a: "Typically 24–48 hours from when you share your documents. We handle configuration, testing, and deployment for you." },
  ];

  const STATS = [
    { value: 500, suffix: "+", label: "Questions Automated Daily" },
    { value: 98, suffix: "%", label: "Answer Accuracy" },
    { value: 2, suffix: "s", prefix: "<", label: "Average Response Time" },
    { value: 24, suffix: "/7", label: "Uptime Guarantee" },
  ];

  return (
    <div className="min-h-screen text-white antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(249,115,22,0.3); }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #04050d; } ::-webkit-scrollbar-thumb { background: rgba(249,115,22,0.4); border-radius: 9999px; }
        .glow-text { text-shadow: 0 0 60px rgba(249,115,22,0.4); }
      `}</style>
      <AnimatedBg />
      <NoiseOverlay />

      {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
      <header className={cn("sticky top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-white/[0.08] bg-[#04050d]/85 backdrop-blur-xl shadow-2xl shadow-black/50" : "bg-transparent"
      )}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 lg:px-8">
          <a href="/" className="flex items-center gap-2.5 group">
            <LogoMark />
            <div className="leading-none">
              <BrandName />
              <div className="text-[9px] uppercase tracking-widest text-white/35 font-semibold mt-0.5">Knowledge AI</div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map(n => (
              <a key={n.href} href={n.href} onClick={scroll(n.href)}
                className="text-sm font-medium text-white/50 hover:text-white transition-colors relative group">
                {n.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-orange-500 to-rose-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button onClick={() => setOpen(true)}
              className="rounded-xl h-9 px-5 text-sm font-semibold bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-200">
              Book Demo
            </Button>
            <button onClick={() => setMobileNav(!mobileNav)} className="md:hidden p-2 rounded-lg border border-white/10 bg-white/5">
              {mobileNav ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileNav && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-white/8 bg-[#04050d]/95 md:hidden">
              <div className="px-5 py-4 space-y-1">
                {NAV.map(n => (
                  <a key={n.href} href={n.href} onClick={scroll(n.href)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition">
                    {n.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section ref={heroRef} className="relative min-h-screen flex items-center px-5 pt-16 pb-20 lg:px-8">
          {/* Orbit rings */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
            {[380, 600, 820].map((s, i) => (
              <motion.div key={i} animate={{ rotate: i % 2 === 0 ? 360 : -360 }} transition={{ duration: 30 + i * 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]"
                style={{ width: s, height: s }} />
            ))}
          </div>

          <div className="mx-auto max-w-6xl w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left */}
              <div>
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-orange-500/30 bg-orange-500/8 px-4 py-2 mb-8">
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                    <span className="text-xs font-semibold text-orange-300 tracking-wide">24/7 AI Knowledge Assistant</span>
                  </div>

                  <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] glow-text mb-6" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                    Your AI that <br />
                    <GoldText>Knows Everything</GoldText>
                    <br />About You
                  </h1>

                  <p className="text-lg text-white/55 leading-relaxed mb-10 max-w-lg">
                    Instantly answer customer & student questions from your own documents. Deploy on your website or WhatsApp — live in under 48 hours.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-12">
                    <Button size="lg" onClick={() => setOpen(true)}
                      className="rounded-xl h-13 px-8 font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 transition-all duration-200 text-base">
                      Book Free Demo
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <Button size="lg" variant="outline"
                      className="rounded-xl h-13 px-8 font-semibold border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-white hover:border-white/25 text-base transition-all">
                      <Play className="mr-2 w-4 h-4" />
                      Watch Demo
                    </Button>
                  </div>

                  {/* Trust row */}
                  <div className="flex items-center gap-6 text-sm text-white/35">
                    <div className="flex -space-x-2">
                      {["🎓","🏢","🔬","⚙️"].map((e,i) => (
                        <div key={i} className="w-7 h-7 rounded-full bg-white/10 border-2 border-[#04050d] flex items-center justify-center text-xs">{e}</div>
                      ))}
                    </div>
                    <span>Trusted by <strong className="text-white/60">50+ organizations</strong></span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right — Demo */}
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex justify-center lg:justify-end">
                {/* Floating stat cards */}
                <div className="absolute -left-4 top-12 z-20">
                  <FloatingCard icon={TrendingUp} label="Queries resolved" value="10k+ this week" color="#22c55e" delay={0} />
                </div>
                <div className="absolute -right-4 bottom-8 z-20">
                  <FloatingCard icon={Clock} label="Avg response time" value="< 1.8 seconds" color="#f97316" delay={1.5} />
                </div>
                <div className="relative z-10">
                  <ChatDemo />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25">
            <span className="text-[10px] uppercase tracking-widest font-semibold">Scroll</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </section>

        {/* ── STATS BAR ─────────────────────────────────────────────── */}
        <div className="border-y border-white/[0.06] bg-white/[0.02] backdrop-blur">
          <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {STATS.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="text-center">
                  <div className="text-4xl font-black tracking-tight" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                    <GoldText><AnimatedCounter value={s.value} suffix={s.suffix} prefix={s.prefix} /></GoldText>
                  </div>
                  <div className="text-sm text-white/40 font-medium mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── PROBLEM ───────────────────────────────────────────────── */}
        <Section id="problem">
          <Heading eyebrow="The Problem" title="Repetitive Questions Kill Productivity" sub="Your team answers the same 10 questions hundreds of times a day. There's a better way." />
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4">
            {PROBLEMS.map((q, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="group relative p-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-6 h-6 rounded-lg bg-rose-500/15 border border-rose-500/20 flex items-center justify-center mb-3">
                  <X className="w-3 h-3 text-rose-400" />
                </div>
                <p className="text-sm font-medium text-white/70">{q}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-8 rounded-2xl border border-orange-500/20 bg-gradient-to-r from-orange-500/8 to-rose-500/5 p-6 text-center">
            <p className="text-base font-semibold text-orange-200">These questions steal hours daily. <span className="text-white">Our AI answers them instantly — using your documents.</span></p>
          </motion.div>
        </Section>

        {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
        <Section id="how-it-works">
          <Heading eyebrow="Setup Process" title="Live in 3 Simple Steps" sub="Get your AI assistant running in under 48 hours — we handle everything." accent />
          <div className="mt-16 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-1/2 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent -translate-y-8" />
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { n: "01", icon: FileText, title: "Upload Your Documents", desc: "PDFs, FAQs, brochures, policies — anything that describes your organization." },
                { n: "02", icon: BrainCircuit, title: "AI Builds Knowledge Base", desc: "We process your content into an intelligent, searchable vector database in hours." },
                { n: "03", icon: Globe, title: "Go Live on Your Website", desc: "We embed the chatbot widget and you start answering questions automatically." },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="group relative p-8 rounded-3xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-orange-500/20 transition-all duration-300">
                  <div className="absolute top-4 right-6 text-7xl font-black text-white/[0.03] select-none" style={{ fontFamily: "Georgia, serif" }}>{s.n}</div>
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-orange-500/20 to-rose-500/10 border border-orange-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <s.icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-white">{s.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── FEATURES ──────────────────────────────────────────────── */}
        <Section id="features" className="bg-white/[0.015]">
          <Heading eyebrow="Capabilities" title="Powerful AI Built for Real Business" sub="Everything you need to automate customer and student communication." />
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group p-7 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-orange-500/15 transition-all duration-300 cursor-default">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500/15 to-transparent border border-orange-500/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-orange-500/35 transition-all">
                  <f.icon className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="font-bold text-base mb-2 text-white">{f.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── USE CASES ─────────────────────────────────────────────── */}
        <Section id="use-cases">
          <Heading eyebrow="Industries" title="Built for Every Sector" sub="Tailored AI knowledge retrieval for your specific industry needs." accent />
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {USE_CASES.map((u, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group p-7 rounded-2xl border border-white/[0.07] bg-[#070915]/70 hover:border-orange-500/20 transition-all duration-300">
                <div className="text-3xl mb-5">{u.icon}</div>
                <h3 className="text-base font-bold text-orange-200/90 mb-3">{u.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{u.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── PRICING ───────────────────────────────────────────────── */}
        <Section id="pricing" className="bg-white/[0.015]">
          <Heading eyebrow="Pricing" title="Transparent Plans, No Surprises" sub="Pick the plan that scales with your organization." />
          <div className="mt-16 grid lg:grid-cols-3 gap-6 items-start">
            {PLANS.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className={cn("relative rounded-3xl border overflow-hidden transition-all",
                  p.hot ? "border-orange-500/40 shadow-2xl shadow-orange-500/15 scale-[1.03] z-10" : "border-white/[0.07]"
                )}>
                {p.hot && (
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
                )}
                <div className={cn("p-8", p.hot ? "bg-gradient-to-br from-orange-500/10 to-rose-500/5" : "bg-white/[0.03]")}>
                  {p.hot && (
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-3 py-1 text-xs font-bold uppercase tracking-widest mb-5">
                      <Star className="w-3 h-3 fill-white" />Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-4xl font-black text-white" style={{ fontFamily: "'DM Serif Display', serif" }}>{p.price}</span>
                    <span className="text-white/35 text-sm">/ month</span>
                  </div>
                  <div className="mt-1.5 text-xs text-white/30 font-medium">+ {p.setup} one-time setup</div>
                  <div className="my-7 border-t border-white/8" />
                  <div className="space-y-3.5">
                    {p.features.map((f, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <div className="mt-0.5 w-4.5 h-4.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                        </div>
                        <span className="text-sm text-white/65">{f}</span>
                      </div>
                    ))}
                  </div>
                  <Button onClick={() => setOpen(true)}
                    className={cn("w-full mt-8 h-11 rounded-xl font-semibold text-sm transition-all",
                      p.hot ? "bg-gradient-to-r from-orange-500 to-rose-500 hover:opacity-90 shadow-lg shadow-orange-500/25" : "bg-white/8 border border-white/10 hover:bg-white/12 text-white"
                    )}>
                    Get Started <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature table */}
          <div className="mt-16 overflow-x-auto rounded-2xl border border-white/[0.07] bg-white/[0.02]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="p-5 text-xs uppercase tracking-wider text-white/35 font-semibold">Feature</th>
                  {["Starter", "Growth", <GoldText key="p">Pro</GoldText>].map((h, i) => (
                    <th key={i} className="p-5 text-xs uppercase tracking-wider font-semibold text-center text-white/35">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["AI Website Chatbot", true, true, true],
                  ["Document Knowledge Base", true, true, true],
                  ["Lead Capture", true, true, true],
                  ["Admin Dashboard", true, true, true],
                  ["Advanced Analytics", false, true, true],
                  ["WhatsApp Integration", false, false, true],
                  ["Custom Branding", false, false, true],
                  ["Priority Support", false, true, true],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition">
                    <td className="p-5 font-medium text-white/70">{row[0]}</td>
                    {[1, 2, 3].map(j => (
                      <td key={j} className="p-5 text-center">
                        {row[j] ? <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 mx-auto" /> : <div className="w-4 h-px bg-white/15 mx-auto" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── PRIVATE DEPLOYMENT ────────────────────────────────────── */}
        <Section id="private">
          <div className="relative rounded-3xl border border-white/[0.07] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent" />
            <div className="absolute right-0 top-0 h-96 w-96 bg-orange-500/8 blur-[100px]" />
            <div className="relative p-10 lg:p-16 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/8 px-3 py-1.5 text-xs font-semibold text-orange-300 uppercase tracking-widest mb-6">
                  <Lock className="w-3 h-3" /> On-Premise Option
                </div>
                <h2 className="text-3xl lg:text-4xl font-black mb-5 text-white" style={{ fontFamily: "'DM Serif Display', serif" }}>Need Full Data Control?</h2>
                <p className="text-white/55 mb-8 leading-relaxed">Organizations handling sensitive data can deploy the entire AI stack on their own infrastructure — complete privacy, zero data sharing.</p>
                <div className="grid grid-cols-2 gap-3">
                  {["Full system installation", "AI model setup", "Knowledge base config", "Staff training", "Production deployment", "Ongoing maintenance"].map((t, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-white/65">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-8 text-center backdrop-blur">
                <div className="text-xs uppercase tracking-widest text-white/35 font-semibold mb-2">Deployment Investment</div>
                <div className="text-4xl font-black text-white mb-1" style={{ fontFamily: "'DM Serif Display', serif" }}>₹60K – ₹1.5L</div>
                <div className="text-sm text-white/35 mb-6">one-time setup</div>
                <div className="border-t border-white/8 pt-6 mb-6">
                  <div className="text-xs uppercase tracking-widest text-white/35 font-semibold mb-1.5">Monthly Maintenance</div>
                  <div className="text-3xl font-bold"><GoldText>₹10,000</GoldText> <span className="text-sm font-normal text-white/35">/ mo</span></div>
                </div>
                <Button onClick={() => setOpen(true)} className="w-full h-11 rounded-xl border border-white/12 bg-white/6 hover:bg-white/12 text-sm font-semibold transition">
                  Inquire About Private Deployment →
                </Button>
              </div>
            </div>
          </div>
        </Section>

        {/* ── TECH STACK ────────────────────────────────────────────── */}
        <Section id="why-us" className="bg-white/[0.015]">
          <Heading eyebrow="Technology" title="Enterprise-Grade Architecture" sub="Battle-tested components for maximum reliability and performance." accent />
          <div className="mt-14 flex flex-wrap justify-center gap-4">
            {TECH.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4, scale: 1.05 }}
                className="px-5 py-3 rounded-xl border border-white/8 bg-white/[0.04] text-sm font-semibold text-orange-300/80 cursor-default transition-colors hover:border-orange-500/25 hover:bg-orange-500/5">
                {t}
              </motion.div>
            ))}
          </div>
          <div className="mt-14 grid sm:grid-cols-3 gap-5">
            {[
              { icon: Cpu, title: "Sub-2s Responses", desc: "Optimized vector retrieval + inference pipeline tuned for speed." },
              { icon: Network, title: "Scalable Infrastructure", desc: "Handles thousands of concurrent conversations without degradation." },
              { icon: Shield, title: "SOC-2 Ready Security", desc: "Encryption at rest & in transit, isolated tenant architecture." },
            ].map((c, i) => (
              <div key={i} className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/15 flex items-center justify-center shrink-0">
                  <c.icon className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white mb-1">{c.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <Section id="faq">
          <Heading eyebrow="FAQ" title="Everything You Need to Know" sub="Straight answers to the most common questions." />
          <div className="mt-14 max-w-2xl mx-auto space-y-3">
            {FAQS.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-white/[0.07] overflow-hidden">
                <button onClick={() => setFaq(faq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-white/[0.03] transition group">
                  <span className="font-semibold text-sm text-white/85 group-hover:text-white transition">{f.q}</span>
                  <ChevronDown className={cn("w-4 h-4 text-white/30 shrink-0 transition-transform duration-300", faq === i && "rotate-180 text-orange-400")} />
                </button>
                <AnimatePresence>
                  {faq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                      className="overflow-hidden">
                      <div className="px-6 pb-6 text-sm text-white/50 leading-relaxed border-t border-white/[0.05] pt-4">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── CTA BANNER ────────────────────────────────────────────── */}
        <section className="px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="relative rounded-[2.5rem] overflow-hidden p-14 lg:p-20 text-center"
              style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.85) 0%, rgba(245,158,11,0.75) 40%, rgba(244,63,94,0.85) 100%)" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30" />
              <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/8 blur-3xl" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white mb-8">
                  <Sparkles className="w-3 h-3" /> Limited Time Offer
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-white mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>
                  Ready to Automate 80% of Your Support?
                </h2>
                <p className="text-lg text-white/75 mb-10 max-w-xl mx-auto">Join 50+ organizations already using GoldenZVision AI. Setup in 48 hours, results from day one.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" onClick={() => setOpen(true)}
                    className="w-full sm:w-auto rounded-xl h-13 px-10 bg-white text-orange-600 hover:bg-white/92 font-bold text-base shadow-2xl hover:-translate-y-1 transition-all">
                    Book Free Demo →
                  </Button>
                  <Button size="lg" variant="outline"
                    className="w-full sm:w-auto rounded-xl h-13 px-10 border-white/35 text-white hover:bg-white/12 font-semibold text-base">
                    Try Live Chatbot
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ───────────────────────────────────────────────── */}
        <Section id="contact" className="border-t border-white/[0.06]">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black text-white mb-3" style={{ fontFamily: "'DM Serif Display', serif" }}>Let's Build Your AI</h2>
              <p className="text-white/45 text-sm mb-5 max-w-sm">Have questions before booking? Reach out directly — we respond within a few hours.</p>
              <div className="space-y-2 text-sm text-white/50">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Mail className="w-4 h-4 text-orange-400" />
                  <a href={`mailto:${COMPANY.email}`} className="hover:text-orange-400 transition">{COMPANY.email}</a>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <PhoneCall className="w-4 h-4 text-orange-400" />
                  <a href={`tel:${COMPANY.phone}`} className="hover:text-orange-400 transition">{COMPANY.phone}</a>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span>{COMPANY.location}</span>
                </div>
              </div>
            </div>
            <Button size="lg" onClick={() => setOpen(true)}
              className="rounded-xl h-13 px-12 font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 shadow-xl shadow-orange-500/25 hover:-translate-y-1 transition-all">
              Book Demo →
            </Button>
          </div>
        </Section>
      </main>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] bg-[#030408]">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-5">
                <LogoMark />
                <BrandName />
              </div>
              <p className="text-sm text-white/35 leading-relaxed max-w-xs">Building secure, intelligent AI solutions for real-world business problems while keeping your data private.</p>
              <div className="flex items-center gap-3 mt-5">
                <a href={COMPANY.linkedin} target="_blank" className="w-8 h-8 rounded-lg border border-white/8 bg-white/4 hover:border-orange-500/30 hover:bg-orange-500/8 flex items-center justify-center transition">
                  <Linkedin className="w-3.5 h-3.5 text-white/40 hover:text-orange-400" />
                </a>
                <a href="#" className="w-8 h-8 rounded-lg border border-white/8 bg-white/4 hover:border-orange-500/30 hover:bg-orange-500/8 flex items-center justify-center transition">
                  <Twitter className="w-3.5 h-3.5 text-white/40" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-white/35 mb-5">Product</h4>
              <ul className="space-y-3">
                {["Features", "Pricing", "Demo", "WhatsApp Integration", "Private Deployment"].map(l => (
                  <li key={l}><a href="#" className="text-sm text-white/40 hover:text-orange-400 transition">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-white/35 mb-5">Company</h4>
              <ul className="space-y-3">
                {["About Us", "Contact", "Privacy Policy", "Terms of Service", "LinkedIn"].map(l => (
                  <li key={l}><a href="#" className="text-sm text-white/40 hover:text-orange-400 transition">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
            <p>© {new Date().getFullYear()} GoldenZVision. All rights reserved.</p>
            <p>Made with ♥ in Tamil Nadu, India</p>
          </div>
        </div>
      </footer>

      {/* ── DEMO DIALOG ───────────────────────────────────────────────── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-3xl border border-white/[0.08] bg-[#06071a]/97 text-white shadow-2xl shadow-black/70 backdrop-blur-2xl sm:max-w-[480px]">
          <DialogHeader className="mb-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center">
                <Bot className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-white text-base font-bold">Book a Free Demo</DialogTitle>
                <p className="text-xs text-white/35 font-normal">We'll set up a personalized walkthrough for your team</p>
              </div>
            </div>
            <div className="flex gap-3">
              {[{ icon: Clock, t: "30 min call" }, { icon: Zap, t: "Free setup advice" }, { icon: Shield, t: "No obligation" }].map((b, i) => (
                <div key={i} className="flex-1 flex items-center gap-1.5 rounded-lg bg-white/[0.04] border border-white/6 px-2.5 py-2">
                  <b.icon className="w-3 h-3 text-orange-400 shrink-0" />
                  <span className="text-[10px] text-white/45 font-medium">{b.t}</span>
                </div>
              ))}
            </div>
          </DialogHeader>
          <DemoForm onDone={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}