import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect, type RefObject } from "react";
import {
  Music2,
  Video,
  Mail,
  Instagram,
  MapPin,
  Speaker,
  Sparkles,
  Disc3,
  Headphones,
  Calendar,
  Send,
  ExternalLink,
  Volume2,
  VolumeX,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: KRLPortfolio,
});

/* ---------- config you can edit fast ---------- */
const EMAIL = "KRUSEL.KARL@GMAIL.COM";
// const PHONE = "231-493-1156"; // hidden for now
const IG_HANDLE = "karlkrusel";
const TT_HANDLE = "karlkrusel"; // KRL on TikTok (DJ KRL)
const IG = `https://www.instagram.com/${IG_HANDLE}/`;
const TT = `https://www.tiktok.com/@${TT_HANDLE}`;
const SC = "https://soundcloud.com/karlkrusel";

const vid = (file: string) => `https://pub-2b79e8df89e84e759954039d570bd5c7.r2.dev/${file}`;
const photo = (file: string) => `/photos/${file}`;

/* ---------- lazy autoplay video hook ---------- */
function useLazyVideo(containerRef?: RefObject<HTMLElement | null>) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const target: Element = (containerRef?.current as Element | null) ?? video;
    const enter = () => {
      video.muted = true;
      if (video.paused) video.play().catch(() => {});
    };
    const rect = target.getBoundingClientRect();
    if (rect.top < window.innerHeight + 300 && rect.bottom > -300) enter();
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) enter();
        else if (video.readyState >= 2) video.pause();
      },
      { threshold: 0, rootMargin: "300px 0px" },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);
  return videoRef;
}

/* ---------- reveal-on-scroll wrapper ---------- */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={
        shown
          ? { animation: `float-up 0.7s ease-out both`, animationDelay: `${delay}s` }
          : { opacity: 0 }
      }
    >
      {children}
    </div>
  );
}

/* ---------- nav ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["About", "#about"],
    ["Book", "#book"],
    ["Visuals", "#visuals"],
    ["Videos", "#videos"],
    ["Mixes", "#mixes"],
    ["Socials", "#socials"],
    ["SnagTrack", "/snagtrack"],
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-strong border-b border-primary/15">
      <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
        <a
          href="#top"
          style={{ fontFamily: '"Tourner", var(--font-display)' }}
          className="font-bold tracking-widest text-2xl text-glow"
        >
          KRL
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm uppercase tracking-wider text-muted-foreground">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="nav-link hover:text-primary transition-colors">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-primary text-primary-foreground hover:shadow-glow transition"
          >
            Book a night
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-foreground transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-foreground transition-all duration-200 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-foreground transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden border-t border-primary/15 bg-background/95 backdrop-blur-md">
          {[...links, ["Book a night", "#contact"]].map(([l, h]) => (
            <a
              key={h}
              href={h}
              onClick={() => setOpen(false)}
              className="block px-5 py-3.5 text-sm uppercase tracking-wide text-muted-foreground hover:text-primary hover:bg-secondary/40 transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Equalizer() {
  return (
    <div className="flex items-end gap-1 h-8">
      {[0.1, 0.3, 0.6, 0.2, 0.5, 0.8, 0.4].map((d, i) => (
        <span
          key={i}
          className="eq-bar w-1.5 rounded-full bg-gradient-to-t from-primary to-accent"
          style={{ animationDelay: `${d}s`, height: "60%" }}
        />
      ))}
    </div>
  );
}

/* ---------- hero: 1073 background, logo left, white glow ---------- */
function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-background"
    >
      {/* background photo 1073 */}
      <div className="absolute inset-0 z-0">
        <img
          src={photo("hero-1073.jpg")}
          alt="KRL behind the decks"
          className="w-full h-full object-cover object-[70%_center] md:object-center animate-slow-zoom"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/25" />
        <div className="absolute inset-0 bg-grid opacity-20 animate-grid-pan" />
        <div className="absolute inset-0 scanlines opacity-20" />
      </div>

      {/* glow blobs */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-pulse-glow z-0" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full bg-accent/15 blur-3xl animate-drift z-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-28 pb-20 w-full">
        <div className="flex items-center gap-3 mb-5">
          <Equalizer />
          <span className="text-xs uppercase tracking-[0.35em] text-primary animate-flicker">
            Now booking 2026
          </span>
        </div>

        {/* logo, left side, white glow, Tourner font kept */}
        <h1
          style={{ fontFamily: '"Tourner", var(--font-impact)' }}
          className="text-white animate-logo-glow text-[34vw] sm:text-[26vw] md:text-[20rem] leading-[0.8] tracking-tight"
        >
          KRL
        </h1>

        <p className="mt-4 font-impact text-2xl md:text-4xl uppercase tracking-wide text-foreground">
          Open-format DJ. <span className="text-gradient">Professional sound. A full dance floor.</span>
        </p>
        <p className="mt-5 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
          I'm Karl Krusel, known as KRL. A Grand Rapids based DJ, originally from Traverse City. I bring
          my own professional rig, read the room, and keep the energy right all night, whether it's a
          bar, a club, a wedding, or a private event.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm animate-glow-pulse hover:shadow-glow-strong hover:scale-[1.02] transition"
          >
            Book me <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </a>
          <a
            href="#mixes"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass font-bold uppercase tracking-wider text-sm hover:border-primary/40 transition"
          >
            <Headphones className="w-4 h-4" /> Hear a mix
          </a>
        </div>

        <div className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" /> Grand Rapids, MI · available statewide
        </div>
      </div>
    </section>
  );
}

