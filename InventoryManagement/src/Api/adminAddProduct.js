import ApiManager from "./ApiManager";

export const adminAddProduct = (formData, token) => {
 
  return ApiManager.axios
    .post('/adminCrud/createItem', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response)
    .catch((e) => ({
      status: e.response?.status,
      message: e.response?.data?.error?.message || e.message,
    }));
};
