
import { Button, Carousel , Form, Input, Typography, message, theme} from 'antd';
import logo_login from '../assets/logo_login.png';
import carousel_01 from '../assets/carousel_01.png';
import carousel_02 from '../assets/carousel_02.png';
import carousel_03 from '../assets/carousel_03.png';
import { useCookies } from 'react-cookie';
import { useForm } from 'antd/es/form/Form';
import { LoginOutlined } from '@ant-design/icons';
import { logIn } from '../service/user';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
const LoginForm = () => {
       const {
    token: { baseColor },
    } = theme.useToken();
    const navigate = useNavigate();
    const [form] = useForm()
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [loading, setLoading] = useState(false)
    const {setUser} = useContext(AppContext)

    const handleLogIn = async() => {
        setLoading(true);
        try {
            let values = await form.validateFields();
            const user = await logIn(values)
            if(user.data.status == 200){
                removeCookie('token');
                setCookie('loginToken', user.data.accessToken);
                setCookie('user', user.data.user);
                setUser(user.data.user)
                message.success(user.data.message);
                navigate('/home')
            }
            else if(user.data.status == 401){
                 user.data.message.map(item => ( message.warning(item)))
            }
            else{
                message.error(user.data.message)
            }
            setLoading(false)
        } catch (error) {
            console.log("Error: ", + error);
        }
    }


    return(
        <div className='flex-center vw-75 vh-75' id='login' style={{ marginTop: '2.5rem'}}>
            <Carousel autoplay style={{width: '40vw', height: '70vh'}}>
                <div>
                    <img style={{width: '40vw', height: '70vh', objectFit: 'cover'}} src={carousel_01}/>
                </div>
                <div>
                    <img style={{width: '40vw', height: '70vh', objectFit: 'cover'}} src={carousel_02}/>
                </div>
                <div>
                    <img style={{width: '40vw', height: '70vh', objectFit: 'cover'}} src={carousel_03}/>
                </div>
            </Carousel>
            <div className='form flex-column-around login_box' style={{background: baseColor}} >
                <img width={200} src={logo_login}/>
                <Form
                    form={form}
                    layout='vertical'
                 className='w-100'
                >
                    <Form.Item
                        name="userName"
                        rules={[
                        {
                            required: true,
                            message: 'Username is required'
                        },
                        ]}
                    >
                        <Input placeholder='Username'/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Password is required'
                        },
                        ]}
                    >
                        <Input.Password placeholder='Password'/>
                        </Form.Item>
                        <Typography.Paragraph className='mb-0 text-end'>Forgot password?</Typography.Paragraph>
                </Form>
                <Button 
                    icon={<LoginOutlined />} 
                    className='mt-1 login_btn' 
                    shape="round" 
                    type='primary'
                    onClick={handleLogIn}
                    loading={loading}
                    ></Button>
            </div>
        </div>
    )
   
    };
export default LoginForm;