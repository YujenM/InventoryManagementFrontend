import ApiManager from "./ApiManager";


export const getAdminOrder = async () => {
  try {

    const response = await ApiManager.axios
    .get('/adminCrud/getAdminOrder');
    return response.data;
  } catch (e) {
    return {
      success: false,
      message: e.response?.data?.error?.message || 'Something went wrong',
      status: e.response?.status || 500,
    };
  }
};
