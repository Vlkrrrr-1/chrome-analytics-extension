import { Box, Text, Flex, Image } from "@chakra-ui/react";
import { shineAnimation } from "./animations";
import type { CardProps } from "../types";

export default function Card({
  text,
  subtext,
  value,
  photo,
  boxProps,
}: CardProps) {
  return (
    <Box
      borderColor="gray.200"
      borderWidth="4px"
      borderRadius="xl"
      p="10px"
      bg="rgba(175, 219, 234, 0.4)"
      transition="all 0.3s ease"
      _hover={{
        transform: "scale(1.03)",
        boxShadow: "xl",
        bg: "rgba(175, 219, 234, 0.8)",
      }}
      textColor="rgba(0, 64, 255, 1)"
      role="group"
      {...boxProps}
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
      <Flex direction="column">
        <Box bg="white" h="44px" w="44px" p="2" borderRadius="xl">
          <Image src={photo} />
        </Box>
        <Text fontWeight="extrabold" fontSize="16px" mt="4px">
          {text}
        </Text>
        <Text fontWeight="extrabold" fontSize="40px" mt="-5px">
          {value}
        </Text>
        <Text fontWeight="extrabold" fontSize="16px" mt="-10px">
          {subtext}
        </Text>
      </Flex>
    </Box>
  );
}
