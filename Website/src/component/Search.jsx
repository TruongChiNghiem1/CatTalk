import { Layout, theme, Typography } from 'antd';
const {Content } = Layout;
const Search = () => {
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
            borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px',
            position: 'relative',
            top: 0,
            left: 0,
          }}
        >
        <Typography.Paragraph>Search</Typography.Paragraph>
        </Content>
  );
};
export default Search;