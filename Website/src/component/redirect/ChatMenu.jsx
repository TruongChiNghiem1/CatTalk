import { theme, Typography, Switch, Col, Skeleton, List, Avatar} from "antd"
import { useSpring, animated } from "react-spring"
import {BellOutlined} from '@ant-design/icons';
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

const ChatMenu = (props) => {
    const {token: { colorBgContainer }} = theme.useToken();
    const [hasMore, setHasMore] = useState(false)
    const animationProps = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 400 }
    });


    const handleMuteChat = () =>{
        try{
            
        }catch(e){
            console.log('Error: ', e.message);
        }
    }
    return (
        <Col 
            span={6} 
            id='chat-menu' 
            style={{
                paddingRight: '24px',
                background: colorBgContainer, 
                position: 'absolute', 
                zIndex: 3, right: 0, width: '25%',
            }}
        >
          <animated.div style={animationProps}>
            <div 
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'space-between'
                }}
            >
                <div className="w-100">
                     <Typography.Title className="title_feature">Details</Typography.Title>
                    <div className="flex-between" style={{padding: '8px 0'}}>
                    <span>
                        <BellOutlined style={{color: 'orange', fontSize: '20px'}} className="mr-1"/>
                        <Typography.Text style={{fontSize: '16px'}}>Mute messages</Typography.Text>
                    </span>
                    <Switch defaultChecked onChange={handleMuteChat} />
                    </div>
                        
                    <div id="list-member" className="mt-1">
                        <span className="p-2"><Typography.Text style={{fontSize: '16px', fontWeight: 'bold'}}>Members</Typography.Text></span>
                        <InfiniteScroll
                            dataLength={props.member.length}
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
                            scrollableTarget="list-member"
                            >
                                <List
                                    dataSource={props.member}
                                    renderItem={(item) => (
                                        <List.Item 
                                        className='chat_list_item'
                                        >
                                            <List.Item.Meta
                                                avatar={<Avatar src={item.avatar} size='large'/>}
                                                title={
                                                    <div className='w-100 flex-between'>
                                                        <span>{item.firstName} {item.lastName}</span>
                                                        {/* <Dropdown
                                                            menu={{items}}
                                                            trigger={['click']}    
                                                            className='more_action_chat_list'
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <a onClick={(e) => e.preventDefault()}>
                                                            <MoreOutlined/>
                                                            </a>
                                                        </Dropdown> */}
                                                    </div>
                                                }
                                                description={item.userName}
                                            />
                                        </List.Item>
                                    )}
                                    />
                        </InfiniteScroll>
                    </div>     
                </div>
                <div>Co cai nit</div>

            </div>
                 
          </animated.div>
        </Col>
    )
}

export default ChatMenu