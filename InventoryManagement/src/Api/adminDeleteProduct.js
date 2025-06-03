import ApiManager from "./ApiManager";

export const adminDeleteProduct=(productId,token)=>{
    return ApiManager.axios
    .delete(`/adminCrud/deleteItem/${productId}` ,{
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    .then((response) => response)
    .catch((e) => ({
        status: e.response?.status,
        message: e.response?.data?.error?.message || e.message,
    }));
}
