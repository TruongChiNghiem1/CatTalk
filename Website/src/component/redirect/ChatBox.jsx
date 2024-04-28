import { useState, useEffect, useRef, useContext, useInsertionEffect } from "react";
import { Button, Col, Typography } from "antd";
import {VideoCameraOutlined, MoreOutlined, SendOutlined,PaperClipOutlined} from '@ant-design/icons';
import InputEmoji from "react-input-emoji";
import getChatTime from "../../helper/getChatTime";
import {io} from 'socket.io-client';
import { AppContext } from "../../context/AppContext";
import { getMessage } from "../../service/redirect";
import ChatMenu from "./ChatMenu";
import { useParams } from "react-router-dom";

const ChatBox = (props) => {
    const {id} = useParams()
    const {user, cookies} = useContext(AppContext)
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [chat, setChat] = useState(props.chat)
    const [member, setMember] = useState(props.member)
    const [chatId, setChatId] = useState(id)


    const [newMessageSend, setText] = useState('');
    const [openMenu, setOpenMenu] = useState(false);
    const chatRef = useRef(null);
    const [socket, setSocket] = useState(io.connect('http://192.168.0.115:2090'))
    

    const handleSendMessage= async (senderId) => {
        console.log('gui ne');
        socket.emit('message', {chatId, senderId, newMessageSend});
        setText('')
        setTimeout(() => {
            handelGetMessages();
        }, 200);
    }

    useEffect(() => {
        const chatElement = chatRef.current;
        chatElement.scrollTop = chatElement.scrollHeight;
     }, [messages]);

    const handelGetMessages = async() => {
        try {
            const chat = await getMessage(cookies.loginToken, { chatId: id})
            .then(res => {
                setMessages(res.data.messages)
            })
        } catch (error) {
            console.log(error);
        }
    }

    
    useEffect(() => {
        socket.on('connection', () => {
          console.log('Connected to the Socket.IO server');
        });
        const dataJoin = {
            chatIdJoin: id, 
            userNameJoin: cookies.user.userName
        }
        console.log(dataJoin);
        socket.emit('join_room', dataJoin)
    }, []);

    useEffect(() => {
        socket.on('receiveMessage', newMessage => {
            console.log('new Message', newMessage);
            setMessages(prevMessages => [...prevMessages, newMessage]);
        });
    }, []);

    useEffect(() => {
        handelGetMessages()
    }, [])

    
    useEffect(()=> {
        setChat(props.chat)
        setMember(props.member)
    }, [props.user, props.chat, props.member])
    
    return (
        <>
            <Col xl={openMenu ? 12 : 18} id="box_chat" className="d-flex">
                <div className="chat_box_header">
                    <div className="left_info">
                        <img src={props.member[0].avatar} className="avt_chat"/>
                        <div className="flex-column-start">
                            <h3 className="m-0 primary ">{chat.chatType === 'single' ?  `${props.member[0].firstName} ${props.member[0].lastName}` : `${chat.groupName}`}</h3>
                            <Typography.Text className="m-0">Active</Typography.Text>
                        </div>  
                    
                    </div>
                    <div className="right_tool">
                        <Button 
                        type="primary" 
                        size="large" 
                        icon={<VideoCameraOutlined/>}></Button>

                        <Button 
                        className="ml-1" 
                        type="primary" 
                        size="large" 
                        onClick={() => setOpenMenu(!openMenu)}
                        icon={<MoreOutlined />}
                        ></Button>
                    </div>
                </div>
                <div className="chat_box_main">
                    <div id="chat"  ref={chatRef}>
                        {messages && messages.length > 0 ? (
                            <>
                             {messages.map(item =>{
                                if(item.typeMessage === 0){
                                        return (
                                            <div key={item._id} className="myChatBox flex-center mb-1">
                                                <span style={{color: '#2b7b7ec3'}}>{item.content}</span>
                                            </div>
                                        )
                                }else{
                                    if(item.createdBy === user.userName){
                                        return (
                                            <div key={item._id} className="myChatBox">
                                                <div className="myChat">
                                                    <span>{item.content}</span>
                                                <div className="flex-end time">{getChatTime(item.createdAt)}</div>
                                                </div>
                                            
                                            </div>
                                        )
                                    }else{
                                        return (
                                            <div key={item._id} className="sendChatBox">
                                                <div className="sendChat">
                                                <span> {item.content}</span>
                                                        <div className="flex-end time">{getChatTime(item.createdAt)}</div>
                                                    </div>
                                            
                                            </div>
                                            )
                                    }
                                }
                    
                                })}
                            </>
                        ) : (
                            <>Chua co tin nhan</>
                        )}
                    </div>
                </div>

                <div className="chat_action">
                    <input id='attachment' hidden type="file"/>
                    <label htmlFor="attachment"><PaperClipOutlined style={{fontSize: '1.4rem', color: '#44bccc', cursor: 'pointer'}}/></label>
                    <InputEmoji
                        onChange={setText}
                        cleanOnEnter
                        value={newMessageSend}
                        onEnter={() => handleSendMessage(user.userName)}
                        placeholder="Type a message"
                        />
                        <Button type="primary" icon={<SendOutlined/>} onClick={() => handleSendMessage(user.userName)}></Button>
                </div>
        </Col>
          {openMenu && (
            <ChatMenu 
                user={props.user} 
                member={props.member}
                chat={props.chat}
                />)}
        </>
    )
}

export default ChatBox