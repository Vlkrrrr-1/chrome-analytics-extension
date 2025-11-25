import { Box, VStack, Text, Flex, Image } from "@chakra-ui/react";
import { gradientAnimation } from "../shared/animations";
import type { HeaderProps } from "../types";

export default function Header({
  activeSection,
  setActiveSection,
}: HeaderProps) {
  return (
    <VStack
      spacing={4}
      align="stretch"
      h="240px"
      w="100%"
      p={0}
      m={0}
      bgGradient="linear(120deg, rgba(192,76,218,0.7), rgba(0,128,255,0.7), rgba(192,76,218,0.7))"
      bgSize="300% 300%"
      animation={`${gradientAnimation} 6s ease infinite`}
      gap="0px"
      position="relative"
    >
      <VStack
        position="absolute"
        top={0}
        left={0}
        w="200%"
        h="100%"
        bg="linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent)"
        transform="skewX(-20deg)"
        animation="shine 3s linear infinite"
        pointerEvents="none"
      />
      {/* Logo */}
      <Box h="60px" w="60px" alignSelf="center" mt="10">
        <Image src="/image.png" alt="logo" />
      </Box>

      {/* Header */}
      <Text textAlign="center" fontWeight="bold" color="white" fontSize="24px">
        Activity Analytics
      </Text>
      <Text textAlign="center" fontWeight="bold" color="white" fontSize="14px">
        Professional activity analytics
      </Text>

      {/* Tabs */}
      <Box
        bg="rgba(134, 217, 244, 0.4)"
        mx="30px"
        mt="20px"
        borderColor="white"
        borderWidth="2px"
        borderTopLeftRadius="lg"
        borderTopRightRadius="lg"
      >
        <Flex direction="row" pt="10px" px="10px" gap="10%">
          <Box
            w="30%"
            h="50px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderTopLeftRadius="lg"
            borderTopRightRadius="lg"
            fontWeight="bold"
            fontSize="15px"
            cursor="pointer"
            bg={activeSection === "basic" ? "white" : "transparent"}
            color={activeSection === "basic" ? "black" : "white"}
            onClick={() => setActiveSection("basic")}
            transition="all 0.3s ease"
            _hover={{
              bg:
                activeSection === "basic"
                  ? "white"
                  : "rgba(255, 255, 255, 0.2)",
              transform:
                activeSection === "basic" ? "none" : "translateY(-2px)",
            }}
          >
            L1 BASIC
          </Box>

          <Box
            w="30%"
            h="50px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderTopLeftRadius="lg"
            borderTopRightRadius="lg"
            fontWeight="bold"
            fontSize="15px"
            cursor="pointer"
            bg={activeSection === "pro" ? "white" : "transparent"}
            color={activeSection === "pro" ? "black" : "white"}
            onClick={() => setActiveSection("pro")}
            transition="all 0.3s ease"
            _hover={{
              bg:
                activeSection === "pro" ? "white" : "rgba(255, 255, 255, 0.2)",
              transform: activeSection === "pro" ? "none" : "translateY(-2px)",
            }}
          >
            L2 PRO
          </Box>

          <Box
            w="30%"
            h="50px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderTopLeftRadius="lg"
            borderTopRightRadius="lg"
            fontWeight="bold"
            fontSize="15px"
            cursor="pointer"
            bg={activeSection === "enterprise" ? "white" : "transparent"}
            color={activeSection === "enterprise" ? "black" : "white"}
            onClick={() => setActiveSection("enterprise")}
            textAlign="center"
            transition="all 0.3s ease"
            _hover={{
              bg:
                activeSection === "enterprise"
                  ? "white"
                  : "rgba(255, 255, 255, 0.2)",
              transform:
                activeSection === "enterprise" ? "none" : "translateY(-2px)",
            }}
          >
            L3 ENTERPRISE
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
}
