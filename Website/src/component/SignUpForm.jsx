import { Button, Carousel , Form, Input, Steps, Typography, theme} from 'antd';
import logo_login from '../assets/logo_login.png';
import signup from '../assets/signup.png';
import { useForm } from 'antd/es/form/Form';
import { LoginOutlined,LogoutOutlined, DoubleRightOutlined} from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import showMessage from '../helper/showMessage';
import cattalk from '../assets/carousel_02.png';
import cat_hello from '../assets/cat_hello.png';
import { useNavigate } from 'react-router-dom';
import { mailConfirm } from '../service/user';

const SignUpForm = () => {
        const {
    token: { baseColor },
    } = theme.useToken();
    const [form] = useForm()
    const navigate = useNavigate()
    const [step, setStep] = useState(0)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [count, setCount] = useState(60) 
    const otpRef = useRef()

    const getOTP = async () =>{
        try {
            const res = await mailConfirm(email);
            showMessage(res.status, res.data.message)
            if(res.status == 200){
                setOtp(res.data.otp)
                setStep(1)
            }else{
                setStep(0)
            }
        } catch (error) {
            console.log("Error: ", error.message);
        }
    }

    const handleConfirmOTP = () =>{
        if(otp == otpRef.current.input.value){
            setStep(2)
        }
    }

    useEffect(() => {
        if (step === 1) {
            const interval = setInterval(() => {
            setCount(prevCount => prevCount - 1);
            }, 1000);

            return () => {
            clearInterval(interval);
            };
        }
    }, [step]);

    const handleStepChange = (value) =>{
        if(value < step){
            setStep(value)
        }
    }

    const handleSendInfoUser = async () =>{
        try {
            // let formData = await form.validateFields();
            // if(formData)
                setStep(3)
            // const send = await axios.post('/sign-up', formData)
            //     .then(res => {
            //         showMessage(res.status, res.data.message)
            //     })
        } catch (error) {
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
                        current={step}
                        percent={60}
                        items={[
                        {
                            title: 'Your mail',
                            onClick: () => handleStepChange(0)
                        },
                        {
                            title: 'OTP code',
                            subTitle: `Left ${count}s`,
                            onClick: () => handleStepChange(1)
                        },
                        {
                            title: 'Your infomation',
                            onClick: () => handleStepChange(2)

                        },
                        {
                            title: 'Done',
                        },
                    ]}
                    />
                </div>
                {step === 0 ? (
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
                                onChange={(e) =>setEmail(e.target.value)}
                            />
                        </Form.Item>
                    </Form>
                    <Button icon={<LogoutOutlined />} type='primary' onClick={getOTP}>Next</Button>
                    </div>
                ) : step == 1 ? (
                    <div className='flex-column-center w-100 box_mail'>
                    <Typography.Paragraph>CATTALK has sent a verification link to your email, please verify your email to go to the next step.</Typography.Paragraph>
                    <Button icon={<LogoutOutlined />} type='primary' onClick={handleConfirmOTP}>Next</Button>
                    </div>
                ) : step == 2 ? (
                    <div className='w-100 flex-column-center' style={{ marginTop: '1rem'}}>
                         <Form
                    form={form}
                    layout='vertical'
                    className='w-75'
                >
                    <div className='flex-between w-100'>
                    <Form.Item
                        name="firstname"
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
                        name="lastname"
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
                        name="username"
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