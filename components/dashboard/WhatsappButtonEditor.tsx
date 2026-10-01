"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_BRAND_COLOR,
  DEFAULT_GREETING,
  GREETING_MAX,
  TOOLTIP_MAX,
  isHexColor,
  type ButtonColorMode,
  type ButtonPosition,
} from "@/lib/whatsappButton";

type Status = "idle" | "submitting" | "error" | "success";

export type ButtonNumberOption = { id: string; name: string };

export type ButtonSettings = {
  whatsappNumberId: string;
  greeting: string;
  tooltip: string;
  position: ButtonPosition;
  colorMode: ButtonColorMode;
  brandColor: string;
  isEnabled: boolean;
};

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.41 9.42-9.41 2.51 0 4.88.98 6.65 2.76a9.35 9.35 0 0 1 2.75 6.66c0 5.19-4.22 9.41-9.41 9.41zm8.01-17.42A11.27 11.27 0 0 0 12.05.75C5.81.75.73 5.83.73 12.08c0 2 .52 3.95 1.52 5.66L.64 23.25l5.64-1.48a11.3 11.3 0 0 0 5.41 1.38h.01c6.24 0 11.32-5.08 11.32-11.33 0-3.02-1.18-5.87-3.32-8z" />
    </svg>
  );
}

// Same luminance rule as public/wa-button.js, so the preview matches what
// visitors actually see.
function isLightColor(hex: string) {
  const channels = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2] > 0.4;
}

function ButtonPreview({ settings }: { settings: ButtonSettings }) {
  const useBrand = settings.colorMode === "brand" && isHexColor(settings.brandColor);
  const style = useBrand ? { background: settings.brandColor } : undefined;
  const inkClass = useBrand && isLightColor(settings.brandColor) ? " is-light" : "";

  return (
    <div className="wa-btn-preview" aria-label="Preview of the button on a website" role="img">
      <div className="wa-btn-preview-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <span className="wa-btn-preview-url">yourwebsite.com</span>
      </div>
      <div className="wa-btn-preview-page" aria-hidden="true">
        <span className="wa-btn-preview-line is-title" />
        <span className="wa-btn-preview-line" />
        <span className="wa-btn-preview-line is-short" />
        <span className="wa-btn-preview-block" />

        {settings.isEnabled && (
          <div className={`wa-btn-preview-float is-${settings.position}`}>
            {settings.tooltip.trim() && (
              <span className="wa-btn-preview-tip">{settings.tooltip.trim()}</span>
            )}
            <span className={`wa-btn-preview-btn${inkClass}`} style={style}>
              <WhatsAppGlyph />
            </span>
          </div>
        )}
      </div>
      {!settings.isEnabled && (
        <p className="wa-btn-preview-off">Button is turned off. It won&apos;t show on your site.</p>
      )}
    </div>
  );
}

