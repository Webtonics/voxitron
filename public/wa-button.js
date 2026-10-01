/*
 * Voxitron WhatsApp button. Customers embed this on their own website with:
 *
 *   <script src="https://voxitron.com/wa-button.js" data-button="BUTTON_ID" async></script>
 *
 * It fetches the button's settings from Voxitron (managed in the dashboard
 * under "WhatsApp button"), then renders a floating button that opens
 * WhatsApp with a greeting prefilled. Rendered inside a Shadow DOM so the
 * host site's CSS can't break it and ours can't leak out. Any failure is
 * silent: this runs on someone else's live site and must never throw.
 *
 * Colours are hardcoded here on purpose: this file runs on third-party
 * pages with no access to Voxitron's CSS tokens. #25D366 is WhatsApp's own
 * brand green, matching --whatsapp-green in app/globals.css.
 */
(function () {
  "use strict";

  try {
    var script = document.currentScript;
    if (!script) return;

    var buttonId = script.getAttribute("data-button");
    if (!buttonId) return;

    if (window.__voxitronWaButton) return;
    window.__voxitronWaButton = true;

    var origin = new URL(script.src).origin;
    var base = origin + "/api/whatsapp-button/" + encodeURIComponent(buttonId);

    fetch(base + "/config")
      .then(function (res) {
        return res.ok ? res.json() : null;
      })
      .then(function (config) {
        if (!config || !config.number) return;
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", function () {
            render(config, base);
          });
        } else {
          render(config, base);
        }
      })
      .catch(function () {});
  } catch {
    /* never break the host page */
  }

  // Dark text on light brand colours, white on dark ones (WCAG relative luminance).
  function inkFor(hex) {
    var channels = [1, 3, 5].map(function (i) {
      var c = parseInt(hex.slice(i, i + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    var luminance = 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
    return luminance > 0.4 ? "#0B1F2A" : "#FFFFFF";
  }

  function render(config, base) {
    try {
      var bg = config.color || "#25D366";
      var ink = config.color ? inkFor(config.color) : "#FFFFFF";
      var side = config.position === "left" ? "left" : "right";

      var href = "https://wa.me/" + config.number;
      if (config.greeting) href += "?text=" + encodeURIComponent(config.greeting);

      var host = document.createElement("div");
      host.setAttribute("data-voxitron-wa-button", "");
      var root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;

      var style = document.createElement("style");
      style.textContent =
        ".wrap{position:fixed;bottom:20px;" + side + ":20px;z-index:2147483000;display:flex;align-items:center;gap:10px;" +
        "flex-direction:" + (side === "left" ? "row-reverse" : "row") + ";font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}" +
        ".tip{background:#FFFFFF;color:#0B1F2A;font-size:14px;line-height:1.3;padding:8px 12px;border-radius:999px;" +
        "box-shadow:0 4px 16px rgba(0,0,0,.14);white-space:nowrap;max-width:240px;overflow:hidden;text-overflow:ellipsis}" +
        ".btn{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;" +
        "background:" + bg + ";color:" + ink + ";box-shadow:0 6px 20px rgba(0,0,0,.22);text-decoration:none;" +
        "transition:transform .15s ease}" +
        ".btn:hover{transform:scale(1.06)}" +
        ".btn:focus-visible{outline:3px solid " + bg + ";outline-offset:3px}" +
        ".btn svg{width:30px;height:30px}" +
        "@media (prefers-reduced-motion:reduce){.btn{transition:none}.btn:hover{transform:none}}";
      root.appendChild(style);

      var wrap = document.createElement("div");
      wrap.className = "wrap";

      if (config.tooltip) {
        var tip = document.createElement("span");
        tip.className = "tip";
        tip.textContent = config.tooltip;
        wrap.appendChild(tip);
      }

      var link = document.createElement("a");
      link.className = "btn";
      link.href = href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", config.tooltip || "Chat with us on WhatsApp");
      link.innerHTML =
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.41 9.42-9.41 2.51 0 4.88.98 6.65 2.76a9.35 9.35 0 0 1 2.75 6.66c0 5.19-4.22 9.41-9.41 9.41zm8.01-17.42A11.27 11.27 0 0 0 12.05.75C5.81.75.73 5.83.73 12.08c0 2 .52 3.95 1.52 5.66L.64 23.25l5.64-1.48a11.3 11.3 0 0 0 5.41 1.38h.01c6.24 0 11.32-5.08 11.32-11.33 0-3.02-1.18-5.87-3.32-8z"/></svg>';

      link.addEventListener("click", function () {
        try {
          var page = location.origin + location.pathname;
          var url = base + "/click";
          if (navigator.sendBeacon) {
            navigator.sendBeacon(url, new Blob([page], { type: "text/plain" }));
          } else {
            fetch(url, { method: "POST", body: page, keepalive: true, mode: "no-cors" });
          }
        } catch {
          /* tracking is best-effort, the link still opens */
        }
      });

      wrap.appendChild(link);
      root.appendChild(wrap);
      document.body.appendChild(host);
    } catch {
      /* never break the host page */
    }
  }
})();
