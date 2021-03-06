import { CloseButton, Flex, Image } from "@chakra-ui/react";
import { getResourceThumbnail } from "@utils/media";
import React, { useMemo } from "react";

export default function ResourceCard({
  resourceName = "userGroups",
  resource,
  setValue,
  imageSize,
  simpleUpload
}) {
  const imageURL = useMemo(() => getResourceThumbnail(resourceName, resource, imageSize), [
    resource
  ]);

  const handleRemovePhoto = () => {
    setValue(null);
  };

  return (
    <Flex
      className="fade"
      h={simpleUpload ? "6rem" : "13rem"}
      borderRadius="lg"
      bg="white"
      flexDir="column"
      border="1px solid"
      borderColor="gray.300"
      position="relative"
      p={simpleUpload ? 0 : 2}
    >
      <Image
        objectFit="contain"
        h="full"
        w="full"
        borderRadius="md"
        ignoreFallback={true}
        src={imageURL}
      />
      <CloseButton position="absolute" top={0} right={0} size="lg" onClick={handleRemovePhoto} />
    </Flex>
  );
}
