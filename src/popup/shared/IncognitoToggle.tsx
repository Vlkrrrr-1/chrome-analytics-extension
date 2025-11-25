import { Box, Flex, useToast } from "@chakra-ui/react";
import type { IncognitoToggleSwitchProps } from "../types";

export default function IncognitoToggleSwitch({
  togglePauseIncognito,
  isIncognito,
}: IncognitoToggleSwitchProps) {
  const toast = useToast();

  const handleClick = () => {
    if (togglePauseIncognito) togglePauseIncognito();
    toast({
      title: "Incognito Mode",
      description:
        "If you want to save incognito mode data, you should enable the extension in the settings.⚙️",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex
      align="center"
      justify={isIncognito ? "flex-end" : "flex-start"}
      bg={isIncognito ? "rgba(13, 0, 255, 1)" : "gray.300"}
      w="50px"
      h="25px"
      borderRadius="full"
      p="2px"
      cursor="pointer"
      onClick={handleClick}
      transition="all 0.3s ease"
      _hover={{
        transform: "scale(1.05)",
        boxShadow: isIncognito
          ? "0 0 10px rgba(13, 0, 255, 0.4)"
          : "0 0 8px rgba(0, 0, 0, 0.2)",
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
        boxShadow={isIncognito ? "0 2px 8px rgba(13, 0, 255, 0.3)" : "md"}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        transform={isIncognito ? "scale(1.1)" : "scale(1)"}
      />
    </Flex>
  );
}
