import { Outlet, Navigate } from "react-router-dom";
import { checkAuthentication } from "../service/user";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { message } from "antd";
const PrivateWrapper = (props) => {
    const [cookkies] = useCookies(['loginToken', 'user'])
    const [isNext, setNext] = useState(cookkies.loginToken ? true: false)
    const checkAuthn = async () => {
        try {
            const res = await checkAuthentication(cookkies.loginToken);
            if(res.data.status !== 402){
                props.theme(cookkies.user.nightMode)
                setNext(true)
            }else{
                message.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            setNext(false)
        }
    }

    useEffect(() => {
        checkAuthn()
    }, [])

    return isNext ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateWrapper