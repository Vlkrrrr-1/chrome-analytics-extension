import { Box, Flex } from "@chakra-ui/react";
import type { ToggleSwitchProps } from "../types";

export default function ToggleSwitch({
  togglePause,
  isPaused,
}: ToggleSwitchProps) {
  return (
    <Flex
      align="center"
      justify={isPaused ? "flex-start" : "flex-end"}
      bg={isPaused ? "gray.300" : "rgba(13, 0, 255, 1)"}
      w="50px"
      h="25px"
      borderRadius="full"
      p="2px"
      cursor="pointer"
      onClick={togglePause}
      transition="all 0.3s ease"
      _hover={{
        transform: "scale(1.05)",
        boxShadow: isPaused
          ? "0 0 8px rgba(0, 0, 0, 0.2)"
          : "0 0 10px rgba(13, 0, 255, 0.4)",
      }}
      _active={{
        transform: "scale(0.95)",
      }}
    >
      <Box
        bg="white"
        w="20px"
        h="20px"
        borderRadius="full"
        boxShadow={isPaused ? "md" : "0 2px 8px rgba(13, 0, 255, 0.3)"}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        transform={isPaused ? "scale(1)" : "scale(1.1)"}
      />
    </Flex>
  );
}
