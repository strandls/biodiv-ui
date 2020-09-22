import { Box, List, ListItem } from "@chakra-ui/core";
import BlueLink from "@components/@core/blue-link";
import BoxHeading from "@components/@core/layout/box-heading";
import useTranslation from "@hooks/use-translation";
import React from "react";

export default function SpatialCoverage({ documentCoverage }) {
  const { t } = useTranslation();

  return documentCoverage.length > 0 ? (
    <Box mb={4} className="white-box">
      <BoxHeading>🌎 {t("DOCUMENT.COVERAGE.SPATIAL")}</BoxHeading>
      <List as="ol" styleType="decimal" p={4}>
        {documentCoverage.map(({ placeName, id, landscapeIds }) => (
          <ListItem key={id}>
            {landscapeIds ? (
              <BlueLink href={`/landscape/show/${landscapeIds}`}>{placeName}</BlueLink>
            ) : (
              placeName
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  ) : null;
}