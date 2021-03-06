import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  Stack,
  useBreakpointValue,
  useDisclosure
} from "@chakra-ui/react";
import BoxHeading from "@components/@core/layout/box-heading";
import styled from "@emotion/styled";
import useTranslation from "@hooks/use-translation";
import React from "react";

import FiltersList from "./list";
import ClearFilters from "./taxon-browser/clear-filters";

const FilterWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
  border-right: 1px solid var(--gray-300);

  [data-accordion-item] {
    [data-accordion-panel] {
      padding: 0.75rem;
    }

    > button[aria-expanded="true"] {
      background: var(--gray-100);
    }

    > button > div {
      display: flex;
      flex: 1;
    }
  }
`;

export default function Filters() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { t } = useTranslation();
  const isDesktopFilter = useBreakpointValue({ base: false, lg: true });

  return isDesktopFilter ? (
    <Box as={FilterWrapper} gridColumn={{ lg: "1/4" }}>
      <Stack m={4} isInline={true} align="center" justify="space-between">
        <Heading size="md">{t("FILTERS.TITLE")}</Heading>
        <ClearFilters />
      </Stack>
      <FiltersList />
    </Box>
  ) : (
    <FilterWrapper>
      <Button w="full" className="toggle-button" onClick={onToggle}>
        {t("FILTERS.TOGGLE")}
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <BoxHeading>{t("FILTERS.TITLE")}</BoxHeading>
            <DrawerBody p={0}>{isOpen && <FiltersList />}</DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </FilterWrapper>
  );
}
