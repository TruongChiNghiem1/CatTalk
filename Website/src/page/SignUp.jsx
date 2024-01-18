import React from 'react';
import { Col, Row, Typography,theme } from 'antd';
import { Link } from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';
const SignUp = () => {
     const {
    token: { colorLightSecondary },
    } = theme.useToken();

    return (
        <div className='wrapper' style={{background: colorLightSecondary}} id='login'>
            <Row justify="space-around" className="w-100 ">
                <Col span={10} className="flex-start">
                    <Link to={'/'}><span style={{ cursor: 'pointer' }}><HomeOutlined style={{ fontSize: '200%' }} /></span></Link>
                </Col>
                <Col span={10} style={{ textAlign: 'end' }}>
                     <Typography.Paragraph>You have an account? <Link to={'/login'}><b>Login</b></Link></Typography.Paragraph>
                </Col>
            </Row>
            <div className="flex-center">
            </div>
    </div>
    )
};
export default SignUp;