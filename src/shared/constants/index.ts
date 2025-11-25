export const ACTIVITY_CHECK_INTERVAL = 5000;

export const INACTIVITY_THRESHOLD = 5000;

export const SCROLL_DEBOUNCE_DELAY = 300;

export const URL_CHECK_INTERVAL = 1000;

export const EVENT_VERSION = 1;

export const STORAGE_KEYS = {
  IS_PAUSED: "isPaused",
  IS_INCOGNITO: "isIncognito",
  IS_CLICK: "isClick",
  IS_MEDIA: "isMedia",
} as const;

export const SESSION_STORAGE_KEYS = {
  SESSION_ID: "session_id",
} as const;

export const DB_CONFIG = {
  NAME: "analyticsDB",
  VERSION: 1,
  STORE_NAME: "events",
} as const;

export const TIME_CONSTANTS = {
  MS_IN_SECOND: 1000,
  MS_IN_MINUTE: 60 * 1000,
  MS_IN_HOUR: 60 * 60 * 1000,
  MS_IN_DAY: 24 * 60 * 60 * 1000,
} as const;
