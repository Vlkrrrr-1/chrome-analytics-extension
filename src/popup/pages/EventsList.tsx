import { Box, VStack, Text, Flex, Button, Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllEvents, type EventRecord } from "../../shared/services/db";
import { formatDateTime } from "../../shared/utils/formatters";
import { FaArrowLeft } from "react-icons/fa";
import type { EventsListProps } from "../types";

export default function EventsList({ onBack }: EventsListProps) {
  const [events, setEvents] = useState<EventRecord[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await getAllEvents();
      setEvents(allEvents.reverse());
    };
    fetchEvents();
  }, []);

  const getEventColor = (type: string) => {
    switch (type) {
      case "page_view":
        return "blue.500";
      case "scroll":
        return "purple.500";
      case "active_time":
        return "green.500";
      case "active_time_ms":
        return "teal.500";
      case "focus_gain":
        return "orange.400";
      case "focus_lost":
        return "red.400";
      default:
        return "gray.500";
    }
  };

  return (
    <VStack w="100%" bg="white" p="20px" spacing={4} align="stretch">
      <Flex w="100%" align="center" gap="10px">
        <Button
          leftIcon={<FaArrowLeft />}
          onClick={onBack}
          colorScheme="blue"
          size="sm"
        >
          Back
        </Button>
        <Text fontSize="20px" fontWeight="bold">
          Events ({events.length})
        </Text>
      </Flex>

      <Divider />

      <VStack
        w="100%"
        maxH="650px"
        overflowY="auto"
        spacing={2}
        align="stretch"
      >
        {events.map((event, index) => (
          <Box
            key={index}
            p="12px"
            borderWidth="2px"
            borderRadius="md"
            borderColor="gray.200"
            bg="gray.50"
            _hover={{ bg: "gray.100", borderColor: "blue.300" }}
            transition="all 0.2s"
          >
            <Flex justify="space-between" align="center" mb="8px">
              <Text
                fontSize="14px"
                fontWeight="bold"
                color={getEventColor(event.type)}
              >
                {event.type}
              </Text>
              <Text fontSize="11px" color="gray.500">
                {formatDateTime(event.ts)}
              </Text>
            </Flex>

            {event.page && (
              <Text fontSize="12px" color="gray.600" noOfLines={1}>
                📄 {event.page.title}
              </Text>
            )}

            {event.percentScroll !== undefined && (
              <Text fontSize="12px" color="purple.600" fontWeight="bold">
                📊 Scroll: {event.percentScroll}%
              </Text>
            )}

            {event.time && (
              <Text fontSize="12px" color="teal.600" fontWeight="bold">
                ⏱️ Time: {event.time}
              </Text>
            )}

            <Text fontSize="10px" color="gray.400" mt="4px">
              Session: {event.sid.substring(0, 8)}...
            </Text>
          </Box>
        ))}

        {events.length === 0 && (
          <Text textAlign="center" color="gray.400" py="40px">
            No events
          </Text>
        )}
      </VStack>
    </VStack>
  );
}
