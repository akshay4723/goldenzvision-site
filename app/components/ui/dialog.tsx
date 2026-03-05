"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, CheckCircle2 } from "lucide-react";

import { cn } from "./utils"; // ✅ keep your utils path (adjust if needed)

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    showClose?: boolean;
  }
>(({ className, children, showClose = true, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-[9999] w-[calc(100%-24px)] max-w-2xl -translate-x-1/2 -translate-y-1/2",
        "rounded-3xl border border-white/10 bg-[#070812]/95 p-6 text-white shadow-2xl backdrop-blur",
        "max-h-[85vh] overflow-y-auto",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    >
      {showClose ? (
        <DialogPrimitive.Close
          className={cn(
            "absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-xl",
            "border border-white/10 bg-white/5 text-white/80",
            "transition hover:bg-white/10 hover:text-white focus:outline-none",
            "focus-visible:ring-2 focus-visible:ring-orange-400/40 focus-visible:ring-offset-0"
          )}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </DialogPrimitive.Close>
      ) : null}

      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-2 text-left", className)} {...props} />
  );
}

function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none text-white", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-white/65", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

/* ====================================================================== */
/* ✅ Client Request Dialog Content (NOW CONNECTED TO FIREBASE via API) */
/* ====================================================================== */

type InquiryType = "consultation" | "custom" | "product";

type CustomService =
  | "web_app"
  | "enterprise_system"
  | "ai_saas"
  | "3d_simulation";

type ProductInterest =
  | "ai_assistant"
  | "security_monitoring"
  | "automation_platform"
  | "other";

export function ClientRequestDialogContent({
  onSubmit,
  defaultType = "consultation",
}: {
  onSubmit?: (data: any) => void; // optional callback for parent
  defaultType?: InquiryType;
}) {
  const [type, setType] = React.useState<InquiryType>(defaultType);

  const [form, setForm] = React.useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    timeline: "",
    budget: "",
    country: "",
  });

  const [custom, setCustom] = React.useState<{
    services: CustomService[];
    platform: "web" | "mobile" | "both" | "not_sure";
    existingSystem: "yes" | "no" | "not_sure";
    integrations: string;
    pagesOrModules: string;
  }>({
    services: [],
    platform: "not_sure",
    existingSystem: "not_sure",
    integrations: "",
    pagesOrModules: "",
  });

  const [product, setProduct] = React.useState<{
    interest: ProductInterest;
    seats: string;
    deployment: "cloud" | "on_prem" | "hybrid" | "not_sure";
    requirements: string;
  }>({
    interest: "ai_assistant",
    seats: "",
    deployment: "not_sure",
    requirements: "",
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<{
    type: "idle" | "success" | "error";
    message?: string;
    id?: string;
  }>({ type: "idle" });

  const input =
    "mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/45 outline-none focus-visible:ring-2 focus-visible:ring-orange-400/40 focus-visible:ring-offset-0";
  const label = "text-sm font-medium text-white/85";

  const chipBase =
    "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/75 transition hover:bg-white/10";
  const chipOn = "border-orange-400/40 bg-orange-500/10 text-white";

  // ✅ NEW: a clearer "selected" indicator (small top banner)
  const selectedLabel =
    type === "consultation"
      ? "Consultation"
      : type === "custom"
      ? "Custom Development"
      : "Product Purchase";

  // ✅ NEW: label maps so user can SEE what is selected (fixes the “Tap to select / not sure” confusion)
  const platformLabel =
    custom.platform === "not_sure"
      ? "Not sure"
      : custom.platform === "web"
      ? "Web"
      : custom.platform === "mobile"
      ? "Mobile"
      : "Web + Mobile";

  const existingSystemLabel =
    custom.existingSystem === "not_sure"
      ? "Not sure"
      : custom.existingSystem === "yes"
      ? "Yes"
      : "No (new build)";

  const productInterestLabel =
    product.interest === "ai_assistant"
      ? "AI Assistant / RAG"
      : product.interest === "security_monitoring"
      ? "Security Monitoring"
      : product.interest === "automation_platform"
      ? "Automation Platform"
      : "Other";

  const deploymentLabel =
    product.deployment === "not_sure"
      ? "Not sure"
      : product.deployment === "cloud"
      ? "Cloud"
      : product.deployment === "on_prem"
      ? "On-prem"
      : "Hybrid";

  const toggleService = (s: CustomService) => {
    setCustom((prev) => {
      const exists = prev.services.includes(s);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((x) => x !== s)
          : [...prev.services, s],
      };
    });
  };

  const handleSubmit = async () => {
    setStatus({ type: "idle" });

    // minimal validation (no login, but email required)
    if (!form.email.trim()) {
      setStatus({ type: "error", message: "Please enter your email." });
      return;
    }

    const payload = {
      inquiryType: type,
      ...form,
      custom: type === "custom" ? custom : undefined,
      product: type === "product" ? product : undefined,
    };

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/client-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json?.ok) {
        throw new Error(json?.message || "Failed to submit.");
      }

      setStatus({
        type: "success",
        message: "Request submitted successfully.",
        id: json.id,
      });

      onSubmit?.({ ...payload, id: json.id });
    } catch (e: any) {
      setStatus({
        type: "error",
        message: e?.message || "Failed to submit. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* ✅ NEW: Selected type indicator (very clear, no layout change) */}
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-white/70">Selected:</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-white">
            <CheckCircle2 className="h-4 w-4 opacity-90" />
            {selectedLabel}
          </span>

          {/* ✅ Optional extra hint only when custom */}
          {type === "custom" ? (
            <span className="text-xs text-white/55">
              {custom.services.length
                ? `• ${custom.services.length} service${
                    custom.services.length > 1 ? "s" : ""
                  } selected`
                : "• No services selected yet"}
            </span>
          ) : null}

          {/* ✅ NEW: extra clarity for product selection (this is the issue shown in your image) */}
          {type === "product" ? (
            <span className="text-xs text-white/55">
              • Product:{" "}
              <span className="text-white/80 font-medium">{productInterestLabel}</span>
              {"  "}• Deployment:{" "}
              <span className="text-white/80 font-medium">{deploymentLabel}</span>
            </span>
          ) : null}
        </div>
      </div>

      {/* Type selector */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={cn(chipBase, type === "consultation" && chipOn)}
          onClick={() => setType("consultation")}
          disabled={isSubmitting}
        >
          <CheckCircle2
            className={cn(
              "h-4 w-4 opacity-80 transition",
              type === "consultation" && "opacity-100"
            )}
          />
          Request a Consultation
          {/* ✅ tiny inline indicator */}
          {type === "consultation" ? (
            <span className="ml-1 rounded-full border border-orange-400/30 bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-white">
              Selected
            </span>
          ) : null}
        </button>

        <button
          type="button"
          className={cn(chipBase, type === "custom" && chipOn)}
          onClick={() => setType("custom")}
          disabled={isSubmitting}
        >
          <CheckCircle2
            className={cn(
              "h-4 w-4 opacity-80 transition",
              type === "custom" && "opacity-100"
            )}
          />
          Need Custom Development
          {type === "custom" ? (
            <span className="ml-1 rounded-full border border-orange-400/30 bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-white">
              Selected
            </span>
          ) : null}
        </button>

        <button
          type="button"
          className={cn(chipBase, type === "product" && chipOn)}
          onClick={() => setType("product")}
          disabled={isSubmitting}
        >
          <CheckCircle2
            className={cn(
              "h-4 w-4 opacity-80 transition",
              type === "product" && "opacity-100"
            )}
          />
          Buy Our Product
          {type === "product" ? (
            <span className="ml-1 rounded-full border border-orange-400/30 bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-white">
              Selected
            </span>
          ) : null}
        </button>
      </div>

      {/* Base fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Name</label>
          <input
            className={input}
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label className={label}>Company</label>
          <input
            className={input}
            placeholder="Company / Organization"
            value={form.company}
            onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className={label}>Email</label>
          <input
            className={input}
            placeholder="you@company.com"
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label className={label}>Phone (optional)</label>
          <input
            className={input}
            placeholder="+91 XXXXX XXXXX"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Consultation */}
      {type === "consultation" ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold text-white">
            Consultation details
          </div>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Timeline</label>
              <input
                className={input}
                placeholder="e.g., 2 weeks / 1 month"
                value={form.timeline}
                onChange={(e) =>
                  setForm((p) => ({ ...p, timeline: e.target.value }))
                }
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className={label}>Budget range (optional)</label>
              <input
                className={input}
                placeholder="e.g., ₹50k–₹2L"
                value={form.budget}
                onChange={(e) =>
                  setForm((p) => ({ ...p, budget: e.target.value }))
                }
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className={label}>What do you need help with?</label>
            <textarea
              className={cn(input, "min-h-[110px]")}
              placeholder="Tell us your goal, privacy/security constraints, and any existing systems."
              value={form.message}
              onChange={(e) =>
                setForm((p) => ({ ...p, message: e.target.value }))
              }
              disabled={isSubmitting}
            />
          </div>
        </div>
      ) : null}

      {/* Custom */}
      {type === "custom" ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold text-white">
            Custom Technology Services (choose what you need)
          </div>
          <div className="mt-2 text-xs text-white/65">
            Alongside our AI innovations, we design and deliver tailored digital
            solutions for businesses:
            <span className="block mt-1">
              • Custom web and application development • Enterprise software
              systems • AI-enhanced SaaS platforms • 3D product design and
              simulation systems
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className={cn(chipBase, custom.services.includes("web_app") && chipOn)}
              onClick={() => toggleService("web_app")}
              disabled={isSubmitting}
            >
              Custom Web / App
              {custom.services.includes("web_app") ? (
                <span className="ml-1 rounded-full border border-orange-400/30 bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-white">
                  Selected
                </span>
              ) : null}
            </button>

            <button
              type="button"
              className={cn(
                chipBase,
                custom.services.includes("enterprise_system") && chipOn
              )}
              onClick={() => toggleService("enterprise_system")}
              disabled={isSubmitting}
            >
              Enterprise System
              {custom.services.includes("enterprise_system") ? (
                <span className="ml-1 rounded-full border border-orange-400/30 bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-white">
                  Selected
                </span>
              ) : null}
            </button>

            <button
              type="button"
              className={cn(chipBase, custom.services.includes("ai_saas") && chipOn)}
              onClick={() => toggleService("ai_saas")}
              disabled={isSubmitting}
            >
              AI-enhanced SaaS
              {custom.services.includes("ai_saas") ? (
                <span className="ml-1 rounded-full border border-orange-400/30 bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-white">
                  Selected
                </span>
              ) : null}
            </button>

            <button
              type="button"
              className={cn(
                chipBase,
                custom.services.includes("3d_simulation") && chipOn
              )}
              onClick={() => toggleService("3d_simulation")}
              disabled={isSubmitting}
            >
              3D / Simulation
              {custom.services.includes("3d_simulation") ? (
                <span className="ml-1 rounded-full border border-orange-400/30 bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-white">
                  Selected
                </span>
              ) : null}
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Platform</label>
              <select
                className={input}
                value={custom.platform}
                onChange={(e) =>
                  setCustom((p) => ({
                    ...p,
                    platform: e.target.value as any,
                  }))
                }
                disabled={isSubmitting}
              >
                <option value="not_sure">Not sure</option>
                <option value="web">Web</option>
                <option value="mobile">Mobile</option>
                <option value="both">Web + Mobile</option>
              </select>

              {/* ✅ NEW: show selected value clearly */}
              <div className="mt-1 text-xs text-white/55">
                Selected: <span className="text-white/80 font-medium">{platformLabel}</span>
              </div>
            </div>

            <div>
              <label className={label}>Do you have an existing system?</label>
              <select
                className={input}
                value={custom.existingSystem}
                onChange={(e) =>
                  setCustom((p) => ({
                    ...p,
                    existingSystem: e.target.value as any,
                  }))
                }
                disabled={isSubmitting}
              >
                <option value="not_sure">Not sure</option>
                <option value="yes">Yes</option>
                <option value="no">No (new build)</option>
              </select>

              {/* ✅ NEW: show selected value clearly */}
              <div className="mt-1 text-xs text-white/55">
                Selected:{" "}
                <span className="text-white/80 font-medium">{existingSystemLabel}</span>
              </div>
            </div>

            <div>
              <label className={label}>Modules / Pages (optional)</label>
              <input
                className={input}
                placeholder="e.g., Login, Dashboard, Payments..."
                value={custom.pagesOrModules}
                onChange={(e) =>
                  setCustom((p) => ({ ...p, pagesOrModules: e.target.value }))
                }
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className={label}>Integrations (optional)</label>
              <input
                className={input}
                placeholder="e.g., Firebase, Razorpay, SAP, CRM..."
                value={custom.integrations}
                onChange={(e) =>
                  setCustom((p) => ({ ...p, integrations: e.target.value }))
                }
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Timeline</label>
              <input
                className={input}
                placeholder="e.g., 3–6 weeks"
                value={form.timeline}
                onChange={(e) =>
                  setForm((p) => ({ ...p, timeline: e.target.value }))
                }
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className={label}>Budget range (optional)</label>
              <input
                className={input}
                placeholder="e.g., ₹1L–₹5L"
                value={form.budget}
                onChange={(e) =>
                  setForm((p) => ({ ...p, budget: e.target.value }))
                }
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className={label}>Project summary</label>
            <textarea
              className={cn(input, "min-h-[120px]")}
              placeholder="What are you building? Users, features, security requirements, and success criteria."
              value={form.message}
              onChange={(e) =>
                setForm((p) => ({ ...p, message: e.target.value }))
              }
              disabled={isSubmitting}
            />
          </div>
        </div>
      ) : null}

      {/* Product */}
      {type === "product" ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold text-white">Buying our product</div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Product interest</label>
              <select
                className={input}
                value={product.interest}
                onChange={(e) =>
                  setProduct((p) => ({
                    ...p,
                    interest: e.target.value as any,
                  }))
                }
                disabled={isSubmitting}
              >
                <option value="ai_assistant">AI Assistant / RAG</option>
                <option value="security_monitoring">Security Monitoring</option>
                <option value="automation_platform">Automation Platform</option>
                <option value="other">Other</option>
              </select>

              {/* ✅ FIX: Always show what is selected (removes confusion) */}
              <div className="mt-1 text-xs text-white/55">
                Selected:{" "}
                <span className="text-white/80 font-medium">{productInterestLabel}</span>
              </div>
            </div>

            <div>
              <label className={label}>Deployment preference</label>
              <select
                className={input}
                value={product.deployment}
                onChange={(e) =>
                  setProduct((p) => ({
                    ...p,
                    deployment: e.target.value as any,
                  }))
                }
                disabled={isSubmitting}
              >
                <option value="not_sure">Not sure</option>
                <option value="cloud">Cloud</option>
                <option value="on_prem">On-prem</option>
                <option value="hybrid">Hybrid</option>
              </select>

              {/* ✅ FIX: Always show what is selected (removes confusion) */}
              <div className="mt-1 text-xs text-white/55">
                Selected: <span className="text-white/80 font-medium">{deploymentLabel}</span>
              </div>
            </div>

            <div>
              <label className={label}>Seats / Users (optional)</label>
              <input
                className={input}
                placeholder="e.g., 10 / 50 / 200"
                value={product.seats}
                onChange={(e) =>
                  setProduct((p) => ({ ...p, seats: e.target.value }))
                }
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className={label}>Country (optional)</label>
              <input
                className={input}
                placeholder="e.g., India"
                value={form.country}
                onChange={(e) =>
                  setForm((p) => ({ ...p, country: e.target.value }))
                }
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className={label}>Requirements / use case</label>
            <textarea
              className={cn(input, "min-h-[120px]")}
              placeholder="Describe your use case, data sensitivity, compliance, integrations, and what success looks like."
              value={product.requirements}
              onChange={(e) =>
                setProduct((p) => ({ ...p, requirements: e.target.value }))
              }
              disabled={isSubmitting}
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Timeline</label>
              <input
                className={input}
                placeholder="e.g., this month"
                value={form.timeline}
                onChange={(e) =>
                  setForm((p) => ({ ...p, timeline: e.target.value }))
                }
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className={label}>Budget range (optional)</label>
              <input
                className={input}
                placeholder="e.g., ₹25k/mo"
                value={form.budget}
                onChange={(e) =>
                  setForm((p) => ({ ...p, budget: e.target.value }))
                }
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>
      ) : null}

      {/* Status */}
      {status.type !== "idle" ? (
        <div
          className={cn(
            "rounded-2xl border p-4 text-sm",
            status.type === "success"
              ? "border-green-500/30 bg-green-500/10 text-white"
              : "border-rose-500/30 bg-rose-500/10 text-white"
          )}
        >
          <div className="font-medium">
            {status.type === "success" ? "Submitted!" : "Submission failed"}
          </div>
          <div className="mt-1 text-white/75">{status.message}</div>
          {status.type === "success" && status.id ? (
            <div className="mt-2 text-xs text-white/60">
              Reference ID: <span className="text-white/85">{status.id}</span>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Footer actions */}
      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <DialogPrimitive.Close
          className={cn(
            "inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm",
            "border border-white/10 bg-white/5 text-white/85",
            "transition hover:bg-white/10 focus:outline-none",
            "focus-visible:ring-2 focus-visible:ring-orange-400/40 focus-visible:ring-offset-0"
          )}
          disabled={isSubmitting}
        >
          Cancel
        </DialogPrimitive.Close>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={cn(
            "inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-semibold text-white",
            "bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500",
            "transition hover:opacity-95 focus:outline-none disabled:opacity-60",
            "focus-visible:ring-2 focus-visible:ring-orange-400/40 focus-visible:ring-offset-0"
          )}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};