import ApiManager from "./ApiManager";

export const adminAddProduct = (product) => {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("price", product.price);
  formData.append("stock", product.stock);
  formData.append("itemImage", product.itemImage); 

  return ApiManager.axios
    .post('/adminCrud/createItem', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      return {
        status: e.response?.status,
        message: e.response?.data?.error?.message || e.message,
      };
    });
};
