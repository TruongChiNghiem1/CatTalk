import { useState, useEffect, useRef, useContext } from "react";
import { Button, Col, Empty, Typography, Image, Dropdown, message} from "antd";
import {VideoCameraOutlined, MoreOutlined, SendOutlined,PaperClipOutlined, EllipsisOutlined} from '@ant-design/icons';
import InputEmoji from "react-input-emoji";
import getChatTime from "../../helper/getChatTime";
import {io} from 'socket.io-client';
import { AppContext } from "../../context/AppContext";
import { deleteMessage, getMessage } from "../../service/redirect";
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
    const [socket, setSocket] = useState(io.connect('http://192.168.1.25:2090'))


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
            const chat = await getMessage(cookies.loginToken, { chatId: id, senderId: user.userName})
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
        socket.emit('join_room', dataJoin)
    }, []);

    useEffect(() => {
        socket.on('receiveMessage', newMessage => {
            setMessages(prevMessages => [...prevMessages, newMessage]);
        });
    }, []);

    useEffect(() => {
        handelGetMessages()
    }, [chatId])

    
    useEffect(()=> {
        setChat(props.chat)
        setMember(props.member)
    }, [props.user, props.chat, props.member])

    const handleDeleteMessage = async (data) => {
        try {
            const res = await deleteMessage(cookies.loginToken, {
                myUserName: user.userName,
                chatId: chatId,
                data: data
            })

            if(res.data.status === 200){
                message.success(res.data.message)
                const updateMessage = messages.filter(item => item._id !== data._id);
                setMessages(updateMessage)
            }else{
                message.error(res.data.message)
            }
        } catch (error) {
            console.log('Error: ', error.message);
        }
    }
    
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
                                if(item.typeMessage == 0){
                                    //Tin nhắn hệ thống
                                       if(item.createdBy !== user.userName){
                                         return (
                                    
                                            <div key={item._id} className="w-100 mb-1 flex-center">
                                                <span style={{color: '#2b7b7ec3', fontSize: '12px'}}>{item.content}</span>
                                            </div>
                                        )
                                       }
                                }
                                else{
                                    //Tin nhắn của tôi
                                    if(item.createdBy === user.userName){
                                        if(item.typeMessage == 2){
                                            //Tin nhắn hình ảnh
                                            return (
                                                <div key={item._id} className="myChatBox mb-1">
                                                   <Dropdown
                                                        menu={{
                                                           items: [
                                                                     {
                                                                        label: <span >Recall message</span>,
                                                                        key: '0',
                                                                    },
                                                                    {
                                                                        label: <span onClick={() => handleDeleteMessage(item)}>Delete message</span>,
                                                                        key: '1',
                                                                    },
                                                                ],
                                                        }}
                                                        trigger={['click']}
                                                    >
                                                        <a onClick={(e) => e.preventDefault()}><EllipsisOutlined/></a>
                                                    </Dropdown>
                                                    <div className="column-end">
                                                        <Image src={item.content} width={400} height={230} style={{objectFit: 'cover', borderRadius: '20px'}}/>
                                                        <div className="flex-end w-100 time">{getChatTime(item.createdAt)}</div>
                                                    </div>
                                                </div>
                                            )}else{
                                                //Tin nhắn text
                                                return (
                                                    <div key={item._id} className="myChatBox">
                                                        <Dropdown
                                                        
                                                            menu={{
                                                                items: [
                                                                     {
                                                                        label: <span >Recall message</span>,
                                                                        key: '0',
                                                                    },
                                                                    {
                                                                        label: <span onClick={() => handleDeleteMessage(item)} >Delete message</span>,
                                                                        key: '1',
                                                                    },
                                                                ],
                                                            }}
                                                            trigger={['click']}
                                                        >
                                                            <a onClick={(e) => e.preventDefault()}><EllipsisOutlined /></a>
                                                        </Dropdown>
                                                        <div className="myChat">
                                                            <span>{item.content}</span>
                                                        <div className="flex-end time">{getChatTime(item.createdAt)}</div>
                                                        </div>
                                                    
                                                    </div>
                                                )
                                        }
                                    }
                                    else{
                                        //Đoạn chat group và tin nhắn khác
                                        if(chat.chatType == 'multi'){
                                            if(item.typeMessage == 2){
                                                //Tin nhắn hình ảnh
                                                return (
                                                    <div key={item._id} className="sendChatBox mb-1">
                                                        <img src={member.filter(mem => mem.userName === item.createdBy)[0]?.avatar} width={30} height={30} style={{borderRadius: '100%', marginRight: '10px'}} />
                                                        <div className="column-start mr-1">
                                                            <Typography.Text style={{fontSize: '12px', color: 'orange'}}>{item.createdBy}</Typography.Text>
                                                            <Image src={item.content} width={400} height={230} style={{objectFit: 'cover', borderRadius: '20px'}}/>
                                                            <div className="flex-end w-75 time">{getChatTime(item.createdAt)}</div>
                                                        </div>
                                                          <Dropdown
                                                            menu={{
                                                                items: [
                                                                    {
                                                                        label: <span onClick={() => handleDeleteMessage(item)}>Delete message</span>,
                                                                        key: '1',
                                                                    },
                                                                ],
                                                            }}
                                                            trigger={['click']}
                                                        >
                                                            <a onClick={(e) => e.preventDefault()}><EllipsisOutlined /></a>
                                                        </Dropdown>
                                                    </div>
                                                 )}
                                            else{
                                                //Tin nhắn text
                                                return (
                                                    <div key={item._id} className="sendChatBox">
                                                        <img   src={member.filter(mem => mem.userName === item.createdBy)[0]?.avatar} width={30} height={30} style={{borderRadius: '100%', marginRight: '10px'}} />
                                                        <div className="column-start">
                                                            <Typography.Text style={{fontSize: '12px', color: 'orange'}}>{item.createdBy}</Typography.Text>
                                                            <div className="sendChat">
                                                                <span> {item.content}</span>
                                                            <div className="flex-end w-100 time">{getChatTime(item.createdAt)}</div>
                                                        </div>
                                                        
                                                        </div>
                                                        <Dropdown
                                                                menu={{
                                                                   items: [
                                                                    {
                                                                        label: <span >Delete message</span>,
                                                                        key: '1',
                                                                    },
                                                                ],
                                                                }}
                                                                trigger={['click']}
                                                            >
                                                                <a onClick={(e) => e.preventDefault()}><EllipsisOutlined /></a>
                                                            </Dropdown>
                                                    </div>
                                                )
                                            }
                                        
                                        }else{
                                            return (
                                                <div key={item._id} className="sendChatBox">
                                                    <div className="sendChat">
                                                        <span> {item.content}</span>
                                                    <div className="flex-end w-100 time">{getChatTime(item.createdAt)}</div>
                                                   
                                                </div>
                                            </div>
                                            )
                                        }
                                        
                                    }
                                }
                                })}
                            </>
                        ) : (
                            <Empty
                                description={'No message yet received'}
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
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