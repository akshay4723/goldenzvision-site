"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Database,
  Search,
  Sparkles,
  Workflow,
  Activity,
  Boxes,
  ArrowRight,
  Check,
  Globe,
  Layers,
  Code2,
  Box,
  Crown,
  Linkedin,
  Twitter,
  CheckCircle2,
  Mail,
  PhoneCall,
  MapPin,
  ExternalLink,
} from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/dialog";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const nav = [
  { label: "About", href: "#about" },
  { label: "AI Focus", href: "#ai" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#our-products" },
  { label: "Leadership", href: "#leadership" },
  { label: "Mission", href: "#mission" },
  { label: "Contact", href: "#contact" },
];

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

const BRAND = {
  bg: "#05060a",
  border: "rgba(255,255,255,0.12)",
  goldFrom: "from-orange-400",
  goldVia: "via-amber-400",
  goldTo: "to-rose-400",
};

// ✅ UPDATE THESE LINKS
const COMPANY_LINKS = {
  linkedin: "https://www.linkedin.com/company/golden-z-vision",
  twitter: "https://twitter.com/your_company",
  email: "goldenzvisionin@gmail.com",
  phone: "+91 8148262395",
  location: "Tamil Nadu, India",
};

// ✅ Where your portfolio page lives
const PORTFOLIO_PATH = "/portfolio";

function GlowBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: BRAND.bg }}
    >
      <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:52px_52px]" />
      <div
        className="absolute -top-44 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(251,146,60,0.30), transparent 55%), radial-gradient(circle at 70% 45%, rgba(251,113,133,0.22), transparent 58%)",
        }}
      />
      <div
        className="absolute -bottom-56 -left-44 h-[760px] w-[760px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(251,146,60,0.22), transparent 60%), radial-gradient(circle at 65% 55%, rgba(245,158,11,0.18), transparent 62%)",
        }}
      />
      <div
        className="absolute -right-56 top-24 h-[700px] w-[700px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 35% 45%, rgba(251,113,133,0.18), transparent 60%), radial-gradient(circle at 70% 35%, rgba(251,146,60,0.16), transparent 62%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,0,0,0.62),transparent_60%)]" />
    </div>
  );
}

function BrandWordmark() {
  return (
    <span className="inline-flex items-baseline tracking-tight">
      <span
        className={cn(
          "font-semibold",
          "bg-gradient-to-r",
          BRAND.goldFrom,
          BRAND.goldVia,
          BRAND.goldTo,
          "bg-clip-text text-transparent"
        )}
      >
        Golden
      </span>
      <span
        className="mx-[1px] font-semibold text-white"
        style={{
          textShadow:
            "0 0 12px rgba(255,255,255,0.35), 0 0 28px rgba(255,255,255,0.18)",
        }}
      >
        Z
      </span>
      <span className="font-semibold">
        <span className="text-white/90">Vision</span>
        <span className="text-white/18">.</span>
      </span>
    </span>
  );
}

const LOGO_SRC = "/brand/logo.png";

function LogoMark() {
  return (
    <div className="relative flex items-center justify-center h-12 w-12 rounded-xl bg-black p-2 shadow-lg border border-orange-400/20">
      <img
        src={LOGO_SRC}
        alt="GoldenZVision logo"
        className="h-[110%] w-[110%] object-contain"
      />
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "default",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  tone?: "default" | "warm" | "ink";
}) {
  const titleClass =
    tone === "warm"
      ? "bg-gradient-to-r from-orange-200 via-amber-200 to-rose-200 bg-clip-text text-transparent"
      : tone === "ink"
      ? "text-white"
      : "text-white";

  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="flex items-center justify-center gap-2">
        <Badge
          variant="secondary"
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur"
        >
          {eyebrow}
        </Badge>
      </div>

      <h2
        className={cn(
          "mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl",
          titleClass
        )}
      >
        {title}
      </h2>

      <p className="mt-3 text-pretty text-base text-white/70 sm:text-lg">
        {subtitle}
      </p>
    </div>
  );
}

function Pill({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80 shadow-sm backdrop-blur transition hover:bg-white/10 hover:border-white/15">
      <Icon className="h-4 w-4 text-white/80" />
      <span>{label}</span>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur transition hover:bg-white/10 hover:border-white/15">
      <div className="text-2xl font-semibold tracking-tight text-white">
        {value}
      </div>
      <div className="mt-1 text-sm text-white/60">{label}</div>
    </div>
  );
}

