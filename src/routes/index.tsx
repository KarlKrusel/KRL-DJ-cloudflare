import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: KRLPortfolio,
});

/* =====================================================================
   CONTENT: edit everything on the site from here
   ===================================================================== */
const EMAIL = "krusel.karl@gmail.com";
const IG_HANDLE = "karlkrusel";
const TT_HANDLE = "karlkrusel";
const IG = `https://www.instagram.com/${IG_HANDLE}/`;
const TT = `https://www.tiktok.com/@${TT_HANDLE}`;
const SC = "https://soundcloud.com/karlkrusel";

/* web-sized videos (720p, fast start) served from this site */
const vid = (file: string) => `/videos/web/${file}`;
const poster = (file: string) => `/videos/${file}`;
const photo = (file: string) => `/photos/${file}`;

const NAV: [string, string][] = [
  ["about", "About"],
  ["screenshow", "Screen Show"],
  ["media", "Media"],
  ["dates", "Dates"],
  ["mixes", "Mixes"],
  ["contact", "Book"],
];

const MARQUEE = [
  "Open-Format",
  "House",
  "Drum & Bass",
  "Dubstep",
  "Top Hits",
  "Throwbacks",
  "Screen Show Visuals",
  "Pro JBL Sound",
  "Bars & Clubs",
  "Weddings",
  "Private Events",
];

const STATS = [
  { value: "5+ yrs", label: "Behind the decks" },
  { value: "2 Residencies", label: "Grand Woods + Rapid River" },
  { value: "Screen Show", label: "Live visuals I built" },
  { value: "Own rig", label: "Pro JBL sound" },
];

/* where I play */
const VENUES = [
  { name: "The Grand Woods Lounge", city: "Grand Rapids, MI", label: "Residency" },
  { name: "Rapid River", city: "Open-format nights", label: "Residency" },
  { name: "River Rush Thursdays", city: "Rapid River · Weekly", label: "Coming Soon" },
  { name: "The B.O.B.", city: "Big Old Bass · Grand Rapids, MI", label: "Bass Night" },
  { name: "Dublin", city: "Fill-in sets", label: "Guest DJ" },
];

/* upcoming dates: add one line per gig, e.g.
   { date: "2026-12-04", venue: "Rapid River", city: "River Rush Thursdays", ticketUrl: "" } */
const UPCOMING: { date: string; venue: string; city: string; ticketUrl?: string }[] = [];

const SERVICES = [
  {
    title: "Open-Format Sets",
    text: "I blend genres in real time based on what the room is doing. No fixed setlist.",
  },
  {
    title: "Bars & Clubs",
    text: "High-energy sets built to keep the floor packed from open to close.",
  },
  {
    title: "Private Events",
    text: "Weddings, parties, corporate nights. I tailor the set to your crowd and your vibe.",
  },
  {
    title: "Every Genre",
    text: "House, drum and bass, dubstep, top hits, throwbacks. I've got it covered.",
  },
  {
    title: "Pro JBL Sound",
    text: "I bring my own full sound system. Two mids and an 18 inch sub.",
  },
  {
    title: "Screen Show Visuals",
    text: "Live visuals on the venue's screens, synced to the music and branded to your venue.",
  },
];

const RIG = [
  { title: "AlphaTheta XDJ-AZ", text: "Flagship club-level controller. My main setup." },
  { title: "JBL Professional Sound", text: "Full pro audio system I bring to every show." },
  { title: 'Mid Speakers + 18" Sub', text: "Two mids and an 18 inch subwoofer." },
  { title: "Screen Show", text: "Live visuals built for your theme and your room." },
];

type MediaItem = {
  id: string;
  title: string;
  caption?: string;
  src: string;
  poster: string;
  orientation: "portrait" | "landscape";
  hasAudio?: boolean;
};

const LIVE: MediaItem[] = [
  {
    id: "grand-woods",
    title: "Live at The Grand Woods Lounge",
    src: vid("grand_woods_lounge.mp4"),
    poster: poster("poster_grand_woods_lounge.jpg"),
    orientation: "portrait",
    hasAudio: true,
  },
  {
    id: "crowd-reaction",
    title: "Crowd Reaction Clip",
    src: vid("crowd_reaction.mp4"),
    poster: poster("poster_crowd_reaction.jpg"),
    orientation: "portrait",
    hasAudio: true,
  },
  {
    id: "behind-decks",
    title: "Behind the Decks",
    src: vid("behind_the_decks.mp4"),
    poster: poster("poster_behind_the_decks.jpg"),
    orientation: "portrait",
    hasAudio: true,
  },
  {
    id: "crowd-clip",
    title: "Crowd Clip",
    src: vid("crowd_clip.mp4"),
    poster: poster("poster_crowd_clip.jpg"),
    orientation: "portrait",
    hasAudio: true,
  },
];

