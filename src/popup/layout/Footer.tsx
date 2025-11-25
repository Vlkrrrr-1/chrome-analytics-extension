import { ChakraProvider, VStack, Text, Flex, Divider } from "@chakra-ui/react";
import { FiList, FiHelpCircle, FiShield } from "react-icons/fi";
import type { FooterProps } from "../types";

function FooterInner({ onListClick }: FooterProps) {
  return (
    <VStack spacing={4} align="stretch" w="100%" p={4} m={0} gap="0px">
      <Divider />

      <Flex direction="column" mt="8px">
        <Flex direction="row" justify="center">
          <Flex
            w="33%"
            direction="column"
            align="center"
            gap={1}
            cursor="pointer"
            p={2}
            borderRadius="md"
            transition="all 0.3s ease"
            onClick={onListClick}
            _hover={{
              bg: "rgba(192, 76, 218, 0.1)",
              transform: "translateY(-2px)",
              color: "rgba(192, 76, 218, 1)",
            }}
          >
            <FiList size={20} />
            <Text fontSize="sm">Lists</Text>
          </Flex>

          <Flex
            w="33%"
            direction="column"
            align="center"
            gap={1}
            cursor="pointer"
            p={2}
            borderRadius="md"
            transition="all 0.3s ease"
            _hover={{
              bg: "rgba(0, 128, 255, 0.1)",
              transform: "translateY(-2px)",
              color: "rgba(0, 128, 255, 1)",
            }}
          >
            <FiHelpCircle size={20} />
            <Text fontSize="sm">Help</Text>
          </Flex>
        </Flex>

        <Flex justify="center" mt={2} align="center" gap={2}>
          <FiShield size={14} />
          <Text fontSize="m" color="gray.500">
            v1.0.0 · Privacy ensured
          </Text>
        </Flex>
      </Flex>
    </VStack>
  );
}

export default function Footer({ onListClick }: FooterProps) {
  return (
    <ChakraProvider>
      <FooterInner onListClick={onListClick} />
    </ChakraProvider>
  );
}
