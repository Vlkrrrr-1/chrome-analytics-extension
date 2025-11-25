import { useState } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import BasicSection from "./sections/BasicSection";
import ProSection from "./sections/ProSection";
import EnterpriseSection from "./sections/EnterpriseSection";
import EventsList from "./pages/EventsList";
import { useStorageState } from "../shared/hooks/useStorageState";
import { STORAGE_KEYS } from "../shared/constants";
import type { Section } from "./types";

function PopupInner() {
  const [isPaused, setIsPaused] = useStorageState(
    STORAGE_KEYS.IS_PAUSED,
    false
  );
  const [isIncognito, setIsIncognito] = useStorageState(
    STORAGE_KEYS.IS_INCOGNITO,
    true
  );
  const [isClick, setIsClick] = useStorageState(STORAGE_KEYS.IS_CLICK, true);
  const [isMedia, setIsMedia] = useStorageState(STORAGE_KEYS.IS_MEDIA, true);
  const [activeSection, setActiveSection] = useState<Section>("basic");
  const [showEventsList, setShowEventsList] = useState(false);

  const togglePause = () => setIsPaused((prev) => !prev);
  const togglePauseIncognito = () => setIsIncognito((prev) => !prev);
  const togglePauseClick = () => setIsClick((prev) => !prev);
  const togglePauseMedia = () => setIsMedia((prev) => !prev);

  return (
    <Box
      w="500px"
      h="820px"
      bg="white"
      borderRadius="md"
      boxShadow="md"
      display="flex"
      flexDirection="column"
      borderColor="rgba(192, 76, 218, 0.7)"
      borderWidth="2px"
    >
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <Box flex="1" overflow="auto" position="relative">
        <Box
          key={activeSection}
          animation="fadeSlideIn 0.4s ease-out"
          sx={{
            "@keyframes fadeSlideIn": {
              "0%": {
                opacity: 0,
                transform: "translateY(20px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          {showEventsList ? (
            <EventsList onBack={() => setShowEventsList(false)} />
          ) : (
            <>
              {activeSection === "basic" && (
                <BasicSection togglePause={togglePause} isPaused={isPaused} />
              )}
              {activeSection === "pro" && (
                <ProSection
                  togglePause={togglePause}
                  isIncognito={isIncognito}
                  togglePauseIncognito={togglePauseIncognito}
                  isPaused={isPaused}
                  isClick={isClick}
                  togglePauseClick={togglePauseClick}
                />
              )}
              {activeSection === "enterprise" && (
                <EnterpriseSection
                  isMedia={isMedia}
                  togglePauseMedia={togglePauseMedia}
                />
              )}
            </>
          )}
        </Box>
      </Box>
      <Footer onListClick={() => setShowEventsList(true)} />
    </Box>
  );
}

export default function Popup() {
  return (
    <ChakraProvider>
      <PopupInner />
    </ChakraProvider>
  );
}
