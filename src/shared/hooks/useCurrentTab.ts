import { useState, useEffect } from "react";

export interface TabInfo {
  title: string;
  url: string;
  favicon: string;
}

export function useCurrentTab(): TabInfo {
  const [currentTab, setCurrentTab] = useState<TabInfo>({
    title: "Example Domain",
    url: "example.com",
    favicon: "/web.png",
  });

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.tabs?.query) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab) {
          setCurrentTab({
            title: tab.title || "Unknown",
            url: new URL(tab.url || "").hostname,
            favicon: tab.favIconUrl || "/web.png",
          });
        }
      });
    }
  }, []);

  return currentTab;
}
