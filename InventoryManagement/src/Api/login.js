import axios from '../../src/Api/index';
export const loginUser = async (queryobj) => {
    try {
        console.log("Posting to:", axios.defaults.baseURL + '/user/login');
        const response = await axios.post('/user/login', {
            email: queryobj.email,
            password: queryobj.password,
        });

        if (response.status === 200) {
            if (response.data?.token) {
                localStorage.setItem('Authentication', response.data.token); 
            }
            return response.status;
        }
    } catch (err) {
        console.log("Login error:", err);
        throw err;
    }
};
