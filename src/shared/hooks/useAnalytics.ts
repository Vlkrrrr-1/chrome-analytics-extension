import { useState, useEffect } from "react";
import {
  getActiveEvents,
  getAllPages,
  getAverageLatency,
  getAverageScrollToday,
  getAverageTTFBToday,
  getEventsPerMinute,
  getMediaEventsToday,
  getTimeToday,
} from "../services/db";
import { formatActiveTime } from "../utils/formatters";

export function useActiveTime() {
  const [activeTime, setActiveTime] = useState<string>("0m");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const totalMs = await getTimeToday();
        setActiveTime(formatActiveTime(totalMs));
      } catch (error) {
        console.error("Error fetching active time:", error);
        setActiveTime("0m");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTime();
  }, []);

  return { activeTime, isLoading };
}

export function useAverageScroll() {
  const [averageScroll, setAverageScroll] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScroll = async () => {
      try {
        const scroll = await getAverageScrollToday();
        setAverageScroll(scroll);
      } catch (error) {
        console.error("Error fetching average scroll:", error);
        setAverageScroll(0);
      } finally {
        setIsLoading(false);
      }
    };
    fetchScroll();
  }, []);

  return { averageScroll, isLoading };
}

export function usePageCount() {
  const [pageCount, setPageCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const count = await getAllPages();
        setPageCount(count);
      } catch (error) {
        console.error("Error fetching page count:", error);
        setPageCount(0);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPages();
  }, []);

  return { pageCount, isLoading };
}

export function useAverageTTFB() {
  const [averageTTFB, setAverageTTFB] = useState<string>("0ms");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTTFB = async () => {
      try {
        const ttfb = await getAverageTTFBToday();
        setAverageTTFB(ttfb);
      } catch (error) {
        console.error("Error fetching average TTFB:", error);
        setAverageTTFB("0ms");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTTFB();
  }, []);

  return { averageTTFB, isLoading };
}

export function useMediaEventsCount() {
  const [mediaCount, setMediaCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMediaEvents = async () => {
      try {
        const count = await getMediaEventsToday();
        setMediaCount(count);
      } catch (error) {
        console.error("Error fetching media events:", error);
        setMediaCount(0);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMediaEvents();
  }, []);

  return { mediaCount, isLoading };
}

export function useActiveEventsCount() {
  const [activeEventsCount, setActiveEventsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActiveEvents = async () => {
      try {
        const count = await getActiveEvents();
        setActiveEventsCount(count);
      } catch (error) {
        console.error("Error fetching active events:", error);
        setActiveEventsCount(0);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActiveEvents();
  }, []);

  return { activeEventsCount, isLoading };
}

export function useEventsPerMinute() {
  const [eventsPerMin, setEventsPerMin] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventsPerMin = async () => {
      try {
        const count = await getEventsPerMinute();
        setEventsPerMin(count);
      } catch (error) {
        console.error("Error fetching events per minute:", error);
        setEventsPerMin(0);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEventsPerMin();
  }, []);

  return { eventsPerMin, isLoading };
}

export function useAverageLatency() {
  const [latency, setLatency] = useState<string>("0ms");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatency = async () => {
      try {
        const lat = await getAverageLatency();
        setLatency(lat);
      } catch (error) {
        console.error("Error fetching average latency:", error);
        setLatency("0ms");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatency();
  }, []);

  return { latency, isLoading };
}