const VISUALS: MediaItem[] = [
  {
    id: "st-patricks",
    title: "St. Patrick's Day Loop",
    caption: "Holiday visuals with the venue logo and KRL branding built into a themed green loop.",
    src: vid("krl_saint_paddies_v2_tv_loop_30s_falling_soft.mp4"),
    poster: poster("poster_krl_saint_paddies_v2_tv_loop_30s_falling_soft.jpg"),
    orientation: "landscape",
  },
  {
    id: "branded-venue",
    title: "Branded Venue Loop",
    caption: "Custom visuals built around your logo and brand.",
    src: vid("woods_logo_sample_krl.mp4"),
    poster: poster("poster_woods_logo_sample_krl.jpg"),
    orientation: "landscape",
  },
  {
    id: "cosmic",
    title: "Cosmic Gradient Loop",
    caption: "Abstract VFX for when you want the atmosphere to feel immersive.",
    src: vid("KRL_cosmic_gradient.mp4"),
    poster: poster("poster_KRL_cosmic_gradient.jpg"),
    orientation: "landscape",
  },
  {
    id: "kid-cudi",
    title: "KRL — Kid Cudi Edit",
    caption: "Custom VFX cut to a Kid Cudi set.",
    src: vid("krl_kid_cudi.mp4"),
    poster: poster("poster_krl_kid_cudi.jpg"),
    orientation: "landscape",
  },
];

/* Screen Show demo: set `src` to the demo video when it's ready */
const SCREENSHOW_DEMO = {
  src: "",
  poster: poster("poster_woods_logo_sample_krl.jpg"),
};

const PHOTOS = [
  { id: "hero", title: "Live at the decks", src: photo("hero-1073.jpg"), alt: "KRL DJing at a packed show", width: 2048, height: 1363 },
  { id: "portrait-1", title: "Behind the decks", src: photo("portrait-1071.jpg"), alt: "KRL behind the decks", width: 1363, height: 2048 },
  { id: "crowd", title: "The crowd", src: photo("crowd-1075.jpg"), alt: "Crowd at a KRL set", width: 1363, height: 2048 },
  { id: "decks", title: "The rig", src: photo("decks-1074.jpg"), alt: "KRL's DJ setup", width: 2048, height: 1363 },
  { id: "portrait-2", title: "Locked in", src: photo("portrait-1072.jpg"), alt: "KRL mixing live", width: 1363, height: 2048 },
];

const SC_COLOR = "%2300e676";
const MIXES = [
  { title: "Open-Format Bar Mix", path: "bar-sample" },
  { title: "KRL Tapes", path: "krl-tapes" },
  { title: "KRL Tapes Vol. 1", path: "krl-tapes-vol-1" },
];

const EVENT_TYPES = ["Bar / Club", "Wedding", "Private Party", "Corporate", "Screen Show", "Other"];

/* =====================================================================
   HERO (kept from the original site: full-bleed photo + glowing logo)
   ===================================================================== */
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

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-background"
    >
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

      <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-pulse-glow z-0" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full bg-accent/15 blur-3xl animate-drift z-0" />

      <div className="relative z-10 site-width pt-28 pb-20">
        <div className="flex items-center gap-3 mb-5">
          <Equalizer />
          <span className="text-xs uppercase tracking-[0.35em] text-primary animate-flicker">
            Now booking 2026
          </span>
        </div>

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
          I'm Karl Krusel, known as KRL. Grand Rapids based, originally from Traverse City. I bring
          my own professional rig, read the room, and keep the energy right all night. Bars, clubs,
          weddings, private events. Whatever the night calls for.
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

      <a
        href="#about"
        className="absolute z-10 bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition"
      >
        Meet Karl <ArrowDown className="w-3 h-3" />
      </a>
    </section>
  );
}

