import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  /** Optional id for the h2 (e.g. for aria-labelledby on the section) */
  headingId?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  className,
  align = "center",
  headingId,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary">
        <span className="w-6 h-px bg-primary" aria-hidden />
        {label}
        <span className="w-6 h-px bg-primary" aria-hidden />
      </p>
      <h2
        id={headingId}
        className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-muted-foreground text-base leading-relaxed sm:text-lg",
            align === "center" && "mx-auto max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
