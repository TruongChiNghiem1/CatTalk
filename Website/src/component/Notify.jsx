import { Layout, List, theme, Typography, Avatar, Empty, Skeleton  } from 'antd';
import { getAllNotify } from '../service/notify';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCookies } from 'react-cookie';
import getHumanReadableDate from '../helper/getHumanReadableDate';
import { useSpring, animated } from 'react-spring';
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
      if(res.data.status === 200){ 
         setData(res.data.notifies);
      }
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

   const animationProps = useSpring({
      opacity: 1,
      from: { opacity: 0 },
      config: { duration: 400 }
    });

  return (
        <Content
          style={{
            padding: '0 24px',
            minHeight: 280,
            background: colorBgContainer,
            borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px',
             position: 'absolute', zIndex: 2, left: 0, width: '25%'
          }}
        >
          <animated.div style={animationProps}>
              <Typography.Title className='mt-0 title_feature'>Notify</Typography.Title>
              <InfiniteScroll
                dataLength={data.length ?? 0}
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
                                description="Nothing"
                            />
                            ),
                          }}
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
        </animated.div>
        </Content>
  );
};
export default Notify;