export function formatActiveTime(ms: number): string {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return "0m";
  }
}

export function formatDate(
  date: Date | string,
  locale: string = "ru-RU"
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateTime(
  date: Date | string,
  locale: string = "ru-RU"
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleString(locale);
}

export function formatMilliseconds(ms: number): string {
  return `${Math.round(ms)}ms`;
}

export function getEventColor(type: string): string {
  const colorMap: Record<string, string> = {
    page_view: "blue",
    scroll: "green",
    click: "purple",
    video_play: "red",
    video_pause: "orange",
    video_ended: "pink",
    audio_play: "cyan",
    audio_pause: "teal",
    audio_ended: "gray",
    performance: "yellow",
    active_time: "teal",
    inactive_time: "gray",
  };
  return colorMap[type] || "gray";
}
