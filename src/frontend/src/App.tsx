import {
  AlertCircle,
  Award,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Palette,
  Phone,
  Play,
  Rocket,
  Star,
  X,
  Youtube,
  Zap,
  ZoomIn,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { useActor } from "./hooks/useActor";

/* ─── Framer Motion Variants ─── */
const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};
const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

/* ─── Data ─── */
const SERVICES = [
  {
    id: 1,
    title: "Website Development",
    description:
      "Business websites, landing pages, and corporate platforms built for performance and impact.",
    icon: "/assets/generated/service-web-dev.dim_400x400.png",
    color: "cyan",
  },
  {
    id: 2,
    title: "Ecommerce Development",
    description:
      "Fully-featured online stores with secure payment gateways and smooth checkout experiences.",
    icon: "/assets/generated/service-ecommerce.dim_400x400.png",
    color: "purple",
  },
  {
    id: 3,
    title: "Custom Web Applications",
    description:
      "Advanced business software tailored to your unique workflows and operational needs.",
    icon: "/assets/generated/service-webapp.dim_400x400.png",
    color: "pink",
  },
  {
    id: 4,
    title: "Videography & Brand Shoots",
    description:
      "Cinematic brand videos, product shoots, and marketing content that elevates your story.",
    icon: "/assets/generated/service-video.dim_400x400.png",
    color: "cyan",
  },
];

const PORTFOLIO = [
  {
    id: 1,
    title: "Meridian Capital",
    type: "Business Website",
    description:
      "A refined corporate presence for a financial advisory firm, featuring animated data visualizations.",
    image: "/assets/generated/portfolio-business.dim_800x500.jpg",
  },
  {
    id: 2,
    title: "Velvet & Thread",
    type: "Ecommerce Store",
    description:
      "A luxury fashion e-commerce experience with 3D product previews and express checkout.",
    image: "/assets/generated/portfolio-ecommerce.dim_800x500.jpg",
  },
  {
    id: 3,
    title: "Atlas Creative",
    type: "Portfolio Website",
    description:
      "An interactive portfolio for a design studio, powered by scroll-triggered animations.",
    image: "/assets/generated/portfolio-portfolio.dim_800x500.jpg",
  },
  {
    id: 4,
    title: "Novatek Systems",
    type: "Startup Website",
    description:
      "A bold product launch site for a SaaS startup, with interactive feature demos.",
    image: "/assets/generated/portfolio-startup.dim_800x500.jpg",
  },
];

const VIDEOS = [
  {
    id: 1,
    title: "Luxe Brand Campaign",
    description: "A cinematic product showcase for a luxury lifestyle brand",
    thumb: "/assets/generated/video-thumb1.dim_800x450.jpg",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Summit Aerial Reel",
    description: "Breathtaking drone footage for an adventure travel brand",
    thumb: "/assets/generated/video-thumb2.dim_800x450.jpg",
    youtubeId: "dQw4w9WgXcQ",
  },
];

const GALLERY = [
  {
    id: 1,
    src: "/assets/generated/gallery-brand1.dim_600x400.jpg",
    alt: "Brand shoot session",
  },
  {
    id: 2,
    src: "/assets/generated/gallery-shoot1.dim_600x800.jpg",
    alt: "Cinematic portrait shoot",
  },
  {
    id: 3,
    src: "/assets/generated/gallery-workspace.dim_600x400.jpg",
    alt: "Creative workspace",
  },
];

const CATALOGUE = [
  {
    id: 1,
    title: "Restaurant Website",
    description: "Elegant dining presence with reservations, menus, and story.",
    image: "/assets/generated/catalogue-restaurant.dim_700x440.jpg",
    price: "From $599",
  },
  {
    id: 2,
    title: "Clothing Brand Website",
    description:
      "Luxury fashion storefront with lookbook and product showcase.",
    image: "/assets/generated/catalogue-clothing.dim_700x440.jpg",
    price: "From $799",
  },
  {
    id: 3,
    title: "Real Estate Website",
    description: "Property listings with search filters and virtual tours.",
    image: "/assets/generated/catalogue-realestate.dim_700x440.jpg",
    price: "From $899",
  },
  {
    id: 4,
    title: "Ecommerce Store",
    description: "Full-featured online store with payments and inventory.",
    image: "/assets/generated/portfolio-ecommerce.dim_800x500.jpg",
    price: "From $1,199",
  },
  {
    id: 5,
    title: "Personal Portfolio",
    description: "Showcase your work with a striking personal brand site.",
    image: "/assets/generated/catalogue-personal.dim_700x440.jpg",
    price: "From $399",
  },
];

const STATS = [
  { id: 1, value: 50, suffix: "+", label: "Websites Built", icon: Award },
  { id: 2, value: 20, suffix: "+", label: "Business Clients", icon: Star },
  { id: 3, value: 3, suffix: " Days", label: "Avg. Delivery", icon: Clock },
  { id: 4, value: 100, suffix: "%", label: "Modern Design", icon: Palette },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Optimized for Core Web Vitals and blazing performance.",
  },
  {
    icon: Palette,
    title: "Pixel-Perfect Design",
    desc: "Every detail crafted for maximum visual impact.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "We respect deadlines — every project delivered as promised.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    desc: "Agency-grade code and design, at competitive rates.",
  },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Gallery", href: "#gallery" },
  { label: "Videography", href: "#videography" },
  { label: "Catalogue", href: "#catalogue" },
  { label: "Contact", href: "#contact" },
];

