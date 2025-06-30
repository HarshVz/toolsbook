import axios from "axios";
import { BACKEND_URL } from "../utils";

const signin = async (username, password) => {
    if (!username ||!password) {
        throw new Error('Invalid credentials');
    }
    try {
        const response = await axios.post(`${BACKEND_URL}/signin`, { username, password });
        if(response.status === 200){
            // console.log(response.data)
            alert('Signin successful!');
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('name', response.data.name);
            return response.data
        }
        return null
    } catch (error) {
        console.error('Error during signin:', error);
        alert('Error during signin')
        return error
    }
}

const signup = async (name, username, email, password) => {
    if (!username ||!password) {
        throw new Error('Invalid credentials');
    }
    try {
        const response = await axios.post(`${BACKEND_URL}/signup`, {name, username, email, password});
        if(response.status === 200){
            // console.log(response.data)
            alert('Signup successful!');
            return response.data
        }
        return null
    } catch (error) {
        console.error('Error during signup:', error);
        alert('Error during signup')
        return error
    }
}

export {
    signin,
    signup,
}
