import { Section } from "@/components/Section";

export function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="bg-ub-navy px-4 py-16 text-white md:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-[family-name:var(--font-display)] text-4xl">
            {title}
          </h1>
        </div>
      </section>
      <Section>
        <div className="prose-news mx-auto max-w-3xl space-y-4">{children}</div>
      </Section>
    </>
  );
}
