import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Music2, Sparkles, Disc3 } from "lucide-react";

export const Route = createFileRoute("/snagtrack")({
  component: SnagTrack,
});

/* ---------- config you can edit fast ---------- */
// TODO: replace with the live Snag Track URL when it's ready.
const SNAGTRACK_URL = "https://example.com/snagtrack";

function SnagTrack() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* simple header with a way back home */}
      <header className="fixed top-0 inset-x-0 z-50 glass-strong border-b border-primary/15">
        <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
          <a
            href="/"
            style={{ fontFamily: '"Tourner", var(--font-display)' }}
            className="font-bold tracking-widest text-2xl text-glow"
          >
            KRL
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back home
          </a>
        </div>
      </header>

      <main>
        <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-background">
          {/* glow blobs to match the site */}
          <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-pulse-glow z-0" />
          <div className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full bg-accent/15 blur-3xl animate-drift z-0" />
          <div className="absolute inset-0 bg-grid opacity-20 animate-grid-pan z-0" />
          <div className="absolute inset-0 scanlines opacity-20 z-0" />

          <div className="relative z-10 mx-auto max-w-3xl px-5 pt-28 pb-20 w-full text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs uppercase tracking-[0.35em] text-primary animate-flicker">
A free-track tool by KRL
              </span>
              <span className="h-px w-8 bg-primary" />
            </div>

            <h1
              style={{ fontFamily: '"Tourner", var(--font-impact)' }}
              className="text-white animate-logo-glow text-[18vw] sm:text-7xl md:text-8xl leading-[0.85] tracking-tight"
            >
              SnagTrack
            </h1>

            <p className="mt-6 max-w-xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed">
              The one-click free-track downloader for DJs. Producers give away tons of
              free songs and remixes, but you usually have to follow and like them first
              before you can grab the file. SnagTrack does all of that for you. Paste a
              link and the song lands in your crate, cover art and all.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href={SNAGTRACK_URL}
                target="_blank"
                rel="noreferrer"
                className="group cta-glow inline-flex items-center gap-2 px-7 py-4 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm hover:scale-[1.02]"
              >
                Open Snag Track
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </a>
            </div>

            {/* feature cards */}
            <div className="mt-14 grid sm:grid-cols-3 gap-4 text-left">
              {[
                {
                  icon: Disc3,
                  title: "Just Paste a Link",
                  desc: "Drop in a track link, a download link, or a whole chart, and SnagTrack takes it from there.",
                },
                {
                  icon: Music2,
                  title: "Skip the Busywork",
                  desc: "It handles the follows and likes for you, so you never have to fill out a download page again.",
                },
                {
                  icon: Sparkles,
                  title: "Ready for Your Set",
                  desc: "Songs land right in your folder with the cover art on them, ready to load up and play.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group glass rounded-xl p-6 h-full hover:border-primary/50 hover:-translate-y-1 hover:shadow-glow transition-all"
                >
                  <Icon className="w-7 h-7 text-primary mb-4 group-hover:scale-110 group-hover:text-accent transition" />
                  <h3 className="font-impact uppercase text-lg tracking-wide mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

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
    </div>
  );
}
