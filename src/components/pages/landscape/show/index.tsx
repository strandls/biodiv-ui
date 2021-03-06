import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import BlueLink from "@components/@core/blue-link";
import LocalLink from "@components/@core/local-link";
import SITE_CONFIG from "@configs/site-config.json";
import useTranslation from "@hooks/use-translation";
import { Landscape } from "@interfaces/landscape";
import { getMapCenter } from "@utils/location";
import dynamic from "next/dynamic";
import React from "react";
import wkt from "wkt";

import InfoTab from "./document-box";
import DownloadLandscape from "./download";
import LandscapeFields from "./fields";

const NakshaMapboxView: any = dynamic(
  () => import("naksha-components-react").then((mod: any) => mod.NakshaMapboxView),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
);

interface LandscapeShowComponentProps {
  landscape: Landscape;
  landscapeShow;
  documentList;
}

export default function LandscapeShowComponent({
  landscape,
  landscapeShow,
  documentList
}: LandscapeShowComponentProps) {
  const { t } = useTranslation();
  const defaultViewPort = React.useMemo(() => getMapCenter(2.8), []);

  return (
    <div className="container mt">
      <Flex justifyContent="space-between" direction={{ base: "column", md: "row" }} mb={4}>
        <Heading as="h1" size="xl">
          {landscape.shortName}
          <Text as="span" color="gray.500" ml={4}>
            {t("LANDSCAPE.SITE_NUMBER")}
            {landscape.siteNumber}
          </Text>
        </Heading>
      </Flex>
      <Box position="relative" h="22rem" bg="gray.200" borderRadius="md" overflow="hidden" mb={4}>
        <NakshaMapboxView
          defaultViewPort={defaultViewPort}
          data={wkt.parse(landscapeShow.wktData)}
          mapboxApiAccessToken={SITE_CONFIG.TOKENS.MAPBOX}
        />
        <DownloadLandscape id={landscape.id} title={landscape.shortName} />
      </Box>
      <LandscapeFields childs={landscapeShow.contents.childs} />
      <Stack mb={3}>
        <Heading mb={3} size="lg">
          {t("DOCUMENT.LIST.TITLE")}
        </Heading>
        {documentList.map((o) => (
          <InfoTab
            key={o.document.id}
            habitatIds={o.habitatIds}
            specieIds={o.speciesGroupIds}
            document={o.document}
            user={o.userIbp}
          />
        ))}
        <Flex py={2} justifyContent="flex-end">
          <LocalLink href={`/document/list`} params={{ state: landscape.shortName }}>
            <BlueLink>
              {t("HOME.BANNER_MORE")} <ArrowForwardIcon />
            </BlueLink>
          </LocalLink>
        </Flex>
      </Stack>
    </div>
  );
}
