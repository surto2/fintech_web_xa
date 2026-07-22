import Link from "next/link";
import { clsx } from "clsx";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
  className?: string;
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external,
}: Props) {
  const styles = {
    primary:
      "bg-ub-blue text-white hover:bg-ub-blue-deep shadow-[0_10px_30px_-12px_rgba(0,115,207,0.7)]",
    secondary:
      "bg-white text-ub-navy hover:bg-ub-paper border border-ub-line",
    ghost:
      "bg-transparent text-white border border-white/35 hover:bg-white/10",
    light:
      "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur",
  }[variant];

  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-medium transition duration-300",
    styles,
    className
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
