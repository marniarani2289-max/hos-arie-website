"use client";

import { useEffect } from "react";

export default function PilotFormBridge() {
  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>('#pilot form[action="/contact"]');
    if (!form) return;

    form.method = "post";
    form.action = "/api/lexnusa/pilot";

    if (!form.querySelector('input[name="website"]')) {
      const honeypot = document.createElement("input");
      honeypot.type = "text";
      honeypot.name = "website";
      honeypot.tabIndex = -1;
      honeypot.autocomplete = "off";
      honeypot.setAttribute("aria-hidden", "true");
      honeypot.style.position = "absolute";
      honeypot.style.left = "-9999px";
      honeypot.style.opacity = "0";
      form.appendChild(honeypot);
    }

    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (button) button.textContent = "Submit Pilot Request";

    const note = form.querySelector<HTMLParagraphElement>("p:last-child");
    if (note) note.textContent = "Your request is securely stored and a notification is sent to LexNusa. No confidential documents are required at this stage.";
  }, []);

  return null;
}
