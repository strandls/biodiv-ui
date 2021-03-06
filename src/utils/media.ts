import { ENDPOINT } from "@static/constants";
import { OBSERVATION_FALLBACK } from "@static/inline-images";
import { ASSET_TYPES } from "@static/observation-create";

const cleanSlashes = (path) => path.split("//").join("/");

/**
 * Parses YouTube video id from given Url
 * @param url
 * @returns YouTube video Id or blank
 */
export const getYouTubeId = (url) => {
  let ID = "";
  try {
    url = url.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i);
      ID = ID[0];
    } else {
      return;
    }
  } catch (e) {
    console.error(e);
  }
  return ID;
};

export const getYouTubeEmbed = (url) => {
  return `https://www.youtube.com/embed/${getYouTubeId(url)}`;
};

export const getObservationImage = (resourceUrl, size = ""): string => {
  return `${ENDPOINT.FILES}/get/crop/observations${resourceUrl}${size}`;
};

export const getObservationRAW = (resourceUrl: string): string => {
  return `${ENDPOINT.RAW}/observations${resourceUrl}`;
};

export const getYoutubeImage = (resourceUrl: string, size = "hqdefault") => {
  const ytid = getYouTubeId(resourceUrl);
  return ytid ? `https://i.ytimg.com/vi/${ytid}/${size}.jpg` : undefined;
};

export const getUserImage = (resourceUrl, w = 50) => {
  return resourceUrl
    ? resourceUrl.startsWith("http")
      ? resourceUrl
      : `${ENDPOINT.FILES}/get/crop/users${resourceUrl}?w=${w}`
    : undefined;
};

export const getObservationThumbnail = (resourceUrl, height = 200) => {
  return resourceUrl
    ? `${ENDPOINT.FILES}/get/crop/observations${resourceUrl}?h=${height}`
    : undefined;
};

export const getMyUploadsThumbnail = (resourceUrl, userId, height = 200) => {
  return resourceUrl
    ? `${ENDPOINT.FILES}/get/crop/myUploads/${userId}${resourceUrl}?h=${height}`
    : undefined;
};

export const getResourceThumbnail = (resourceName, resourceUrl, height = 200) => {
  return resourceUrl
    ? `${ENDPOINT.FILES}/get/crop/${resourceName}/${resourceUrl}?h=${height}`
    : undefined;
};

export const getTraitIcon = (resourceUrl, w = 40) => {
  return `${ENDPOINT.FILES}/get/crop/traits${resourceUrl}?w=${w}`;
};

export const getGroupImage = (resourceUrl) => {
  return `${ENDPOINT.FILES}/get/crop/userGroups${resourceUrl}`;
};

export const getGroupImageThumb = (resourceUrl, height = 32) => {
  return resourceUrl
    ? `${ENDPOINT.FILES}/get/crop/userGroups${resourceUrl}?h=${height}`
    : `/next-assets/species/Unknown.svg`;
};

export const getSuggestionIcon = (resourceUrl) => {
  return resourceUrl ? `${ENDPOINT.FILES}/get${cleanSlashes(resourceUrl)}?w=50` : undefined;
};

export const getLocalIcon = (icon, type = "species") =>
  `/next-assets/${type}/${icon || "Unknown"}.svg`;

export const getFallbackSpinner = (light = true) => {
  return `data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg' stroke='%23${
    light ? "fff" : "000"
  }'%3E%3Cg fill='none' fill-rule='evenodd' stroke-width='2'%3E%3Ccircle cx='22' cy='22' r='1'%3E%3Canimate attributeName='r' begin='0s' dur='1.8s' values='1; 20' calcMode='spline' keyTimes='0; 1' keySplines='0.165, 0.84, 0.44, 1' repeatCount='indefinite' /%3E%3Canimate attributeName='stroke-opacity' begin='0s' dur='1.8s' values='1; 0' calcMode='spline' keyTimes='0; 1' keySplines='0.3, 0.61, 0.355, 1' repeatCount='indefinite' /%3E%3C/circle%3E%3Ccircle cx='22' cy='22' r='1'%3E%3Canimate attributeName='r' begin='-0.9s' dur='1.8s' values='1; 20' calcMode='spline' keyTimes='0; 1' keySplines='0.165, 0.84, 0.44, 1' repeatCount='indefinite' /%3E%3Canimate attributeName='stroke-opacity' begin='-0.9s' dur='1.8s' values='1; 0' calcMode='spline' keyTimes='0; 1' keySplines='0.3, 0.61, 0.355, 1' repeatCount='indefinite' /%3E%3C/circle%3E%3C/g%3E%3C/svg%3E`;
};

export const getFallbackByMIME = (mime) => {
  const type = mime ? mime.toString().split("/")[0] : null;
  switch (type) {
    case ASSET_TYPES.IMAGE:
      return OBSERVATION_FALLBACK.PHOTO;

    case ASSET_TYPES.AUDIO:
      return OBSERVATION_FALLBACK.AUDIO;

    case ASSET_TYPES.VIDEO:
      return OBSERVATION_FALLBACK.VIDEO;

    default:
      return OBSERVATION_FALLBACK.DEFAULT;
  }
};

export const getDocumentPath = (resourceUrl: string): string => {
  return `${ENDPOINT.RAW}/pdf-viewer/?file=${getDocumentFilePath(resourceUrl)}`;
};

export const getDocumentFilePath = (resourceUrl: string): string => {
  return `${ENDPOINT.RAW}/content/documents${resourceUrl}`;
};
