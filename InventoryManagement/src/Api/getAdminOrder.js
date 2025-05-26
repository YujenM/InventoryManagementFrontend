import ApiManager from "./ApiManager";

const getToken = () => {
  return localStorage.getItem('Authentication'); 
};

export const getAdminOrder = async () => {
  try {
    const token = getToken();
    const response = await ApiManager.axios
    .get('/adminCrud/getAdminOrder', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    return {
      success: false,
      message: e.response?.data?.error?.message || 'Something went wrong',
      status: e.response?.status || 500,
    };
  }
};
