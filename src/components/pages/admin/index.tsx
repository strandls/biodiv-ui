import { Box } from "@chakra-ui/react";
import BlueLink from "@components/@core/blue-link";
import useTranslation from "@hooks/use-translation";
import React from "react";

function AdminComponent() {
  const { t } = useTranslation();

  return (
    <Box className="container fadeInUp" pt={6}>
      <BlueLink href="/admin/notifications" display="block">
        {t("ADMIN.LINKS.NOTIFICATION")}
      </BlueLink>
    </Box>
  );
}

export default AdminComponent;
