import React, { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Col, List, Skeleton, Typography, Button } from 'antd';
import {PlusOutlined} from '@ant-design/icons'
import { getAllChat } from '../../service/redirect';
import { useCookies } from 'react-cookie';
import { AppContext } from '../../context/AppContext';


const ChatList = () => {
    const {user} = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [cookies, setCookies] = useCookies('loginToken');
    const [hasMore, setHasMore] = useState(false);

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


    return (
    <Col
        xl={8}
        id="scrollableDiv"
        style={{
            height: '93%',
            overflow: 'auto',
            paddingRight: '.5rem'
        }}
        >
        <div className='w-100 flex-between'>
                <Typography.Title className='mt-0 title_feature'>{user.userName}</Typography.Title>
                <Button icon={<PlusOutlined />} type='primary'></Button>
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
            scrollableTarget="scrollableDiv"
        >
            <List
            dataSource={data}
            renderItem={(item) => (
                <List.Item key={item.groupName}>
                <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href="https://ant.design">{item.groupName}</a>}
                    // description={item.email}
                />
                </List.Item>
            )}
            />
        </InfiniteScroll>
        </Col>
    )
}

export default ChatList