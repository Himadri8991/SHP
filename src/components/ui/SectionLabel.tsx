interface SectionLabelProps {
  children: React.ReactNode;
  /** "light" for sections on light backgrounds, "dark" for dark sections */
  theme?: "light" | "dark";
  className?: string;
}

/**
 * SectionLabel — micro-label that introduces a chapter.
 * Uses a gold bar + uppercase tracking label.
 */
export function SectionLabel({ children, theme = "light", className = "" }: SectionLabelProps) {
  return (
    <div
      className={[
        "flex items-center gap-3",
        className,
      ].join(" ")}
      aria-label={`Section: ${children}`}
    >
      <span
        className="block h-px w-8 flex-shrink-0"
        style={{ backgroundColor: "var(--color-gold-400)" }}
        aria-hidden="true"
      />
      <span
        className={[
          "text-label tracking-[0.16em]",
          theme === "dark" ? "text-[var(--color-gold-400)]" : "text-[var(--color-stone-500)]",
        ].join(" ")}
      >
        {children}
      </span>
    </div>
  );
}
