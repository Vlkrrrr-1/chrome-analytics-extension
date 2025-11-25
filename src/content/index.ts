import { initializeSettings } from "./state/settings";
import { initPageViewTracking } from "./trackers/pageView";
import { initScrollTracking } from "./trackers/scroll";
import { initActivityTracking } from "./trackers/activity";
import { initPerformanceTracking } from "./trackers/performance";
import { initMediaTracking } from "./trackers/media";
import { getSessionId } from "./utils/session";

initializeSettings();

initPageViewTracking();
initScrollTracking();
initActivityTracking();
initPerformanceTracking();
initMediaTracking();

console.log(
  "%c[Analytics Debug] Session ID:",
  "color: white; background: #2196F3; padding: 2px 6px; border-radius: 2px;",
  getSessionId()
);

console.log(
  "%c[Analytics Debug] All trackers initialized",
  "color: white; background: #4CAF50; padding: 2px 6px; border-radius: 2px;"
);
