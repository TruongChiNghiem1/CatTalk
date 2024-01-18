import React from "react";
import { Row, Col, theme } from "antd"
import { Link } from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';
import LoginForm from "../component/LoginForm";


const Login = () => {
      const {
    token: { colorBgContainer },
    } = theme.useToken();
    return (
        <div className="wrapper" style={{background: colorBgContainer}}>
            <Row justify="space-around" className="w-100">
                <Col span={10} className="flex-start">
                    <Link to={'/'}><span style={{ cursor: 'pointer' }}><HomeOutlined style={{ fontSize: '200%' }} /></span></Link>
                </Col>
                <Col span={10} style={{ textAlign: 'end' }}>
                    <p>Don't have an account? <Link to={'/register'}><b>Register</b></Link></p>
                </Col>
            </Row>
            <div className="flex-center">
                <LoginForm/>
            </div>
        </div>
    )
}

export default Login