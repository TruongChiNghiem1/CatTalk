
import { useNavigate } from 'react-router-dom';
import { Button, Layout, theme, Typography } from 'antd';
import cat_01 from '../assets/cat_01.png';
import {MessageOutlined} from '@ant-design/icons';
import { useContext } from 'react';
import { AppContext} from '../context/AppContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation, Pagination  } from 'swiper/modules';
import 'swiper/css';
import "swiper/css/effect-fade"

const {Content } = Layout;
const Home = () => {
  const navigate = useNavigate()
  const {token: { colorBgContainer }} = theme.useToken();
  const {user, setActiveMenu} = useContext(AppContext)
  return (
        <Content
          id='chat-home'
          className='container'
          style={{
            background: colorBgContainer,
          }}
        >

{/* <Swiper
     spaceBetween={30}
        slidesPerView={1}
        navigation={true}
        effect={"fade"}
        speed={1500}
        autoplay={{delay: 5500}}
        pagination={{
        clickable: true,
        }}
        loop={true}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
    >
      <SwiperSlide style={{background: 'red'}}>Slide 1</SwiperSlide>
      <SwiperSlide style={{background: 'red'}}>Slide 2</SwiperSlide>
      <SwiperSlide style={{background: 'red'}}>Slide 3</SwiperSlide>
      <SwiperSlide style={{background: 'red'}}>Slide 4</SwiperSlide>
      ...
    </Swiper> */}
          <div className='position-relative'>
            <div className="circle1">
              <svg xmlns="http://www.w3.org/2000/svg" width="830" height="732" viewBox="0 0 1254 972" fill="none">
                <path d="M1254 458.042C1254 741.893 956.292 972 621.068 972C285.845 972 -76.4214 780.018 14.0927 458.042C84.9812 205.878 338.878 -177.484 525.23 92.1331C669.43 300.764 1254 174.191 1254 458.042Z" fill="#FFFAF1"/>
              </svg>
            </div>
            <div className="circle2">
              <svg xmlns="http://www.w3.org/2000/svg" width="660" height="510" viewBox="0 0 1018 810" fill="none">
                <path d="M1018 381.702C1018 618.244 776.32 810 504.185 810C232.049 810 -62.0391 650.015 11.4404 381.702C68.9879 171.565 275.102 -147.904 426.383 76.7776C543.445 250.637 1018 145.159 1018 381.702Z" fill="#FFEFD8"/>
              </svg>
            </div>
            <div className='main_home flex-column-center'>
              <img src={cat_01}/>
              <Typography.Paragraph className='home_title'>Good morning, <span className='user_name'>{user.firstName}</span> !</Typography.Paragraph>
              <Typography.Text className='feature_title'>Greet someone to start the day ^^</Typography.Text>
              <Button onClick={() => {navigate('/redirect/0'), setActiveMenu('redirect')}} icon={<MessageOutlined />} type='primary' size='large'></Button>
            </div>
            
          </div>
        </Content>
  );
};
export default Home;