import React, { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Col, List, Skeleton, Typography, Button, Spin } from 'antd';
import {PlusOutlined} from '@ant-design/icons'
import { getAllChat } from '../../service/redirect';
import { useCookies } from 'react-cookie';
import { AppContext } from '../../context/AppContext';
import CreateChat from './CreateChat';
import getHumanReadableDate from '../../helper/getHumanReadableDate';

const ChatList = (props) => {
    const {user} = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [cookies, setCookies] = useCookies('loginToken');
    const [hasMore, setHasMore] = useState(false);
    const [createChat, setCreateChat] = useState(false)

    const handleGetAllChat = async () => {
        try {
            const res = await getAllChat(cookies.loginToken)
            if(res.data.status === 200){
                setData(res.data.chat)
            }
            setLoading(false)
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    useEffect(() => {
        handleGetAllChat()
    }, [])

    const toggleOpenCreate = () => {
        setCreateChat(!createChat)
    }

    const handleSwitchChat = (reciverId, senderId) => {
        data.map(chat => {
            if(chat.userChat.userName == reciverId){
                props.setUser(chat.userChat)
                props.setChat(chat.objectChat)
            }
        })
          props.switchChat(reciverId, senderId)
    }

    return (
    <Col
        xl={8}
        id="chatList"
        style={{
            height: '93%',
            overflow: 'auto',
            paddingRight: '.5rem'
        }}
        >
        <div className='w-100 flex-between'>
                <Typography.Title className='mt-0 title_feature'>{user.userName}</Typography.Title>
                <Button icon={<PlusOutlined />} type='primary' onClick={toggleOpenCreate}></Button>
        </div>
        <Typography.Text style={{fontSize: '18px', fontWeight: 'bold', marginTop: '1.5rem'}}>Messages</Typography.Text>
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
                <div className='w-100 text-center'><Spin/></div>
            ) : (
                <List
                dataSource={data}
                renderItem={(item) => (
                    <List.Item 
                    className='chat_list_item'
                    onClick={() => handleSwitchChat(item.userChat.userName, item.member[0].userName)}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.userChat.avatar} size='large'/>}
                            title={`${item.userChat.firstName} ${item.userChat.lastName}`}
                            description={
                            <div className='w-100 flex-between'>
                                <span style={{fontSize: '14px'}}>{item.newMessage ? item.newMessage.content : ''}</span>
                                <span style={{fontSize: '12px'}}>{item.newMessage ? getHumanReadableDate(new Date(item.newMessage.updatedAt)): null}</span>
                            </div>}
                        />
                    </List.Item>
                )}
                />
            )}
        </InfiniteScroll>
        {createChat && (<CreateChat handleClose={toggleOpenCreate}/>)}
        </Col>
    )
}

export default ChatList