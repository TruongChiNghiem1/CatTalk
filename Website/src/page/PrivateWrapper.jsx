import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const PrivateWrapper = () => {
    const [cookies] = useCookies('loginToken');
    return cookies.loginToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateWrapper