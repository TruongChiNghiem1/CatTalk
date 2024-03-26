import { Layout, theme, Typography, Input, Button, Skeleton, List, Avatar } from 'antd';
import { SearchOutlined, CloseOutlined, DeleteOutlined} from '@ant-design/icons';
import { useContext, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { AppContext } from '../context/AppContext';
import { useCookies } from 'react-cookie';
import { searchUser } from '../service/user';
import InfiniteScroll from 'react-infinite-scroll-component';

const {Content } = Layout;
const Search = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const {setOpenSearch} = useContext(AppContext)
  const [cookies] = useCookies('loginToken')
  const [users, setUsers] = useState([])
  const [hasMore,setHasMore] = useState(false)
  const [searchValue, setSearchValue] = useState('')
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
        <Content id='search' style={{background: colorBgContainer}}>
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
              onChange={e => setSearchValue(e.target.value)}
              allowClear
              />
            {!searchValue && (
            <div className='recent'>
              <Typography.Title style={{fontSize: '16px'}}>Recent</Typography.Title>
            </div>
            )}
            <div>
              {searchValue ? (
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
                  dataSource={users}
                  renderItem={(item) => (
                    <List.Item key={item.userName}>
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} size='large' />}
                        title={<a href="">{item.firstName}{" "}{item.lastName}</a>}
                        description={item.userName}
                      />
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
              ) : (
                  <List
                  dataSource={recents}
                  renderItem={(item, key) => (
                    <List.Item key={key} className='recents_seach'>
                      <List.Item.Meta
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