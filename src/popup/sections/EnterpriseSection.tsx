import { useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  Text,
  Flex,
  Image,
  Divider,
  Grid,
} from "@chakra-ui/react";
import { FaFileCsv, FaTrashAlt } from "react-icons/fa";
import { BiCodeBlock } from "react-icons/bi";
import ToggleSwitch from "../shared/ToggleSwitch";
import Card from "../shared/Card";
import {
  exportSessionsCSV,
  exportSessionsJSON,
  deleteAllData,
} from "../../shared/utils/export";
import { useCurrentTab } from "../../shared/hooks/useCurrentTab";
import { formatActiveTime } from "../../shared/utils/formatters";
import {
  getActiveEvents,
  getAllPages,
  getAverageScrollToday,
  getTimeToday,
  getAverageTTFBToday,
  getMediaEventsToday,
  getEventsPerMinute,
  getAverageLatency,
} from "../../shared/services/db";
import { shineAnimation } from "../shared/animations";
import type { EnterpriseSectionProps } from "../types";

function EnterpriseSectionInner({
  isMedia,
  togglePauseMedia,
}: EnterpriseSectionProps) {
  // Use custom hooks
  const currentTab = useCurrentTab();

  // State for analytics data with auto-refresh
  const [avgScroll, setAvgScroll] = useState<string>("0%");
  const [activeEventsCount, setActiveEventsCount] = useState<string>("0");
  const [allPages, setAllPages] = useState<string>("1");
  const [activeTimeToday, setActiveTimeToday] = useState<string>("0m");
  const [avgTTFB, setAvgTTFB] = useState<string>("0ms");
  const [mediaEvents, setMediaEvents] = useState<string>("0");
  const [eventsPerMin, setEventsPerMin] = useState<number>(0);
  const [latency, setLatency] = useState<string>("0ms");

  // Fetch and refresh analytics data
  useEffect(() => {
    const fetchData = async () => {
      const [scroll, events, pages, timeMs, ttfb, media, epm, lat] =
        await Promise.all([
          getAverageScrollToday(),
          getActiveEvents(),
          getAllPages(),
          getTimeToday(),
          getAverageTTFBToday(),
          getMediaEventsToday(),
          getEventsPerMinute(),
          getAverageLatency(),
        ]);

      setAvgScroll(`${scroll}%`);
      setActiveEventsCount(`${events}`);
      setAllPages(`${pages}`);
      setActiveTimeToday(formatActiveTime(timeMs));
      setAvgTTFB(ttfb);
      setMediaEvents(`${media}`);
      setEventsPerMin(epm);
      setLatency(lat);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <VStack
      spacing={4}
      align="stretch"
      h="240px"
      w="100%"
      bg="white"
      gap="20px"
      p="20px"
    >
      <Box
        borderColor="gray.200"
        borderWidth="4px"
        borderRadius="xl"
        p="10px"
        pl="20px"
        pt="15px"
        transition="all 0.3s ease"
        _hover={{
          transform: "scale(1.03)",
          boxShadow: "xl",
          bg: "rgba(150, 190, 210, 0.1)",
        }}
        role="group"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          w="50%"
          h="100%"
          bg="linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent)"
          transform="translateX(-100%) skewX(-20deg)"
          opacity={0}
          pointerEvents="none"
          _groupHover={{
            animation: `${shineAnimation} 1.2s ease`,
          }}
        />
        <Flex direction="row" gap="5px" align="center">
          <Box w="4px" h="16px" bg="gray.600" borderRadius="full" />
          <Text fontWeight="extrabold" textColor="gray.600" fontSize="16px">
            COLLECTION MANAGEMENT
          </Text>
        </Flex>

        <Flex
          mt="12px"
          direction="row"
          w="90%"
          justify="space-between"
          align="center"
        >
          <Flex direction="column">
            <Text
              fontWeight="extrabold"
              textColor="gray.600"
              fontSize="14px"
              pt="10px"
            >
              Interactions
            </Text>
            <Text
              fontWeight="extrabold"
              textColor="gray.500"
              fontSize="12px"
              mb="5px"
            >
              Clicks, scrolls, forms
            </Text>
          </Flex>
          <ToggleSwitch />
        </Flex>
        <Divider />
        <Flex
          mt="12px"
          direction="row"
          w="90%"
          justify="space-between"
          align="center"
        >
          <Flex direction="column">
            <Text fontWeight="extrabold" textColor="gray.600" fontSize="14px">
              Data collection
            </Text>
            <Text
              fontWeight="extrabold"
              textColor="gray.500"
              fontSize="12px"
              mb="5px"
            >
              Main analytics
            </Text>
          </Flex>
          <ToggleSwitch />
        </Flex>
        <Divider />
        <Flex
          mt="12px"
          direction="row"
          w="90%"
          justify="space-between"
          align="center"
        >
          <Flex direction="column">
            <Text fontWeight="extrabold" textColor="gray.600" fontSize="14px">
              Media events
            </Text>
            <Text
              fontWeight="extrabold"
              textColor="gray.500"
              fontSize="12px"
              mb="5px"
            >
              Video/Audio analytics
            </Text>
          </Flex>
          <ToggleSwitch togglePause={togglePauseMedia} isPaused={!isMedia} />
        </Flex>
        <Divider />
        <Flex
          mt="12px"
          direction="row"
          w="90%"
          justify="space-between"
          align="center"
        >
          <Flex direction="column">
            <Text fontWeight="extrabold" textColor="gray.600" fontSize="14px">
              Anonymization
            </Text>
            <Text
              fontWeight="extrabold"
              textColor="gray.500"
              fontSize="12px"
              mb="5px"
            >
              Domain hashing
            </Text>
          </Flex>
          <ToggleSwitch />
        </Flex>
      </Box>
      {/*Active time */}
      <Box
        borderColor="gray.200"
        borderWidth="4px"
        borderRadius="xl"
        p="10px"
        pl="20px"
        pt="15px"
        transition="all 0.3s ease"
        _hover={{
          transform: "scale(1.03)",
          boxShadow: "xl",
          bg: "rgba(150, 190, 210, 0.1)",
        }}
        role="group"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          w="50%"
          h="100%"
          bg="linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent)"
          transform="translateX(-100%) skewX(-20deg)"
          opacity={0}
          pointerEvents="none"
          _groupHover={{
            animation: `${shineAnimation} 1.2s ease`,
          }}
        />
        <Flex direction="row" gap="5px" align="center">
          <Box w="4px" h="16px" bg="gray.600" borderRadius="full" />
          <Text fontWeight="extrabold" textColor="gray.600" fontSize="16px">
            CURRENT WEBSITE
          </Text>
        </Flex>

        <Flex
          mt="12px"
          direction="row"
          w="90%"
          justify="space-between"
          align="center"
        >
          <Box
            fontWeight="extrabold"
            textColor="gray.600"
            fontSize="14px"
            py="10px"
            borderWidth="4px"
            borderRadius="xl"
            padding="2"
            textAlign="center"
            cursor="pointer"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
              borderColor: "blue.400",
              bg: "blue.50",
            }}
          >
            <Image src={currentTab.favicon} boxSize={10} mb={1} mx="auto" />
          </Box>
          <Box ml="2px">
            <Text fontSize="20px" textAlign="start" fontWeight="extrabold">
              {currentTab.title}
            </Text>
            <Text fontWeight="bold">{currentTab.url}</Text>
            <Box
              textColor="rgba(9, 162, 30, 1)"
              fontWeight="bold"
              fontSize="14px"
              borderRadius="xl"
              borderColor="gray.200"
              bg="rgba(49, 93, 51, 0.2)"
              padding="4px"
            >
              {isMedia
                ? "Media events included"
                : "Media events are turned off"}
            </Box>
          </Box>
        </Flex>
      </Box>
      {/* 6 Boxes*/}
      <Grid
        templateColumns="repeat(2, 1fr)"
        templateRows="repeat(3, 1fr)"
        gap={4}
        w="100%"
      >
        <Card
          text="Active time"
          subtext="today"
          photo="https://cdn-icons-png.flaticon.com/512/2784/2784403.png"
          value={activeTimeToday}
          boxProps={{
            bg: "linear-gradient(135deg, rgba(99, 179, 237, 0.3), rgba(66, 153, 225, 0.5))",
            textColor: "rgba(49, 130, 206, 1)",
            borderColor: "rgba(66, 153, 225, 0.3)",
            _hover: {
              transform: "scale(1.03)",
              boxShadow: "0 8px 20px rgba(66, 153, 225, 0.4)",
              bg: "linear-gradient(135deg, rgba(99, 179, 237, 0.5), rgba(66, 153, 225, 0.7))",
            },
          }}
        />
        <Card
          text="Views"
          subtext="page"
          photo="https://cdn-icons-png.flaticon.com/512/709/709612.png"
          value={allPages}
          boxProps={{
            bg: "linear-gradient(135deg, rgba(154, 230, 180, 0.3), rgba(72, 187, 120, 0.5))",
            textColor: "rgba(34, 139, 34, 1)",
            borderColor: "rgba(72, 187, 120, 0.3)",
            _hover: {
              transform: "scale(1.03)",
              boxShadow: "0 8px 20px rgba(72, 187, 120, 0.4)",
              bg: "linear-gradient(135deg, rgba(154, 230, 180, 0.5), rgba(72, 187, 120, 0.7))",
            },
          }}
        />
        <Card
          text="Activities"
          subtext="event"
          photo="https://cdn-icons-png.flaticon.com/512/3502/3502601.png"
          value={activeEventsCount}
          boxProps={{
            bg: "linear-gradient(135deg, rgba(250, 204, 21, 0.3), rgba(251, 191, 36, 0.5))",
            textColor: "rgba(180, 130, 0, 1)",
            borderColor: "rgba(251, 191, 36, 0.3)",
            _hover: {
              transform: "scale(1.03)",
              boxShadow: "0 8px 20px rgba(251, 191, 36, 0.4)",
              bg: "linear-gradient(135deg, rgba(250, 204, 21, 0.5), rgba(251, 191, 36, 0.7))",
            },
          }}
        />
        <Card
          text="Scroll"
          subtext="average"
          photo="https://cdn-icons-png.flaticon.com/512/8256/8256978.png"
          value={avgScroll}
          boxProps={{
            bg: "linear-gradient(135deg, rgba(196, 181, 253, 0.3), rgba(167, 139, 250, 0.5))",
            textColor: "rgba(109, 40, 217, 1)",
            borderColor: "rgba(167, 139, 250, 0.3)",
            _hover: {
              transform: "scale(1.03)",
              boxShadow: "0 8px 20px rgba(167, 139, 250, 0.4)",
              bg: "linear-gradient(135deg, rgba(196, 181, 253, 0.5), rgba(167, 139, 250, 0.7))",
            },
          }}
        />
        <Card
          text="Media"
          subtext="events"
          photo="https://cdn-icons-png.flaticon.com/512/2991/2991195.png"
          value={mediaEvents}
          boxProps={{
            bg: "linear-gradient(135deg, rgba(251, 182, 206, 0.3), rgba(236, 72, 153, 0.5))",
            textColor: "rgba(219, 39, 119, 1)",
            borderColor: "rgba(236, 72, 153, 0.3)",
            _hover: {
              transform: "scale(1.03)",
              boxShadow: "0 8px 20px rgba(236, 72, 153, 0.4)",
              bg: "linear-gradient(135deg, rgba(251, 182, 206, 0.5), rgba(236, 72, 153, 0.7))",
            },
          }}
        />
        <Card
          text="TTFB"
          subtext="average"
          photo="https://cdn-icons-png.flaticon.com/512/2285/2285336.png"
          value={avgTTFB}
          boxProps={{
            bg: "linear-gradient(135deg, rgba(165, 243, 252, 0.3), rgba(34, 211, 238, 0.5))",
            textColor: "rgba(14, 165, 233, 1)",
            borderColor: "rgba(34, 211, 238, 0.3)",
            _hover: {
              transform: "scale(1.03)",
              boxShadow: "0 8px 20px rgba(34, 211, 238, 0.4)",
              bg: "linear-gradient(135deg, rgba(165, 243, 252, 0.5), rgba(34, 211, 238, 0.7))",
            },
          }}
        />
      </Grid>
      {/*Quality telemetry*/}
      <Box
        borderColor="gray.200"
        borderWidth="4px"
        borderRadius="xl"
        p="10px"
        pl="20px"
        pt="15px"
        transition="all 0.3s ease"
        _hover={{
          transform: "scale(1.03)",
          boxShadow: "xl",
          bg: "rgba(150, 190, 210, 0.1)",
        }}
        role="group"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          w="50%"
          h="100%"
          bg="linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent)"
          transform="translateX(-100%) skewX(-20deg)"
          opacity={0}
          pointerEvents="none"
          _groupHover={{
            animation: `${shineAnimation} 1.2s ease`,
          }}
        />
        <Flex direction="row" gap="5px" align="center">
          <Box w="4px" h="16px" bg="gray.600" borderRadius="full" />
          <Text fontWeight="extrabold" textColor="gray.600" fontSize="16px">
            COLLECTION PROFILE
          </Text>
        </Flex>

        <Flex
          mt="12px"
          direction="row"
          w="100%"
          justify="space-between"
          align="center"
          justifyContent="center"
          gap="10px"
        >
          <Box
            fontWeight="extrabold"
            textColor="gray.600"
            fontSize="14px"
            py="10px"
            borderWidth="4px"
            borderRadius="xl"
            padding="2"
            textAlign="start"
            w="100%"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "md",
              bg: "rgba(10, 187, 28, 0.05)",
            }}
          >
            <Text>Events/min</Text>
            <Text
              fontSize="24px"
              textAlign="start"
              ml="1"
              textColor="rgba(10, 187, 28, 1)"
            >
              {eventsPerMin}
            </Text>
          </Box>
        </Flex>

        <Flex
          mt="12px"
          direction="row"
          w="100%"
          justify="space-between"
          align="center"
          justifyContent="center"
          gap="10px"
        >
          <Box
            fontWeight="extrabold"
            textColor="gray.600"
            fontSize="14px"
            py="10px"
            borderWidth="4px"
            borderRadius="xl"
            padding="2"
            textAlign="start"
            w="100%"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "md",
              bg: "rgba(0, 0, 0, 0.03)",
            }}
          >
            <Text>Delay</Text>
            <Text
              fontSize="24px"
              textAlign="start"
              ml="1"
              textColor="rgba(0, 0, 0, 1)"
            >
              {latency}
            </Text>
          </Box>
        </Flex>
      </Box>
      {/* Buttons */}
      <Flex gap="15px" justify="center" direction="column">
        <Flex gap="15px">
          <Box
            bg="linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.15))"
            textColor="rgba(37, 99, 235, 1)"
            textAlign="center"
            borderRadius="xl"
            p="12px"
            fontWeight="bold"
            w="50%"
            borderWidth="2px"
            borderColor="rgba(59, 130, 246, 0.3)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="8px"
            cursor="pointer"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-3px)",
              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.25)",
              bg: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.25))",
              borderColor: "rgba(59, 130, 246, 0.6)",
            }}
            _active={{
              transform: "translateY(-1px)",
            }}
            onClick={exportSessionsCSV}
          >
            <FaFileCsv size={18} />
            <Text fontSize="15px">CSV export</Text>
          </Box>

          <Box
            bg="linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(147, 51, 234, 0.15))"
            textColor="rgba(147, 51, 234, 1)"
            textAlign="center"
            borderRadius="xl"
            p="12px"
            fontWeight="bold"
            w="50%"
            borderWidth="2px"
            borderColor="rgba(168, 85, 247, 0.3)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="8px"
            cursor="pointer"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-3px)",
              boxShadow: "0 10px 25px rgba(168, 85, 247, 0.25)",
              bg: "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(147, 51, 234, 0.25))",
              borderColor: "rgba(168, 85, 247, 0.6)",
            }}
            _active={{
              transform: "translateY(-1px)",
            }}
            onClick={exportSessionsJSON}
          >
            <BiCodeBlock size={18} />
            <Text fontSize="15px">JSON export</Text>
          </Box>
        </Flex>

        <Box
          bg="linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.15))"
          textColor="rgba(220, 38, 38, 1)"
          textAlign="center"
          borderRadius="xl"
          p="12px"
          fontWeight="bold"
          borderWidth="2px"
          borderColor="rgba(239, 68, 68, 0.3)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="8px"
          cursor="pointer"
          transition="all 0.3s ease"
          _hover={{
            transform: "translateY(-3px)",
            boxShadow: "0 10px 25px rgba(239, 68, 68, 0.25)",
            bg: "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.25))",
            borderColor: "rgba(239, 68, 68, 0.6)",
          }}
          _active={{
            transform: "translateY(-1px)",
          }}
          onClick={deleteAllData}
        >
          <FaTrashAlt size={16} />
          <Text fontSize="15px">Delete all data</Text>
        </Box>
      </Flex>
    </VStack>
  );
}

export default function EnterpriseSection({
  isMedia,
  togglePauseMedia,
}: EnterpriseSectionProps) {
  return (
    <ChakraProvider>
      <EnterpriseSectionInner
        isMedia={isMedia}
        togglePauseMedia={togglePauseMedia}
      />
    </ChakraProvider>
  );
}
