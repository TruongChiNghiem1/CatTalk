import React from "react";
import { Row, Col, theme, Typography } from "antd"
import { Link } from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';
import LoginForm from "../component/LoginForm";
import { useCookies } from "react-cookie";

const Login = () => {
      const {
    token: { colorBgSecondary },
    } = theme.useToken();
    return (
        <div className="wrapper" style={{background: colorBgSecondary ,padding: '2rem 0 '}}>
            <Row justify="space-around" className="w-100 ">
                <Col span={10} className="flex-start">
                    <Link to={'/'}><span style={{ cursor: 'pointer' }}><HomeOutlined style={{ fontSize: '200%' }} /></span></Link>
                </Col>
                <Col span={10} style={{ textAlign: 'end' }}>
                     <Typography.Paragraph>Don't have an account? <Link to={'/signup?step=1'}><b>Sign up now</b></Link></Typography.Paragraph>
                </Col>
            </Row>
            <div className="flex-center">
                <LoginForm/>
            </div>
        </div>
    )
}

export default Login