/* ─── Animated Counter ─── */
function AnimatedCounter({
  target,
  suffix,
}: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 2000;
    const step = (target / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={spanRef}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── Custom Cursor ─── */
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    let rafId: number;
    const trail = { x: 0, y: 0 };
    const cursor = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      trail.x += (cursor.x - trail.x) * 0.15;
      trail.y += (cursor.y - trail.y) * 0.15;
      if (trailRef.current) {
        trailRef.current.style.left = `${trail.x}px`;
        trailRef.current.style.top = `${trail.y}px`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[99999] w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "oklch(0.75 0.2 200)",
          boxShadow:
            "0 0 12px oklch(0.75 0.2 200 / 0.9), 0 0 24px oklch(0.75 0.2 200 / 0.5)",
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={trailRef}
        className="fixed pointer-events-none z-[99998] w-8 h-8 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          border: "1px solid oklch(0.75 0.2 200 / 0.4)",
          background: "oklch(0.75 0.2 200 / 0.05)",
          backdropFilter: "blur(2px)",
        }}
      />
    </>
  );
}

/* ─── Loading Screen ─── */
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onDone, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ background: "oklch(0.05 0.02 260)" }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Scan line */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0.75 0.2 200 / 0.03) 2px, oklch(0.75 0.2 200 / 0.03) 4px)",
        }}
      />

      {/* Rotating rings */}
      <div className="relative flex items-center justify-center w-48 h-48 mb-8">
        <div
          className="absolute w-48 h-48 rounded-full border-2"
          style={{
            borderColor:
              "transparent oklch(0.75 0.2 200 / 0.3) transparent oklch(0.75 0.2 200 / 0.3)",
            animation: "spin-slow 3s linear infinite",
          }}
        />
        <div
          className="absolute w-36 h-36 rounded-full border"
          style={{
            borderColor:
              "oklch(0.65 0.25 290 / 0.4) transparent oklch(0.65 0.25 290 / 0.4) transparent",
            animation: "spin-slow 5s linear infinite reverse",
          }}
        />
        <img
          src="/assets/generated/kagale-logo-transparent.dim_300x80.png"
          alt="Kagale Creations"
          className="w-28 object-contain"
        />
      </div>

      <h1
        className="font-display text-xl tracking-[0.3em] mb-2"
        style={{ color: "oklch(0.75 0.2 200)" }}
      >
        KAGALE CREATIONS
      </h1>
      <p
        className="text-xs tracking-[0.2em] mb-10"
        style={{ color: "oklch(0.55 0.05 240)" }}
      >
        INITIALIZING EXPERIENCE
      </p>

      {/* Progress bar */}
      <div
        className="w-64 h-px relative overflow-hidden"
        style={{ background: "oklch(1 0 0 / 10%)" }}
      >
        <motion.div
          className="absolute left-0 top-0 h-full"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.75 0.2 200), oklch(0.65 0.25 290))",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
        <div
          className="absolute right-0 top-0 h-full w-8 opacity-50"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.75 0.2 200 / 0.5))",
          }}
        />
      </div>
      <p
        className="text-xs mt-3 font-display"
        style={{ color: "oklch(0.55 0.05 240)" }}
      >
        {progress}%
      </p>
    </motion.div>
  );
}

/* ─── Particles ─── */
function HeroParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: 5 + Math.random() * 8,
    delay: Math.random() * 5,
    color:
      i % 3 === 0
        ? "oklch(0.75 0.2 200 / 0.6)"
        : i % 3 === 1
          ? "oklch(0.65 0.25 290 / 0.5)"
          : "oklch(0.7 0.22 330 / 0.4)",
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Section Wrapper ─── */
function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      className={`py-24 relative ${className}`}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      {children}
    </motion.section>
  );
}

