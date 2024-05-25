import {Button, List, Modal, Empty, Skeleton, Avatar, Checkbox, theme, Flex, Tag, Row, Col, Input, message} from 'antd'
import {PlusOutlined, SearchOutlined} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { getFriends } from '../../service/user'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useCookies } from 'react-cookie'
import { createGroup } from '../../service/redirect'
import { searchFriend } from '../../service/user'
const CreateChat = (props) => {
    const [cookies] = useCookies('loginToken')
    const [listFriend, setListFriend] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [searchUsers, setSearchUsers] = useState([])
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

    const handleCreateGroup = async() => {
      try {
        let nameArr = [];
        listFriend.map(user => {
          if(selectedUsers.includes(user.userName)){
            nameArr.push(user.firstName)
          }
        })

        const dataGroup = {
          nameGroup: nameArr.join(','),
           userNameAdd : selectedUsers
        }
        const res = await createGroup(cookies.loginToken, dataGroup);
        if(res.data.status === 200){
          props.refresh()
          message.success(res.data.message)
          props.handleClose();
        }else{
           message.error(res.data.message)
        }
      } catch (error) {
        console.log('Error: ', error.message);
      }
    }

    const handleSearchUser = async(e) => {
      try{
          const res = await searchFriend(cookies.loginToken, e.target.value)
           if(res.data.status === 200){
            setSearchUsers(res.data.users);
           } 
         
      }catch (error) {
        console.log('Error: ', error.message);
      }
    }
    
    return(
        <Modal
          className='create_chat_modal'
           title="New chat group"
           open={true}
           width={800}
           centered
           onCancel={() => props.handleClose()}
           footer={
            <Button 
              type='primary'
              disabled={selectedUsers.length < 2}
              icon={<PlusOutlined/>}
              onClick={handleCreateGroup}
            >Create</Button>
           }
        
        >
          <Row>
            <Input
              placeholder='Search user'
              prefix={<SearchOutlined style={{color: '#8eb9c0ac'}}/>}
              onChange={handleSearchUser}
            ></Input>
          </Row>
           {selectedUsers.length  > 0 && (
             <Row className='mt-1'>
              <Col span={1}>
                To:
              </Col>
              <Col span={23}>
                <Flex gap="4px 0" wrap="wrap" style={{background: '#d2f7fc90', borderRadius: '20px', padding: '.2rem .5rem', alignItems: 'center'}}>
                  {
                    listFriend.map(user => {
                      if(selectedUsers.includes(user.userName)){
                        return <Tag key={user} bordered={false} closable color="warning">{user.firstName} {user.lastName}</Tag>
                      }
                    })      
                  }
                </Flex>
              </Col>

            </Row>
           )}
             
            {searchUsers.length > 0 ? (
              <InfiniteScroll
                  dataLength={searchUsers.length}
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
                  dataSource={searchUsers}
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

            ) : (
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

            )}
        </Modal>
    )
}

export default CreateChat