/* ---------- scrolling marquee ---------- */
function Marquee() {
  const items = [
    "Open-Format",
    "House",
    "Drum & Bass",
    "Dubstep",
    "Top Hits",
    "Throwbacks",
    "Custom Visuals",
    "Pro JBL Sound",
    "Bars & Clubs",
    "Weddings",
    "Private Events",
  ];
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-primary/20 bg-primary/[0.04] py-4">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="mx-6 font-impact uppercase text-xl md:text-2xl tracking-wide text-foreground/70 flex items-center gap-6"
          >
            {t} <span className="text-primary text-glow animate-spin-slow">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- section shell ---------- */
function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-24 md:py-32 px-5">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12">
          <div className="text-xs uppercase tracking-[0.35em] text-primary mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" /> {eyebrow}
          </div>
          <h2 className="font-impact uppercase text-4xl md:text-6xl leading-[0.95] max-w-3xl">
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* ---------- full-bleed photo band ---------- */
function PhotoBand({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative h-[42vh] md:h-[60vh] overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/60" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      {children && <div className="relative z-10 h-full flex items-center px-5">{children}</div>}
    </div>
  );
}

/* ---------- about ---------- */
function About() {
  return (
    <Section
      id="about"
      eyebrow="Who I am"
      title={
        <>
          Reading the room. <span className="text-gradient">Setting the tone.</span>
        </>
      }
    >
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <Reveal>
          <div className="relative rounded-xl overflow-hidden ring-glow">
            <img
              src={photo("portrait-1071.jpg")}
              alt="KRL DJing"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 text-muted-foreground leading-relaxed">
          <p className="text-lg text-foreground/90">
            I've been DJing for about five years, the last one professionally. Bass and dubstep are
            what I love most, but the majority of my work is open-format, which means I can play to
            any crowd. Younger or older, I read what the room responds to and build the set around it.
          </p>
          <p>
            Top hits, house, drum and bass, dubstep, and throwbacks, whatever fits the night. I hold a
            residency at The Grand Woods Lounge in Grand Rapids and play bars and events across
            Michigan. My focus stays on the crowd and the energy in the room, not on my screen.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {[
              ["5+ yrs", "behind the decks"],
              ["Residency", "Grand Woods Lounge"],
              ["Own rig", "pro JBL sound"],
            ].map(([big, small]) => (
              <div key={big} className="glass rounded-lg px-4 py-3">
                <div className="font-impact uppercase text-xl text-primary leading-none">{big}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  {small}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------- what I offer ---------- */
const offerings = [
  {
    icon: Disc3,
    title: "Open-Format Sets",
    desc: "Blending genres in real time to match the energy of the room.",
  },
  {
    icon: Music2,
    title: "Bars & Clubs",
    desc: "High-energy nightlife sets built to pack the floor and keep it moving.",
  },
  {
    icon: Calendar,
    title: "Private Events",
    desc: "Weddings, parties, and corporate nights, tailored to your crowd.",
  },
  {
    icon: Headphones,
    title: "Every Genre",
    desc: "House, drum and bass, dubstep, top hits, and throwbacks.",
  },
  {
    icon: Speaker,
    title: "Pro JBL Sound",
    desc: "I bring my own full sound system. Two mids plus an 18 inch sub.",
  },
  {
    icon: Sparkles,
    title: "Custom Visuals",
    desc: "Animated loops made for your theme, venue, logo, or brand.",
  },
];

function Offer() {
  return (
    <Section
      id="offer"
      eyebrow="What you get"
      title={
        <>
          A complete <span className="text-gradient">audio-visual</span> experience.
        </>
      }
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {offerings.map(({ icon: Icon, title, desc }, i) => (
          <Reveal key={title} delay={i * 0.05}>
            <div className="group glass rounded-xl p-6 h-full hover:border-primary/50 hover:-translate-y-1 hover:shadow-glow transition-all">
              <Icon className="w-7 h-7 text-primary mb-4 group-hover:scale-110 group-hover:text-accent transition" />
              <h3 className="font-impact uppercase text-lg tracking-wide mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- booking / where I play (the gig-focus centerpiece) ---------- */
function Book() {
  const spots = [
    { venue: "The Grand Woods Lounge", detail: "Grand Rapids, MI", tag: "Residency" },
    { venue: "VI Grill", detail: "Open-format residency", tag: "Residency" },
    { venue: "The B.O.B.", detail: "Big Old Bass · Grand Rapids, MI", tag: "Bass Night" },
  ];
  return (
    <section id="book" className="relative overflow-hidden">
      <PhotoBand src={photo("crowd-1075.jpg")} alt="Crowd at a KRL set">
        <div className="mx-auto max-w-6xl w-full">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.35em] text-primary mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" /> Where I play
            </div>
            <h2 className="font-impact uppercase text-4xl md:text-6xl leading-[0.95] max-w-3xl text-glow">
              Catch me <span className="text-gradient">on the decks.</span>
            </h2>
          </Reveal>
        </div>
      </PhotoBand>

      <div className="px-5 pb-24 md:pb-32 -mt-8 relative z-10">
        <div className="mx-auto max-w-6xl">
          {/* venues I play — credibility, not a booking action */}
          <Reveal className="glass-strong rounded-2xl overflow-hidden divide-y divide-primary/10">
            {spots.map((s) => (
              <div key={s.venue} className="flex items-center justify-between gap-4 px-5 md:px-8 py-5">
                <div className="flex items-center gap-4 min-w-0">
                  <Disc3
                    className="hidden sm:block w-6 h-6 text-primary/70 shrink-0 animate-spin"
                    style={{ animationDuration: "8s" }}
                  />
                  <div className="min-w-0">
                    <div className="font-impact uppercase text-lg md:text-2xl tracking-wide truncate">
                      {s.venue}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mt-0.5">
                      {s.detail}
                    </div>
                  </div>
                </div>
                <span className="shrink-0 text-[10px] md:text-xs uppercase tracking-widest text-primary border border-primary/40 rounded-full px-3 py-1">
                  {s.tag}
                </span>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.05} className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Plus bars, clubs, weddings, and private events all over Michigan.
            </p>
          </Reveal>

          {/* the one clear booking action */}
          <Reveal delay={0.1} className="mt-10">
            <div className="rounded-2xl p-7 md:p-10 bg-gradient-to-br from-primary/15 via-accent/5 to-background border border-primary/30 ring-glow flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="font-impact uppercase text-2xl md:text-4xl tracking-wide">
                  Want KRL at <span className="text-gradient">your spot?</span>
                </h3>
                <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">
                  Bars, clubs, weddings, private parties, and brand nights. Send me your date and
                  venue and I'll check availability and put a plan together.
                </p>
              </div>
              <a
                href="#contact"
                className="group shrink-0 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm animate-glow-pulse hover:shadow-glow-strong hover:scale-[1.02] transition"
              >
                Check availability
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- visuals ---------- */
function VisualCard({ title, desc, src }: { title: string; desc: string; src: string }) {
  const videoRef = useLazyVideo();
  return (
    <div className="group rounded-xl overflow-hidden glass hover:border-accent/40 transition-all">
      <div className="aspect-video relative bg-gradient-to-br from-primary/30 via-accent/10 to-background overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"
        />
        <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-widest text-white/70 z-10">
          Visual Loop
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-impact uppercase tracking-wide">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{desc}</p>
      </div>
    </div>
  );
}

function Visuals() {
  return (
    <Section
      id="visuals"
      eyebrow="Custom visuals & VFX"
      title={
        <>
          More than music. <span className="text-gradient">A complete atmosphere.</span>
        </>
      }
    >
      <p className="text-muted-foreground max-w-3xl mb-10 leading-relaxed">
        I create custom visual loops that run on venue TVs, projectors, and screens during a set. I
        can build them around a holiday, a theme, your event, your logo, or your brand, so every part
        of the room works together, from the music to the screens.
      </p>
      <div className="grid md:grid-cols-3 gap-5">
        <Reveal>
          <VisualCard
            title="St. Patrick's Day Loop"
            desc="Themed holiday visuals blending the venue logo and KRL branding into a green-soaked loop."
            src={vid("krl_saint_paddies_v2_tv_loop_30s_falling_soft.mp4")}
          />
        </Reveal>
        <Reveal delay={0.05}>
          <VisualCard
            title="Branded Venue Loop"
            desc="Custom visuals built around your logo and brand identity."
            src={vid("woods_logo_sample_krl.mp4")}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <VisualCard
            title="Cosmic Gradient Loop"
            desc="Abstract VFX for immersive event atmospheres."
            src={vid("KRL_cosmic_gradient.mp4")}
          />
        </Reveal>
      </div>
      <div className="flex justify-center mt-5">
        <div className="w-full md:w-1/3">
          <Reveal delay={0.15}>
            <VisualCard
              title="KRL — Kid Cudi Edit"
              desc="Custom VFX cut to a Kid Cudi set."
              src={vid("krl_kid_cudi.mp4")}
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ---------- videos ---------- */
function VideoCard({ title, src, poster }: { title: string; src?: string; poster?: string }) {
  const [muted, setMuted] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useLazyVideo(cardRef);
  const toggleMute = () => {
    setMuted((m) => {
      if (videoRef.current) videoRef.current.muted = !m;
      return !m;
    });
  };
  return (
    <div
      ref={cardRef}
      className="rounded-xl overflow-hidden glass group hover:border-primary/40 transition-all"
    >
      {src && (
        <div className="relative bg-black">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full block"
          />
          <button
            onClick={toggleMute}
            className="absolute bottom-3 right-3 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-impact uppercase tracking-wide text-sm">{title}</h3>
      </div>
    </div>
  );
}

function Videos() {
  const items = [
    {
      title: "Live at The Grand Woods Lounge",
      src: vid("grand_woods_lounge.mp4"),
      poster: vid("poster_grand_woods_lounge.jpg"),
    },
    {
      title: "Crowd Reaction Clip",
      src: vid("crowd_reaction.mp4"),
      poster: vid("poster_crowd_reaction.jpg"),
    },
    {
      title: "Behind the Decks",
      src: vid("behind_the_decks.mp4"),
      poster: vid("poster_behind_the_decks.jpg"),
    },
    { title: "Crowd Clip", src: vid("crowd_clip.mp4"), poster: vid("poster_crowd_clip.jpg") },
  ];
  return (
    <Section
      id="videos"
      eyebrow="Live footage"
      title={
        <>
          Recent sets. <span className="text-gradient">Live footage.</span>
        </>
      }
    >
      <div className="grid sm:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05}>
            <VideoCard {...item} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- mixes ---------- */
const SC_COLOR = "%2300e676";

function MixCard({ title, url, embedUrl }: { title: string; url: string; embedUrl?: string }) {
  return (
    <div className="glass rounded-xl p-5 hover:border-primary/40 transition">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="font-impact uppercase tracking-wide">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
            SoundCloud Mix
          </p>
        </div>
        <Disc3
          className="w-6 h-6 text-primary shrink-0 animate-spin"
          style={{ animationDuration: "6s" }}
        />
      </div>
      {embedUrl && (
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          frameBorder={0}
          allow="autoplay"
          src={embedUrl}
          className="rounded-lg"
          title={title}
        />
      )}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline uppercase tracking-wider"
      >
        Open on SoundCloud <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}

function Mixes() {
  const mixes = [
    {
      title: "Open-Format Bar Mix",
      url: "https://soundcloud.com/karlkrusel/bar-sample",
      embedUrl: `https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/karlkrusel/bar-sample&color=${SC_COLOR}&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false`,
    },
    {
      title: "KRL Tapes",
      url: "https://soundcloud.com/karlkrusel/krl-tapes",
      embedUrl: `https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/karlkrusel/krl-tapes&color=${SC_COLOR}&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false`,
    },
    {
      title: "KRL Tapes Vol. 1",
      url: "https://soundcloud.com/karlkrusel/krl-tapes-vol-1",
      embedUrl: `https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/karlkrusel/krl-tapes-vol-1&color=${SC_COLOR}&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false`,
    },
  ];
  return (
    <Section
      id="mixes"
      eyebrow="Press play"
      title={
        <>
          Hear how a <span className="text-gradient">set comes together.</span>
        </>
      }
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {mixes.map((m, i) => (
          <Reveal key={m.title} delay={i * 0.05}>
            <MixCard {...m} />
          </Reveal>
        ))}
        <Reveal delay={0.15}>
          <a
            href={SC}
            target="_blank"
            rel="noreferrer"
            className="glass rounded-xl p-5 h-full hover:border-primary/40 transition flex flex-col items-center justify-center gap-3 text-center group"
          >
            <Disc3
              className="w-8 h-8 text-primary group-hover:text-accent transition animate-spin"
              style={{ animationDuration: "6s" }}
            />
            <div>
              <div className="font-impact uppercase tracking-wide">More Mixes</div>
              <div className="text-sm text-muted-foreground mt-1">
                The full catalogue lives on SoundCloud
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-primary group-hover:underline uppercase tracking-wider">
              soundcloud.com/karlkrusel <ExternalLink className="w-3 h-3" />
            </span>
          </a>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------- socials: IG + TikTok follower embeds ---------- */
function TikTokEmbed() {
  useEffect(() => {
    const existing = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
    if (existing) existing.remove();
    const s = document.createElement("script");
    s.src = "https://www.tiktok.com/embed.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);
  return (
    <blockquote
      className="tiktok-embed"
      cite={TT}
      data-unique-id={TT_HANDLE}
      data-embed-type="creator"
      style={{ maxWidth: "100%", minWidth: "288px", margin: 0 }}
    >
      <section>
        <a target="_blank" rel="noreferrer" href={TT}>
          @{TT_HANDLE}
        </a>
      </section>
    </blockquote>
  );
}

function Socials() {
  return (
    <Section
      id="socials"
      eyebrow="Stay connected"
      title={
        <>
          Latest from <span className="text-gradient">the feed.</span>
        </>
      }
    >
      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        {/* Instagram follow card */}
        <Reveal className="h-full">
          <a
            href={IG}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col h-full glass rounded-2xl p-7 hover:border-accent/50 transition"
          >
            <div className="flex items-center justify-between">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#feda75,#d62976,#962fbf,#4f5bd5)" }}
              >
                <Instagram className="w-7 h-7 text-white" />
              </div>
              <span className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-accent group-hover:underline">
                Open <ExternalLink className="w-3 h-3" />
              </span>
            </div>
            <div className="mt-6 font-impact uppercase text-3xl tracking-wide">@{IG_HANDLE}</div>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Clips from recent sets, behind the decks, and upcoming dates. Follow along to see where
              I'm playing next.
            </p>
            <span
              className="mt-auto flex w-full items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-white font-bold uppercase tracking-wider text-sm transition group-hover:scale-[1.02] group-hover:brightness-110"
              style={{ background: "linear-gradient(135deg,#feda75,#d62976,#962fbf,#4f5bd5)" }}
            >
              <Instagram className="w-4 h-4" /> Follow on Instagram
            </span>
          </a>
        </Reveal>

        {/* TikTok live follower embed */}
        <Reveal delay={0.1} className="h-full">
          <div className="flex flex-col h-full glass rounded-2xl p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4 px-1">
              <span className="text-xs uppercase tracking-widest text-primary">TikTok</span>
              <span className="text-xs text-muted-foreground">
                live follower count + latest videos
              </span>
            </div>
            <div className="flex-1 rounded-xl overflow-hidden bg-white/95 min-h-[300px]">
              <TikTokEmbed />
            </div>
            <a
              href={TT}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-xs text-primary hover:underline uppercase tracking-wider"
            >
              Open TikTok <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------- gear ---------- */
function Gear() {
  const gear = [
    { title: "AlphaTheta XDJ-AZ", desc: "Flagship club-level DJ unit. My main." },
    { title: "JBL Professional Sound", desc: "Full pro audio system I bring myself." },
    { title: 'Mid Speakers + 18" Sub', desc: "Two mids and an 18 inch subwoofer." },
    { title: "Custom Visuals & VFX", desc: "Loops built for every theme." },
  ];
  return (
    <Section
      id="gear"
      eyebrow="The rig"
      title={
        <>
          Professional kit for <span className="text-gradient">any room.</span>
        </>
      }
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {gear.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.05}>
            <div className="glass rounded-xl p-5 h-full border-l-2 border-l-primary">
              <Speaker className="w-5 h-5 text-primary mb-3" />
              <h3 className="font-impact uppercase tracking-wide text-sm">{g.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{g.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- contact / big CTA ---------- */
function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-36 px-5">
      <div className="absolute inset-0 z-0">
        <img
          src={photo("decks-1074.jpg")}
          alt=""
          className="w-full h-full object-cover object-center opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.35em] text-primary mb-4 animate-flicker">
            Get in touch
          </div>
          <h2 className="font-impact uppercase text-5xl md:text-7xl leading-[0.9] text-glow">
            Book <span className="text-gradient">KRL</span> for your next night
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Bars, clubs, weddings, brand activations, private parties. Send me your date, venue, and
            what you have in mind, and I'll follow up with availability and exactly what I can bring
            to make the night a success.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${EMAIL}?subject=Booking%20Inquiry%20for%20KRL`}
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm animate-glow-pulse hover:shadow-glow-strong hover:scale-[1.02] transition"
          >
            <Send className="w-4 h-4" /> Send a booking inquiry
          </a>
        </Reveal>

        <Reveal
          delay={0.15}
          className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm"
        >
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition"
          >
            <Mail className="w-4 h-4 text-primary" /> {EMAIL.toLowerCase()}
          </a>
          <a
            href={IG}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition"
          >
            <Instagram className="w-4 h-4 text-accent" /> @{IG_HANDLE}
          </a>
          <a
            href={SC}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition"
          >
            <Music2 className="w-4 h-4 text-primary" /> soundcloud.com/karlkrusel
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-primary/15 py-10 px-5">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="tracking-wider flex items-center gap-2">
          <span
            style={{ fontFamily: '"Tourner", var(--font-display)' }}
            className="text-glow font-bold text-xl"
          >
            KRL
          </span>
          <span className="text-muted-foreground/60">|</span> Karl Krusel · DJ, Sound & Visuals
        </div>
        <div className="text-xs uppercase tracking-widest">
          © {new Date().getFullYear()} KRL · Grand Rapids, MI
        </div>
      </div>
    </footer>
  );
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setP(max > 0 ? h.scrollTop / max : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-[3px] pointer-events-none">
      <div
        className="scroll-progress h-full w-full"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}

function KRLPortfolio() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Offer />
        <Book />
        <Visuals />
        <Videos />
        <Mixes />
        <Socials />
        <Gear />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