/* ─── Section Title ─── */
function SectionTitle({
  title,
  subtitle,
}: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-16">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div
          className="h-px w-12"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.75 0.2 200))",
          }}
        />
        <span
          className="font-display text-xs tracking-[0.3em]"
          style={{ color: "oklch(0.75 0.2 200)" }}
        >
          KAGALE CREATIONS
        </span>
        <div
          className="h-px w-12"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.75 0.2 200), transparent)",
          }}
        />
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p
          className="text-base max-w-2xl mx-auto"
          style={{ color: "oklch(0.65 0.05 240)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ─── Navbar ─── */
function Navbar({
  scrollProgress,
}: {
  scrollProgress: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 2.5 }}
      >
        <nav
          className={`flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300 ${
            scrolled ? "backdrop-blur-md border-b" : "bg-transparent"
          }`}
          style={
            scrolled
              ? {
                  background: "oklch(0.06 0.02 260 / 90%)",
                  borderBottomColor: "oklch(1 0 0 / 8%)",
                  boxShadow: "0 4px 30px oklch(0 0 0 / 0.3)",
                }
              : {}
          }
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <img
              src="/assets/generated/kagale-logo-transparent.dim_300x80.png"
              alt="Kagale Creations"
              className="h-8 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span
              className="font-display text-sm font-bold hidden sm:block"
              style={{ color: "oklch(0.75 0.2 200)" }}
            >
              KAGALE CREATIONS
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid={
                  idx === 0
                    ? "nav.home.link"
                    : idx === 1
                      ? "nav.services.link"
                      : idx === 2
                        ? "nav.portfolio.link"
                        : idx === 3
                          ? "nav.gallery.link"
                          : idx === 6
                            ? "nav.contact.link"
                            : undefined
                }
                className="text-sm font-medium transition-all duration-200 hover:opacity-100 opacity-70"
                style={{ color: "oklch(0.9 0.02 240)" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              data-ocid="nav.cta.button"
              className="magnetic-btn px-5 py-2 rounded text-xs font-display font-bold tracking-wider transition-all duration-200"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.65 0.25 290))",
                color: "oklch(0.05 0.01 260)",
                boxShadow: "0 0 20px oklch(0.75 0.2 200 / 0.3)",
              }}
            >
              GET STARTED
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            style={{ color: "oklch(0.75 0.2 200)" }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden backdrop-blur-xl border-b overflow-hidden"
              style={{
                background: "oklch(0.06 0.02 260 / 95%)",
                borderBottomColor: "oklch(1 0 0 / 8%)",
              }}
            >
              <div className="flex flex-col py-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-6 py-3 text-sm transition-colors"
                    style={{ color: "oklch(0.85 0.02 240)" }}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="px-6 pt-2">
                  <button
                    type="button"
                    data-ocid="nav.cta.button"
                    onClick={() => {
                      setMenuOpen(false);
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="block w-full text-center py-3 rounded text-xs font-display font-bold tracking-wider"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.65 0.25 290))",
                      color: "oklch(0.05 0.01 260)",
                    }}
                  >
                    GET STARTED
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

