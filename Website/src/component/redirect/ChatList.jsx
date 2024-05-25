import React, { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Col, List, Skeleton, Typography, Button, Dropdown} from 'antd';
import {PlusOutlined, MoreOutlined ,PushpinOutlined,DeleteOutlined} from '@ant-design/icons'
import { deleteMessage, getAllChat } from '../../service/redirect';
import { useCookies } from 'react-cookie';
import { AppContext } from '../../context/AppContext';
import CreateChat from './CreateChat';
import getHumanReadableDate from '../../helper/getHumanReadableDate';
import { MuteIcon } from '../../helper/CustomIcon';
import { useNavigate } from 'react-router-dom';
const ChatList = (props) => {
    const {user, cookies} = useContext(AppContext);
    const [loading, setLoading] = useState(props.loading);
    const [data, setData] = useState(props.chats);
    
    const [hasMore, setHasMore] = useState(false);
    const [createChat, setCreateChat] = useState(false)
    const navigate = useNavigate();

    const items = [
        {
            label: 'Add favourite',
            icon: <PushpinOutlined />,
            key: '1',
        },
        {
            label: 'Unmute chat',
            icon: <MuteIcon/>,
            key: '2',
        },
        {
            label: 'Delete chat',
            icon: <DeleteOutlined />,
            key: '3',
        },
    ];

    useEffect(()=> {
        setLoading(props.loading)
        setData(props.chats)
    }, [props.loading])

    const toggleOpenCreate = () => {
        setCreateChat(!createChat)
    }

    const handleSwitchChat = (chatId) => {
        data.map(item => {
            if(item.objectChat._id === chatId) {
                props.setMember(item.member)
                props.setChat(item.objectChat)
            }
        })
        navigate(`/redirect/${chatId}`)
    }

    return (
    <Col
        xl={6}
        id="chatList"
        style={{
            paddingRight: 12
        }}
        >
        <div className='w-100 flex-between'>
            <Typography.Title className='mt-0 title_feature'>{user.userName}</Typography.Title>
            <Button icon={<PlusOutlined />} type='primary' onClick={toggleOpenCreate}></Button>
        </div>
        <div 
            style={{
                 boxShadow: '0 3px 2px rgba(100, 185, 178, 0.1)',
                 paddingBottom: '.5rem',

            }}
            >
             <Typography.Text style={{fontSize: '18px', fontWeight: 'bold', marginTop: '1.5rem'}}>Messages</Typography.Text>
        </div>
        <InfiniteScroll
            dataLength={data.length}
            next={() => {}}
            hasMore={hasMore}
            loader={
            <Skeleton
                avatar
                paragraph={{
                rows: 1,
                }}
                active
            />
            }
            scrollableTarget="chatList"
        >
            {loading ? (
                <div className='w-100'>
                    {
                        [1,2,3,4,5,6,7,8].map((item, key) => {
                            return(
                                 <Skeleton
                                    key={key}
                                    avatar
                                    paragraph={{
                                    rows: 1,
                                    }}
                                    active
                                 />
                            )
                        })
                        }
                </div>
            ) : (
                <List
                dataSource={data}
                renderItem={(item) => (
                    <>
                     {item.objectChat.chatType === 'single' ? (
                         <List.Item 
                            className='chat_list_item'
                            onClick={() => handleSwitchChat(item.objectChat._id)}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.member[0].avatar} size='large'/>}
                                    title={
                                        <div className='w-100 flex-between'>
                                            <span>{item.member[0].firstName} {item.member[0].lastName}</span>
                                            <Dropdown
                                                menu={{items}}
                                                trigger={['click']}    
                                                className='more_action_chat_list'
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <a onClick={(e) => e.preventDefault()}>
                                                <MoreOutlined/>
                                                </a>
                                            </Dropdown>
                                        
                                        </div>
                                    }
                                    description={
                                    <div className='w-100 flex-between'>
                                        <span style={{fontSize: '14px'}} className='new_message'>{item.newMessage ? item.newMessage.content : ''}</span>
                                        <span style={{fontSize: '12px'}}>{item.newMessage ? getHumanReadableDate(new Date(item.newMessage.updatedAt)): null}</span>
                                    </div>}
                                />
                            </List.Item>
                    )
                     : (
                         <List.Item 
                            className='chat_list_item'
                            onClick={() => handleSwitchChat(item.objectChat._id)}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.objectChat.avatar} size='large'/>}
                                    title={
                                        <div className='w-100 flex-between'>
                                            <span>{item.objectChat.groupName}</span>
                                            <Dropdown
                                                menu={{items}}
                                                trigger={['click']}    
                                                className='more_action_chat_list'
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <a onClick={(e) => e.preventDefault()}>
                                                <MoreOutlined/>
                                                </a>
                                            </Dropdown>
                                        
                                        </div>
                                    }
                                    description={
                                    <div className='w-100 flex-between'>
                                        <span style={{fontSize: '14px'}} className='new_message'>{item.newMessage ? item.newMessage.content : ''}</span>
                                        <span style={{fontSize: '12px'}}>{item.newMessage ? getHumanReadableDate(new Date(item.newMessage.updatedAt)): null}</span>
                                    </div>}
                                />
                            </List.Item>
                     )}
                    </>
                )}
                />
            )}
        </InfiniteScroll>
        {createChat && (
            <CreateChat 
                handleClose={toggleOpenCreate}
                refresh={props.refresh}  
            />
            )}
        </Col>
    )
}

export default ChatList