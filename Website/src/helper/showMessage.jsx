import { message } from "antd";

const showMessage = (status, text) =>{
    switch (status) {
        case 200:
            message.success(text)
            break;
        case 500:
            message.error(text)
            break;
        case 400:
        message.error(text)
        break;
        default:
            break;
    }
}

export default showMessage