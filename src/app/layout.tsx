import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

// Baloo Bhai 2 — Indian Urban feel for brand name
const balooBhai = Poppins({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-brand",
});

export const metadata: Metadata = {
  title: "Sanjha Chulha — Ek Kitchen, Poora Ghar",
  description:
    "AI-powered unified dietary meal planner for Indian joint families. One recipe, five diets, zero compromises. Built with Google Vertex AI.",
  manifest: "/manifest.json",
  keywords: [
    "Indian meal planner",
    "family diet",
    "joint family recipes",
    "AI cooking",
    "calorie tracking",
    "dietary constraints",
    "Google Cloud",
    "Vertex AI",
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sanjha Chulha",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${balooBhai.variable} min-h-screen bg-background font-sans antialiased`}
        style={{ fontFamily: "var(--font-sans), sans-serif" }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Animated Background Orbs */}
          <div className="animated-bg" aria-hidden="true">
            <div className="orb" />
            <div className="orb" />
            <div className="orb" />
            <div className="orb" />
          </div>

          {/* Floating Spice Particles */}
          <div className="animated-bg" aria-hidden="true">
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
          </div>

          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <footer className="border-t bg-card/50 backdrop-blur py-8 md:py-6">
              <div className="container max-w-screen-lg mx-auto flex flex-col items-center justify-between gap-4 md:flex-row px-4">
                <p className="text-balance text-center text-xs leading-loose text-muted-foreground md:text-left">
                  ⚕️ Sanjha Chulha uses AI to suggest macro-friendly overlaps.
                  Always consult a physician for severe medical conditions.
                </p>
                <p className="text-xs text-muted-foreground/60">
                  Built with ❤️ using Google Cloud &amp; Vertex AI
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
