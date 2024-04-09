import { Button, Carousel , Form, Input, Steps, Typography, theme, message} from 'antd';
import logo_login from '../assets/logo_login.png';
import signup from '../assets/signup.png';
import { useForm } from 'antd/es/form/Form';
import { LoginOutlined,LogoutOutlined, DoubleRightOutlined} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import cat_hello from '../assets/cat_hello.png';
import { useNavigate, useParams } from 'react-router-dom';
import { mailConfirm, signUp, authEmail} from '../service/user';
import { useCookies } from 'react-cookie';

const SignUpForm = () => {
        const {
    token: { baseColor },
    } = theme.useToken();
    const [form] = useForm()
    const navigate = useNavigate()
    const [count, setCount] = useState(60) 
    const [step, setStep] = useState(1)
    const [cookies,setCookie] = useCookies(['token']);
    const [loading, setLoading] = useState(false)

    const getOTP = async () =>{
        try {
            const value = await form.validateFields();
            setLoading(true)
            const res = await mailConfirm(value.email);
            if(res.data.status === 200){
                message.success(res.data.message) 
                setStep(2)
                localStorage.setItem('email', value.email)
            }
            else{
                message.error(res.data.message)
            }
             setLoading(false) 
        } catch (error) {
            console.log("Error: ", error.message);
        }
    }

    useEffect(() => {
        if (step == 2) {
            const interval = setInterval(() => {
            setCount(prevCount => prevCount - 1);
            }, 1000);
            return () => {
            clearInterval(interval);
            };
        }
    }, [step]);


    const handleSendInfoUser = async () => {
        setLoading(true);
        try {
            let values = await form.validateFields();
            values['token'] = cookies.token;
            const res = await signUp(values);
            if (res.data.status == 200) {
                setStep(4)
                message.success(res.data.message)
            }else if(res.data.status === 400){
                 res.data.message.map(item => ( message.warning(item)))
            }
            else{
                message.error(res.data.message)
            }
            
            setLoading(false);
        } catch (error) {
            console.log("Error: ", error.message);
        }
    };

    const handleAuthEmail = async() => {
        try {   
            let value = await form.validateFields();
            value['email'] = localStorage.getItem('email');
            const auth = await authEmail(value)
            if(auth.data.status === 200){
                setCookie('token', auth.data.token)
                setStep(3)
            }else {
                message.error(auth.data.message)
            }

        }catch (error) {
            console.log("Error: ", error.message);
        }
    }   


    return(
        <div className='flex-between' style={{padding: '24px'}}>
                <Carousel autoplay style={{width: '20vw', overflow:'hidden'}}>
                <div>
                    <img style={{width: '20vw', objectFit: 'cover'}} src={signup}/>
                </div>
            </Carousel>
            <div className='flex-column-start signup_box' style={{background: baseColor}} >
                <div className='flex-column-center w-100'>
                    <img width={200} src={logo_login}/>
                    <Steps
                        current={step - 1}
                        percent={60}
                        items={[
                        {
                            title: 'Your mail',
                        },
                        {
                            title: 'OTP code',
                            subTitle: `Left ${count}s`,
                        },
                        {
                            title: 'Your infomation',
                        },
                        {
                            title: 'Done',
                        },
                    ]}
                    />
                </div>
                {step == 1 ? (
                    <div className='flex-column-center w-100 box_mail'>
                    <Form
                        form={form}
                        layout='vertical'
                        className='w-100 flex-center'
                    >
                        <Form.Item
                            name="email"
                            label="Your email"
                            className='mail'
                            rules={[
                            {
                                required: true,
                                message: 'Email is required'
                            },
                            ]}
                        >
                            <Input 
                                placeholder='example@gmail.com'
                                type='mail'
                            />
                        </Form.Item>
                    </Form>
                    <Button loading={loading} icon={<LogoutOutlined />} type='primary' onClick={getOTP}>Next</Button>
                    </div>
                ) : step == 2 ? (
                    <div className='flex-column-center w-100 box_mail'>
                    <Typography.Paragraph>CATTALK has sent a verification link to your email, please verify your email to go to the next step.</Typography.Paragraph>
                    <Form
                        form={form}
                        layout='vertical'
                        className='w-100 flex-center'
                    >
                     <Form.Item
                            name="otp"
                            label="Your OTP you recieved in email"
                            rules={[
                            {
                                required: true,
                                message: 'OTP is required'
                            },
                            ]}
                        >
                            <Input 
                                placeholder='Input your OTP'
                                type='number'
                            />
                        </Form.Item>
                </Form>
                    <Button icon={<LogoutOutlined />} type='primary' onClick={handleAuthEmail}>Next</Button>
                    </div>
                ) : step == 3 ? (
                    <div className='w-100 flex-column-center' style={{ marginTop: '1rem'}}>
                         <Form
                    form={form}
                    layout='vertical'
                    className='w-75'
                >
                    <div className='flex-between w-100'>
                    <Form.Item
                        name="firstName"
                        label="First name"
                        style={{width: '49%'}}
                        rules={[
                        {
                            required: true,
                            message: 'First name is required'
                        },
                        ]}
                    >
                        <Input placeholder='First name'/>
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label="Last name"
                         style={{width: '49%'}}
                        rules={[
                        {
                            required: true,
                            message: 'Last name is required'
                        },
                        ]}
                    >
                        <Input placeholder='Last name'/>
                    </Form.Item>
                    </div>
                    <Form.Item
                        name="userName"
                        label="Username"
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
                        label="Password"
                        rules={[
                        {
                            required: true,
                            message: 'Password is required'
                        },
                        ]}
                    >
                        <Input.Password placeholder='Password'/>
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        rules={[
                        {
                            required: true,
                            message: 'Confirm password is required'
                        },
                        ]}
                    >
                        <Input.Password placeholder='Confirm password'/>
                    </Form.Item>
                </Form>
                    <Button 
                        icon={<LoginOutlined />} 
                        className='mt-1' 
                        type='primary'
                        onClick={handleSendInfoUser}
                        >Sign up</Button>
                </div>
                ) : (
                    <div className='mt-2 position-relative'>
                        <img width={400} src={cat_hello}/>
                        <Typography.Paragraph className='cat_hello'><h3>Let's start looking for everyone</h3></Typography.Paragraph>
                        <Button 
                            loading={loading}
                            className='login_btn' 
                            type='secondary' 
                            size='large'
                            icon={<DoubleRightOutlined />}
                            onClick={() => navigate('/login')}
                            style={{fontStyle: 'italic', color: 'orange', fontWeight: 'bold', fontSize: '24px'}}>Start now</Button>
                    </div>
                )}
               
            </div>
        </div>
    )
}

export default SignUpForm