function SectionShell({
  id,
  children,
  variant = "soft",
}: {
  id: string;
  children: React.ReactNode;
  variant?: "soft" | "glass" | "flat";
}) {
  const base = "border-t border-white/10";
  const wrap = "mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20";

  const bg =
    variant === "glass"
      ? "relative overflow-hidden"
      : variant === "soft"
      ? "relative"
      : "relative";

  const overlay =
    variant === "glass" ? (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 20% 15%, rgba(251,146,60,0.10), transparent 55%), radial-gradient(circle at 80% 30%, rgba(251,113,133,0.08), transparent 60%)",
        }}
      />
    ) : variant === "soft" ? (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.00), rgba(255,255,255,0.02), rgba(255,255,255,0.00))",
        }}
      />
    ) : null;

  return (
    <section id={id} className={cn(base, bg)}>
      {overlay}
      <div className={wrap}>{children}</div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  bullets,
  accent = "from-orange-500/20 via-amber-500/10 to-transparent",
}: {
  icon: any;
  title: string;
  desc: string;
  bullets?: string[];
  accent?: string;
}) {
  return (
    <Card className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-orange-500/10">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-20 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100",
          "bg-gradient-to-r",
          accent
        )}
      />
      <CardHeader className="relative pb-3">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 transition group-hover:bg-white/10 group-hover:border-white/15">
            <Icon className="h-5 w-5 text-white/85" />
          </div>
          <CardTitle className="text-lg text-white">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-4">
        <p className="text-sm text-white/70">{desc}</p>
        {bullets?.length ? (
          <ul className="space-y-2">
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 text-orange-200/90" />
                <span className="text-white/65">{b}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  );
}

