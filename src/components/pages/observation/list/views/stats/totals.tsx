import { SimpleGrid } from "@chakra-ui/react";
import useTranslation from "@hooks/use-translation";
import React, { useMemo } from "react";

import TableTotals from "./table-totals";
import useTotals from "./use-totals";

const Totals = ({ filter, observationData, speciesGroup }) => {
  const { totalsData } = useTotals({ filter });
  const { t } = useTranslation();

  const s = useMemo(() => {
    if (!filter.sGroup) {
      const sgroups = Object.values(observationData.ag.groupSpeciesName);
      return sgroups.reduce((a: number, b: number) => a + b);
    }

    const filteredGroups = speciesGroup.filter((sg) => filter.sGroup.includes(sg.id));

    const filteredCounts = filteredGroups.map(
      (v) => observationData.ag.groupSpeciesName[v.name] || 0
    );

    return filteredCounts.reduce((a, b) => a + b);
  }, [filter]);

  const totals = { totalObservations: s, ...totalsData.data.list };
  const isLoading = totalsData.data.isLoading;

  return (
    <SimpleGrid columns={{ md: 4 }} spacing={4} mb={4}>
      <TableTotals
        title={t("LIST.STATS_BAR.TOTAL_OBSERVATIONS")}
        count={totals["totalObservations"]}
        isLoading={isLoading}
      />
      <TableTotals
        title={t("LIST.STATS_BAR.TOTAL_TAXA")}
        count={totals["totalTaxa"]}
        isLoading={isLoading}
      />
      <TableTotals
        title={t("LIST.STATS_BAR.TOTAL_UPLOADERS")}
        count={totals["totalUploaders"]}
        isLoading={isLoading}
      />
      <TableTotals
        title={t("LIST.STATS_BAR.TOTAL_IDENTIFIERS")}
        count={totals["totalIdentifiers"]}
        isLoading={isLoading}
      />
    </SimpleGrid>
  );
};

export default Totals;
