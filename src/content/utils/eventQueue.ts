import type { AnalyticsEvent } from "../../shared/types";
import { isPaused, isIncognito, isClick, isMedia } from "../state/settings";

function sendToBackground(event: AnalyticsEvent): void {
  chrome.runtime.sendMessage({ type: "track_event", event });
}

export async function saveEventIfNotPaused(
  event: AnalyticsEvent
): Promise<void> {
  if (await isPaused()) {
    console.log("[Analytics Debug] Event skipped due to pause:", event.type);
    return;
  }

  if (chrome.extension.inIncognitoContext && !(await isIncognito())) {
    console.log(
      "[Analytics Debug] Event skipped in incognito mode:",
      event.type
    );
    return;
  }

  if (
    !(await isClick()) &&
    (event.type === "scroll" ||
      event.type === "click" ||
      event.type === "form_submit")
  ) {
    console.log("[Analytics Debug] Interaction event skipped:", event.type);
    return;
  }

  if (
    !(await isMedia()) &&
    (event.type === "media_play" ||
      event.type === "media_pause" ||
      event.type === "media_ended")
  ) {
    console.log("[Analytics Debug] Media event skipped:", event.type);
    return;
  }

  try {
    sendToBackground(event);
  } catch (err) {
    console.error("Error saving analytics event:", err);
  }
}
