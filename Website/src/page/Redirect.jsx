
import { Layout, theme, Typography, Row, Col} from 'antd';
import ChatList from '../component/redirect/ChatList';
import ChatBox from '../component/redirect/ChatBox';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllChat } from '../service/redirect';
import { useCookies } from 'react-cookie';
import img from '../assets/cat_1.png'
const {Content} = Layout;

const Home = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken(); 
  const {id} = useParams()
  const [chat, setChat] = useState()
  const [member, setMember] = useState()
  const [cookies, setCookies] = useCookies('loginToken');
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true)

    const handleGetAllChat = async () => {
        try {
            const res = await getAllChat(cookies.loginToken)
            if(res.data.status === 200){
                setChats(res.data.chat)
                if(id !== 0){
                  res.data.chat.map(item => {
                  if(item.objectChat._id == id){
                    setChat(item.objectChat)
                    setMember(item.member)
                  }
                })
                }
                setLoading(false)
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    useEffect(() => {
        handleGetAllChat()
    }, [])


  return (
        <Content
          className='container'
          style={{background: colorBgContainer}}
        >
        <Row>
          <ChatList 
            loading={loading}
            chats={chats}
            setMember={setMember}
            setChat={setChat}
            />
            {!loading && id != 0 ? (
              <ChatBox  
                chat={chat}
                member={member}
              />
            ): (
                <Col span={18}>
                  <div className="chat_box">
                    <div className="h-100 w-100 flex-center">
                        <img style={{width: '20rem'}} src={img}/>
                        <Typography.Title>Let's start</Typography.Title>
                    </div>
                  </div>
                </Col>
                )
            }

        </Row>

        </Content>
  );
};
export default Home;