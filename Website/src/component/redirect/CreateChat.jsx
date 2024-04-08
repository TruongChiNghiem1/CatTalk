import {Button, List, Modal, Empty, Skeleton, Avatar, Checkbox, theme, Flex, Tag} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { getFriends } from '../../service/user'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useCookies } from 'react-cookie'
const CreateChat = (props) => {
    const [cookies] = useCookies('loginToken')
    const [listFriend, setListFriend] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const {token: { colorBoldSecondary }} = theme.useToken();

    const [selectedUsers, setSelectedUsers] = useState([])
    const handelLoadFriend = async () => {
        try {
            const items = await getFriends(cookies.loginToken);
            setListFriend(items.data.data)
        } catch (error) {   
            console.log('Error: ', error.message);
        }
    }

    useEffect(() => {
        handelLoadFriend();
    }, [])




    const loadMoreData = () => {}

    const handleCheckboxChange = (userName) => {
  const selectedIndex = selectedUsers.findIndex((selectedItem) => selectedItem === userName);
  if (selectedIndex > -1) {
    const updatedItems = [...selectedUsers];
    updatedItems.splice(selectedIndex, 1);
    setSelectedUsers(updatedItems);
  } else {
    setSelectedUsers([userName, ...selectedUsers]);
  }
};
    
    return(
        <Modal
           title="New chat"
           open={true}
           width={800}
           centered
           onCancel={() => props.handleClose()}
           footer={
            <Button icon={<PlusOutlined />}>Create</Button>
           }
        
        >
             <Flex gap="4px 0" wrap="wrap" style={{background: '#d2f7fc90', borderRadius: '20px', padding: '.2rem .5rem', alignItems: 'center'}}>
             <>{
                selectedUsers.length ? (
                    listFriend.map(user => {
                       if(selectedUsers.includes(user.userName)){
                        return <Tag key={user} bordered={false} closable color="warning">{user.firstName} {user.lastName}</Tag>
                       }
            })
                ) : (<p style={{color: '#6ab1b6', margin: 0}}>Choose member</p>)
             }</>
            </Flex>
            <InfiniteScroll
                  dataLength={listFriend.length}
                  next={loadMoreData}
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
                  style={{overflow: 'hidden'}}
              >
                <List
                  locale={{
                    emptyText: (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="User not found"
                    />
                    ),
                  }}
                  dataSource={listFriend}
                  renderItem={(item) => (
                    <List.Item key={item.userName}>
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} size='large' />}
                        title={<a href="">{item.firstName}{" "}{item.lastName}</a>}
                        description={item.userName}
                      />
                      <Checkbox
                        onChange={() => handleCheckboxChange(item.userName)}
                        checked={selectedUsers.some((selectedItem) => selectedItem === item.userName)}
                      />
                    </List.Item>
                  )}
                />
              </InfiniteScroll>

        </Modal>
    )
}

export default CreateChat