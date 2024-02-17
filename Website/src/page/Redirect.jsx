
import { Layout, theme, Typography } from 'antd';
const {Content } = Layout;
const Home = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
        <Content
          className='container'
          style={{background: colorBgContainer,}}
        >
        <Typography.Paragraph>REDIRECT</Typography.Paragraph>
        </Content>
  );
};
export default Home;