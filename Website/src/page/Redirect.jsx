
import { Layout, theme, Typography, Row } from 'antd';
import ChatList from '../component/redirect/ChatList';
import ChatBox from '../component/redirect/ChatBox';
const {Content} = Layout;
const Home = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
        <Content
          className='container'
          style={{background: colorBgContainer,}}
        >
        <Row>
          <ChatList/>
          <ChatBox/>
        </Row>

        </Content>
  );
};
export default Home;