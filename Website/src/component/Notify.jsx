import { Layout, theme, Typography } from 'antd';
const {Content } = Layout;
const Notify = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            width: '35%',
            background: colorBgContainer,
            borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'
          }}
        >
        <Typography.Paragraph>Notify</Typography.Paragraph>
        </Content>
  );
};
export default Notify;