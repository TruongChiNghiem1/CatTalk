import { Layout, theme, Typography, Input, Empty, Button } from 'antd';
import { SearchOutlined, CloseOutlined} from '@ant-design/icons';
import { useContext, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { AppContext } from '../context/AppContext';
const {Content } = Layout;
const Search = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const {setOpenSearch} = useContext(AppContext)
  const [recents, setRecents] = useState([])

    const animationProps = useSpring({
      opacity: 1,
      from: { opacity: 0 },
      config: { duration: 400 }
    });

  return (
        <Content id='search' style={{background: colorBgContainer}}>
          <animated.div style={animationProps}>
            <div className='flex-between'>
              <Typography.Title className='mt-0'>Search</Typography.Title>
              <Button icon={<CloseOutlined style={{color: ' #36a7b6'}}/>} type='secondary' onClick={() => setOpenSearch(false)}></Button>
            </div>
            
            
            <Input className='search_input' size="large" placeholder="Search" prefix={<SearchOutlined style={{color: 'orange'}}/>} />
            <div className='recent'>
              <Typography.Title style={{fontSize: '16px'}}>Recent</Typography.Title>
            </div>
            <div className='mt-3'>
              {recents.length > 0 ? (<></>) : (
                <Empty/>
              )}
              </div>
          </animated.div>
        </Content>
  
  );
};
export default Search;