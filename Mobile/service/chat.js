import axios from "axios";
import {url} from './cattalk';

export const getAllChat = async (token) => {
    return await axios.get(`${url}/chat/all-chat`, {
        headers: { authorization: `Bearer ${token}` }
    });
}

export const getMessage = async (token,objectChat) => {
    return await axios.get(`${url}/chat/get-message?objectChat=${objectChat}`, {
        headers: { authorization: `Bearer ${token}`}
    });
}