import { Layout, theme, Typography, Input, Button, Skeleton, List, Avatar, Empty } from 'antd';
import { SearchOutlined, CloseOutlined, DeleteOutlined, EnterOutlined} from '@ant-design/icons';
import { useContext, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { AppContext } from '../context/AppContext';
import { useCookies } from 'react-cookie';
import { searchUser } from '../service/user';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

const {Content } = Layout;
const Search = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const {setOpenSearch} = useContext(AppContext)
  const [cookies] = useCookies('loginToken')
  const [users, setUsers] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searched, setSearched] = useState(false)
  const [recents, setRecents] = useState(JSON.parse(localStorage.getItem('recents')) ?? [])

  const animationProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 400 }
  });

  const onSearch = async () =>{
    try {
     let updateRecents;
      if (recents.includes(searchValue)) {
        // Nếu searchValue đã tồn tại trong recents, đưa nó lên đầu mảng
        const updatedRecents = recents.filter(item => item !== searchValue);
        updateRecents = [searchValue, ...updatedRecents];
      } else {
        updateRecents = [searchValue, ...recents];
      }

      if(updateRecents.length > 10){
          updateRecents.splice(0, updateRecents.length - 10);
      }
      setRecents(updateRecents)
      localStorage.setItem('recents', JSON.stringify(updateRecents))
      const res = await searchUser(cookies.loginToken, searchValue)
      if(res.data.status === 200){
        setUsers(res.data.users)
      }
      setSearched(true)
    } catch (error) {
      console.log('Error: ', error);
    }
  }
  

    const onResearch = async (text) =>{
      setSearchValue(text)
       setSearched(true)
    try {
     let updateRecents;
      if (recents.includes(text)) {
        // Nếu searchValue đã tồn tại trong recents, đưa nó lên đầu mảng
        const updatedRecents = recents.filter(item => item !== text);
        updateRecents = [text, ...updatedRecents];
      } else {
        updateRecents = [text, ...recents];
      }

      if(updateRecents.length > 10){
          updateRecents.splice(0, updateRecents.length - 10);
      }
      setRecents(updateRecents)
      localStorage.setItem('recents', JSON.stringify(updateRecents))
      const res = await searchUser(cookies.loginToken, text)
      if(res.data.status === 200){
        setUsers(res.data.users)
      }
     
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  const loadMoreData = async () =>{}

    const removeItem = (index) => {
      const updatedRecents = [...recents];
      updatedRecents.splice(index, 1); // Xóa phần tử tại index

      setRecents(updatedRecents); // Cập nhật trạng thái

      localStorage.setItem('recents', JSON.stringify(updatedRecents)); // Cập nhật localStorage
    };

  return (
        <Content 
          id='search' 
          style={{background: colorBgContainer, position: 'absolute', zIndex: 2, left: 0, width: '25%', boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px'}}
          
           >
          <animated.div style={animationProps}>
            <div className='flex-between'>
              <Typography.Title className='mt-0 title_feature'>Search</Typography.Title>
              <Button icon={<CloseOutlined style={{color: ' #36a7b6'}}/>} type='secondary' onClick={() => setOpenSearch(false)}></Button>
            </div>
            
            <Input 
              className='search_input' 
              size="large" 
              placeholder="Search" 
              prefix={<SearchOutlined 
              style={{color: 'orange'}}/>}
              onPressEnter={onSearch}
              value={searchValue}
              onChange={e => {setSearchValue(e.target.value),  setSearched(false)}}
               allowClear
              />
            {!searchValue && (
            <div className='recent'>
              <Typography.Title style={{fontSize: '16px'}}>Recent</Typography.Title>
            </div>
            )}
            <div>
              {searchValue ? (
                <>
                {searched ? (
                   <InfiniteScroll
                  dataLength={users.length}
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
                  dataSource={users}
                  renderItem={(item) => (
                    <List.Item key={item.userName}>
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} size='large' />}
                        title={<Link to={`user/${item._id}`}>{item.firstName}{" "}{item.lastName}</Link>}
                        description={item.userName}
                      />
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
                ) : (
                  <div className='flex-center' style={{padding: '2rem'}}>
                    <Typography.Text style={{color: '#b8b8b8dd'}}><EnterOutlined /> Press enter to find user</Typography.Text>
                  </div>
                )}
                </>
              ) : (
                  <List
                  locale={{
                    emptyText: (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="There are no recent searches"
                    />
                    ),
                  }}
                  dataSource={recents}
                  renderItem={(item, key) => (
                    <List.Item key={key} className='recents_seach'>
                      <List.Item.Meta
                      onClick={() => {onResearch(item)}}
                         description={item}
                      />
                      <DeleteOutlined className='del_recent' onClick={() => removeItem(key) }/>
                    </List.Item>
                  )}
                />
              ) }

              </div>
          </animated.div>
        </Content>
  
  );
};
export default Search;