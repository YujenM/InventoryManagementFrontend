import ApiManager from "./ApiManager";

export const adminSignup=(queryobj)=>{
    const message=ApiManager.axios
    .post('/admin/signup',queryobj)
    .then((response)=>{
        return response
    })
    .catch((e)=>{
        return{
            status:e.response.status,
            message:e.resposne.data.error.message
        }
    });
    return message;
}