/** ✅ LeadershipCard (unchanged structure; improved hover feel) */
function LeadershipCard({
  name,
  role,
  bio,
  photo,
  links,
}: {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  links?: { linkedin?: string; twitter?: string };
}) {
  return (
    <Card className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-orange-500/10">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-24 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(251,146,60,0.22), transparent 55%), radial-gradient(circle at 70% 55%, rgba(251,113,133,0.14), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.00))",
        }}
      />

      <CardContent className="relative p-6 pt-7">
        <div className="flex items-start gap-5">
          <div className="relative mt-[2px] h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            {photo ? (
              <img
                src={photo}
                alt={name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="grid h-full w-full place-items-center text-base font-semibold text-white/80">
                {name
                  .split(" ")
                  .slice(0, 2)
                  .map((p) => p[0]?.toUpperCase())
                  .join("")}
              </div>
            )}

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                boxShadow:
                  "inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 24px rgba(251,146,60,0.10)",
              }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 pt-[2px]">
                <div className="truncate text-[15px] font-semibold leading-tight text-white">
                  {name}
                </div>

                <div className="mt-1 inline-flex max-w-full items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
                  <span className="truncate">{role}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {links?.linkedin ? (
                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition hover:border-white/20 hover:bg-white/10"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                ) : null}

                {links?.twitter ? (
                  <a
                    href={links.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition hover:border-white/20 hover:bg-white/10"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-white/70 line-clamp-3">
              {bio}
            </p>

            <div className="mt-4 h-px w-full bg-white/10" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/** ✅ Client Request Dialog Content
 * FIX: user can clearly see selected option + selected product/service
 * ADD: pro hover effects for selection buttons
 */
function ClientRequestDialogContent({
  defaultType = "consultation",
  onDone,
}: {
  defaultType?: "consultation" | "custom_service" | "buy_product";
  onDone: () => void;
}) {
  const inputClasses =
    "border-white/10 bg-white/5 text-white placeholder:text-white/45 focus-visible:ring-orange-400/40 focus-visible:ring-offset-0";
  const labelClasses = "text-sm font-medium text-white/85";

  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const [requestType, setRequestType] = useState<
    "consultation" | "custom_service" | "buy_product"
  >(defaultType);

  // Mandatory fields (NOT required)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  // custom service options
  const [serviceCategory, setServiceCategory] = useState<
    "" | "web_app" | "enterprise" | "ai_saas" | "3d_simulation"
  >("");

  // product options
  const [productInterest, setProductInterest] = useState<
    "" | "ai_product_suite" | "security_monitoring" | "assistant_rag" | "custom_request"
  >("");

  const [budgetRange, setBudgetRange] = useState<
    "" | "under_50k" | "50k_2L" | "2L_10L" | "10L_plus"
  >("");

  const [timeline, setTimeline] = useState<
    "" | "immediate" | "2_4_weeks" | "1_3_months" | "3_plus_months"
  >("");

  const [message, setMessage] = useState("");

  const typeLabel =
    requestType === "consultation"
      ? "AI (Private AI)"
      : requestType === "custom_service"
      ? "Custom Applications"
      : "Our Product and Service";

  const selectionBadge = (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-white/70">Selected:</span>
        <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-white">
          <CheckCircle2 className="h-4 w-4 opacity-90" />
          {typeLabel}
        </span>

        {requestType === "custom_service" ? (
          <span className="text-xs text-white/55">
            {serviceCategory ? "• Service selected" : "• Select a service below"}
          </span>
        ) : null}

        {requestType === "buy_product" ? (
          <span className="text-xs text-white/55">
            {productInterest ? "• Product selected" : "• Select a product below"}
          </span>
        ) : null}
      </div>
    </div>
  );

  const interactiveCardBase =
    "group relative rounded-2xl border px-4 py-3 text-left transition duration-300 will-change-transform";
  const interactiveCardHover =
    "hover:-translate-y-[2px] hover:bg-white/10 hover:border-white/15 hover:shadow-lg hover:shadow-orange-500/10";
  const interactiveCardActive =
    "border-orange-400/40 bg-white/10 shadow-lg shadow-orange-500/10";

  async function submit() {
    setErrMsg(null);
    setOkMsg(null);

    if (!requestType) {
      setErrMsg("Please choose what you need.");
      return;
    }

    // Mandatory but improves quality: if user chose custom_service or buy_product, ensure they picked one
    if (requestType === "custom_service" && !serviceCategory) {
      setErrMsg("Please select a service.");
      return;
    }
    if (requestType === "buy_product" && !productInterest) {
      setErrMsg("Please select a product interest.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/client-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType,
          name,
          email,
          phone,
          company,
          serviceCategory,
          productInterest,
          budgetRange,
          timeline,
          message,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json?.ok) {
        throw new Error(json?.message || "Failed to submit.");
      }

      setOkMsg("Submitted successfully. We’ll get back to you soon.");
      setTimeout(() => {
        onDone();
      }, 650);
    } catch (e: any) {
      setErrMsg(e?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 grid gap-5">
      {/* ✅ FIX: Visible selection indicator */}
      {selectionBadge}

      {/* Type selection */}
      <div className="grid gap-2">
        <div className={labelClasses}>What do you need?</div>

        <div className="grid gap-2 sm:grid-cols-3">
          {[
            { id: "consultation", label: "AI" as const },
            { id: "custom_service", label: "Custom Applications" as const },
            { id: "buy_product", label: "Our Product and Service" as const },
          ].map((x) => {
            const active = requestType === (x.id as any);
            return (
              <button
                key={x.id}
                type="button"
                onClick={() => {
                  setRequestType(x.id as any);
                  // reset dependent selections when switching
                  setServiceCategory("");
                  setProductInterest("");
                }}
                className={cn(
                  interactiveCardBase,
                  interactiveCardHover,
                  active ? interactiveCardActive : "border-white/10 bg-white/5"
                )}
              >
                {/* subtle glow */}
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -inset-16 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100",
                    "bg-gradient-to-r from-orange-500/18 via-amber-500/10 to-transparent"
                  )}
                />
                {/* selected marker */}

                <div className="relative text-sm font-semibold text-white">
                  {x.label}
                </div>
                <div className="relative mt-1 text-xs text-white/60">
                  {x.id === "consultation"
                    ? "Get your own Private Ai"
                    : x.id === "custom_service"
                    ? "Web/App, Software, Simualtion, 3D Design."
                    : "Get our Solutions"}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conditional options */}
      {requestType === "custom_service" ? (
        <div className="grid gap-2">
          <div className={labelClasses}>Choose a service</div>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { id: "web_app", label: "Custom web, Android & IOS Applications" },
              { id: "enterprise", label: "Enterprise software systems" },
              { id: "ai_saas", label: "Simualation Software" },
              { id: "3d_simulation", label: "3D product design, Modeling & Planning" },
            ].map((x) => {
              const active = serviceCategory === (x.id as any);
              return (
                <button
                  key={x.id}
                  type="button"
                  onClick={() => setServiceCategory(x.id as any)}
                  className={cn(
                    interactiveCardBase,
                    interactiveCardHover,
                    active ? interactiveCardActive : "border-white/10 bg-white/5"
                  )}
                >
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute -inset-16 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100",
                      "bg-gradient-to-r from-amber-500/16 via-rose-500/10 to-transparent"
                    )}
                  />
                  

                  <div className="relative text-sm font-semibold text-white">
                    {x.label}
                  </div>
                  <div className="relative mt-1 text-xs text-white/60">
                    {active ? "Selected" : "Tap to select"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {requestType === "buy_product" ? (
        <div className="grid gap-2">
          <div className={labelClasses}>Product interest</div>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { id: "ai_product_suite", label: "Operational AI product suite" },
              { id: "assistant_rag", label: "Domain Assistant / RAG product" },
              { id: "security_monitoring", label: "Security monitoring product" },
              { id: "custom_request", label: "Not listed (tell us)" },
            ].map((x) => {
              const active = productInterest === (x.id as any);
              return (
                <button
                  key={x.id}
                  type="button"
                  onClick={() => setProductInterest(x.id as any)}
                  className={cn(
                    interactiveCardBase,
                    interactiveCardHover,
                    active ? interactiveCardActive : "border-white/10 bg-white/5"
                  )}
                >
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute -inset-16 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100",
                      "bg-gradient-to-r from-rose-500/16 via-orange-500/10 to-transparent"
                    )}
                  />

                  <div className="relative text-sm font-semibold text-white">
                    {x.label}
                  </div>
                  <div className="relative mt-1 text-xs text-white/60">
                    {active ? "Selected" : "Tap to select"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Mandatory planning fields */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClasses}>
            Name <span className="text-white/40">(Mandatory)</span>
          </label>
          <Input
            className={cn("mt-2", inputClasses)}
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClasses}>
            Email <span className="text-white/40">(Mandatory)</span>
          </label>
          <Input
            className={cn("mt-2", inputClasses)}
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>

        <div>
          <label className={labelClasses}>
            Phone <span className="text-white/40">(Mandatory)</span>
          </label>
          <Input
            className={cn("mt-2", inputClasses)}
            placeholder="+91 XXXXX XXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClasses}>
            Company <span className="text-white/40">(Mandatory)</span>
          </label>
          <Input
            className={cn("mt-2", inputClasses)}
            placeholder="Company / Organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClasses}>
            Budget <span className="text-white/40">(Mandatory)</span>
          </label>
          <select
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value as any)}
            className={cn(
              "mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none transition",
              "focus-visible:ring-2 focus-visible:ring-orange-400/40",
              "hover:bg-white/10 hover:border-white/15"
            )}
          >
            <option value="">Select</option>
            <option value="under_50k">Under ₹50,000</option>
            <option value="50k_2L">₹50,000 – ₹2,00,000</option>
            <option value="2L_10L">₹2,00,000 – ₹10,00,000</option>
            <option value="10L_plus">₹10,00,000+</option>
          </select>
        </div>

        <div>
          <label className={labelClasses}>
            Timeline <span className="text-white/40">(Mandatory)</span>
          </label>
          <select
            value={timeline}
            onChange={(e) => setTimeline(e.target.value as any)}
            className={cn(
              "mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none transition",
              "focus-visible:ring-2 focus-visible:ring-orange-400/40",
              "hover:bg-white/10 hover:border-white/15"
            )}
          >
            <option value="">Select</option>
            <option value="immediate">Immediate</option>
            <option value="2_4_weeks">2–4 weeks</option>
            <option value="1_3_months">1–3 months</option>
            <option value="3_plus_months">3+ months</option>
          </select>
        </div>
      </div>

      <div>
        <label className={cn("text-sm font-medium text-white/85")}>
          Message <span className="text-white/40">(Mandatory)</span>
        </label>
        <Textarea
          className={cn("mt-2 min-h-[110px]", inputClasses)}
          placeholder="Tell us what you need. If you selected Custom Services, mention features; if Buy Product, mention quantity/use-case."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {errMsg ? (
        <div className="rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {errMsg}
        </div>
      ) : null}

      {okMsg ? (
        <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {okMsg}
        </div>
      ) : null}

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button
          variant="secondary"
          className={cn(
            "rounded-2xl border border-white/10 bg-white/5 text-white",
            "transition duration-300 hover:-translate-y-[1px] hover:bg-white/10 hover:border-white/15 hover:shadow-lg hover:shadow-orange-500/10"
          )}
          onClick={onDone}
          disabled={loading}
        >
          Close
        </Button>

        <Button
          className={cn(
            "rounded-2xl text-white",
            "bg-gradient-to-r",
            "from-orange-500 via-amber-500 to-rose-500",
            "transition duration-300 hover:-translate-y-[1px] hover:opacity-95 hover:shadow-xl hover:shadow-orange-500/20"
          )}
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="text-xs text-white/45">
        Your request is stored securely on the server (Firebase Admin). No
        client-side Firebase keys are shipped to users.
      </div>
    </div>
  );
}

export default function GoldenZVisionWebsite() {
  const [open, setOpen] = useState(false);

  const coreFocus = useMemo(
    () => [
      {
        icon: Lock,
        title: "Private AI deployment & fine-tuning",
        desc: "Deploy and tailor models inside your environment to keep sensitive data and IP fully under your control.",
        bullets: [
          "On-prem, VPC, or hybrid setups",
          "Fine-tuning and evaluation pipelines",
          "Policy-aligned governance & access",
        ],
        accent: "from-orange-500/22 via-amber-500/10 to-transparent",
      },
      {
        icon: Search,
        title: "Domain-specific AI assistants & RAG",
        desc: "Assistants that truly understand your internal knowledge with secure retrieval and grounded responses.",
        bullets: [
          "RAG pipelines with guardrails",
          "Ingestion + indexing strategy",
          "Quality monitoring & evaluation loops",
        ],
        accent: "from-amber-500/22 via-rose-500/10 to-transparent",
      },
      {
        icon: Shield,
        title: "AI security, monitoring & risk intelligence",
        desc: "Reduce operational risk with anomaly detection, monitoring, and security intelligence workflows.",
        bullets: [
          "Threat and risk intelligence flows",
          "Audit trails & explainability",
          "Dashboards and continuous monitoring",
        ],
        accent: "from-rose-500/22 via-orange-500/10 to-transparent",
      },
      {
        icon: Workflow,
        title: "Workflow automation & enterprise integration",
        desc: "Connect AI to real operations—tools, data, and teams—while maintaining reliability and compliance.",
        bullets: [
          "Tooling + API integrations",
          "Approvals and role-based controls",
          "Enterprise-ready architecture patterns",
        ],
        accent: "from-orange-500/22 via-yellow-500/10 to-transparent",
      },
    ],
    []
  );

  const services = useMemo(
    () => [
      {
        icon: Globe,
        title: "Custom web & app development",
        desc: "Modern, fast, responsive applications with clean UX and maintainable architecture.",
      },
      {
        icon: Layers,
        title: "Enterprise software systems",
        desc: "Scalable backends, secure APIs, and resilient platforms engineered for production.",
      },
      {
        icon: Sparkles,
        title: "AI-enhanced SaaS platforms",
        desc: "Ship AI safely—assistants, analytics, automation—built for real-world usage.",
      },
      {
        icon: Box,
        title: "3D product design & simulation",
        desc: "Interactive 3D experiences and simulation systems for visualization and training.",
      },
    ],
    []
  );

  const leadership = useMemo(
    () => [
      {
        name: "Akshaya Raj K",
        role: "CEO • Founder",
        bio: "Leading GoldenZVision’s AI-first vision—secure, private systems that drive real operational impact.",
        photo: "/team/ceo.jpeg",
        links: { linkedin: "", twitter: "" },
      },
      {
        name: "Magesh Kumar S",
        role: "CTO • Technical Manager",
        bio: "Architecting private AI deployments, enterprise integrations, and production-ready platforms.",
        photo: "/team/cto.jpeg",
        links: { linkedin: "", twitter: "" },
      },
      {
        name: "John daniel paul",
        role: "CMO • Marketing Manager",
        bio: "Driving delivery excellence—process, timelines, and client success across projects and products.",
        photo: "/team/cmo.jpeg",
        links: { linkedin: "", twitter: "" },
      },
    ],
    []
  );

  const smoothScroll = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goPortfolio = () => {
    window.location.href = PORTFOLIO_PATH;
  };

  return (
    <div className="min-h-screen text-white">
      <GlowBg />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05060a]/65 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a
            href="#"
            className="flex items-center gap-2"
            onClick={goTop}
            aria-label="GoldenZVision home"
          >
            <LogoMark />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">
                <BrandWordmark />
              </div>
              <div className="text-xs text-white/60">
                Private AI • Secure Systems
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={smoothScroll(n.href)}
                className="text-sm text-white/70 transition hover:text-white"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* ✅ NAV Get Started -> TOP */}
            <Button
              onClick={goTop}
              className={cn(
                "rounded-2xl text-white shadow-lg",
                "bg-gradient-to-r",
                "from-orange-500 via-amber-500 to-rose-500",
                "shadow-orange-500/20",
                "transition duration-300 hover:-translate-y-[1px] hover:shadow-xl hover:shadow-orange-500/25"
              )}
            >
              Let Start
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 sm:pb-16 sm:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              className="space-y-6"
            >
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                <Pill icon={Lock} label="AI-first" />
                <Pill icon={Shield} label="Security & privacy" />
                <Pill icon={Database} label="Data control" />
                <Pill icon={Activity} label="Production-ready" />
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
              >
                <span className="bg-gradient-to-r from-orange-200 via-amber-200 to-rose-200 bg-clip-text text-transparent">
                  Secure, private AI systems
                </span>{" "}
                <span className="text-white/85">
                  that solve real-world business problems.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-pretty text-base text-white/70 sm:text-lg"
              >
                GoldenZVision is an AI-first technology company building intelligent
                systems for enterprises—helping teams deploy AI securely while
                maintaining full control of data and infrastructure.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <Button
                  size="lg"
                  onClick={() => setOpen(true)}
                  className={cn(
                    "rounded-2xl text-white shadow-lg",
                    "bg-gradient-to-r",
                    "from-orange-500 via-amber-500 to-rose-500",
                    "shadow-orange-500/15",
                    "transition duration-300 hover:-translate-y-[1px] hover:opacity-95 hover:shadow-xl hover:shadow-orange-500/25"
                  )}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                {/* ✅ Explore our AI Products -> Portfolio page */}
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={smoothScroll("#our-products")}
                  className={cn(
                    "rounded-2xl border border-white/10 bg-white/5 text-white",
                    "transition duration-300 hover:-translate-y-[1px] hover:bg-white/10 hover:border-white/15 hover:shadow-lg hover:shadow-orange-500/10"
                  )}
                >
                  <Sparkles className="w-5 h-5" />
                  Explore our AI Products
                </Button>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="grid grid-cols-2 gap-3 sm:grid-cols-4"
              >
                <Stat value="Private" label="AI deployment" />
                <Stat value="Secure" label="RAG systems" />
                <Stat value="Reliable" label="Monitoring" />
                <Stat value="Custom" label="Solutions" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-orange-500/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/15 hover:border-white/15">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-24 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(251,146,60,0.28), transparent 55%), radial-gradient(circle at 70% 45%, rgba(251,113,133,0.16), transparent 60%), radial-gradient(circle at 55% 70%, rgba(245,158,11,0.14), transparent 62%)",
                  }}
                />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
                      <Boxes className="h-5 w-5 text-white/90" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        AI Solutions We Deliver 
                      </div>
                      <div className="text-xs text-white/60">
                        Secure, Intelligent, Scalable AI Solutions
                      </div>
                    </div>
                  </div>

                  <Badge
                    className="rounded-full border border-white/10 bg-white/5 text-white/80"
                    variant="outline"
                  >
                    Pro-ready
                  </Badge>
                </div>

                <div className="relative mt-6 grid gap-4">
                  {[
                    {
                      icon: Shield,
                      title: "AI Chatbots & Assistants",
                      desc: "AI Assistants For Business Productivity",
                    },
                    {
                      icon: Search,
                      title: "AI Security & Risk Monitoring",
                      desc: "AI Monitoring For Security Governance",
                    },
                    {
                      icon: Workflow,
                      title: "Workflow Automation",
                      desc: "AI Integration For Workflow Automation",
                    },
                    {
                      icon: Activity,
                      title: "Private AI",
                      desc: "Private AI With Full Control",
                    },
                  ].map((x, i) => (
                    <div
                      key={i}
                      className="flex gap-3 rounded-2xl border border-white/10 bg-[#070812]/60 p-4 backdrop-blur transition duration-300 hover:bg-[#070812]/70 hover:border-white/15"
                    >
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5">
                        <x.icon className="h-5 w-5 text-white/85" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {x.title}
                        </div>
                        <div className="mt-1 text-sm text-white/65">{x.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative mt-6 flex flex-wrap items-center gap-2">
                  {["Private AI", "Fine-tuning", "RAG", "Risk intelligence", "Automation"].map(
                    (t) => (
                      <Badge
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 text-white/80"
                        variant="secondary"
                      >
                        {t}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <SectionShell id="about" variant="soft">
          <SectionHeading
            eyebrow="About GoldenZVision"
            title="AI-first, security-first, built for real operations"
            subtitle="We design intelligent systems that help organizations integrate AI securely into daily work—without giving up control of data, infrastructure, or reliability."
            tone="warm"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <FeatureCard
              icon={Lock}
              title="Privacy by design"
              desc="Private deployments and data control so sensitive information stays where it belongs."
              bullets={[
                "Data stays in your environment",
                "Controlled access patterns",
                "Auditability and governance",
              ]}
              accent="from-orange-500/20 via-amber-500/10 to-transparent"
            />
            <FeatureCard
              icon={Activity}
              title="Production-grade engineering"
              desc="Beyond demos—systems built with monitoring, testing, and operational excellence from day one."
              bullets={[
                "Observability and metrics",
                "Quality evaluation loops",
                "Scalable system design",
              ]}
              accent="from-rose-500/20 via-orange-500/10 to-transparent"
            />
            <FeatureCard
              icon={Boxes}
              title="AI systems & innovation"
              desc="We blend modern AI techniques with enterprise architecture to deliver outcomes, fast."
              bullets={["RAG + tooling", "Fine-tuning strategies", "Workflow automation"]}
              accent="from-amber-500/20 via-rose-500/10 to-transparent"
            />
          </div>
        </SectionShell>

        <SectionShell id="ai" variant="glass">
          <SectionHeading
            eyebrow="Core Focus"
            title="AI systems that are secure, private, and measurable"
            subtitle="From private model deployment to assistants and monitoring—responsible AI integration that delivers operational impact."
            tone="default"
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {coreFocus.map((f, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <FeatureCard {...f} />
              </motion.div>
            ))}
          </div>
        </SectionShell>

        <SectionShell id="services" variant="soft">
          <SectionHeading
            eyebrow="Custom Technology Services"
            title="Tailored digital solutions aligned with AI-driven transformation"
            subtitle="Alongside AI innovation, we deliver modern software tailored to client needs—built for performance, maintainability, and scale."
            tone="warm"
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <Card className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-orange-500/10">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-20 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100 bg-gradient-to-r from-orange-500/18 via-amber-500/10 to-transparent"
                  />
                  <CardHeader className="relative pb-2">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 transition group-hover:bg-white/10 group-hover:border-white/15">
                      <s.icon className="h-5 w-5 text-white/90" />
                    </div>
                    <CardTitle className="mt-3 text-lg text-white">
                      {s.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-sm text-white/70">{s.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </SectionShell>

        <SectionShell id="products" variant="glass">
          <SectionHeading
            eyebrow="Product Vision"
            title="Building AI-powered products with measurable impact"
            subtitle="Beyond client services, we build products that solve operational challenges and deliver meaningful technological outcomes."
            tone="default"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <FeatureCard
              icon={Boxes}
              title="Operational AI products"
              desc="Tools that streamline processes, improve accuracy, and reduce overhead—built for real workflows."
              accent="from-orange-500/20 via-amber-500/10 to-transparent"
            />
            <FeatureCard
              icon={Shield}
              title="Security-aware by default"
              desc="Products designed with privacy, access control, and governance from the foundation."
              accent="from-rose-500/20 via-orange-500/10 to-transparent"
            />
            <FeatureCard
              icon={Code2}
              title="Designed for evolution"
              desc="Modular systems that grow with your organization and adapt to new requirements."
              accent="from-amber-500/20 via-rose-500/10 to-transparent"
            />
          </div>
        </SectionShell>

        {/* Our Products Section */}
                <SectionShell id="our-products" variant="glass">
          <SectionHeading
            eyebrow="Our Products"
            title="AI products designed for real-world operations"
            subtitle="Explore the AI tools and systems we build to help organizations automate, secure, and scale their operations."
            tone="default"
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {/* Product 1 */}
            <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition duration-300 hover:-translate-y-[2px] hover:border-white/15 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-orange-500/10">
              {/* ✅ fixed: consistent image size + alignment */}
              <div className="relative h-32 w-full overflow-hidden border-b border-white/10">
                <img
                  src="/products/sm.jpeg"
                  alt="Operational AI Suite"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070812]/80 to-transparent" />

                {/* ✅ Mandatory tag area (kept minimal, aligned) */}
                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  <Badge className="border border-white/10 bg-white/10 text-white text-xs">
                    AI Billing
                  </Badge>
                  <Badge className="border border-orange-400/30 bg-orange-500/15 text-white text-xs">
                    Product
                  </Badge>
                </div>
              </div>

              {/* ✅ fixed: consistent spacing + aligned title/desc */}
              <CardContent className="p-4 pt-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold leading-snug text-white">
                    Smart Bill – AI Powered Android Billing System
                  </h3>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-white/65">
                  An AI-powered android billing system that uses voice commands and video
                  recognition to generate fast, accurate, and paperless digital bills.
                </p>

                {/* ✅ aligned meta row (Mandatory, clean) */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Badge className="rounded-full border border-white/10 bg-white/5 text-white/75 text-xs">
                    Voice
                  </Badge>
                  <Badge className="rounded-full border border-white/10 bg-white/5 text-white/75 text-xs">
                    Vision
                  </Badge>
                  <Badge className="rounded-full border border-white/10 bg-white/5 text-white/75 text-xs">
                    Paperless
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Product 2 */}
            <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition duration-300 hover:-translate-y-[2px] hover:border-white/15 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-orange-500/10">
              {/* ✅ fixed: consistent image size + alignment */}
              <div className="relative h-32 w-full overflow-hidden border-b border-white/10">
                <img
                  src="/products/eoheoh.png"
                  alt="Security Intelligence System"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070812]/80 to-transparent" />

                {/* ✅ aligned badges (top-left, consistent) */}
                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  <Badge className="border border-white/10 bg-white/10 text-white text-xs">
                    Android
                  </Badge>
                  <Badge className="border border-orange-400/30 bg-orange-500/15 text-white text-xs">
                    Game
                  </Badge>
                </div>
              </div>

              {/* ✅ fixed: consistent spacing + aligned title/desc */}
              <CardContent className="p-5 pt-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold leading-snug text-white">
                    ECHOES – Impact of Hiding (Android Game)
                  </h3>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-white/65">
                  A suspenseful Android stealth game where players must strategically
                  hide and survive while every movement can reveal their location.
                </p>

                {/* ✅ aligned meta row (Mandatory, clean) */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Badge className="rounded-full border border-white/10 bg-white/5 text-white/75 text-xs">
                    Stealth
                  </Badge>
                  <Badge className="rounded-full border border-white/10 bg-white/5 text-white/75 text-xs">
                    Horror
                  </Badge>
                  <Badge className="rounded-full border border-white/10 bg-white/5 text-white/75 text-xs">
                    Survival
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </SectionShell>

        <SectionShell id="leadership" variant="soft">
          <SectionHeading
            eyebrow="Our Leadership"
            title="A team built for secure AI delivery"
            subtitle="Add your leaders here with photos, roles, and short bios to build trust with clients."
            tone="warm"
          />

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <Badge
              className="rounded-full border border-white/10 bg-white/5 text-white/80"
              variant="secondary"
            >
              <Crown className="mr-2 h-4 w-4" /> Leadership
            </Badge>
            <Badge
              className="rounded-full border border-white/10 bg-white/5 text-white/80"
              variant="secondary"
            >
              Delivery excellence
            </Badge>
            <Badge
              className="rounded-full border border-white/10 bg-white/5 text-white/80"
              variant="secondary"
            >
              Security-first
            </Badge>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {leadership.map((p) => (
              <LeadershipCard key={p.name + p.role} {...p} />
            ))}
          </div>
        </SectionShell>

        <SectionShell id="mission" variant="glass">
          <SectionHeading
            eyebrow="Mission"
            title="Secure, intelligent technology for real business outcomes"
            subtitle="To empower businesses with secure, intelligent technology while building AI-driven products that create measurable real-world impact."
            tone="default"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card className="rounded-3xl border border-white/10 bg-white/5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-orange-500/10">
              <CardHeader>
                <CardTitle className="text-lg text-white">How we work</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    icon: Lock,
                    title: "Privacy & control",
                    desc: "We design around your data, your infrastructure, and your rules.",
                  },
                  {
                    icon: Activity,
                    title: "Measurable quality",
                    desc: "We validate performance with evaluation and monitoring.",
                  },
                  {
                    icon: Shield,
                    title: "Security-first mindset",
                    desc: "We reduce risk through governance, audit trails, and safe patterns.",
                  },
                ].map((x, i) => (
                  <div
                    key={i}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-[#070812]/60 p-4 backdrop-blur transition duration-300 hover:bg-[#070812]/70 hover:border-white/15"
                  >
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5">
                      <x.icon className="h-5 w-5 text-white/85" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {x.title}
                      </div>
                      <div className="mt-1 text-sm text-white/65">{x.desc}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-white/10 bg-white/5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-orange-500/10">
              <CardHeader>
                <CardTitle className="text-lg text-white">What we build</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Private AI deployments and fine-tuned models",
                  "Domain-specific assistants with secure RAG",
                  "AI-powered monitoring and risk intelligence",
                  "Automation systems integrated into enterprise tools",
                  "AI-enhanced SaaS platforms and custom applications",
                  "3D product design and simulation experiences",
                ].map((x, i) => (
                  <div key={i} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 text-orange-200/90" />
                    <span className="text-white/70">{x}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </SectionShell>

        {/* ✅ NEW: Pro contact section with social links */}
        <SectionShell id="contact" variant="soft">
          <SectionHeading
            eyebrow="Contact"
            title="Let’s build something secure and intelligent"
            subtitle="Choose an option, send a message, or connect with us on social platforms."
            tone="warm"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {/* Left: CTA + Social */}
            <Card className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-orange-500/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-orange-500/15">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-24 opacity-70 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 30% 25%, rgba(251,146,60,0.22), transparent 58%), radial-gradient(circle at 75% 55%, rgba(251,113,133,0.12), transparent 62%)",
                }}
              />
              <CardHeader className="relative">
                <CardTitle className="text-lg text-white">Get in touch</CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-5">
                <div className="space-y-3">
                  <Button
                    onClick={() => setOpen(true)}
                    className={cn(
                      "w-full rounded-2xl text-white shadow-lg",
                      "bg-gradient-to-r",
                      "from-orange-500 via-amber-500 to-rose-500",
                      "shadow-orange-500/15",
                      "transition duration-300 hover:-translate-y-[1px] hover:opacity-95 hover:shadow-xl hover:shadow-orange-500/25"
                    )}
                    size="lg"
                  >
                    Begin Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <p className="text-xs text-white/55">
                    No login required. Choose what you need and submit.
                  </p>
                </div>

                <div className="grid gap-3">
                  <a
                    href={`mailto:${COMPANY_LINKS.email}`}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition duration-300 hover:-translate-y-[1px] hover:bg-white/10 hover:border-white/15 hover:shadow-lg hover:shadow-orange-500/10"
                  >
                    <span className="inline-flex items-center gap-2 text-white/85">
                      <Mail className="h-4 w-4" />
                      {COMPANY_LINKS.email}
                    </span>
                    <ExternalLink className="h-4 w-4 text-white/55 transition group-hover:text-white/80" />
                  </a>

                  <a
                    href={`tel:${COMPANY_LINKS.phone.replace(/\s+/g, "")}`}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition duration-300 hover:-translate-y-[1px] hover:bg-white/10 hover:border-white/15 hover:shadow-lg hover:shadow-orange-500/10"
                  >
                    <span className="inline-flex items-center gap-2 text-white/85">
                      <PhoneCall className="h-4 w-4" />
                      {COMPANY_LINKS.phone}
                    </span>
                    <ExternalLink className="h-4 w-4 text-white/55 transition group-hover:text-white/80" />
                  </a>

                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                    <span className="inline-flex items-center gap-2 text-white/85">
                      <MapPin className="h-4 w-4" />
                      {COMPANY_LINKS.location}
                    </span>
                    <span className="text-xs text-white/45">Remote</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={COMPANY_LINKS.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 transition duration-300 hover:-translate-y-[1px] hover:bg-white/10 hover:border-white/15 hover:shadow-lg hover:shadow-orange-500/10"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                    <ExternalLink className="h-4 w-4 text-white/55" />
                  </a>

                </div>
              </CardContent>
            </Card>

            {/* Right: Next steps + focus */}
            <div className="space-y-6">
              <Card className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-orange-500/10">
                <CardHeader>
                  <CardTitle className="text-lg text-white">What happens next</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "We review your goals",
                    "We propose a secure architecture & plan",
                    "We align on scope, timeline, and deliverables",
                  ].map((x, i) => (
                    <div key={i} className="flex gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 text-orange-200/90" />
                      <span className="text-white/70">{x}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-orange-500/10">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Primary focus areas</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {[
                    "Private AI",
                    "Fine-tuning",
                    "RAG",
                    "Security monitoring",
                    "Risk intelligence",
                    "Automation",
                    "Enterprise integration",
                  ].map((x) => (
                    <Badge
                      key={x}
                      className="rounded-full border border-white/10 bg-white/5 text-white/80"
                      variant="secondary"
                    >
                      {x}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </SectionShell>

        <footer className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <LogoMark />
                <div>
                  <div className="text-sm font-semibold text-white">
                    <BrandWordmark />
                  </div>
                  <div className="text-xs text-white/60">
                    AI-first technology • Secure, private systems
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {nav.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    onClick={smoothScroll(n.href)}
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {n.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
              <div>© {new Date().getFullYear()} GoldenZVision. All rights reserved.</div>
              <div className="flex items-center gap-3">
                <a
                  href={COMPANY_LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/80 transition hover:bg-white/10 hover:border-white/15"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* ✅ Dialog -> submits to server -> server writes to Firestore */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-3xl border border-white/10 bg-[#070812]/95 text-white shadow-2xl shadow-orange-500/15 backdrop-blur sm:max-w-[720px]">
          <DialogHeader>
            <DialogTitle className="text-white">Let’s get the right details</DialogTitle>
            <DialogDescription className="text-white/65">
              Choose what you need — consultation, custom development, or buying our product.
            </DialogDescription>
          </DialogHeader>

          <ClientRequestDialogContent
            defaultType="consultation"
            onDone={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}