
import { Button, Carousel , Form, Input, Typography, theme} from 'antd';
import logo_login from '../assets/logo_login.png';
import carousel_01 from '../assets/carousel_01.png';
import carousel_02 from '../assets/carousel_02.png';
import carousel_03 from '../assets/carousel_03.png';
import { useForm } from 'antd/es/form/Form';
import { LoginOutlined } from '@ant-design/icons';
const LoginForm = () => {
       const {
    token: { baseColor },
    } = theme.useToken();
    const [form] = useForm()
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
                        name="username"
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
                <Button icon={<LoginOutlined />} className='mt-1 login_btn' shape="round" type='primary'></Button>
            </div>
        </div>
    )
   
    };
export default LoginForm;