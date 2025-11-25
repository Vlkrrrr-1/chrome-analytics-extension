import type { PageViewEvent } from "../../shared/types";
import { getSessionId } from "../utils/session";
import { saveEventIfNotPaused } from "../utils/eventQueue";

export function trackPageView(): void {
  const event: PageViewEvent = {
    v: 1,
    sid: getSessionId(),
    ts: new Date().toISOString(),
    type: "page_view",
    isIncognito: chrome.extension.inIncognitoContext,
    page: {
      url: window.location.href,
      title: document.title,
      referrer: document.referrer,
    },
  };
  saveEventIfNotPaused(event);
}

export function initPageViewTracking(): void {
  trackPageView();

  let lastUrl = location.href;
  setInterval(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      trackPageView();
    }
  }, 1000);
}
