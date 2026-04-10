import Link from "next/link";
import Image from "next/image";
import {
  CopyPlus,
  ShieldCheck,
  Clock,
  Users,
  Cpu,
  Clipboard,
  Heart,
  Leaf,
  ChefHat,
  ArrowRight,
  Sparkles,
  Globe,
  Lock,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="pb-20 md:pb-0">
      {/* ============================================
          SECTION 1: HERO
          ============================================ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt="Warm abstract background"
            fill
            className="object-cover opacity-30 dark:opacity-15"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>

        <div className="relative z-10 container max-w-screen-lg mx-auto px-4 py-16 text-center space-y-8">
          {/* Badge */}
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--saffron)]/10 border border-[var(--saffron)]/20 text-sm font-medium text-[var(--saffron)]">
            <Sparkles className="h-4 w-4" />
            Powered by Google Vertex AI
          </div>

          {/* Main Title */}
          <h1 className="reveal reveal-delay-1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.9]">
            <span className="brand-title gradient-text">Sanjha Chulha</span>
          </h1>

          {/* Hinglish Tagline */}
          <p className="reveal reveal-delay-2 text-xl sm:text-2xl md:text-3xl font-semibold text-foreground/80 tracking-tight">
            Ek Kitchen, <span className="gradient-text font-bold">Poora Ghar</span> 🍲
          </p>

          {/* Sub-description */}
          <p className="reveal reveal-delay-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            India ka pehla AI-powered family meal planner jo aapke{" "}
            <strong className="text-foreground">Dada ki diabetes</strong>,{" "}
            <strong className="text-foreground">Beti ki growth needs</strong>,
            aur <strong className="text-foreground">Mummy ke weight goals</strong>{" "}
            — sab ko ek hi recipe mein balance karta hai. Under 2 hours. Zero compromise.
          </p>

          {/* CTA Buttons */}
          <div className="reveal reveal-delay-4 flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/roster"
              className="glow-btn inline-flex items-center justify-center gap-2 h-14 px-8 text-lg font-bold rounded-xl bg-[var(--saffron)] text-white hover:brightness-110 transition-all active:scale-95 shadow-xl shadow-[var(--saffron)]/20"
            >
              <CopyPlus className="h-5 w-5" />
              Start Planning — Free
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 text-lg font-semibold rounded-xl border-2 border-border hover:bg-muted/60 transition-all"
            >
              Kaise kaam karta hai?
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="reveal pt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Lock className="h-4 w-4" /> 100% Private — No login required
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="h-4 w-4" /> Works offline with PWA
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" /> WCAG Accessible
            </span>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2: FAMILY ILLUSTRATION
          ============================================ */}
      <section className="container max-w-screen-lg mx-auto px-4 -mt-16 relative z-10">
        <div className="glass-card overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src="/family-cooking.png"
            alt="Indian joint family cooking together around a traditional chulha"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </section>

      {/* ============================================
          SECTION 3: STATS BAR
          ============================================ */}
      <section className="container max-w-screen-lg mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "< 2 hrs", label: "Cook Time", icon: Clock },
            { value: "5", label: "Family Members", icon: Users },
            { value: "100%", label: "Constraint Safe", icon: ShieldCheck },
            { value: "8s", label: "AI Response", icon: Cpu },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`stat-card glass-card p-6 text-center space-y-2 reveal reveal-delay-${i + 1}`}
            >
              <stat.icon className="h-6 w-6 mx-auto text-[var(--saffron)]" />
              <div className="text-3xl font-extrabold gradient-text">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          SECTION 4: HOW IT WORKS
          ============================================ */}
      <section id="how-it-works" className="container max-w-screen-lg mx-auto px-4 py-16 scroll-mt-20">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Kaise Kaam Karta Hai? 🤔
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Sirf 3 steps mein — apni poori family ka meal plan ready!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Family Matrix Banao",
              desc: "Har member ki age, gender, medical conditions (diabetes, lactose intolerance, etc.), aur calorie goals add karo. Maximum 5 people.",
              icon: Users,
              color: "from-[#FF9933] to-[#E8935A]",
            },
            {
              step: "02",
              title: "AI Se Recipe Lo",
              desc: "Hamaara Vertex AI engine saari constraints ka intersection nikaalta hai aur ek safe, unified recipe generate karta hai — with exact macros per person.",
              icon: Sparkles,
              color: "from-[#C2703E] to-[#FF9933]",
            },
            {
              step: "03",
              title: "Cook Karo, Track Karo",
              desc: "Step-by-step Active Kitchen mode mein cook karo. 'Fork-in-the-Road' branching steps — jaise 'Dada ka bowl nikaalo ghee daalne se pehle' — are highlighted.",
              icon: ChefHat,
              color: "from-[#10B981] to-[#34D399]",
            },
          ].map((item) => (
            <div key={item.step} className="glass-card p-8 space-y-4 reveal">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} text-white font-bold text-lg shadow-lg`}
              >
                {item.step}
              </div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          SECTION 5: FEATURES GRID
          ============================================ */}
      <section className="bg-muted/30 py-16">
        <div className="container max-w-screen-lg mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Features Jo <span className="gradient-text">Matter</span> Karte Hain
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Har feature real Indian joint family problems solve karta hai
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Medical Safety First",
                desc: "Diabetes, lactose intolerance, nut allergy, gluten-free — AI ensures zero unsafe ingredients reach any plate.",
              },
              {
                icon: Clock,
                title: "Under 2 Hour Guarantee",
                desc: "Every generated recipe has a total prep + cook time of under 120 minutes. Working parents ke liye.",
              },
              {
                icon: Heart,
                title: "Per-Person Macros",
                desc: "Har family member ke liye exact calories, protein, carbs, aur fat breakdown. No guesswork!",
              },
              {
                icon: Leaf,
                title: "Fork-in-the-Road Steps",
                desc: "Visual alerts for branching actions — 'Dadi ka portion nikaalo sugar daalne se pehle'. Never miss a critical step.",
              },
              {
                icon: Clipboard,
                title: "Smart Grocery Export",
                desc: "One-tap copy karo deduplicated grocery list. WhatsApp pe paste karo ya Zepto/Blinkit pe order place karo.",
              },
              {
                icon: Cpu,
                title: "Failsafe Guaranteed",
                desc: "Agar AI fail ho jaaye — no problem. Pre-loaded safe Khichdi recipe auto-inject hoti hai. UI never breaks.",
              },
            ].map((feature) => (
              <div key={feature.title} className="glass-card p-6 space-y-3 reveal">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--saffron)]/10">
                  <feature.icon className="h-5 w-5 text-[var(--saffron)]" />
                </div>
                <h3 className="font-bold text-lg">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 6: ABOUT / PROBLEM WE SOLVE
          ============================================ */}
      <section className="container max-w-screen-lg mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Why <span className="gradient-text">Sanjha Chulha</span>?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              In a typical Indian joint family, the caretaker juggles wildly different dietary
              needs — a diabetic grandparent, a growing teenager, a new mother, a weight-watching
              adult — all expecting one meal from one kitchen.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Sanjha Chulha mathematically solves this.</strong>{" "}
              Using Google&apos;s Gemini AI via Vertex AI, we compute the intersection of all
              dietary constraints and generate a single safe base recipe with personalized branching
              steps and exact per-person nutritional breakdowns.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {["Google Vertex AI", "Cloud Logging", "Next.js 16", "PWA Ready", "WCAG AA"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--saffron)]/10 text-[var(--saffron)] text-xs font-semibold"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="glass-card overflow-hidden rounded-2xl">
            <Image
              src="/feature-icons.png"
              alt="Feature icons showing dal bowl, spices, nutrition chart, and grocery bag"
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 7: CTA BANNER
          ============================================ */}
      <section className="container max-w-screen-lg mx-auto px-4 py-12">
        <div className="glass-card p-10 md:p-14 text-center space-y-6 bg-gradient-to-br from-[var(--saffron)]/5 to-transparent border-[var(--saffron)]/20">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Ready to feed your <span className="gradient-text">whole family</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Zero sign-up. Zero cost. 100% local data. Start in sirf 30 seconds.
          </p>
          <Link
            href="/roster"
            className="glow-btn inline-flex items-center justify-center gap-2 h-14 px-10 text-lg font-bold rounded-xl bg-[var(--saffron)] text-white hover:brightness-110 transition-all active:scale-95 shadow-xl shadow-[var(--saffron)]/20"
          >
            <CopyPlus className="h-5 w-5" />
            Shuru Karo — It&apos;s Free
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