/* ─── Hero Section ─── */
function HeroSection({ onNavClick }: { onNavClick: (href: string) => void }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
        }}
      />

      {/* Overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.04 0.02 260 / 92%) 0%, oklch(0.06 0.03 280 / 88%) 50%, oklch(0.04 0.015 250 / 94%) 100%)",
        }}
      />
      <div className="absolute inset-0 hero-grid-lines" />

      {/* Particles */}
      <HeroParticles />

      {/* Glowing orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.75 0.2 200 / 0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.25 290 / 0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.8 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div
            className="h-px w-8"
            style={{ background: "oklch(0.75 0.2 200)" }}
          />
          <span
            className="font-display text-xs tracking-[0.4em]"
            style={{ color: "oklch(0.75 0.2 200)" }}
          >
            DIGITAL AGENCY
          </span>
          <div
            className="h-px w-8"
            style={{ background: "oklch(0.75 0.2 200)" }}
          />
        </motion.div>

        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 2.9,
          }}
        >
          <span
            style={{
              color: "oklch(0.95 0.01 240)",
              textShadow: "0 0 60px oklch(0 0 0 / 0.8)",
            }}
          >
            We Build{" "}
          </span>
          <span
            className="neon-text-cyan typewriter-cursor"
            style={{ animation: "text-glow-pulse 3s ease-in-out infinite" }}
          >
            Digital
          </span>
          <br />
          <span
            style={{
              color: "oklch(0.95 0.01 240)",
              textShadow: "0 0 60px oklch(0 0 0 / 0.8)",
            }}
          >
            Experiences That{" "}
          </span>
          <span
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.25 290), oklch(0.7 0.22 330))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Grow
          </span>
          <br />
          <span
            style={{
              color: "oklch(0.95 0.01 240)",
              textShadow: "0 0 60px oklch(0 0 0 / 0.8)",
            }}
          >
            Your Business
          </span>
        </motion.h1>

        <motion.p
          className="text-base md:text-lg max-w-2xl mx-auto mb-10 font-heading tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 3.3 }}
          style={{ color: "oklch(0.7 0.05 240)" }}
        >
          Web Development{" "}
          <span style={{ color: "oklch(0.75 0.2 200)" }}>|</span> Ecommerce
          Stores <span style={{ color: "oklch(0.75 0.2 200)" }}>|</span>{" "}
          Business Websites{" "}
          <span style={{ color: "oklch(0.75 0.2 200)" }}>|</span> Professional
          Videography
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 3.5 }}
        >
          <button
            type="button"
            data-ocid="hero.primary_button"
            onClick={() => onNavClick("#portfolio")}
            className="magnetic-btn group flex items-center gap-2 px-8 py-4 rounded font-display text-sm font-bold tracking-wider transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.65 0.25 290))",
              color: "oklch(0.05 0.01 260)",
              boxShadow:
                "0 0 30px oklch(0.75 0.2 200 / 0.4), 0 4px 20px oklch(0 0 0 / 0.5)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 50px oklch(0.75 0.2 200 / 0.6), 0 4px 30px oklch(0 0 0 / 0.5)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 30px oklch(0.75 0.2 200 / 0.4), 0 4px 20px oklch(0 0 0 / 0.5)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Rocket size={16} />
            VIEW OUR WORK
          </button>
          <button
            type="button"
            data-ocid="hero.secondary_button"
            onClick={() => onNavClick("#contact")}
            className="magnetic-btn flex items-center gap-2 px-8 py-4 rounded font-display text-sm font-bold tracking-wider transition-all duration-300"
            style={{
              background: "transparent",
              color: "oklch(0.85 0.02 240)",
              border: "1px solid oklch(1 0 0 / 20%)",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "oklch(0.75 0.2 200 / 0.5)";
              e.currentTarget.style.boxShadow =
                "0 0 20px oklch(0.75 0.2 200 / 0.15)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "oklch(1 0 0 / 20%)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Phone size={16} />
            CONTACT US
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        onClick={() => onNavClick("#services")}
        aria-label="Scroll to services"
      >
        <span
          className="font-display text-xs tracking-widest"
          style={{ color: "oklch(0.75 0.2 200)" }}
        >
          EXPLORE
        </span>
        <ChevronDown size={20} style={{ color: "oklch(0.75 0.2 200)" }} />
      </motion.button>
    </section>
  );
}

/* ─── Services Section ─── */
function ServicesSection() {
  const colorMap: Record<string, string> = {
    cyan: "oklch(0.75 0.2 200)",
    purple: "oklch(0.65 0.25 290)",
    pink: "oklch(0.7 0.22 330)",
  };

  return (
    <Section id="services" className="section-slightly-lighter">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Our Services"
          subtitle="End-to-end digital solutions crafted for ambitious businesses ready to dominate the digital landscape."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              data-ocid={`services.item.${service.id}`}
              variants={scaleInVariant}
              className="glass-card glass-card-hover rounded-xl p-6 flex flex-col items-center text-center group cursor-default transition-all duration-300"
              whileHover={{ y: -6 }}
            >
              <div
                className="w-20 h-20 rounded-xl flex items-center justify-center mb-5 overflow-hidden relative"
                style={{
                  background: `${colorMap[service.color]}15`,
                  border: `1px solid ${colorMap[service.color]}30`,
                }}
              >
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle, ${colorMap[service.color]}20, transparent)`,
                  }}
                />
              </div>

              <h3
                className="font-display text-sm font-bold tracking-wide mb-3"
                style={{ color: colorMap[service.color] }}
              >
                {service.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.65 0.04 240)" }}
              >
                {service.description}
              </p>

              <div
                className="mt-5 h-px w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, transparent, ${colorMap[service.color]}, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── Portfolio Section ─── */
function PortfolioSection() {
  return (
    <Section id="portfolio" className="section-dark">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Our Work"
          subtitle="A curated selection of digital experiences we've crafted for clients across diverse industries."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PORTFOLIO.map((project) => (
            <motion.div
              key={project.id}
              data-ocid={`portfolio.item.${project.id}`}
              variants={scaleInVariant}
              className="group relative rounded-xl overflow-hidden cursor-pointer"
              style={{ height: "320px" }}
              whileHover={{ scale: 1.01 }}
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Base overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.04 0.02 260 / 90%) 0%, transparent 60%)",
                }}
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "oklch(0.06 0.03 260 / 80%)",
                  backdropFilter: "blur(4px)",
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span
                    className="inline-block text-xs font-display tracking-widest mb-2"
                    style={{ color: "oklch(0.75 0.2 200)" }}
                  >
                    {project.type}
                  </span>
                  <h3 className="font-heading text-xl font-bold mb-2 text-white">
                    {project.title}
                  </h3>
                  <p
                    className="text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
                    style={{ color: "oklch(0.75 0.05 240)" }}
                  >
                    {project.description}
                  </p>
                  <button
                    type="button"
                    className="flex items-center gap-2 text-xs font-display tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150"
                    style={{ color: "oklch(0.75 0.2 200)" }}
                  >
                    <ExternalLink size={14} />
                    VIEW PROJECT
                  </button>
                </div>
              </div>

              {/* Neon border on hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 0 1px oklch(0.75 0.2 200 / 0.4)",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── Videography Section ─── */
function VideographySection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <Section id="videography" className="section-slightly-lighter">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Videography & Brand Films"
          subtitle="Cinematic storytelling that captures your brand's essence and moves your audience to action."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VIDEOS.map((video) => (
            <motion.div
              key={video.id}
              data-ocid={`video.item.${video.id}`}
              variants={scaleInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative rounded-xl overflow-hidden cursor-pointer"
              style={{ aspectRatio: "16/9" }}
              onClick={() => setActiveVideo(video.youtubeId)}
            >
              <img
                src={video.thumb}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className="absolute inset-0"
                style={{ background: "oklch(0.04 0.02 260 / 60%)" }}
              />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative flex items-center justify-center w-16 h-16 rounded-full"
                  style={{
                    background: "oklch(0.75 0.2 200 / 20%)",
                    border: "2px solid oklch(0.75 0.2 200 / 60%)",
                    backdropFilter: "blur(10px)",
                  }}
                  whileHover={{ scale: 1.15 }}
                >
                  <Play
                    size={24}
                    style={{ color: "oklch(0.75 0.2 200)", marginLeft: "3px" }}
                  />
                  {/* Pulse rings */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: "2px solid oklch(0.75 0.2 200 / 40%)",
                      animation: "pulse-ring 2s ease-out infinite",
                    }}
                  />
                </motion.div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p
                  className="font-display text-xs tracking-wider mb-1"
                  style={{ color: "oklch(0.75 0.2 200)" }}
                >
                  WATCH NOW
                </p>
                <h3 className="font-heading text-sm font-bold text-white">
                  {video.title}
                </h3>
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.65 0.04 240)" }}
                >
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Book a session CTA card */}
          <motion.div
            variants={scaleInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card glass-card-hover rounded-xl p-8 flex flex-col items-center justify-center text-center"
            style={{ aspectRatio: "16/9" }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
              style={{
                background: "oklch(0.7 0.22 330 / 15%)",
                border: "1px solid oklch(0.7 0.22 330 / 30%)",
              }}
            >
              <Play size={20} style={{ color: "oklch(0.7 0.22 330)" }} />
            </div>
            <h3
              className="font-display text-sm font-bold mb-3"
              style={{ color: "oklch(0.9 0.02 240)" }}
            >
              Book a Video Session
            </h3>
            <p
              className="text-xs mb-5"
              style={{ color: "oklch(0.6 0.04 240)" }}
            >
              Let's create a cinematic brand story that captures your audience.
            </p>
            <a
              href="#contact"
              className="px-6 py-3 rounded text-xs font-display font-bold tracking-wider transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.7 0.22 330), oklch(0.65 0.25 290))",
                color: "white",
                boxShadow: "0 0 20px oklch(0.7 0.22 330 / 0.3)",
              }}
            >
              BOOK NOW
            </a>
          </motion.div>
        </div>
      </div>

      {/* YouTube Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "oklch(0 0 0 / 90%)",
              backdropFilter: "blur(10px)",
            }}
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="relative w-full max-w-4xl rounded-xl overflow-hidden"
              style={{
                aspectRatio: "16/9",
                border: "1px solid oklch(0.75 0.2 200 / 30%)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="Video"
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
              <button
                type="button"
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "oklch(0 0 0 / 80%)", color: "white" }}
                onClick={() => setActiveVideo(null)}
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ─── Gallery Section ─── */
function GallerySection() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const prev = () =>
    setLightboxIdx((i) => (i === null || i <= 0 ? GALLERY.length - 1 : i - 1));
  const next = () =>
    setLightboxIdx((i) => (i === null || i >= GALLERY.length - 1 ? 0 : i + 1));

  return (
    <Section id="gallery" className="section-dark">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Creative Gallery"
          subtitle="A glimpse into our creative process — from brand shoots to workspace moments."
        />

        <div className="masonry-grid">
          {GALLERY.map((img, idx) => (
            <motion.div
              key={img.id}
              data-ocid={`gallery.item.${img.id}`}
              className="masonry-item group relative rounded-xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setLightboxIdx(idx)}
              whileHover={{ y: -4 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{
                  background: "oklch(0.04 0.02 260 / 70%)",
                  backdropFilter: "blur(2px)",
                }}
              >
                <ZoomIn size={28} style={{ color: "oklch(0.75 0.2 200)" }} />
              </div>
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 0 1px oklch(0.75 0.2 200 / 0.4)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "oklch(0 0 0 / 95%)" }}
            onClick={() => setLightboxIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY[lightboxIdx].src}
                alt={GALLERY[lightboxIdx].alt}
                className="max-w-full max-h-[80vh] rounded-xl object-contain"
                style={{ border: "1px solid oklch(0.75 0.2 200 / 20%)" }}
              />
              <button
                type="button"
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "oklch(0 0 0 / 80%)", color: "white" }}
                onClick={() => setLightboxIdx(null)}
              >
                <X size={16} />
              </button>
              <button
                type="button"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{
                  background: "oklch(0 0 0 / 70%)",
                  color: "oklch(0.75 0.2 200)",
                }}
                onClick={prev}
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{
                  background: "oklch(0 0 0 / 70%)",
                  color: "oklch(0.75 0.2 200)",
                }}
                onClick={next}
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ─── Catalogue Section ─── */
function CatalogueSection({
  onNavClick,
}: { onNavClick: (href: string) => void }) {
  return (
    <Section id="catalogue" className="section-slightly-lighter">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Website Templates & Packages"
          subtitle="Ready-to-launch website packages tailored for every industry and business need."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {CATALOGUE.map((item) => (
            <motion.div
              key={item.id}
              data-ocid={`catalogue.item.${item.id}`}
              variants={scaleInVariant}
              className="glass-card glass-card-hover rounded-xl overflow-hidden group cursor-pointer flex flex-col"
              whileHover={{ y: -5 }}
            >
              <div className="relative overflow-hidden h-40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.06 0.02 260 / 70%) 0%, transparent 60%)",
                  }}
                />
                <div
                  className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-display"
                  style={{
                    background: "oklch(0.75 0.2 200 / 20%)",
                    border: "1px solid oklch(0.75 0.2 200 / 30%)",
                    color: "oklch(0.75 0.2 200)",
                  }}
                >
                  {item.price}
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3
                  className="font-display text-xs font-bold tracking-wide mb-2"
                  style={{ color: "oklch(0.9 0.02 240)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-xs mb-4 flex-1"
                  style={{ color: "oklch(0.6 0.04 240)" }}
                >
                  {item.description}
                </p>
                <button
                  type="button"
                  data-ocid={`catalogue.item.${item.id}.button`}
                  onClick={() => onNavClick("#contact")}
                  className="w-full py-2 rounded text-xs font-display font-bold tracking-wider transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.75 0.2 200 / 15%), oklch(0.65 0.25 290 / 15%))",
                    border: "1px solid oklch(0.75 0.2 200 / 30%)",
                    color: "oklch(0.75 0.2 200)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.65 0.25 290))";
                    e.currentTarget.style.color = "oklch(0.05 0.01 260)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, oklch(0.75 0.2 200 / 15%), oklch(0.65 0.25 290 / 15%))";
                    e.currentTarget.style.color = "oklch(0.75 0.2 200)";
                  }}
                >
                  GET THIS WEBSITE
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── Why Choose Us Section ─── */
function WhyUsSection() {
  return (
    <Section id="why-us" className="section-dark">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Why Kagale Creations?"
          subtitle="We don't just build websites — we engineer digital growth engines."
        />

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {STATS.map(({ id, value, suffix, label, icon: Icon }) => (
            <motion.div
              key={id}
              data-ocid={`stats.item.${id}`}
              variants={scaleInVariant}
              className="glass-card rounded-xl p-6 text-center group"
              whileHover={{ y: -4 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{
                  background: "oklch(0.75 0.2 200 / 15%)",
                  border: "1px solid oklch(0.75 0.2 200 / 30%)",
                }}
              >
                <Icon size={18} style={{ color: "oklch(0.75 0.2 200)" }} />
              </div>
              <div
                className="font-display text-3xl font-black mb-1"
                style={{ color: "oklch(0.75 0.2 200)" }}
              >
                <AnimatedCounter target={value} suffix={suffix} />
              </div>
              <div
                className="text-xs tracking-wider"
                style={{ color: "oklch(0.6 0.04 240)" }}
              >
                {label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {FEATURES.map((feat) => (
            <motion.div
              key={feat.title}
              variants={fadeUpVariants}
              className="flex gap-4 p-6 glass-card glass-card-hover rounded-xl"
            >
              <div
                className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-0.5"
                style={{
                  background: "oklch(0.65 0.25 290 / 15%)",
                  border: "1px solid oklch(0.65 0.25 290 / 30%)",
                }}
              >
                <feat.icon
                  size={18}
                  style={{ color: "oklch(0.65 0.25 290)" }}
                />
              </div>
              <div>
                <h3
                  className="font-heading font-bold mb-1 text-sm"
                  style={{ color: "oklch(0.9 0.02 240)" }}
                >
                  {feat.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "oklch(0.6 0.04 240)" }}
                >
                  {feat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── Contact Section ─── */
function ContactSection() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setStatus("loading");
    try {
      await actor.submitContact(
        form.name,
        form.email,
        form.phone,
        form.message,
        BigInt(Date.now()),
      );
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contact" className="section-slightly-lighter">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Let's Build Something"
          subtitle="Have a project in mind? Let's turn your vision into reality. Reach out and we'll respond within 24 hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-xl p-8 space-y-5"
            >
              <h3
                className="font-display text-lg font-bold mb-6"
                style={{ color: "oklch(0.9 0.02 240)" }}
              >
                Send a Message
              </h3>

              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-display tracking-wider mb-2"
                  style={{ color: "oklch(0.65 0.04 240)" }}
                >
                  NAME *
                </label>
                <input
                  id="contact-name"
                  data-ocid="contact.name.input"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 focus:outline-none"
                  style={{
                    background: "oklch(1 0 0 / 5%)",
                    border: "1px solid oklch(1 0 0 / 10%)",
                    color: "oklch(0.9 0.02 240)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "oklch(0.75 0.2 200 / 50%)";
                    e.target.style.boxShadow =
                      "0 0 0 3px oklch(0.75 0.2 200 / 10%)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "oklch(1 0 0 / 10%)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-display tracking-wider mb-2"
                  style={{ color: "oklch(0.65 0.04 240)" }}
                >
                  EMAIL *
                </label>
                <input
                  id="contact-email"
                  data-ocid="contact.email.input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 focus:outline-none"
                  style={{
                    background: "oklch(1 0 0 / 5%)",
                    border: "1px solid oklch(1 0 0 / 10%)",
                    color: "oklch(0.9 0.02 240)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "oklch(0.75 0.2 200 / 50%)";
                    e.target.style.boxShadow =
                      "0 0 0 3px oklch(0.75 0.2 200 / 10%)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "oklch(1 0 0 / 10%)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-xs font-display tracking-wider mb-2"
                  style={{ color: "oklch(0.65 0.04 240)" }}
                >
                  PHONE
                </label>
                <input
                  id="contact-phone"
                  data-ocid="contact.phone.input"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 focus:outline-none"
                  style={{
                    background: "oklch(1 0 0 / 5%)",
                    border: "1px solid oklch(1 0 0 / 10%)",
                    color: "oklch(0.9 0.02 240)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "oklch(0.75 0.2 200 / 50%)";
                    e.target.style.boxShadow =
                      "0 0 0 3px oklch(0.75 0.2 200 / 10%)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "oklch(1 0 0 / 10%)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-display tracking-wider mb-2"
                  style={{ color: "oklch(0.65 0.04 240)" }}
                >
                  MESSAGE *
                </label>
                <textarea
                  id="contact-message"
                  data-ocid="contact.message.textarea"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 focus:outline-none resize-none"
                  style={{
                    background: "oklch(1 0 0 / 5%)",
                    border: "1px solid oklch(1 0 0 / 10%)",
                    color: "oklch(0.9 0.02 240)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "oklch(0.75 0.2 200 / 50%)";
                    e.target.style.boxShadow =
                      "0 0 0 3px oklch(0.75 0.2 200 / 10%)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "oklch(1 0 0 / 10%)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Status messages */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    data-ocid="contact.success_state"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 rounded-lg"
                    style={{
                      background: "oklch(0.72 0.2 145 / 10%)",
                      border: "1px solid oklch(0.72 0.2 145 / 30%)",
                    }}
                  >
                    <CheckCircle
                      size={18}
                      style={{ color: "oklch(0.72 0.2 145)" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "oklch(0.72 0.2 145)" }}
                    >
                      Message sent! We'll get back to you within 24 hours.
                    </span>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    data-ocid="contact.error_state"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 rounded-lg"
                    style={{
                      background: "oklch(0.65 0.24 20 / 10%)",
                      border: "1px solid oklch(0.65 0.24 20 / 30%)",
                    }}
                  >
                    <AlertCircle
                      size={18}
                      style={{ color: "oklch(0.65 0.24 20)" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "oklch(0.65 0.24 20)" }}
                    >
                      Something went wrong. Please try again.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                data-ocid="contact.submit_button"
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 rounded-lg font-display text-sm font-bold tracking-wider transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.65 0.25 290))",
                  color: "oklch(0.05 0.01 260)",
                  boxShadow: "0 0 20px oklch(0.75 0.2 200 / 0.3)",
                }}
                onMouseEnter={(e) => {
                  if (status !== "loading") {
                    e.currentTarget.style.boxShadow =
                      "0 0 40px oklch(0.75 0.2 200 / 0.5)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 20px oklch(0.75 0.2 200 / 0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {status === "loading" ? (
                  <>
                    <Loader2
                      size={16}
                      data-ocid="contact.loading_state"
                      className="animate-spin"
                    />
                    SENDING...
                  </>
                ) : (
                  "SEND MESSAGE"
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3
                className="font-display text-xl font-bold mb-2"
                style={{ color: "oklch(0.9 0.02 240)" }}
              >
                Ready to Launch?
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.65 0.04 240)" }}
              >
                We respond to every inquiry within 24 hours. Let's discuss your
                vision and build something extraordinary together.
              </p>
            </div>

            {/* Quick contact buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                data-ocid="contact.whatsapp.button"
                href="https://wa.me/919632114269"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-4 rounded-xl flex-1 transition-all duration-300 group"
                style={{
                  background: "oklch(0.5 0.18 145 / 10%)",
                  border: "1px solid oklch(0.5 0.18 145 / 30%)",
                  color: "oklch(0.72 0.2 145)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "oklch(0.5 0.18 145 / 20%)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px oklch(0.5 0.18 145 / 20%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "oklch(0.5 0.18 145 / 10%)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <MessageCircle size={20} />
                <div>
                  <div className="font-display text-xs font-bold tracking-wider">
                    WHATSAPP
                  </div>
                  <div className="text-xs opacity-70">Chat with us</div>
                </div>
              </a>
              <a
                data-ocid="contact.call.button"
                href="tel:+919632114269"
                className="flex items-center gap-3 px-6 py-4 rounded-xl flex-1 transition-all duration-300"
                style={{
                  background: "oklch(0.75 0.2 200 / 10%)",
                  border: "1px solid oklch(0.75 0.2 200 / 30%)",
                  color: "oklch(0.75 0.2 200)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "oklch(0.75 0.2 200 / 20%)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px oklch(0.75 0.2 200 / 20%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "oklch(0.75 0.2 200 / 10%)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Phone size={20} />
                <div>
                  <div className="font-display text-xs font-bold tracking-wider">
                    CALL US
                  </div>
                  <div className="text-xs opacity-70">+91 96321 14269</div>
                </div>
              </a>
            </div>

            {/* Email */}
            <div
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{
                background: "oklch(1 0 0 / 3%)",
                border: "1px solid oklch(1 0 0 / 8%)",
              }}
            >
              <Mail size={18} style={{ color: "oklch(0.65 0.25 290)" }} />
              <span
                className="text-sm"
                style={{ color: "oklch(0.75 0.04 240)" }}
              >
                nageshkagale@gmail.com
              </span>
            </div>

            {/* Address */}
            <div
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{
                background: "oklch(1 0 0 / 3%)",
                border: "1px solid oklch(1 0 0 / 8%)",
              }}
            >
              <MapPin
                size={18}
                style={{
                  color: "oklch(0.65 0.25 290)",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              />
              <span
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.75 0.04 240)" }}
              >
                Mangasuli, Tq. Kagwad,
                <br />
                Dist. Belagavi – 591234
              </span>
            </div>

            {/* Map placeholder */}
            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: "1px solid oklch(1 0 0 / 10%)",
                height: "220px",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007!5e0!3m2!1sen!2sus!4v1462384752793"
                width="100%"
                height="220"
                style={{ border: 0 }}
                loading="lazy"
                title="Kagale Creations Location"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-70"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/* ─── Footer ─── */
function Footer({ onNavClick }: { onNavClick: (href: string) => void }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative pt-16 pb-8"
      style={{
        background: "oklch(0.05 0.02 260)",
        borderTop: "1px solid oklch(1 0 0 / 8%)",
      }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.75 0.2 200 / 0.5), transparent)",
        }}
      />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/generated/kagale-logo-transparent.dim_300x80.png"
                alt="Kagale Creations"
                className="h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <p
              className="font-display text-xs tracking-widest mb-2"
              style={{ color: "oklch(0.75 0.2 200)" }}
            >
              KAGALE CREATIONS
            </p>
            <p
              className="text-xs mb-4"
              style={{ color: "oklch(0.55 0.04 240)" }}
            >
              Building Powerful Digital Experiences
            </p>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "oklch(0.5 0.04 240)" }}
            >
              We craft exceptional digital experiences that propel businesses
              forward in the modern digital landscape.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-display text-xs tracking-widest mb-4"
              style={{ color: "oklch(0.75 0.2 200)" }}
            >
              QUICK LINKS
            </h4>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick(link.href);
                  }}
                  className="text-xs transition-colors hover:opacity-100 opacity-60 w-fit"
                  style={{ color: "oklch(0.75 0.04 240)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social + contact */}
          <div>
            <h4
              className="font-display text-xs tracking-widest mb-4"
              style={{ color: "oklch(0.75 0.2 200)" }}
            >
              CONNECT
            </h4>
            <div className="flex gap-3 mb-6">
              {[
                { Icon: Instagram, label: "Instagram", href: "#" },
                { Icon: Linkedin, label: "LinkedIn", href: "#" },
                { Icon: Youtube, label: "YouTube", href: "#" },
                {
                  Icon: SiWhatsapp,
                  label: "WhatsApp",
                  href: "https://wa.me/919632114269",
                },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "oklch(1 0 0 / 5%)",
                    border: "1px solid oklch(1 0 0 / 10%)",
                    color: "oklch(0.7 0.04 240)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "oklch(0.75 0.2 200 / 40%)";
                    e.currentTarget.style.color = "oklch(0.75 0.2 200)";
                    e.currentTarget.style.boxShadow =
                      "0 0 15px oklch(0.75 0.2 200 / 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "oklch(1 0 0 / 10%)";
                    e.currentTarget.style.color = "oklch(0.7 0.04 240)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <div className="space-y-2">
              <div
                className="flex items-center gap-2 text-xs"
                style={{ color: "oklch(0.55 0.04 240)" }}
              >
                <Mail size={12} />
                nageshkagale@gmail.com
              </div>
              <div
                className="flex items-center gap-2 text-xs"
                style={{ color: "oklch(0.55 0.04 240)" }}
              >
                <Phone size={12} />
                +91 96321 14269
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{
            borderTop: "1px solid oklch(1 0 0 / 6%)",
            color: "oklch(0.45 0.03 240)",
          }}
        >
          <span>© {year} Kagale Creations. All rights reserved.</span>
          <span>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:opacity-100"
              style={{ color: "oklch(0.65 0.15 200)" }}
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ─── WhatsApp Floating Button ─── */
function FloatingWhatsApp() {
  return (
    <a
      data-ocid="whatsapp.floating.button"
      href="https://wa.me/919632114269"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.55 0.2 145), oklch(0.48 0.18 145))",
        boxShadow: "0 4px 20px oklch(0.5 0.18 145 / 0.5)",
      }}
    >
      <SiWhatsapp size={26} color="white" />
      {/* Pulse rings */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          border: "2px solid oklch(0.55 0.2 145 / 0.5)",
          animation: "pulse-ring 2s ease-out infinite",
        }}
      />
      <span
        className="absolute inset-0 rounded-full"
        style={{
          border: "2px solid oklch(0.55 0.2 145 / 0.3)",
          animation: "pulse-ring 2s ease-out 0.5s infinite",
        }}
      />
    </a>
  );
}

/* ─── Main App ─── */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    return smoothProgress.on("change", (v) => {
      setScrollProgress(v * 100);
    });
  }, [smoothProgress]);

  const handleNavClick = useCallback((href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleLoadingDone = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div
      className="min-h-screen relative"
      style={{ background: "oklch(0.08 0.02 260)" }}
    >
      {/* Custom cursor */}
      <CustomCursor />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onDone={handleLoadingDone} />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Navbar */}
          <Navbar scrollProgress={scrollProgress} />

          {/* Main content */}
          <main>
            <HeroSection onNavClick={handleNavClick} />
            <ServicesSection />
            <PortfolioSection />
            <VideographySection />
            <GallerySection />
            <CatalogueSection onNavClick={handleNavClick} />
            <WhyUsSection />
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer onNavClick={handleNavClick} />

          {/* Floating WhatsApp */}
          <FloatingWhatsApp />
        </>
      )}
    </div>
  );
}
