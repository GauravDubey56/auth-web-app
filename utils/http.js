const axios = require("axios");
const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_SERVER_URL;
const sendResponse = (httpResp) => {
  if (httpResp?.response) {
    return {
      status: false,
      data: httpResp?.data?.data,
      message: httpResp?.data?.message
    };
  } else {
    return {
      status: httpResp?.status?.toString().includes(200) ? true : false,
      data: httpResp?.data?.data,
      message: httpResp?.data?.message
    };
  }
};
export const apiCallWithoutAuth = async (method, path, options = {body: "", query: ""}) => {
  try {
    const { body, query } = options;
    const resp = await axios.request({
      method,
      url: `${BASE_URL}${path[0] == "/" ? path : `/${path}`}`,
      ...(body && { data: body }),
      ...(query && { params: query }),
    });
    return sendResponse(resp);
  } catch (error) {
    debugger;
    console.error('API response error',error?.response?.data);
    return sendResponse(error);
  }
};
