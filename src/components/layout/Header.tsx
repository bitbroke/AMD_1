"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, UtensilsCrossed, Home, Users, ChefHat, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/roster", label: "Roster", icon: Users },
  { href: "/board", label: "Board", icon: ChefHat },
  { href: "/pantry", label: "Pantry", icon: ShoppingCart },
];

export function Header() {
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 max-w-screen-xl items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="relative">
            <UtensilsCrossed className="h-7 w-7 text-[var(--saffron)] transition-transform group-hover:rotate-12 duration-300" />
          </div>
          <span className="brand-title text-xl gradient-text">
            Sanjha Chulha
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--saffron)]/10 text-[var(--saffron)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-full"
            aria-label="Toggle light and dark mode"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t py-2 px-4"
        aria-label="Mobile Navigation"
      >
        <div className="flex justify-around">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-0.5 p-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "text-[var(--saffron)]"
                    : "text-muted-foreground"
                }`}
              >
                <link.icon className={`h-5 w-5 ${isActive ? "scale-110" : ""} transition-transform`} />
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
