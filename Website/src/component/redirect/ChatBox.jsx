import React, { useState } from "react";
import { Button, Col, Typography } from "antd";
import {VideoCameraOutlined, MoreOutlined, SendOutlined,PaperClipOutlined} from '@ant-design/icons';
import InputEmoji from "react-input-emoji";
const ChatBox = () => {
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    const handelGetMessages = async() => {

    }

    const handleOnEnter = () => {

    }
    
    return (
        <Col xl={16} id="box_chat" className="d-flex">
            <div className="chat_box_header">
                <div className="left_info">
                    <img src='https://i.pinimg.com/564x/18/65/40/186540b269b05cce2125a9221883320f.jpg' className="avt_chat"/>
                    <div className="flex-column-start">
                        <h3 className="m-0 primary">Nguyễn Uyển Quyên</h3>
                        <Typography.Text className="m-0">Active</Typography.Text>
                    </div>  
                
                </div>
                <div className="right_tool">
                    <Button type="primary" size="large" icon={<VideoCameraOutlined/>}></Button>
                    <Button className="ml-1" type="primary" size="large" icon={<MoreOutlined />}></Button>
                </div>
            </div>

            <div className="chat_action">
                <input id='attachment' hidden type="file"/>
                <label htmlFor="attachment"><PaperClipOutlined style={{fontSize: '1.4rem', color: '#44bccc', cursor: 'pointer'}}/></label>
                <InputEmoji
                    onChange={setText}
                    cleanOnEnter
                    onEnter={handleOnEnter}
                    placeholder="Type a message"
                    />
                    <Button type="primary" icon={<SendOutlined/>}></Button>
            </div>
        </Col>
    )
}

export default ChatBox