import type { ScrollEvent } from "../../shared/types";
import { getSessionId } from "../utils/session";
import { saveEventIfNotPaused } from "../utils/eventQueue";

let maxScrollDepth = 0;
let scrollDebounceTimer: number | null = null;

function trackScrollDepth(): void {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = window.innerHeight;
  const scrollPercent = ((scrollTop + clientHeight) / scrollHeight) * 100;

  if (scrollPercent > maxScrollDepth) {
    maxScrollDepth = Math.min(100, Math.round(scrollPercent));
  }
}

function sendScrollEvent(): void {
  if (maxScrollDepth > 0) {
    const scrollEvent: ScrollEvent = {
      v: 1,
      sid: getSessionId(),
      ts: new Date().toISOString(),
      type: "scroll",
      isIncognito: chrome.extension.inIncognitoContext,
      page: {
        url: window.location.href,
        title: document.title,
        referrer: document.referrer,
      },
      percentScroll: maxScrollDepth,
    };
    saveEventIfNotPaused(scrollEvent);
  }
}

export function initScrollTracking(): void {
  window.addEventListener("scroll", () => {
    if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer);

    scrollDebounceTimer = setTimeout(() => {
      trackScrollDepth();
    }, 300);
  });

  window.addEventListener("beforeunload", () => {
    sendScrollEvent();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      sendScrollEvent();
    }
  });
}
