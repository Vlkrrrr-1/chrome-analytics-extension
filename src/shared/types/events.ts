export const EVENT_TYPES = {
  // Page events
  PAGE_VIEW: "page_view",

  // Activity events
  ACTIVE_TIME: "active_time",
  INACTIVE_TIME: "inactive_time",
  ACTIVE_TIME_MS: "active_time_ms",

  // Focus events
  FOCUS_GAIN: "focus_gain",
  FOCUS_LOST: "focus_lost",
  VISIBILITY_CHANGE: "visibility_change",

  // Interaction events
  SCROLL: "scroll",
  CLICK: "click",
  FORM_SUBMIT: "form_submit",

  // Media events
  MEDIA_PLAY: "media_play",
  MEDIA_PAUSE: "media_pause",
  MEDIA_ENDED: "media_ended",

  // Performance events
  PERFORMANCE: "performance",
} as const;

export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];

export interface PageInfo {
  url: string;
  title: string;
  referrer: string;
}

export interface BaseEvent {
  v: number;
  sid: string;
  ts: string;
  type: EventType;
  isIncognito: boolean;
  page?: PageInfo;
}

export interface PageViewEvent extends BaseEvent {
  type: typeof EVENT_TYPES.PAGE_VIEW;
  page: PageInfo;
}

export interface ScrollEvent extends BaseEvent {
  type: typeof EVENT_TYPES.SCROLL;
  percentScroll: number;
}

export interface ActivityEvent extends BaseEvent {
  type:
    | typeof EVENT_TYPES.ACTIVE_TIME
    | typeof EVENT_TYPES.INACTIVE_TIME
    | typeof EVENT_TYPES.ACTIVE_TIME_MS
    | typeof EVENT_TYPES.FOCUS_GAIN
    | typeof EVENT_TYPES.FOCUS_LOST
    | typeof EVENT_TYPES.VISIBILITY_CHANGE;
  time?: string;
}

export interface FocusEvent extends BaseEvent {
  type:
    | typeof EVENT_TYPES.FOCUS_GAIN
    | typeof EVENT_TYPES.FOCUS_LOST
    | typeof EVENT_TYPES.VISIBILITY_CHANGE;
}

export interface InteractionEvent extends BaseEvent {
  type: typeof EVENT_TYPES.CLICK | typeof EVENT_TYPES.FORM_SUBMIT;
}

export interface PerformanceEvent extends BaseEvent {
  type: typeof EVENT_TYPES.PERFORMANCE;
  ttfb?: number;
}

export interface MediaEvent extends BaseEvent {
  type:
    | typeof EVENT_TYPES.MEDIA_PLAY
    | typeof EVENT_TYPES.MEDIA_PAUSE
    | typeof EVENT_TYPES.MEDIA_ENDED;
  src?: string;
  currentTime?: number;
}

export type AnalyticsEvent =
  | PageViewEvent
  | ScrollEvent
  | ActivityEvent
  | FocusEvent
  | InteractionEvent
  | PerformanceEvent
  | MediaEvent;

export function isPageViewEvent(event: AnalyticsEvent): event is PageViewEvent {
  return event.type === EVENT_TYPES.PAGE_VIEW;
}

export function isMediaEvent(event: AnalyticsEvent): event is MediaEvent {
  return [
    EVENT_TYPES.MEDIA_PLAY,
    EVENT_TYPES.MEDIA_PAUSE,
    EVENT_TYPES.MEDIA_ENDED,
  ].includes(event.type as any);
}
