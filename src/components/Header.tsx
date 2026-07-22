"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ExternalLink } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site";
import { clsx } from "clsx";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ub-navy/95 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/ub-escut.png"
            alt="Universitat de Barcelona"
            width={40}
            height={48}
            className="h-10 w-auto shrink-0"
            priority
          />
          <span className="min-w-0">
            <span className="block text-[10px] font-medium tracking-[0.18em] text-white/70 uppercase">
              Universitat de Barcelona
            </span>
            <span className="block truncate font-[family-name:var(--font-display)] text-lg leading-tight">
              Máster <span className="text-[#7eb6ea]">Fintech</span>
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) =>
            "external" in item && item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-sm px-2.5 py-2 text-[13px] text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
                <ExternalLink className="size-3 opacity-60" />
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm px-2.5 py-2 text-[13px] text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.masterIaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-sm px-2.5 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white lg:inline-flex"
          >
            Máster IA
            <ExternalLink className="size-3.5 opacity-70" />
          </a>
          <Link
            href="/contacto"
            className="hidden rounded-sm bg-ub-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-ub-blue-deep md:inline-flex"
          >
            Solicitar info
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-sm border border-white/20 p-2 xl:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={clsx(
          "border-t border-white/10 bg-ub-navy xl:hidden",
          open ? "block" : "hidden"
        )}
      >
        <ul className="mx-auto flex max-w-7xl flex-col px-4 py-3">
          {navItems.map((item) => (
            <li key={item.href}>
              {"external" in item && item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-3 text-white/85"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <ExternalLink className="size-4 opacity-60" />
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="block py-3 text-white/85"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          <li className="border-t border-white/10 pt-2">
            <a
              href={siteConfig.campusVirtual}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-3 text-white/85"
            >
              Campus virtual
              <ExternalLink className="size-4 opacity-60" />
            </a>
          </li>
          <li>
            <Link
              href="/contacto"
              className="mt-1 mb-2 block rounded-sm bg-ub-blue px-4 py-3 text-center font-medium"
              onClick={() => setOpen(false)}
            >
              Solicitar info
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
