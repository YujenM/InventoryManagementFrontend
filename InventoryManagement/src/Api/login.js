import apiManager from "./ApiManager"
export const loginUser = async (queryobj) => {
    const message = await apiManager.axios
    .post(`/user/login`, queryobj)
    .then((response) => {
        
      return response;
    })
    .catch((e) => {
      return {
        status: e.response.status,
        message: e.response.data.error.message,
      };
    });
  return message;
};
