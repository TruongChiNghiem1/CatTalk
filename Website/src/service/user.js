import axios from "axios";
import { url } from "./cattalk";


export const mailConfirm = async (mail) => {
    return await axios.post(`${url}/user/mail-confirm`, { email: mail });
};
