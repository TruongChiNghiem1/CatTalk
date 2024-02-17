import React from 'react';
import { Col, Row, Typography,theme } from 'antd';
import { Link } from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';
import SignUpForm from "../component/SignUpForm";
const SignUp = () => {
     const {
    token: { colorLightSecondary, baseColor },
    } = theme.useToken();

    return (
        <div className='wrapper' style={{background: colorLightSecondary,padding: '2rem 0 '}} id='signup'>
            <Row justify="space-around" className="w-100 ">
                <Col span={10} className="flex-start">
                    <Link to={'/'}><span style={{ cursor: 'pointer' }}><HomeOutlined style={{ fontSize: '200%' }} /></span></Link>
                </Col>
                <Col span={10} style={{ textAlign: 'end' }}>
                     <Typography.Paragraph>You have an account? <Link to={'/login'}><b>Login</b></Link></Typography.Paragraph>
                </Col>
            </Row>
            <div className="flex-center">
                <div className='signup_form' style={{background: baseColor, marginTop: '3rem'}}>
                    <SignUpForm/>
                </div>
            </div>
    </div>
    )
};
export default SignUp;