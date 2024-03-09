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