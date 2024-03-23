import { Layout, List, theme, Typography, Avatar, Divider, Skeleton  } from 'antd';
import { getAllNotify } from '../service/notify';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCookies } from 'react-cookie';
import getHumanReadableDate from '../helper/getHumanReadableDate';
const {Content } = Layout;
const Notify = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [cookies,setCookie] = useCookies(['loginToken']);
  const [data, setData ] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)

  const handleLoadNotification = async () => {
    try {
      const res = await getAllNotify(cookies.loginToken);
      console.log(res);
      setData(res.data.notifies);
      setLoading(false);

    }catch (err) {
      console.log('Error: ', err);
    }

  }

  const loadMoreData = async () => {

  }

  useEffect(() =>{
    handleLoadNotification();
  }, []) 

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
        <Typography.Title className='mt-0 title_feature'>Notify</Typography.Title>
         <InfiniteScroll
          dataLength={data.length}
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
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item._id}>
              <List.Item.Meta
                avatar={<Avatar src={item.image} />}
                title={<a href="https://ant.design">{item.content}</a>}
                description={getHumanReadableDate(new Date(item.updatedAt))}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
        
        </Content>
  );
};
export default Notify;