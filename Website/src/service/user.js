import axios from "axios";
import { url } from "./cattalk";
export const mailConfirm = async (mail) => {
    return await axios.post(`${url}/user/mail-confirm`, { email: mail });
};

export const signUp = async (user) => {
    return await axios.post(`${url}/user/signup`, user);
}

export const listenEvents = async () => {
    return await axios.get(`${url}/user/events`);
}

export const authEmail = async (token) => {
    return await axios.get(`${url}/user/auth-mail?token=${token}`);
}


export const logIn = async (user) => {
    return await axios.post(`${url}/user/login`, user);
}

export const editProfile = async (data, token) => {
    return await axios.post(`${url}/user/edit-profile`, data, {
        headers: { authorization: `Bearer ${token}` }
    });
}

export const uploadAvatar = async (avatar,token) => {
    return await axios.post(`${url}/user/upload-avatar`, avatar , {
        headers: { authorization: `Bearer ${token}` }
    });
}

export const updateAboutUs = async(data, token) => {
    return await axios.post(`${url}/user/update-about-us`, data, {
        headers: { authorization: `Bearer ${token}` }
    });
} 

export const getFriends = async (token) => {
    return await axios.get(`${url}/user/get-friends`, {
        headers: { authorization: `Bearer ${token}` }
    });
}