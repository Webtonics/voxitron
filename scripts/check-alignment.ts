/**
 * Layout spine check: every page should share one left edge with the nav logo.
 *
 * For each page and viewport width it records getBoundingClientRect().left for
 * .nav-brand, every h1, every h2 outside #cta and outside cards, and the first
 * child of every top-level grid, and flags anything more than 1px off the logo.
 * It also flags horizontal scroll.
 *
 * An h2 in the second (or later) column of a multi-column grid is part of a
 * deliberate asymmetric split (e.g. visual left, text right). Its column is
 * what sits in the layout, so it is listed as "split column" instead of being
 * flagged; the grid's first child is still checked against the spine.
 *
 * Usage (dev or prod server running):
 *   npm run check:alignment
 *   BASE_URL=http://localhost:3456 npm run check:alignment
 *   CHROME_PATH="C:/Program Files/Google/Chrome/Application/chrome.exe" npm run check:alignment
 *
 * Exits 1 if anything is flagged.
 */
import { chromium } from "playwright-core";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const WIDTHS = [1366, 1440, 1920, 390];
const PAGES = [
  "/",
  "/whatsapp-agent",
  "/speed-to-lead",
  "/quoting-agent",
  "/real-estate",
  "/diagnostic-centre",
  "/retail",
  "/ecommerce",
  "/tools/missed-lead-calculator",
  "/blog",
  "/about",
  "/compare",
  "/contact",
  "/get-started",
];
const TOLERANCE = 1;

type Probe = { label: string; left: number };
type Measurement = {
  spine: number;
  probes: Probe[];
  splitColumn: string[];
  scrollWidth: number;
  innerWidth: number;
};

async function main() {
  const browser = await chromium.launch(
    process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" }
  );

  const rows: {
    page: string;
    width: number;
    checked: number;
    off: Probe[];
    splitColumn: string[];
    spine: number;
    hScroll: boolean;
  }[] = [];

  for (const path of PAGES) {
    for (const width of WIDTHS) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      // tsx (esbuild keepNames) wraps named functions in __name(), which the
      // page context doesn't have.
      await page.addInitScript("window.__name = (fn) => fn");
      await page.goto(BASE_URL + path, { waitUntil: "networkidle" });
      // Scroll reveals start faded and slightly translated; settle them so
      // positions are final.
      await page.addStyleTag({
        content: ".reveal{opacity:1!important;transform:none!important;animation:none!important}",
      });
      await page.waitForTimeout(300);

      const m: Measurement = await page.evaluate(() => {
        // Anything inside these is a component, not page layout.
        const EXCLUDE = [
          "#cta",
          "[class*='card']",
          "article",
          "li",
          "details",
          "[class*='-item']",
          "[class*='mockup']",
          ".hero-ui",
          ".hero-aside",
          ".nav-dropdown-panel",
          ".nav-mobile-panel",
        ].join(",");

        const visible = (el: Element) => {
          const r = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          return r.width > 0 && r.height > 0 && cs.display !== "none" && cs.visibility !== "hidden";
        };
        const describe = (el: Element) => {
          const cls = [...el.classList].slice(0, 2).join(".");
          const text = (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 38);
          return `${el.tagName.toLowerCase()}${cls ? "." + cls : ""} "${text}"`;
        };

        // True when el sits in a later column of a multi-column grid.
        const inLaterGridColumn = (el: Element) => {
          let node: Element = el;
          while (node.parentElement) {
            const parent = node.parentElement;
            const cs = getComputedStyle(parent);
            if (cs.display === "grid" && cs.gridTemplateColumns.split(" ").length > 1) {
              return node.getBoundingClientRect().left > parent.getBoundingClientRect().left + 1;
            }
            node = parent;
          }
          return false;
        };

        const brand = document.querySelector(".nav-brand");
        const spine = brand ? brand.getBoundingClientRect().left : NaN;
        const probes: { label: string; left: number }[] = [];
        const splitColumn: string[] = [];
        const add = (el: Element, kind: string) =>
          probes.push({ label: `${kind} ${describe(el)}`, left: el.getBoundingClientRect().left });

        document.querySelectorAll("h1").forEach((el) => {
          if (visible(el)) add(el, "h1");
        });
        document.querySelectorAll("h2").forEach((el) => {
          if (!visible(el) || el.closest(EXCLUDE)) return;
          if (inLaterGridColumn(el)) splitColumn.push(describe(el));
          else add(el, "h2");
        });
        // First child of every top-level grid (a grid with no grid ancestor),
        // outside the excluded components. The nav is measured via .nav-brand.
        document.querySelectorAll("main *, footer *").forEach((el) => {
          if (getComputedStyle(el).display !== "grid" || !visible(el) || el.closest(EXCLUDE)) return;
          let parent = el.parentElement;
          while (parent) {
            if (getComputedStyle(parent).display === "grid") return;
            parent = parent.parentElement;
          }
          const first = [...el.children].find(visible);
          if (first) add(first, "grid>");
        });

        return {
          spine,
          probes,
          splitColumn,
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
        };
      });

      rows.push({
        page: path,
        width,
        checked: m.probes.length,
        spine: m.spine,
        off: m.probes.filter((p) => Math.abs(p.left - m.spine) > TOLERANCE),
        splitColumn: m.splitColumn,
        hScroll: m.scrollWidth > m.innerWidth,
      });
      await page.close();
    }
  }
  await browser.close();

  const pad = (s: string, n: number) => s.padEnd(n);
  console.log(`\n${pad("page", 32)}${WIDTHS.map((w) => pad(String(w), 16)).join("")}`);
  for (const path of PAGES) {
    const cells = WIDTHS.map((w) => {
      const r = rows.find((x) => x.page === path && x.width === w)!;
      const status = r.off.length === 0 && !r.hScroll ? "ok" : `FAIL ${r.off.length}${r.hScroll ? " +hscroll" : ""}`;
      return pad(`${status} (${r.checked})`, 16);
    });
    console.log(`${pad(path, 32)}${cells.join("")}`);
  }

  const splits = new Map<string, Set<string>>();
  for (const r of rows) {
    if (!r.splitColumn.length) continue;
    const set = splits.get(r.page) ?? new Set<string>();
    r.splitColumn.forEach((h) => set.add(h));
    splits.set(r.page, set);
  }
  if (splits.size) {
    console.log("\nSkipped, h2 in the second column of a split (column itself checked):");
    splits.forEach((hs, page) => hs.forEach((h) => console.log(`  ${page}  ${h}`)));
  }

  const failures = rows.filter((r) => r.off.length || r.hScroll);
  if (failures.length) {
    console.log("\nOff the spine (left edge vs .nav-brand):");
    for (const r of failures) {
      console.log(`\n  ${r.page} @ ${r.width}px, spine ${Math.round(r.spine)}px${r.hScroll ? ", HORIZONTAL SCROLL" : ""}`);
      r.off.forEach((p) => console.log(`    ${Math.round(p.left)}px  ${p.label}`));
    }
    process.exitCode = 1;
  } else {
    console.log("\nAll pages aligned to the spine, no horizontal scroll.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
