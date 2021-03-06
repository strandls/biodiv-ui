import { ENDPOINT } from "@static/constants";
import { plainHttp } from "@utils/http";
import { getYouTubeId } from "@utils/media";
import axios from "axios";

export const axGetLangList = async (document = false) => {
  try {
    const endpoint = document
      ? `${ENDPOINT.DOCUMENT}/v1/services/language`
      : `${ENDPOINT.OBSERVATION}/v1/observation/language`;

    const { data } = await plainHttp.get(endpoint, {
      params: { isDirty: false }
    });
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};

export const axGetHomeInfo = async (userGroupId?) => {
  try {
    const { data } = await plainHttp.get(`${ENDPOINT.UTILITY}/v1/services/homePage`, {
      params: { userGroupId }
    });
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: null };
  }
};

export const axGetYouTubeInfo = async (url) => {
  try {
    const ytID = getYouTubeId(url);
    const { data } = await axios.get(`${ENDPOINT.UTILITY}/v1/services/youtube/${ytID}`);
    return {
      success: true,
      title: data
    };
  } catch (e) {
    return { success: false };
  }
};

export const axGetAllHabitat = async () => {
  try {
    const { data } = await axios.get(`${ENDPOINT.UTILITY}/v1/services/habitat/all`);
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, data: [] };
  }
};
