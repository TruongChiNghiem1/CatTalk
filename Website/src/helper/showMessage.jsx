import { message } from "antd";

const showMessage = (status, message) =>{
    switch (status) {
        case 200:
            message.succes(message, status)
            break;
        case 500:
            message.error(message)
            break;
        default:
            break;
    }
}

export default showMessage