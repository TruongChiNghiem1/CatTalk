import { Button, theme} from "antd"
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { authEmail } from "../service/user";
import { useCookies } from "react-cookie";
const Auth =  () => {
    const navigate = useNavigate();
    const {token} = useParams()
    const {token: { baseColor }} = theme.useToken();
     const [cookies,setCookie, removeCookie] = useCookies(['token']);

    const confirmEmail = async() => {
        const res = await authEmail(token);
         setCookie('token', res.data.token, { path: '/' });
    }

    useEffect(() =>{
        confirmEmail()
    }, []) 

    
    return (
          <div className="wrapper not_found flex-column-center" style={{background: baseColor}}> 
            <Button icon={<HomeOutlined/>} type="primary" onClick={() => navigate(`/signup/2?token=${token}`)}>Confirm</Button>
        </div>

    )
}

export default Auth