import { useState, useEffect, useRef, useContext } from "react";
import { Button, Col, Typography } from "antd";
import {VideoCameraOutlined, MoreOutlined, SendOutlined,PaperClipOutlined} from '@ant-design/icons';
import InputEmoji from "react-input-emoji";
import getChatTime from "../../helper/getChatTime";
import {io} from 'socket.io-client';
import { AppContext } from "../../context/AppContext";
import { getMessage } from "../../service/redirect";
import img from '../../assets/cat_1.png'
import ChatMenu from "./ChatMenu";

const ChatBox = (props) => {
    const {user, cookies} = useContext(AppContext)
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState();
    const [userChat, setUserChat] = useState(props.user)
    const [chatId, setChatId] = useState(props.chat._id)
    const [member, setMember] = useState(props.member)

    const [newMessageSend, setText] = useState('');
    const [openMenu, setOpenMenu] = useState(false);
    const chatRef = useRef(null);
    const [socket, setSocket] = useState(io.connect('http://localhost:2090'))
    

    socket.emit('join_room', cookies.user.userName);
    useEffect(() => {
        const chatElement = chatRef.current;
        chatElement.scrollTop = chatElement.scrollHeight;
     }, [messages]);

    const handelGetMessages = async() => {
    try {
        const chat = await getMessage(cookies.loginToken, { receiverId: user.userName , senderId: userChat.userName})
        .then(res => {
            setMessages(res.data.messages)
        })
    } catch (error) {
        console.log(error);
    }
    }

    useEffect(() => {
        handelGetMessages()
    }, [])

    const handleSendMessage= (senderId, receiverId) => {
        socket.emit('message', {chatId, senderId, receiverId, newMessageSend});
        setText('')
        setTimeout(() => {
            handelGetMessages();
        }, 200);
    }

 
   useEffect(() => {
        socket.on('connection', () => {
          console.log('Connected to the Socket.IO server');
        });
      }, []);

    useEffect(() => {
        socket.on('connection', () => {
          console.log('Connected to the Socket.IO server');
        });
      }, []);

    // useEffect(() => {
        // socket.on('receiveMessage', newMessage => {
        // setMessages(prevMessages => [...prevMessages, newMessage]);
        // });
    // }, []);
    useEffect(() => {
        socket.on('receiveMessage', newMessage => {
          setMessages(prevMessages => [...prevMessages, newMessage]);
        });
    }, []);


    useEffect(()=> {
        setUserChat(props.user)
        setChatId(props.chat._id)
        setMessages(props.messages)
        setMember(props.member)
    }, [props.user, props.chat, props.messages, props.member])
    
    return (
        <>
        <Col xl={openMenu ? 12 : 18} id="box_chat" className="d-flex">
            {userChat && chatId ? (
                <>
                <div className="chat_box_header">
                <div className="left_info">
                    <img src={props.user.avatar} className="avt_chat"/>
                    <div className="flex-column-start">
                        <h3 className="m-0 primary ">{props.user.firstName} {props.user.lastName}</h3>
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
                    {messages.map(item =>{
                        if(item.typeMessage === 0){
                                return (
                                    <div key={item._id} className="myChatBox flex-center mb-1">
                                        {/* <div className="myChat">
                                            <span>{item.content}</span>
                                        <div className="flex-end time">{getChatTime(item.createdAt)}</div>
                                        </div> */}
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
                </div>
            </div>

            <div className="chat_action">
                <input id='attachment' hidden type="file"/>
                <label htmlFor="attachment"><PaperClipOutlined style={{fontSize: '1.4rem', color: '#44bccc', cursor: 'pointer'}}/></label>
                <InputEmoji
                    onChange={setText}
                    cleanOnEnter
                    value={newMessageSend}
                    onEnter={() => handleSendMessage(user.userName, props.user.userName)}
                    placeholder="Type a message"
                    />
                    <Button type="primary" icon={<SendOutlined/>} onClick={() => handleSendMessage(user.userName, props.user.userName)}></Button>
            </div>
                </>
            ) : ( <div className="chat_box">
                <div id="chat"ref={chatRef}>
                    <div className="h-100 w-100 flex-center">
                        <img style={{width: '20rem'}} src={img}/>
                        <Typography.Title>Let's start</Typography.Title>
                    </div>
                </div>
            </div>)}
        </Col>
          {openMenu && (<ChatMenu user={props.user} member={props.member}/>)}
        </>
    )
}

export default ChatBox