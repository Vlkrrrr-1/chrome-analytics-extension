import type { MediaEvent } from "../../shared/types";
import { getSessionId } from "../utils/session";
import { saveEventIfNotPaused } from "../utils/eventQueue";

export function initMediaTracking(): void {
  ["play", "pause", "ended"].forEach((eventType) => {
    document.addEventListener(
      eventType,
      (e) => {
        if (
          e.target instanceof HTMLVideoElement ||
          e.target instanceof HTMLAudioElement
        ) {
          const event: MediaEvent = {
            v: 1,
            sid: getSessionId(),
            ts: new Date().toISOString(),
            type: `media_${eventType}` as
              | "media_play"
              | "media_pause"
              | "media_ended",
            src: e.target.src,
            currentTime: e.target.currentTime,
            isIncognito: chrome.extension.inIncognitoContext,
            page: {
              url: window.location.href,
              title: document.title,
              referrer: document.referrer,
            },
          };
          saveEventIfNotPaused(event);
        }
      },
      true
    );
  });
}
