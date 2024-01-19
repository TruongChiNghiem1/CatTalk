import { Button, Carousel , Form, Input, Steps, theme} from 'antd';
import logo_login from '../assets/logo_login.png';
import carousel_01 from '../assets/carousel_01.png';
import carousel_02 from '../assets/carousel_02.png';
import { useForm } from 'antd/es/form/Form';
import { LoginOutlined,LogoutOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import showMessage from '../helper/showMessage';
import cattalk from '../assets/carousel_02.png';

const SignUpForm = () => {
        const {
    token: { baseColor },
    } = theme.useToken();
    const [form] = useForm()

    const [step, setStep] = useState(0)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [count, setCount] = useState(60)
    const otpRef = useRef()

    const getOTP = async () =>{
        try {
            // const otp = await axios.post('/get-otp', {email: email})
            //     .then(res =>{
            //         showMessage(res.status, res.data.message)
            //         if(res.status == 200){
            //             setOtp(res.data.otp)
            //         }
            //            setStep(2)
            //     })
            setStep(1)
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
        console.log('fdkhjgsdkfhgjkdf');
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

    return(
        <div className='flex-between' style={{padding: '24px'}}>
            <Carousel autoplay style={{width: '20vw', height: '70vh', overflow:'hidden'}}>
                <div>
                    <img style={{width: '40vw', objectFit: 'cover'}} src={carousel_01}/>
                </div>
                <div>
                    <img style={{width: '40vw', objectFit: 'cover'}} src={carousel_02}/>
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
                                onChange={(e) =>setEmail(e.target.value)}
                            />
                        </Form.Item>
                    </Form>
                    <Button icon={<LogoutOutlined />} type='primary' onClick={getOTP}>Next</Button>
                    </div>
                ) : step == 1 ? (
                    <div className='flex-column-center w-100 box_mail'>
                    <Form
                        form={form}
                        layout='vertical'
                        className='w-100 flex-center'
                    >
                        <Form.Item
                            label="OTP"
                            className='mail'
                            rules={[
                            {
                                required: true,
                                message: 'OTP is required!'
                            },
                            ]}
                        >
                            <Input 
                                placeholder='Your OTP'
                                ref={otpRef}
                            />
                        </Form.Item>
                    </Form>
                    <Button icon={<LogoutOutlined />} type='primary' onClick={handleConfirmOTP}>Next</Button>
                    </div>
                ) : step == 2 ? (
                    <div className='w-100 flex-column-center' style={{ marginTop: '2rem'}}>
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
                        onClick={()=> setStep(3)}
                        >Sign up</Button>
                </div>
                ) : (
                    <div className='flex-column mt-2'>
                        {/* <img src={}/> */}
                    </div>
                )}
               
            </div>
        </div>
    )
}

export default SignUpForm