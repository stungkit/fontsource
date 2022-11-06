import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Kbd,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  useEventListener,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { getUrlParams } from "../../utils/getUrlParams";
import { FontSearch } from "./InstantSearch";

export const SearchModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgSearch = useColorModeValue("gray.50", "gray.900");

  const [isOnMacEnv, setOnMacEnv] = useState<boolean>();

  useEffect(() => {
    setOnMacEnv(/(Mac|iPhone|iPad|iPod)/i.test(navigator.userAgent));
  }, [isOnMacEnv]);

  useEventListener("keydown", (e) => {
    const hotkey = isOnMacEnv ? "metaKey" : "ctrlKey";
    if (e.key.toLowerCase() === "k" && e[hotkey]) {
      e.preventDefault();
      isOpen ? onClose() : onOpen();
    }
  });

  // Open modal if search url param exists (used for OpenSearch)
  useEffect(() => {
    if (getUrlParams().has("search")) {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Button
        display="flex"
        flexDir="row"
        alignItems="center"
        onClick={onOpen}
        justifyContent={{ base: "left", lg: "space-between" }}
        width="100%"
        size="lg"
        bg={bgSearch}
        color="gray.400"
        variant="outline"
        rounded="lg"
        aria-label="Search fonts"
        role="search"
      >
        <Flex alignItems="center" gap="3">
          <SearchIcon />
          Search
        </Flex>

        <Flex gap="1" display={{ base: "none", lg: "flex" }}>
          {isOnMacEnv ? <Kbd>cmd</Kbd> : <Kbd>ctrl</Kbd>}
          <Kbd>k</Kbd>
        </Flex>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg="transparent" shadow="none">
          <ModalBody mt={12}>
            <FontSearch />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};