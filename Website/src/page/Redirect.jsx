
import { Layout, theme, Typography, Row } from 'antd';
import ChatList from '../component/redirect/ChatList';
import ChatBox from '../component/redirect/ChatBox';
import { useContext, useState } from 'react';
import { getMessage } from '../service/redirect';
import { AppContext } from '../context/AppContext';
const {Content} = Layout;
const Home = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken(); 
  const {cookies} = useContext(AppContext)

  const [infoUser, setInfoUser] = useState({})
  const [messages, setMessages] = useState([])
  const [chat, setChat] = useState({})

  const handleSwitchMessage = async(senderId, receiverId) => {
    try {
      const chat = await getMessage(cookies.loginToken, {senderId, receiverId})
      .then(res => {
        setMessages(res.data.messages)
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
        <Content
          className='container'
          style={{background: colorBgContainer,}}
        >
        <Row>
          <ChatList switchChat={handleSwitchMessage} setUser={setInfoUser} setChat={setChat}/>
          <ChatBox messages={messages} user={infoUser} chat={chat}/>
        </Row>

        </Content>
  );
};
export default Home;