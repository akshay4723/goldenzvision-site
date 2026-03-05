import * as React from "react";

type BadgeVariant = "default" | "secondary" | "outline";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-foreground text-background",
  secondary: "bg-muted text-foreground",
  outline: "border border-border bg-transparent text-foreground",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}