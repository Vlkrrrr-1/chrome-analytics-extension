import { Box, VStack, Text, Flex, Image } from "@chakra-ui/react";
import { FaFileCsv, FaTrashAlt } from "react-icons/fa";
import { BiCodeBlock } from "react-icons/bi";
import { clearEvents } from "../../shared/services/db";
import {
  exportSessionsCSV,
  exportSessionsJSON,
} from "../../shared/utils/export";
import { useActiveTime } from "../../shared/hooks/useAnalytics";
import { formatDate } from "../../shared/utils/formatters";
import ToggleSwitch from "../shared/ToggleSwitch";
import { shineAnimation } from "../shared/animations";
import type { BasicSectionProps } from "../types";

export default function BasicSection({
  isPaused,
  togglePause,
}: BasicSectionProps) {
  const { activeTime } = useActiveTime();

  const handleClearData = async () => {
    await clearEvents();
    window.location.reload();
  };

  return (
    <VStack
      spacing={4}
      align="stretch"
      h="240px"
      w="100%"
      bg="white"
      gap="20px"
      p="15px"
    >
      <Box
        borderColor="gray.200"
        borderWidth="4px"
        borderRadius="xl"
        p="10px"
        pl="20px"
        pt="10px"
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
          <Text
            fontWeight="extrabold"
            textColor="gray.600"
            fontSize="14px"
            py="10px"
          >
            Data collection
          </Text>
          <ToggleSwitch togglePause={togglePause} isPaused={isPaused} />
        </Flex>
      </Box>
      {/*Active time */}
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
        <Flex direction="column">
          <Box bg="white" h="44px" w="44px" p="2" borderRadius="xl">
            <Image src="https://cdn-icons-png.flaticon.com/512/3557/3557755.png" />
          </Box>
          <Text
            textColor="rgba(0, 64, 255, 1)"
            fontWeight="extrabold"
            fontSize="16px"
            mt="4px"
          >
            Active time today
          </Text>
          <Text
            textColor="rgba(0, 64, 255, 1)"
            fontWeight="extrabold"
            fontSize="40px"
            mt="-5px"
          >
            {activeTime}
          </Text>
          <Text
            textColor="rgba(0, 64, 255, 1)"
            fontWeight="extrabold"
            fontSize="16px"
            mt="-10px"
          >
            {formatDate(new Date())}
          </Text>
        </Flex>
      </Box>
      <Flex gap="10px" justify="center" direction="column">
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
            onClick={exportSessionsCSV}
            _hover={{
              transform: "translateY(-3px)",
              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.25)",
              bg: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.25))",
              borderColor: "rgba(59, 130, 246, 0.6)",
            }}
            _active={{
              transform: "translateY(-1px)",
            }}
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
            onClick={exportSessionsJSON}
            _hover={{
              transform: "translateY(-3px)",
              boxShadow: "0 10px 25px rgba(168, 85, 247, 0.25)",
              bg: "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(147, 51, 234, 0.25))",
              borderColor: "rgba(168, 85, 247, 0.6)",
            }}
            _active={{
              transform: "translateY(-1px)",
            }}
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
          onClick={handleClearData}
          _hover={{
            transform: "translateY(-3px)",
            boxShadow: "0 10px 25px rgba(239, 68, 68, 0.25)",
            bg: "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.25))",
            borderColor: "rgba(239, 68, 68, 0.6)",
          }}
          _active={{
            transform: "translateY(-1px)",
          }}
        >
          <FaTrashAlt size={16} />
          <Text fontSize="15px">Delete all data</Text>
        </Box>
      </Flex>
    </VStack>
  );
}
