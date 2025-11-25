import type { PerformanceEvent } from "../../shared/types";
import { getSessionId } from "../utils/session";
import { saveEventIfNotPaused } from "../utils/eventQueue";

export function initPerformanceTracking(): void {
  window.addEventListener("load", () => {
    const perfData = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;

    if (perfData) {
      const ttfb = Math.round(perfData.responseStart - perfData.requestStart);

      const event: PerformanceEvent = {
        v: 1,
        sid: getSessionId(),
        ts: new Date().toISOString(),
        type: "performance",
        ttfb: ttfb,
        isIncognito: chrome.extension.inIncognitoContext,
        page: {
          url: window.location.href,
          title: document.title,
          referrer: document.referrer,
        },
      };

      saveEventIfNotPaused(event);
    }
  });
}
