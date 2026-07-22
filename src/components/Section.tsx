import { clsx } from "clsx";

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={clsx("px-4 py-16 md:px-6 md:py-24", className)}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-10 max-w-3xl md:mb-14">
      {eyebrow ? (
        <p
          className={clsx(
            "mb-3 text-xs font-semibold tracking-[0.22em] uppercase",
            light ? "text-white/60" : "text-ub-blue"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={clsx(
          "font-[family-name:var(--font-display)] text-3xl leading-tight md:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-ub-navy"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={clsx(
            "mt-4 text-base leading-relaxed md:text-lg",
            light ? "text-white/75" : "text-ub-muted"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
