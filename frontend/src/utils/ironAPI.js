import axios from "axios";

let BASE_URL = "http://localhost:8000/api";

const auth_token = (token=null) => {
    return {
        headers: {'Authorization': `Token ${token}`}
    }
}

const ironAPI = {}

ironAPI.login = async (loginData) => {
    return await axios.post(`${BASE_URL}/login/`, loginData, {
        auth: {
          username: loginData.email,
          password: loginData.password
        }
      })
};

ironAPI.logout = async (token) => {
    console.log('token ', token)
    return await axios.post(`${BASE_URL}/logout/`, {}, auth_token(token))
};

ironAPI.signup = async (signupData) => {
    return await axios.post(`${BASE_URL}/users/`, signupData)
};

ironAPI.checkEmail = async (email) => {
    let response = await axios.post(`${BASE_URL}/users/check_email/`, {'email': email})
    if (response && response.data){
        if (response.data.user_exists === 'true') { return false }
    }
    return true
};

ironAPI.getUser = async (id, token) => {
    return await axios.get(`${BASE_URL}/users/${id}/`, auth_token(token));
}

export default ironAPI