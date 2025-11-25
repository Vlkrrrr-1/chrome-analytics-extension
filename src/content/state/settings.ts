import { STORAGE_KEYS } from "../../shared/constants";

let pausedState = false;
let incognitoState = false;
let clicksState = true;
let mediaState = true;

export function initializeSettings(): void {
  if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.sync.get([STORAGE_KEYS.IS_PAUSED], (result) => {
      pausedState = result[STORAGE_KEYS.IS_PAUSED] ?? false;
      console.log("[Analytics Debug] Initial pausedState:", pausedState);
    });

    chrome.storage.sync.get([STORAGE_KEYS.IS_INCOGNITO], (result) => {
      incognitoState = result[STORAGE_KEYS.IS_INCOGNITO] ?? true;
      console.log("[Analytics Debug] Initial incognitoState:", incognitoState);
    });

    chrome.storage.sync.get([STORAGE_KEYS.IS_CLICK], (result) => {
      clicksState = result[STORAGE_KEYS.IS_CLICK] ?? true;
      console.log("[Analytics Debug] Initial clicksState:", clicksState);
    });

    chrome.storage.sync.get([STORAGE_KEYS.IS_MEDIA], (result) => {
      mediaState = result[STORAGE_KEYS.IS_MEDIA] ?? true;
      console.log("[Analytics Debug] Initial mediaState:", mediaState);
    });

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "sync") {
        if (changes[STORAGE_KEYS.IS_PAUSED]) {
          pausedState = changes[STORAGE_KEYS.IS_PAUSED].newValue;
          console.log("[Analytics Debug] Paused state changed:", pausedState);
        }
        if (changes[STORAGE_KEYS.IS_INCOGNITO]) {
          incognitoState = changes[STORAGE_KEYS.IS_INCOGNITO].newValue;
          console.log(
            "[Analytics Debug] Incognito state changed:",
            incognitoState
          );
        }
        if (changes[STORAGE_KEYS.IS_CLICK]) {
          clicksState = changes[STORAGE_KEYS.IS_CLICK].newValue;
          console.log("[Analytics Debug] Click state changed:", clicksState);
        }
        if (changes[STORAGE_KEYS.IS_MEDIA]) {
          mediaState = changes[STORAGE_KEYS.IS_MEDIA].newValue;
          console.log("[Analytics Debug] Media state changed:", mediaState);
        }
      }
    });
  }
}

export async function isPaused(): Promise<boolean> {
  return pausedState;
}

export async function isIncognito(): Promise<boolean> {
  return incognitoState;
}

export async function isClick(): Promise<boolean> {
  return clicksState;
}

export async function isMedia(): Promise<boolean> {
  return mediaState;
}
