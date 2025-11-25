import { openDB } from "idb";
import { DB_CONFIG, TIME_CONSTANTS } from "../constants";

export interface EventRecord {
  id?: number;
  v: number;
  sid: string;
  ts: string;
  type: string;
  time?: string;
  percentScroll?: number;
  ttfb?: number;
  src?: string;
  currentTime?: number;
  saved_at?: string;
  page?: {
    url: string;
    title: string;
    referrer?: string;
  };
}

const dbPromise = openDB(DB_CONFIG.NAME, DB_CONFIG.VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(DB_CONFIG.STORE_NAME)) {
      db.createObjectStore(DB_CONFIG.STORE_NAME, {
        keyPath: "id",
        autoIncrement: true,
      });
    }
  },
});

function getTodayStart(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function filterTodayEvents(events: EventRecord[]): EventRecord[] {
  const today = getTodayStart();
  return events.filter((event) => {
    const eventDate = new Date(event.ts);
    return eventDate >= today;
  });
}

export async function saveEvent(event: EventRecord): Promise<void> {
  const db = await dbPromise;
  const eventWithSaveTime = {
    ...event,
    saved_at: new Date().toISOString(),
  };
  await db.add(DB_CONFIG.STORE_NAME, eventWithSaveTime);
}

export async function getAllEvents(): Promise<EventRecord[]> {
  const db = await dbPromise;
  return await db.getAll(DB_CONFIG.STORE_NAME);
}

export async function clearEvents(): Promise<void> {
  const db = await dbPromise;
  await db.clear(DB_CONFIG.STORE_NAME);
}

export async function getTimeToday(): Promise<number> {
  const allEvents = await getAllEvents();
  const todayEvents = filterTodayEvents(allEvents);

  const activeTimeEvents = todayEvents.filter(
    (event) => event.type === "active_time_ms"
  );

  let totalMs = 0;
  activeTimeEvents.forEach((event) => {
    if (event.time) {
      const seconds = parseFloat(event.time.replace("sec", ""));
      totalMs += seconds * TIME_CONSTANTS.MS_IN_SECOND;
    }
  });

  return totalMs;
}

export async function getAverageScrollToday(): Promise<number> {
  const allEvents = await getAllEvents();
  const todayEvents = filterTodayEvents(allEvents);

  const scrollEvents = todayEvents.filter((event) => event.type === "scroll");
  if (scrollEvents.length === 0) return 0;

  const totalScroll = scrollEvents.reduce((sum, event) => {
    return sum + (event.percentScroll || 0);
  }, 0);

  return Math.round(totalScroll / scrollEvents.length);
}

export async function getActiveEvents(): Promise<number> {
  const allEvents = await getAllEvents();
  const todayEvents = filterTodayEvents(allEvents);

  const activeEvents = todayEvents.filter(
    (event) =>
      event.type !== "active_time" &&
      event.type !== "visibility_change" &&
      event.type !== "active_time_ms"
  );

  return activeEvents.length;
}

export async function getAllPages(): Promise<number> {
  const allEvents = await getAllEvents();
  const todayEvents = filterTodayEvents(allEvents);

  const eventsWithPages = todayEvents.filter((event) => event.page?.url);

  const uniquePages = eventsWithPages.filter(
    (event, index, self) =>
      index === self.findIndex((e) => e.page?.url === event.page?.url)
  );

  return uniquePages.length;
}

export async function getAverageTTFBToday(): Promise<string> {
  const allEvents = await getAllEvents();
  const todayEvents = filterTodayEvents(allEvents);

  const ttfbEvents = todayEvents.filter(
    (event) => event.type === "performance" && event.ttfb
  );

  if (ttfbEvents.length === 0) return "0ms";

  const avgTTFB =
    ttfbEvents.reduce((sum, e) => sum + (e.ttfb || 0), 0) / ttfbEvents.length;
  return Math.round(avgTTFB) + "ms";
}

export async function getMediaEventsToday(): Promise<number> {
  const allEvents = await getAllEvents();
  const todayEvents = filterTodayEvents(allEvents);

  const mediaEvents = todayEvents.filter(
    (event) =>
      event.type === "media_play" ||
      event.type === "media_pause" ||
      event.type === "media_ended"
  );

  return mediaEvents.length;
}

export async function getEventsPerMinute(): Promise<number> {
  const allEvents = await getAllEvents();
  const oneMinuteAgo = new Date(Date.now() - TIME_CONSTANTS.MS_IN_MINUTE);

  const recentEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.ts);
    return eventDate >= oneMinuteAgo;
  });

  return recentEvents.length;
}

export async function getAverageLatency(): Promise<string> {
  const allEvents = await getAllEvents();
  const oneMinuteAgo = new Date(Date.now() - TIME_CONSTANTS.MS_IN_MINUTE);

  const recentEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.ts);
    return eventDate >= oneMinuteAgo && event.saved_at;
  });

  if (recentEvents.length === 0) return "0ms";

  const totalLatency = recentEvents.reduce((sum, event) => {
    const created = new Date(event.ts).getTime();
    const saved = new Date(event.saved_at!).getTime();
    return sum + (saved - created);
  }, 0);

  const avgLatency = totalLatency / recentEvents.length;
  return Math.round(avgLatency) + "ms";
}
