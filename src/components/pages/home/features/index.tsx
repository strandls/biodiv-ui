import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import useTranslation from "@hooks/use-translation";
import { FEATURES } from "@static/home";
import React from "react";

import Info from "./info";

export default function Features() {
  const { t } = useTranslation();

  return (
    <Box mb={10}>
      <Heading as="h2" mb={6} fontSize="2rem">
        {t("HOME.FEATURES.TITLE")}
      </Heading>
      <SimpleGrid columns={[1, 1, 1, 2]} spacing={6}>
        {FEATURES.map(({ icon, title, link }) => (
          <Info key={title} icon={icon} title={title} link={link} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