/* =====================================================================
   HEADER
   ===================================================================== */
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="site-width header-inner">
        <a href="#top" className="krl-wordmark header-logo" aria-label="KRL home">
          KRL
        </a>
        <nav aria-label="Main navigation" className="desktop-nav">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a href="#contact" className="brand-action header-book">
            Book <ArrowUpRight className="w-4 h-4" />
          </a>
          <button
            type="button"
            className="mobile-trigger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="phone-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="phone-menu" aria-label="Phone navigation" className="phone-menu">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
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
      <div className="scroll-progress h-full w-full" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}

function Marquee() {
  return (
    <div className="marquee" aria-label={MARQUEE.join(", ")}>
      <div className="marquee-track" aria-hidden="true">
        {/* two identical copies, each wide enough to cover big monitors, so the loop never shows a gap */}
        {[0, 1].map((copy) => (
          <div className="marquee-copy" key={copy}>
            {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => (
              <span key={`${t}-${i}`}>{t}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =====================================================================
   VIDEO: nothing autoplays. Tap a video to play it; only one plays at a
   time, and a video pauses when it's scrolled out of view.
   ===================================================================== */
let activeVideo: HTMLVideoElement | null = null;

type PlayState = "idle" | "loading" | "playing" | "paused" | "error";

function MediaFrame({ item }: { item: MediaItem }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<PlayState>("idle");
  const [muted, setMuted] = useState(!item.hasAudio);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    if (activeVideo && activeVideo !== v) activeVideo.pause();
    activeVideo = v;
    if (state === "error" || !v.getAttribute("src")) {
      v.src = item.src;
      v.load();
    }
    v.muted = muted;
    setState("loading");
    v.play().catch((err: DOMException) => {
      if (err?.name === "NotAllowedError" && !v.muted) {
        // browser blocked sound: play muted instead
        v.muted = true;
        setMuted(true);
        v.play().catch(() => setState("paused"));
      } else if (err?.name !== "AbortError") {
        setState("error");
      }
    });
  };

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (state === "playing" || state === "loading") v.pause();
    else play();
  };

  /* pause when the video is scrolled away (up/down or sideways in a rail) */
  useEffect(() => {
    const v = ref.current;
    if (!v || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.intersectionRatio < 0.35 && !v.paused) v.pause();
      },
      { threshold: [0, 0.35] },
    );
    io.observe(v);
    return () => {
      io.disconnect();
      v.pause();
      if (activeVideo === v) activeVideo = null;
    };
  }, []);

  const showOverlay = state !== "playing";
  return (
    <div className={`media-frame ${item.orientation}`}>
      <video
        ref={ref}
        poster={item.poster}
        loop
        playsInline
        preload="none"
        aria-label={item.title}
        onClick={toggle}
        onPlaying={() => setState("playing")}
        onWaiting={() => setState("loading")}
        onPause={() => setState((s) => (s === "error" ? s : "paused"))}
        onError={() => setState("error")}
      />
      {showOverlay && (
        <button
          type="button"
          className="media-overlay"
          aria-label={`${state === "paused" ? "Resume" : "Play"} ${item.title}`}
          onClick={toggle}
        >
          <span className={`play-badge ${state === "loading" ? "is-loading" : ""}`}>
            {state === "loading" ? <span className="spinner" /> : <Play className="w-6 h-6" />}
          </span>
          {state === "error" && <span className="media-error">Video didn't load. Tap to try again.</span>}
        </button>
      )}
      {state === "playing" && (
        <button
          type="button"
          className="media-pause"
          aria-label={`Pause ${item.title}`}
          onClick={toggle}
        >
          <Pause className="w-4 h-4" />
        </button>
      )}
      {item.hasAudio && (
        <button
          type="button"
          className="media-audio"
          aria-label={`${muted ? "Unmute" : "Mute"} ${item.title}`}
          onClick={() => {
            const v = ref.current;
            const next = !muted;
            if (v) v.muted = next;
            setMuted(next);
          }}
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}

function RailArrows({
  target,
  label,
  className = "",
}: {
  target: React.RefObject<HTMLDivElement | null>;
  label: string;
  className?: string;
}) {
  const scroll = (dir: 1 | -1) =>
    target.current?.scrollBy({ left: dir * target.current.clientWidth * 0.65, behavior: "smooth" });
  return (
    <div className={`gallery-arrows ${className}`}>
      <button type="button" className="arrow-control" aria-label={`Previous ${label}`} onClick={() => scroll(-1)}>
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button type="button" className="arrow-control" aria-label={`Next ${label}`} onClick={() => scroll(1)}>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function VideoRail({ items, label, className = "" }: { items: MediaItem[]; label: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div>
      <RailArrows target={ref} label={label} className="rail-arrows" />
      <div ref={ref} className={`media-rail ${className}`} aria-label={label}>
        {items.map((item) => (
          <article key={item.id} className={item.orientation === "portrait" ? "live-item" : "visual-item"}>
            <MediaFrame item={item} />
            <div className="media-meta">
              <h3>{item.title}</h3>
              {item.caption && <p>{item.caption}</p>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* =====================================================================
   SECTIONS
   ===================================================================== */
function About() {
  return (
    <section id="about" className="site-width section-space about-grid reveal">
      <div>
        <img
          className="portrait-photo"
          src={photo("portrait-1071.jpg")}
          alt="KRL DJing"
          width={1363}
          height={2048}
          loading="lazy"
        />
        <div className="photo-caption">
          <span>Karl Krusel / KRL</span>
          <span>Behind the decks</span>
        </div>
      </div>
      <div>
        <p className="eyebrow">Who I am</p>
        <h2 className="section-title about-title">
          Reading the room.
          <br />
          Setting the tone.
        </h2>
        <div className="about-copy">
          <p className="body-copy lead">
            I do this differently. I've been DJing for about five years, the last one
            professionally, and I come from an IT background. I know the tech, I know the DJ
            business, and I know how to read a crowd.
          </p>
          <p className="body-copy">
            Reading a room is a lot more than playing songs people know. Every track is a choice.
            Some fill the floor, some send people to the bar, some bring the energy down so the next
            peak hits harder. I'm playing to move the crowd and to help the venue have a great night
            at the register too.
          </p>
          <p className="body-copy">
            Bass and dubstep are what I love most, but most of my work is open-format. Top hits,
            house, drum and bass, throwbacks. Whatever the room needs. I hold residencies at The
            Grand Woods Lounge and Rapid River, and play bars and events across Michigan.
          </p>
          <p className="body-copy">
            Add Screen Show, my own software that runs live visuals on the venue's screens in sync
            with the music, and you get a night that looks and sounds different from any DJ you've
            seen before.
          </p>
        </div>
        <div className="stats">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="stat-value">{s.value}</div>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScreenShow() {
  const benefits = [
    {
      title: "Plugged into the set",
      text: "Screen Show connects right to my DJ gear, so the screens always know what's playing.",
    },
    {
      title: "Every drop lands",
      text: "It reads the music live, so the visuals hit on the beat. Even when the drums aren't on a straight four.",
    },
    {
      title: "Your venue, on screen",
      text: "Your logo, a holiday, a theme. Visuals built for your room, not pulled off YouTube.",
    },
  ];
  return (
    <section id="screenshow" className="screenshow">
      <div className="site-width">
        <div className="screen-heading">
          <div className="screen-brand">
            Screen<span>Show</span>
          </div>
          <span className="screen-badge">Live visuals by KRL</span>
        </div>

        <div className="demo">
          {SCREENSHOW_DEMO.src ? (
            <MediaFrame
              item={{
                id: "demo",
                title: "Screen Show demo",
                src: SCREENSHOW_DEMO.src,
                poster: SCREENSHOW_DEMO.poster,
                orientation: "landscape",
              }}
            />
          ) : (
            <>
              <img
                src={SCREENSHOW_DEMO.poster}
                alt="A Grand Woods Lounge branded visual loop on the venue screens"
                width={1280}
                height={720}
                loading="lazy"
              />
              <span className="demo-mark">Demo coming soon</span>
              <div className="demo-label">
                <strong>Screen Show live demo</strong>
                <p>Full demo video on the way.</p>
              </div>
            </>
          )}
        </div>

        <div className="screen-copy reveal">
          <div>
            <p className="eyebrow">Every screen. Part of the set.</p>
            <h2 className="section-title screen-title">
              Visuals that hit
              <br />
              on the beat.
            </h2>
            <p className="screen-intro">
              Screen Show is software I built that turns the TVs in your venue into part of the
              show. It follows the music live, so the visuals move with the set instead of looping on
              a timer.
            </p>
          </div>
          <div>
            {benefits.map((b, i) => (
              <div className="benefit" key={b.title}>
                <span className="benefit-number">0{i + 1}</span>
                <div>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <a href="#contact" className="brand-action">
          Bring Screen Show to your venue <ArrowUpRight className="w-4 h-4" />
        </a>

        <div className="loop-heading">
          <h3>A few looks from the screens</h3>
          <p>
            I build custom visual loops that run on venue TVs, projectors, and screens during a set.
            I can design them around a holiday, a theme, your event, your logo, or your brand.
            Everything in the room works together, from the music to the screens.
          </p>
        </div>
        <VideoRail items={VISUALS} label="Screen Show example loops" className="loop-rail" />
      </div>
    </section>
  );
}

function Media({ onPhoto }: { onPhoto: (index: number, el: HTMLElement) => void }) {
  const tabs = ["Live", "Photos", "Visuals"] as const;
  const [tab, setTab] = useState<(typeof tabs)[number]>("Live");
  const photoRail = useRef<HTMLDivElement>(null);
  return (
    <section id="media" className="site-width section-space">
      <div className="reveal">
        <p className="eyebrow">Live footage</p>
        <h2 className="section-title">
          Recent sets.
          <br />
          Live footage.
        </h2>
      </div>

      <div className="gallery-top">
        <div className="gallery-tabs" role="tablist" aria-label="Media categories">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              id={`tab-${t}`}
              aria-controls={`panel-${t}`}
              aria-selected={tab === t}
              className="filter-button"
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        {tab === "Photos" && <RailArrows target={photoRail} label="photos" />}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === "Photos" ? (
          <div className="media-rail" ref={photoRail} aria-label="Photos">
            {PHOTOS.map((p, i) => (
              <article key={p.id} className="photo-item">
                <button
                  type="button"
                  className="photo-open"
                  aria-label={`Open photo: ${p.title}`}
                  onClick={(e) => onPhoto(i, e.currentTarget)}
                >
                  <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" />
                </button>
                <div className="media-meta">
                  <h3>{p.title}</h3>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <VideoRail
            key={tab}
            items={tab === "Live" ? LIVE : VISUALS}
            label={tab === "Live" ? "live footage" : "visuals"}
          />
        )}
      </div>
    </section>
  );
}

function Dates() {
  const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  return (
    <section id="dates" className="dates-band">
      <div className="site-width dates-grid reveal">
        <div>
          <p className="eyebrow">Where I play</p>
          <h2 className="section-title">
            Catch me
            <br />
            on the decks.
          </h2>
          <p className="section-subtitle">
            Plus bars, clubs, weddings, and private events all over Michigan.
          </p>
          <p className="section-subtitle">
            Want KRL at your spot? Send me your date and venue and I'll check availability and put
            something together.
          </p>
          <a href="#contact" className="text-link mt-6">
            Check availability <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <div>
          {VENUES.map((v) => (
            <div className="venue-row" key={v.name}>
              <div>
                <h3 className="venue-name">{v.name}</h3>
                <p className="venue-city">{v.city}</p>
              </div>
              <span className="venue-label">{v.label}</span>
            </div>
          ))}
          <div className="upcoming">
            <h3>Upcoming dates</h3>
            {UPCOMING.length ? (
              UPCOMING.map((d) => (
                <div className="date-row" key={d.date + d.venue}>
                  <time dateTime={d.date}>{fmt.format(new Date(d.date + "T12:00:00Z"))}</time>
                  <div>
                    <strong>{d.venue}</strong>
                    <p className="venue-city">{d.city}</p>
                  </div>
                  {d.ticketUrl && (
                    <a className="ml-auto mix-link" href={d.ticketUrl} target="_blank" rel="noreferrer">
                      Tickets <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p className="empty-dates">
                New dates are on the way.
                <br />
                Follow{" "}
                <a href={IG} target="_blank" rel="noreferrer" className="text-foreground">
                  @{IG_HANDLE}
                </a>{" "}
                to see where I'm playing next.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="site-width section-space services-grid reveal">
      <div>
        <p className="eyebrow">What you get</p>
        <h2 className="section-title">
          A complete
          <br />
          audio-visual
          <br />
          experience.
        </h2>
        <div className="rig">
          <h3>The rig</h3>
          <div className="rig-list">
            {RIG.map((r) => (
              <div key={r.title}>
                <strong>{r.title}</strong>
                <span>{r.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="service-list">
        {SERVICES.map((s, i) => (
          <div key={s.title}>
            <p className="service-number">0{i + 1}</p>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Mixes() {
  return (
    <section id="mixes" className="mixes-section">
      <div className="site-width">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Press play</p>
            <h2 className="section-title">Hear how a set comes together.</h2>
          </div>
          <a className="mix-link" href={SC} target="_blank" rel="noreferrer">
            Everything else is on SoundCloud <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
        <div className="mix-grid">
          {MIXES.map((m) => (
            <div className="mix-item" key={m.path}>
              <h3>{m.title}</h3>
              <iframe
                loading="lazy"
                title={m.title}
                height={166}
                allow="autoplay"
                src={`https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/karlkrusel/${m.path}&color=${SC_COLOR}&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false`}
              />
              <a className="mix-link" href={`${SC}/${m.path}`} target="_blank" rel="noreferrer">
                Open on SoundCloud <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Socials() {
  return (
    <section id="socials" className="site-width social-strip">
      <p>Clips from sets, behind the decks, and upcoming dates. Follow to see where I'm playing next.</p>
      <div className="social-links">
        <a href={IG} target="_blank" rel="noreferrer">
          <Instagram className="w-4 h-4" /> Instagram <ArrowUpRight className="w-3 h-3" />
        </a>
        <a href={TT} target="_blank" rel="noreferrer">
          TikTok <ArrowUpRight className="w-3 h-3" />
        </a>
        <a href={SC} target="_blank" rel="noreferrer">
          SoundCloud <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </section>
  );
}

/* booking form: opens the visitor's email app with the request filled in */
function BookingForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const fields = [
    { name: "name", label: "Your name", type: "text", auto: "name" },
    { name: "email", label: "Email address", type: "email", auto: "email" },
    { name: "eventDate", label: "Event date", type: "date", auto: "off" },
    { name: "venueCity", label: "Venue / city", type: "text", auto: "off" },
  ];

  const validate = (d: Record<string, string>) => {
    const e: Record<string, string> = {};
    if (!d.name?.trim()) e.name = "Add your name so I know who to reply to.";
    if (!/^\S+@\S+\.\S+$/.test(d.email ?? "")) e.email = "Add an email I can reply to.";
    if (!d.eventDate) e.eventDate = "Pick your event date.";
    if (!d.venueCity?.trim()) e.venueCity = "Add the venue or city.";
    if (!d.eventType) e.eventType = "Pick the type of event.";
    if (!d.message?.trim()) e.message = "Tell me a little about the night.";
    return e;
  };

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) return;
    const subject = `Booking request: ${data.eventType} on ${data.eventDate}`;
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Event date: ${data.eventDate}`,
      `Venue / city: ${data.venueCity}`,
      `Event type: ${data.eventType}`,
      "",
      data.message,
    ].join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    form.reset();
  };

  if (sent)
    return (
      <div className="booking-success" role="status">
        <Check className="text-primary mb-5" />
        <h3>Almost there.</h3>
        <p>
          Your email app should have opened with everything filled in. Hit send and I'll get back to
          you with availability. Didn't open? Email me at{" "}
          <a href={`mailto:${EMAIL}`} className="text-foreground underline">
            {EMAIL}
          </a>
          .
        </p>
        <button type="button" className="quiet-action" onClick={() => setSent(false)}>
          Start a new request <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );

  return (
    <form className="booking-form" onSubmit={onSubmit} noValidate>
      {fields.map((f) => (
        <div className="field" key={f.name}>
          <label htmlFor={`booking-${f.name}`}>{f.label}</label>
          <input
            id={`booking-${f.name}`}
            name={f.name}
            type={f.type}
            autoComplete={f.auto}
            required
            aria-invalid={!!errors[f.name]}
            aria-describedby={errors[f.name] ? `error-${f.name}` : undefined}
            onInput={() => errors[f.name] && setErrors(({ [f.name]: _, ...rest }) => rest)}
          />
          {errors[f.name] && (
            <p className="field-error" id={`error-${f.name}`}>
              {errors[f.name]}
            </p>
          )}
        </div>
      ))}
      <div className="field full">
        <label htmlFor="booking-type">Event type</label>
        <select
          id="booking-type"
          name="eventType"
          defaultValue=""
          required
          aria-invalid={!!errors.eventType}
          onChange={() => errors.eventType && setErrors(({ eventType: _, ...rest }) => rest)}
        >
          <option value="" disabled>
            Select your event
          </option>
          {EVENT_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        {errors.eventType && <p className="field-error">{errors.eventType}</p>}
      </div>
      <div className="field full">
        <label htmlFor="booking-message">What do you have in mind?</label>
        <textarea
          id="booking-message"
          name="message"
          rows={4}
          required
          aria-invalid={!!errors.message}
          onInput={() => errors.message && setErrors(({ message: _, ...rest }) => rest)}
        />
        {errors.message && <p className="field-error">{errors.message}</p>}
      </div>
      <button type="submit" className="brand-action booking-submit">
        Send booking request <ArrowUpRight className="w-4 h-4" />
      </button>
      <p className="form-note">This opens your email app with your request filled in, ready to send.</p>
    </form>
  );
}

function Contact() {
  return (
    <section id="contact" className="site-width section-space booking-grid">
      <div className="reveal">
        <p className="eyebrow">Get in touch</p>
        <h2 className="section-title">Book KRL for your next night.</h2>
        <p className="body-copy booking-copy">
          Bars, clubs, weddings, brand nights, private parties. Send me your date, venue, and what
          you have in mind. I'll get back to you with availability and what I can bring to make it a
          good night.
        </p>
        <div className="booking-alternatives">
          <a href={`mailto:${EMAIL}?subject=Booking%20Inquiry%20for%20KRL`}>
            <Mail className="w-4 h-4 text-primary" /> {EMAIL}
          </a>
          <a href={IG} target="_blank" rel="noreferrer">
            <Instagram className="w-4 h-4 text-primary" /> @{IG_HANDLE} <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
      <BookingForm />
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-width">
        <div className="footer-main">
          <div>
            <a className="krl-wordmark header-logo" href="#top">
              KRL
            </a>
            <p className="section-subtitle">Karl Krusel · DJ, Sound & Visuals</p>
          </div>
          <div>
            <nav className="footer-nav" aria-label="Footer navigation">
              {NAV.map(([id, label]) => (
                <a key={id} href={`#${id}`}>
                  {label}
                </a>
              ))}
            </nav>
            <div className="footer-contact">
              <a href={IG} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href={TT} target="_blank" rel="noreferrer">
                TikTok
              </a>
              <a href={SC} target="_blank" rel="noreferrer">
                SoundCloud
              </a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} KRL</span>
          <span>Grand Rapids, MI · Available statewide</span>
        </div>
      </div>
    </footer>
  );
}

function Lightbox({
  index,
  setIndex,
  close,
}: {
  index: number;
  setIndex: (i: number) => void;
  close: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const n = PHOTOS.length;
  const p = PHOTOS[index];
  const prev = () => setIndex((index + n - 1) % n);
  const next = () => setIndex((index + 1) % n);

  useEffect(() => {
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Tab") {
        const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>(".lightbox button"));
        const first = buttons[0];
        const last = buttons.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery"
      onClick={(e) => e.target === e.currentTarget && close()}
      onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        const x = e.changedTouches[0]?.clientX;
        if (touchX.current !== null && x !== undefined && Math.abs(x - touchX.current) > 40)
          x < touchX.current ? next() : prev();
      }}
    >
      <button ref={closeRef} type="button" className="arrow-control lightbox-close" aria-label="Close photo gallery" onClick={close}>
        <X className="w-4 h-4" />
      </button>
      <button type="button" className="arrow-control lightbox-prev" aria-label="Previous photo" onClick={prev}>
        <ChevronLeft className="w-4 h-4" />
      </button>
      <img src={p.src} alt={p.alt} width={p.width} height={p.height} />
      <button type="button" className="arrow-control lightbox-next" aria-label="Next photo" onClick={next}>
        <ChevronRight className="w-4 h-4" />
      </button>
      <div className="lightbox-caption">
        <span>{p.title}</span>
        <span>
          {index + 1} / {n}
        </span>
      </div>
    </div>
  );
}

/* =====================================================================
   PAGE
   ===================================================================== */
function KRLPortfolio() {
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <ScreenShow />
        <Media
          onPhoto={(i, el) => {
            opener.current = el;
            setPhotoIndex(i);
          }}
        />
        <Dates />
        <Services />
        <Mixes />
        <Socials />
        <Contact />
      </main>
      <Footer />
      <a href="#contact" className="brand-action mobile-book">
        Book KRL <ArrowUpRight className="w-4 h-4" />
      </a>
      {photoIndex !== null && (
        <Lightbox
          index={photoIndex}
          setIndex={setPhotoIndex}
          close={() => {
            setPhotoIndex(null);
            opener.current?.focus();
          }}
        />
      )}
    </div>
  );
}
