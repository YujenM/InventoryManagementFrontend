import apiManager from "./ApiManager"

export const signupUser=async(queryobj)=>{
    console.log(queryobj)
    const data=await apiManager.axios
    .post(`/user/signup`,queryobj)
    .then((response)=>{
        return response;
    })
    .catch((err)=>{
        return {
            status: err.response.status,
            message: err.response.data.error.message
        }
    })
    return data;
}

