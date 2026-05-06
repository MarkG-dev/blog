"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LiveClock } from "./LiveClock";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Today" },
    { href: "/archive", label: "Archive" },
    { href: "/glossary", label: "Glossary" },
    { href: "/about", label: "About" },
    { href: "/subscribe", label: "Subscribe" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gf-black/95 backdrop-blur-md border-b border-gf-border/50">
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-[13px] font-medium tracking-[0.25em] uppercase text-gf-white hover:text-gf-accent transition-colors duration-300"
        >
          Gentle Future
        </Link>

        {/* Center: Live clock — hidden on mobile */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <LiveClock />
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[13px] tracking-wide transition-colors duration-300 ${
                pathname === link.href
                  ? "text-gf-white"
                  : "text-gf-muted hover:text-gf-text"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
