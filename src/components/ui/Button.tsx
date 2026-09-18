import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "ghost-dark";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-[var(--color-gold-400)] text-[var(--color-navy-950)]",
    "hover:bg-[var(--color-gold-300)]",
    "focus-visible:ring-[var(--color-gold-400)] focus-visible:ring-offset-[var(--surface-dark)]",
  ].join(" "),
  secondary: [
    "bg-transparent text-[var(--color-stone-900)] border border-[var(--color-stone-900)]",
    "hover:bg-[var(--color-stone-900)] hover:text-[var(--color-stone-50)]",
    "focus-visible:ring-[var(--color-stone-900)]",
  ].join(" "),
  ghost: [
    "bg-transparent text-white border border-white/40",
    "hover:border-white hover:bg-white/10",
    "focus-visible:ring-white",
  ].join(" "),
  "ghost-dark": [
    "bg-transparent text-[var(--color-stone-700)] border border-[var(--color-stone-300)]",
    "hover:border-[var(--color-stone-600)] hover:text-[var(--color-stone-900)]",
    "focus-visible:ring-[var(--color-stone-600)]",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-meta tracking-[0.1em]",
  md: "px-6 py-3.5 text-label tracking-[0.12em]",
  lg: "px-8 py-4.5 text-label tracking-[0.14em]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={[
          "inline-flex items-center justify-center gap-2",
          "font-medium rounded-sm",
          "transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className,
        ].join(" ")}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonVariant, ButtonSize };
