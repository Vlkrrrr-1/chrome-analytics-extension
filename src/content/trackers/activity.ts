import type { ActivityEvent } from "../../shared/types";
import { getSessionId } from "../utils/session";
import { saveEventIfNotPaused } from "../utils/eventQueue";

let lastActivity = Date.now();
let startTime: number | null = null;

function trackActivity(): void {
  lastActivity = Date.now();
}

export function initActivityTracking(): void {
  ["mousemove", "keydown", "scroll", "click"].forEach((event) =>
    window.addEventListener(event, trackActivity)
  );

  setInterval(() => {
    const now = Date.now();
    const inactiveTime = now - lastActivity;

    if (!document.hidden && inactiveTime < 5000) {
      const event: ActivityEvent = {
        v: 1,
        sid: getSessionId(),
        ts: new Date().toISOString(),
        type: "active_time",
        isIncognito: chrome.extension.inIncognitoContext,
        page: {
          url: window.location.href,
          title: document.title,
          referrer: document.referrer,
        },
      };
      saveEventIfNotPaused(event);
    }
  }, 5000);

  document.addEventListener("visibilitychange", () => {
    const eventType: "focus_lost" | "focus_gain" = document.hidden
      ? "focus_lost"
      : "focus_gain";

    const baseEvent: ActivityEvent = {
      v: 1,
      sid: getSessionId(),
      ts: new Date().toISOString(),
      type: eventType,
      isIncognito: chrome.extension.inIncognitoContext,
      page: {
        url: window.location.href,
        title: document.title,
        referrer: document.referrer,
      },
    };

    const visibilityEvent: ActivityEvent = {
      v: 1,
      sid: getSessionId(),
      ts: new Date().toISOString(),
      type: "visibility_change",
      isIncognito: chrome.extension.inIncognitoContext,
      page: {
        url: window.location.href,
        title: document.title,
        referrer: document.referrer,
      },
    };

    if (eventType === "focus_gain") {
      startTime = Date.now();
    }

    if (eventType === "focus_lost" && startTime !== null) {
      const active_time_ms = Date.now() - startTime;
      const time = (active_time_ms / 1000).toFixed(2).toString() + "sec";

      const eventTimeMs: ActivityEvent = {
        v: 1,
        sid: getSessionId(),
        ts: new Date().toISOString(),
        type: "active_time_ms",
        time: time,
        isIncognito: chrome.extension.inIncognitoContext,
        page: {
          url: window.location.href,
          title: document.title,
          referrer: document.referrer,
        },
      };

      saveEventIfNotPaused(eventTimeMs);
      startTime = null;
    }

    saveEventIfNotPaused(baseEvent);
    saveEventIfNotPaused(visibilityEvent);
  });
}
