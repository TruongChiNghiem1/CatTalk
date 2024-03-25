import { Layout, theme, Typography, Input, Empty, Button } from 'antd';
import { SearchOutlined, CloseOutlined} from '@ant-design/icons';
import { useContext, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { AppContext } from '../context/AppContext';
import { useCookies } from 'react-cookie';
import { searchUser } from '../service/user';
const {Content } = Layout;
const Search = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const {setOpenSearch} = useContext(AppContext)
  const [cookies] = useCookies('loginToken')
  const [users, setUsers] = useState([])
  const [recents, setRecents] = useState(localStorage.getItem('recents'))

  const animationProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 400 }
  });

  const onSearch = async (search) =>{
    try {
      localStorage.setItem('search',)
      const res = await searchUser(cookies.loginToken, search)
      if(res.data.status === 200){
        setUsers(res.data.users)
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  }
  

    



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
              />

            <div className='recent'>
              <Typography.Title style={{fontSize: '16px'}}>Recent</Typography.Title>
            </div>
            <div className='mt-3'>
              {users.length > 0 ? (<></>) : (
                <Empty/>
              )}

              </div>
          </animated.div>
        </Content>
  
  );
};
export default Search;