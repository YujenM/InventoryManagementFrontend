import ApiManager from "./ApiManager";
export const adminLogin =async(queryobj)=>{
    const message=await ApiManager.axios
    .post('/admin/login',queryobj)
    .then((response)=>{
        localStorage.setItem('Authentication', response.data.token);
        return response
    })
    .catch((e)=>{
        return{
            status: e.resposne.status,
            message: e.resposne.data.error.message
        };
    });
    return message;
}