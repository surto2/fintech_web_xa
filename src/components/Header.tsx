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
            width={44}
            height={52}
            className="h-11 w-auto shrink-0"
            priority
          />
          <span className="min-w-0">
            <span className="block text-[10px] font-medium tracking-[0.18em] text-white/70 uppercase">
              Universitat de Barcelona
            </span>
            <span className="block truncate font-[family-name:var(--font-display)] text-lg leading-tight md:text-xl">
              Máster <span className="text-[#7eb6ea]">Fintech</span>
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={siteConfig.masterIaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            Máster IA
            <ExternalLink className="size-3.5 opacity-70" />
          </a>
          <a
            href={siteConfig.campusVirtual}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            Campus virtual
            <ExternalLink className="size-3.5 opacity-70" />
          </a>
          <Link
            href="/contacto"
            className="rounded-sm bg-ub-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-ub-blue-deep"
          >
            Solicitar info
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-sm border border-white/20 p-2 lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <nav className="hidden border-t border-white/10 lg:block">
        <ul className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 md:px-6">
          {navItems.map((item) => (
            <li key={item.href}>
              {"external" in item && item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 whitespace-nowrap rounded-sm px-3 py-2 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                  <ExternalLink className="size-3 opacity-60" />
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="whitespace-nowrap rounded-sm px-3 py-2 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={clsx(
          "border-t border-white/10 bg-ub-navy lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <ul className="flex flex-col px-4 py-3">
          {navItems.map((item) => (
            <li key={item.href}>
              {"external" in item && item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border-b border-white/10 py-3 text-sm"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <ExternalLink className="size-4 opacity-60" />
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="block border-b border-white/10 py-3 text-sm"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          <li>
            <a
              href={siteConfig.masterIaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border-b border-white/10 py-3 text-sm"
              onClick={() => setOpen(false)}
            >
              Máster IA
              <ExternalLink className="size-4 opacity-60" />
            </a>
          </li>
          <li className="pt-3">
            <Link
              href="/contacto"
              className="block rounded-sm bg-ub-blue px-4 py-3 text-center text-sm font-medium"
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
