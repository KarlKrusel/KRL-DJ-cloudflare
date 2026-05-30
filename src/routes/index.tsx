import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect, type RefObject } from "react";

function useLazyVideo(
  src: string,
  containerRef?: RefObject<HTMLElement | null>
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const activated = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;
    const target: Element = (containerRef?.current as Element | null) ?? video;

    const activate = () => {
      if (activated.current) return;
      activated.current = true;
      video.src = src;
      video.load();
      video.play().catch(() => {});
    };

    const enter = () => {
      activate();
      if (video.paused) video.play().catch(() => {});
    };

    // Sync check — play immediately if already in view, no async IO wait
    const rect = target.getBoundingClientRect();
    if (rect.top < window.innerHeight + 300 && rect.bottom > -300) {
      activate();
    }

    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) enter(); else video.pause(); },
      { threshold: 0, rootMargin: "300px 0px" }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return videoRef;
}
import {
  Music2, Video, Mail, Instagram, MapPin, Phone, Speaker, Sparkles,
  Disc3, Headphones, Calendar, Send, ExternalLink, Volume2, VolumeX,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: KRLPortfolio,
});

const BASE = import.meta.env.BASE_URL;
const vid = (file: string) => `${BASE}videos/${file}`;

const EMAIL = "KRUSEL.KARL@GMAIL.COM";
const PHONE = "231-493-1156";
const IG = "https://www.instagram.com/karlkrusel/";
const SC = "https://soundcloud.com/karlkrusel";

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["About", "#about"], ["Offer", "#offer"], ["Visuals", "#visuals"],
    ["Videos", "#videos"], ["Mixes", "#mixes"], ["Contact", "#contact"],
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass">
      <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
        <a href="#top" style={{ fontFamily: '"Tourner", var(--font-display)' }} className="font-bold tracking-widest text-2xl">
          KRL<span className="text-gradient">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="hover:text-foreground transition-colors">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contact" className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition">
            Book
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-foreground transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-foreground transition-all duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-foreground transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          {links.map(([l, h]) => (
            <a
              key={h}
              href={h}
              onClick={() => setOpen(false)}
              className="block px-5 py-3.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors"
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
    <div className="flex items-end gap-1 h-10">
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
    <section id="top" className="relative min-h-screen flex items-center bg-hero overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 z-0" />
      <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-primary/20 blur-3xl animate-pulse-glow z-0" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl animate-pulse-glow z-0" style={{ animationDelay: "1s" }}/>

      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-28 pb-20 w-full">
        <div className="flex items-center gap-3 mb-6">
          <Equalizer />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Now Playing</span>
        </div>
        <h1 style={{ fontFamily: '"Tourner", var(--font-display)' }} className="font-normal text-[28vw] md:text-[20rem] leading-none tracking-tighter">
          <span className="text-gradient">KRL</span>
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-medium text-foreground/90">
          Open-Format DJ <span className="text-muted-foreground">/</span> Custom Visuals <span className="text-muted-foreground">/</span> Professional Sound
        </p>
        <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
          I'm Karl Krusel, professionally known as KRL. A Grand Rapids based DJ originally from Traverse City,
          focused on creating the right atmosphere through music, visuals, and professional sound.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#mixes" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] transition">
            <Headphones className="w-4 h-4" /> Listen to Mixes
          </a>
          <a href="#videos" className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass font-semibold hover:bg-secondary transition">
            <Video className="w-4 h-4" /> Watch Videos
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-accent/50 text-foreground font-semibold hover:bg-accent/10 transition">
            <Mail className="w-4 h-4" /> Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}

function Section({ id, eyebrow, title, children }: { id?: string; eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="py-24 md:py-32 px-5">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3">{eyebrow}</div>
          <h2 className="text-3xl md:text-5xl font-display font-bold max-w-3xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="About" title={<>Reading the room. <span className="text-gradient">Owning the night.</span></>}>
      <div className="grid md:grid-cols-3 gap-8 text-muted-foreground leading-relaxed">
        <p className="text-lg text-foreground/90 md:col-span-2">
          I'm an open-format DJ who knows how to connect with both younger and older crowds. My focus is reading the room,
          keeping people engaged, and playing music that fits the setting — top hits, house, drum and bass, dubstep,
          throwbacks, and crowd-friendly cuts depending on the venue and event.
        </p>
        <div className="glass rounded-xl p-6">
          <div className="text-xs uppercase tracking-widest text-primary mb-2">Residency</div>
          <div className="text-foreground font-semibold">The Grand Woods Lounge</div>
          <div className="text-sm mt-1">Grand Rapids, MI — building crowd response and helping create a strong atmosphere night after night.</div>
        </div>
      </div>
    </Section>
  );
}

const offerings = [
  { icon: Disc3, title: "Open-Format DJ Sets", desc: "Reading the room and blending genres on the fly." },
  { icon: Music2, title: "Bars & Clubs", desc: "High-energy nightlife performances built for the dance floor." },
  { icon: Calendar, title: "Private Events", desc: "Weddings, parties, corporate — tailored to your crowd." },
  { icon: Headphones, title: "Genre Range", desc: "House, DnB, dubstep, top hits, and throwbacks." },
  { icon: Speaker, title: "Pro JBL Sound", desc: "Full professional sound system, ready for any room." },
  { icon: Sparkles, title: "Custom Visuals & VFX", desc: "Visual loops tailored to themes, venues, and brands." },
];

function Offer() {
  return (
    <Section id="offer" eyebrow="What I Offer" title={<>A full <span className="text-gradient">audio-visual</span> experience.</>}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {offerings.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="group glass rounded-xl p-6 hover:border-primary/40 transition-all hover:-translate-y-1">
            <Icon className="w-7 h-7 text-primary mb-4 group-hover:text-accent transition-colors" />
            <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
        <div className="glass rounded-xl p-6 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="text-xs uppercase tracking-widest text-primary mb-2">Setup</div>
          <div className="font-display font-semibold">AlphaTheta XDJ-AZ</div>
          <p className="text-sm text-muted-foreground mt-1">Flagship club-level DJ system.</p>
        </div>
      </div>
    </Section>
  );
}

function VisualCard({ title, desc, src }: { title: string; desc: string; src: string }) {
  const videoRef = useLazyVideo(src);
  return (
    <div className="group rounded-xl overflow-hidden glass hover:border-accent/40 transition-all">
      <div className="aspect-video relative bg-gradient-to-br from-accent/30 via-primary/20 to-background overflow-hidden">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"
        />
        <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-widest text-white/70 z-10">Visual Loop</span>
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{desc}</p>
      </div>
    </div>
  );
}

function Visuals() {
  return (
    <Section
      id="visuals"
      eyebrow="Custom Visuals & VFX"
      title={<>More than music — <span className="text-gradient">a full atmosphere.</span></>}
    >
      <p className="text-muted-foreground max-w-3xl mb-10 leading-relaxed">
        I create custom visual loops that run on venue TVs, projectors, and screens during a set. Built to match
        a holiday, theme, event, logo, or brand — the goal is a complete atmosphere, not just a playlist.
      </p>
      <div className="grid md:grid-cols-3 gap-5">
        <VisualCard
          title="St. Patrick's Day Loop"
          desc="Themed holiday visuals blending the venue's logo and KRL branding into a seamless green-soaked loop."
          src={vid("krl_saint_paddies_v2_tv_loop_30s_falling_soft.mp4")}
        />
        <VisualCard
          title="Branded Venue Loop"
          desc="Custom visuals built around your logo and brand identity."
          src={vid("woods_logo_sample_krl.mp4")}
        />
        <VisualCard
          title="Cosmic Gradient Loop"
          desc="Abstract VFX designed for immersive event atmospheres."
          src={vid("KRL_cosmic_gradient.mp4")}
        />
      </div>
      <div className="flex justify-center mt-5">
        <div className="w-full md:w-1/3">
          <VisualCard
            title="KRL — Kid Cudi Edit"
            desc="Custom VFX cut to a Kid Cudi set."
            src={vid("krl_kid_cudi.mp4")}
          />
        </div>
      </div>
    </Section>
  );
}

function VideoCard({ title, src, poster }: { title: string; src?: string; poster?: string }) {
  const [muted, setMuted] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useLazyVideo(src ?? "", cardRef);

  const toggleMute = () => {
    setMuted((m) => {
      if (videoRef.current) videoRef.current.muted = !m;
      return !m;
    });
  };

  return (
    <div ref={cardRef} className="rounded-xl overflow-hidden glass group hover:border-primary/40 transition-all">
      {src ? (
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            poster={poster}
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <button
            onClick={toggleMute}
            className="absolute bottom-3 right-3 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      ) : (
        <div className="aspect-video relative bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-glow group-hover:scale-110 transition">
            <div className="w-0 h-0 border-l-[14px] border-l-primary-foreground border-y-[9px] border-y-transparent ml-1" />
          </div>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-display font-semibold text-sm">{title}</h3>
      </div>
    </div>
  );
}

function Videos() {
  const items = [
    { title: "Live at The Grand Woods Lounge", src: vid("grand_woods_lounge.mp4"), poster: vid("poster_grand_woods_lounge.jpg") },
    { title: "Crowd Reaction Clip", src: vid("crowd_reaction.mp4"), poster: vid("poster_crowd_reaction.jpg") },
    { title: "Behind the Decks", src: vid("behind_the_decks.mp4"), poster: vid("poster_behind_the_decks.jpg") },
    { title: "Crowd Clip", src: vid("crowd_clip.mp4"), poster: vid("poster_crowd_clip.jpg") },
  ];
  return (
    <Section id="videos" eyebrow="Live DJ Videos" title={<>Behind the decks. <span className="text-gradient">On the floor.</span></>}>
      <div className="grid sm:grid-cols-2 gap-6">
        {items.map((item) => <VideoCard key={item.title} {...item} />)}
      </div>
    </Section>
  );
}

const SC_COLOR = "%2300cc66";

function MixCard({ title, url, embedUrl }: { title: string; url: string; embedUrl?: string }) {
  return (
    <div className="glass rounded-xl p-5 hover:border-primary/40 transition">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="font-display font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1">SoundCloud Mix</p>
        </div>
        <Disc3 className="w-6 h-6 text-primary shrink-0 animate-spin" style={{ animationDuration: "6s" }} />
      </div>
      {embedUrl ? (
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          frameBorder={0}
          allow="autoplay"
          src={embedUrl}
          className="rounded-lg"
        />
      ) : (
        <div className="h-[100px] rounded-lg border border-dashed border-border flex items-center justify-center bg-secondary/30">
          <span className="text-xs text-muted-foreground">No embed available</span>
        </div>
      )}
      <a href={url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">
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
    <Section id="mixes" eyebrow="SoundCloud Mixes" title={<>Press play. <span className="text-gradient">Feel the set.</span></>}>
      <div className="grid sm:grid-cols-2 gap-4">
        {mixes.map((m) => <MixCard key={m.title} {...m} />)}
        <a
          href={SC}
          target="_blank"
          rel="noreferrer"
          className="glass rounded-xl p-5 hover:border-primary/40 transition flex flex-col items-center justify-center gap-3 text-center group"
        >
          <Disc3 className="w-8 h-8 text-primary group-hover:text-accent transition animate-spin" style={{ animationDuration: "6s" }} />
          <div>
            <div className="font-display font-semibold">More Mixes</div>
            <div className="text-sm text-muted-foreground mt-1">Check out the full catalogue on SoundCloud</div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-primary group-hover:underline">
            soundcloud.com/karlkrusel <ExternalLink className="w-3 h-3" />
          </span>
        </a>
      </div>
    </Section>
  );
}

function Gear() {
  const gear = [
    { title: "AlphaTheta XDJ-AZ", desc: "Flagship club-level DJ unit." },
    { title: "JBL Professional Sound", desc: "Full pro audio system." },
    { title: "Mid Speakers + 18\" Sub", desc: "Two mids and an 18-inch subwoofer." },
    { title: "Custom Visuals & VFX", desc: "Loops built for every theme." },
  ];
  return (
    <Section id="gear" eyebrow="Gear" title={<>Pro-grade kit. <span className="text-gradient">Full event experience.</span></>}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {gear.map((g) => (
          <div key={g.title} className="glass rounded-xl p-5 border-l-2 border-l-primary">
            <Speaker className="w-5 h-5 text-primary mb-3" />
            <h3 className="font-display font-semibold text-sm">{g.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{g.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Location() {
  return (
    <Section id="location" eyebrow="Location" title={<>Grand Rapids based. <span className="text-gradient">Available statewide.</span></>}>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass rounded-xl p-6">
          <MapPin className="w-5 h-5 text-primary mb-3" />
          <div className="font-display font-semibold">Based In</div>
          <div className="text-muted-foreground text-sm mt-1">Grand Rapids, Michigan</div>
        </div>
        <div className="glass rounded-xl p-6">
          <MapPin className="w-5 h-5 text-accent mb-3" />
          <div className="font-display font-semibold">Originally From</div>
          <div className="text-muted-foreground text-sm mt-1">Traverse City, Michigan</div>
        </div>
        <div className="glass rounded-xl p-6 bg-gradient-to-br from-primary/10 to-accent/10">
          <Calendar className="w-5 h-5 text-primary mb-3" />
          <div className="font-display font-semibold">Available For</div>
          <div className="text-muted-foreground text-sm mt-1">Bars, clubs, private events, and venue opportunities.</div>
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title={<>Let&apos;s <span className="text-gradient">book a night.</span></>}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-7">
          <div className="space-y-5">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Name</div>
              <div className="font-display font-semibold text-lg">Karl Krusel <span className="text-muted-foreground font-normal">/ KRL</span></div>
            </div>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 group">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                <div className="font-semibold group-hover:text-primary transition">{EMAIL.toLowerCase()}</div>
              </div>
            </a>
            <a href={`tel:${PHONE.replace(/-/g, "")}`} className="flex items-center gap-3 group">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Phone</div>
                <div className="font-semibold group-hover:text-primary transition">{PHONE}</div>
              </div>
            </a>
            <a href={IG} target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
              <Instagram className="w-5 h-5 text-accent" />
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Instagram</div>
                <div className="font-semibold group-hover:text-accent transition">@karlkrusel</div>
              </div>
            </a>
            <a href={SC} target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
              <Music2 className="w-5 h-5 text-accent" />
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">SoundCloud</div>
                <div className="font-semibold group-hover:text-accent transition">soundcloud.com/karlkrusel</div>
              </div>
            </a>
          </div>
        </div>

        <div className="rounded-2xl p-7 bg-gradient-to-br from-primary/20 via-accent/10 to-background border border-primary/30 shadow-glow flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-2xl">Booking Inquiry</h3>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Bars, clubs, private events, weddings, brand activations — reach out with your date, venue,
              and vibe. I&apos;ll get back with availability and a quick rundown of what I can bring.
            </p>
          </div>
          <a
            href={`mailto:${EMAIL}?subject=Booking%20Inquiry%20—%20KRL`}
            className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:scale-[1.02] transition shadow-glow"
          >
            <Send className="w-4 h-4" /> Send Booking Inquiry
          </a>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10 px-5">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="tracking-wider">
          <span style={{ fontFamily: '"Tourner", var(--font-display)' }} className="text-gradient font-bold text-xl">KRL</span> | Karl Krusel | DJ, Sound, and Visuals
        </div>
        <div>© {new Date().getFullYear()} — All rights reserved.</div>
      </div>
    </footer>
  );
}

function KRLPortfolio() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <Offer />
        <Visuals />
        <Videos />
        <Mixes />
        <Gear />
        <Location />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
