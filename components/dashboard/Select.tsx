"use client";

import { useEffect, useRef, useState } from "react";

export type SelectOption = { value: string; label: string };

/**
 * Branded replacement for a native <select>, which renders with the OS's
 * own highlight color (blue on Windows) and breaks the brand on the one
 * screen customers configure. Keyboard-operable: Enter/Space opens, Up/Down
 * moves, Enter selects, Esc closes.
 */
export default function Select({
  name,
  options,
  value,
  onChange,
  label,
  ariaLabel,
}: {
  name?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));
  const selected = options[selectedIndex] || options[0];

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  function openMenu() {
    setHighlighted(selectedIndex);
    setOpen(true);
  }

  function commit(index: number) {
    const option = options[index];
    if (option) onChange(option.value);
    setOpen(false);
  }

  function onButtonKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      openMenu();
    }
  }

  function onMenuKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      commit(highlighted);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div className={`dashboard-select${open ? " is-open" : ""}`} ref={rootRef}>
      {name && <input type="hidden" name={name} value={value} />}
      <button
        type="button"
        className="dashboard-select-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel || label}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onButtonKeyDown}
      >
        <span>{selected?.label}</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul
          className="dashboard-select-menu"
          role="listbox"
          tabIndex={-1}
          onKeyDown={onMenuKeyDown}
          ref={(el) => el?.focus()}
        >
          {options.map((option, index) => (
            <li key={option.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                className={`dashboard-select-option${index === highlighted ? " is-highlighted" : ""}${option.value === value ? " is-selected" : ""}`}
                onMouseEnter={() => setHighlighted(index)}
                onClick={() => commit(index)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
