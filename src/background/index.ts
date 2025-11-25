import { saveEvent } from "../shared/services/db";

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "track_event") {
    const event = message.event;
    saveEvent(event)
      .then(() => {
        console.log("Event saved in background:", event);
      })
      .catch((err) => {
        console.error("Error saving event:", err);
      });
  }
});
