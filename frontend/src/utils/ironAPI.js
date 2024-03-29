import axios from "axios";

let BASE_URL = "http://localhost:8000/api";
const ironAPI = {}

const config = (token=null, basicAuth=null) => {
    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }
    if (token) {
        options.headers.Authorization = `Token ${token}`
    }
    if (basicAuth) {
        options.auth = {
            'username': basicAuth.email,
            'password': basicAuth.password
        }
    }
    return options
}

// User
ironAPI.login = async (loginData) => {
    return await axios.post(`${BASE_URL}/login/`, {}, 
        config(null, {email:loginData.email, password:loginData.password}))
};
ironAPI.logout = async (token) => {
    return await axios.post(`${BASE_URL}/logout/`, {}, config(token))
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
    return await axios.get(`${BASE_URL}/users/${id}/`, config(token));
}

// Program
ironAPI.createNewProgram = async (programData, token) => {
    return await axios.post(`${BASE_URL}/programs/`, programData, config(token))
};
ironAPI.getProgram = async (id, token) => {
    return await axios.get(`${BASE_URL}/programs/${id}/`, config(token));
}
ironAPI.getAuthoredPrograms = async (token) => {
    return await axios.get(`${BASE_URL}/programs/authored/`, config(token));
}

// Workout
ironAPI.addWorkout = async (data, token) => {
    return await axios.post(`${BASE_URL}/workouts/`, data, config(token))
}
ironAPI.getWorkout = async (id, token) => {
    return await axios.get(`${BASE_URL}/workouts/${id}/`, config(token));
}
ironAPI.updateWorkout = async (id, data, token) => {
    return await axios.patch(`${BASE_URL}/workouts/${id}/`, data, config(token));
}

// Section
ironAPI.addSection = async (data, token) => {
    return await axios.post(`${BASE_URL}/sections/`, data, config(token))
}
ironAPI.deleteSection = async (id, token) => {
    return await axios.delete(`${BASE_URL}/sections/${id}/`, config(token))
}
ironAPI.updateSection = async (id, data, token) => {
    return await axios.patch(`${BASE_URL}/sections/${id}/`, data, config(token))
}
ironAPI.createOrUpdateSection = async (id, data, token) => {
    return await axios.post(`${BASE_URL}/sections/${id}/create_or_update/`, data, config(token));
}
ironAPI.fullUpdateSection = async (id, data, token) => {
    return await axios.post(`${BASE_URL}/sections/${id}/full_section_update/`, data, config(token));
}

//Exercise
ironAPI.getExercise = async (id, token) => {
    return await axios.get(`${BASE_URL}/exercises/${id}/`, config(token));
}
ironAPI.createOrUpdateExercise = async (id, data, token) => {
    return await axios.post(`${BASE_URL}/exercises/${id}/create_or_update/`, data, config(token));
}

// Base Exercises
ironAPI.getBaseExercises = async (token) => {
    return await axios.get(`${BASE_URL}/exercise_bases/`, config(token));
}
ironAPI.checkExerciseBase = async (data, token) => {
    return await axios.post(`${BASE_URL}/exercise_bases/check/`, data, config(token));
}
ironAPI.createExerciseBase = async (data, token) => {
    return await axios.post(`${BASE_URL}/exercise_bases/`, data, config(token));
}

// Set Schema
ironAPI.updateSetSchema = async (id, data, token) => {
    return await axios.patch(`${BASE_URL}/set_schema/${id}/`, data, config(token));
}

// Sets
ironAPI.createOrUpdateSet = async (id, data, token) => {
    return await axios.post(`${BASE_URL}/sets/${id}/create_or_update/`, data, config(token));
}
ironAPI.deleteSet = async (id, token) => {
    return await axios.delete(`${BASE_URL}/sets/${id}/`, config(token));
}

export default ironAPI