export default function WhatsappButtonEditor({
  customerId,
  numbers,
  initial,
  hasSaved,
}: {
  customerId: string;
  numbers: ButtonNumberOption[];
  initial: ButtonSettings | null;
  hasSaved: boolean;
}) {
  const router = useRouter();
  const [settings, setSettings] = useState<ButtonSettings>(
    initial || {
      whatsappNumberId: numbers[0]?.id || "",
      greeting: DEFAULT_GREETING,
      tooltip: "Chat with us",
      position: "right",
      colorMode: "whatsapp",
      brandColor: DEFAULT_BRAND_COLOR,
      isEnabled: true,
    }
  );
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function update<K extends keyof ButtonSettings>(key: K, value: ButtonSettings[K]) {
    setSettings((prev) => ({ ...prev, [key]: value }));
    if (status !== "submitting") setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    let response: Response;
    try {
      response = await fetch("/api/dashboard/whatsapp-button", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId, ...settings }),
      });
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server. Try again in a moment.");
      return;
    }

    let data: { ok?: boolean; error?: string };
    try {
      data = await response.json();
    } catch {
      setStatus("error");
      setMessage("Unexpected response from the server.");
      return;
    }

    if (!response.ok || !data.ok) {
      setStatus("error");
      setMessage(data.error || "Something went wrong. Try again.");
      return;
    }

    setStatus("success");
    setMessage(hasSaved ? "Saved. Your website updates within a minute." : "Saved. Your install code is ready below.");
    router.refresh();
  }

  const isBusy = status === "submitting";

  return (
    <div className="wa-btn-editor">
      <form className="lead-form wa-btn-form" onSubmit={handleSubmit} noValidate>
        <div className="lead-form-row">
          <label className="lead-form-label" htmlFor="wa-btn-number">WhatsApp number</label>
          <select
            id="wa-btn-number"
            className="lead-form-input"
            value={settings.whatsappNumberId}
            onChange={(e) => update("whatsappNumberId", e.target.value)}
          >
            {numbers.map((n) => (
              <option key={n.id} value={n.id}>{n.name}</option>
            ))}
          </select>
        </div>

        <div className="lead-form-row">
          <label className="lead-form-label" htmlFor="wa-btn-greeting">Greeting message</label>
          <textarea
            id="wa-btn-greeting"
            className="lead-form-input"
            maxLength={GREETING_MAX}
            value={settings.greeting}
            onChange={(e) => update("greeting", e.target.value)}
          />
          <p className="lead-form-hint">Typed into WhatsApp for the visitor. They can edit it before sending.</p>
        </div>

        <div className="lead-form-row">
          <label className="lead-form-label" htmlFor="wa-btn-tooltip">Label next to the button (optional)</label>
          <input
            id="wa-btn-tooltip"
            type="text"
            className="lead-form-input"
            maxLength={TOOLTIP_MAX}
            placeholder="Chat with us"
            value={settings.tooltip}
            onChange={(e) => update("tooltip", e.target.value)}
          />
        </div>

        <fieldset className="wa-btn-fieldset">
          <legend className="lead-form-label">Position</legend>
          <div className="wa-btn-choice-row">
            {(["left", "right"] as const).map((pos) => (
              <label key={pos} className={`wa-btn-choice${settings.position === pos ? " is-active" : ""}`}>
                <input
                  type="radio"
                  name="wa-btn-position"
                  value={pos}
                  checked={settings.position === pos}
                  onChange={() => update("position", pos)}
                />
                Bottom {pos}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="wa-btn-fieldset">
          <legend className="lead-form-label">Colour</legend>
          <div className="wa-btn-choice-row">
            <label className={`wa-btn-choice${settings.colorMode === "whatsapp" ? " is-active" : ""}`}>
              <input
                type="radio"
                name="wa-btn-color"
                value="whatsapp"
                checked={settings.colorMode === "whatsapp"}
                onChange={() => update("colorMode", "whatsapp")}
              />
              <span className="wa-btn-swatch is-whatsapp" aria-hidden="true" />
              WhatsApp green
            </label>
            <label className={`wa-btn-choice${settings.colorMode === "brand" ? " is-active" : ""}`}>
              <input
                type="radio"
                name="wa-btn-color"
                value="brand"
                checked={settings.colorMode === "brand"}
                onChange={() => update("colorMode", "brand")}
              />
              <span
                className="wa-btn-swatch"
                style={isHexColor(settings.brandColor) ? { background: settings.brandColor } : undefined}
                aria-hidden="true"
              />
              Your brand colour
            </label>
          </div>
          {settings.colorMode === "brand" && (
            <div className="wa-btn-color-inputs">
              <input
                type="color"
                className="wa-btn-color-picker"
                aria-label="Pick brand colour"
                value={isHexColor(settings.brandColor) ? settings.brandColor : DEFAULT_BRAND_COLOR}
                onChange={(e) => update("brandColor", e.target.value.toUpperCase())}
              />
              <input
                type="text"
                className="lead-form-input"
                aria-label="Brand colour hex code"
                maxLength={7}
                value={settings.brandColor}
                onChange={(e) => update("brandColor", e.target.value.trim())}
              />
            </div>
          )}
        </fieldset>

        <label className="wa-btn-enabled">
          <input
            type="checkbox"
            checked={settings.isEnabled}
            onChange={(e) => update("isEnabled", e.target.checked)}
          />
          Show the button on my website
        </label>

        {status === "error" && (
          <p className="lead-form-error" role="alert">{message}</p>
        )}

        {status === "success" && (
          <p className="lead-form-status" role="status">{message}</p>
        )}

        <button type="submit" className="btn btn-primary" disabled={isBusy}>
          {isBusy ? "Saving..." : hasSaved ? "Save changes" : "Save and get install code"}
        </button>
      </form>

      <ButtonPreview settings={settings} />
    </div>
  );
}
