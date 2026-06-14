import { type NormalizedThemeContext, type Theme, escapeHtml } from "@561-group/web-theming";

// Fonts: Space Grotesk (sans), Roboto Slab (slab), JetBrains Mono (mono) are the
// bible-specified families. No CDN requests (§ 09.7 no-third-party-on-web). Self-hosting
// these three families is recorded in dev/TODO/561-group-web-theme-fonts.md; until that
// work ships, the fallback stacks below are the operative fonts.

const CSS = `
:root {
  --ink:        #0A0A0A;
  --ink-soft:   #5A5A5A;
  --bone:       #F2EAD8;
  --bone-deep:  #E6DCC4;
  --bone-edge:  #D8CDB2;
  --alarm:      #FF4530;
  --witness:    #3D5588;

  --sans: "Space Grotesk", "Helvetica Neue", Arial, sans-serif;
  --slab: "Roboto Slab", Rockwell, Georgia, serif;
  --mono: "JetBrains Mono", ui-monospace, "Courier New", monospace;

  --gutter: 56px;
  --max: 1200px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  background: var(--bone);
  color: var(--ink);
  font-family: var(--slab);
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

body {
  background-image: radial-gradient(rgba(10,10,10,.035) 1px, transparent 1px);
  background-size: 4px 4px;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

/* ── Header: folio bar + hero mark ───────────────────────────────────────── */

header[role=banner] {
  max-width: var(--max);
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--gutter);
}

.folio-bar {
  border-top: 8px solid var(--ink);
  border-bottom: 1px solid var(--ink);
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--mono);
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.hero {
  padding: 80px 0 56px;
  border-bottom: 1px solid var(--ink);
}

.hero-mark {
  font-family: var(--sans);
  font-weight: 700;
  font-size: clamp(72px, 14vw, 128px);
  line-height: .85;
  letter-spacing: -.04em;
}

.hero-desc {
  margin-top: 20px;
  font-family: var(--mono);
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

/* ── Main content ────────────────────────────────────────────────────────── */

main[role=main] {
  flex: 1;
  max-width: var(--max);
  width: 100%;
  margin: 0 auto;
  padding: 60px var(--gutter);
}

.lede {
  font-family: var(--slab);
  font-size: 22px;
  line-height: 1.4;
  max-width: 36rem;
}

/* ── Footer colophon ─────────────────────────────────────────────────────── */

footer[role=contentinfo] {
  border-top: 8px solid var(--ink);
  background: var(--ink);
  color: var(--bone);
}

.colophon {
  max-width: var(--max);
  margin: 0 auto;
  padding: 32px var(--gutter);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--mono);
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: rgba(242, 234, 216, .6);
}

.colophon a { color: var(--bone); text-decoration: none; }
.colophon a:hover { color: var(--alarm); }

/* ── Responsive ──────────────────────────────────────────────────────────── */

@media (max-width: 880px) {
  :root { --gutter: 24px; }
  .hero { padding: 48px 0 36px; }
  main[role=main] { padding: 40px var(--gutter); }
  .colophon { flex-direction: column; gap: 12px; align-items: flex-start; }
}

@media print {
  body { background: none; background-image: none; }
  footer[role=contentinfo] { background: none; color: var(--ink); border-top-color: var(--ink); }
  .folio-bar, .hero-desc, .colophon { color: #333; }
}
`;

export const fiveSixOneTheme: Theme = {
  name: "five-six-one",
  css: CSS,
  head(_ctx: NormalizedThemeContext): string {
    return `<link rel="alternate" type="application/json" href="/site.json">`;
  },
  header(ctx: NormalizedThemeContext): string {
    const name = escapeHtml(ctx.siteName || "The 561 Group");
    return [
      '<div class="folio-bar">',
      `<span>${name}</span>`,
      "<span>561.GROUP</span>",
      "</div>",
      '<div class="hero">',
      '<p class="hero-mark">561</p>',
      '<p class="hero-desc">Autonomous Confederacy</p>',
      "</div>",
    ].join("");
  },
  footer(ctx: NormalizedThemeContext): string {
    const year = escapeHtml(String(ctx.year ?? ""));
    const credit = year ? `${year} · The 561 Group` : "The 561 Group";
    return [
      '<div class="colophon">',
      `<span>${credit}</span>`,
      "</div>",
    ].join("");
  },
  wrap(articleHtml: string, _ctx: NormalizedThemeContext): string {
    return articleHtml;
  },
};
