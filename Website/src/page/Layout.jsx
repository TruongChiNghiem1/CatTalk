import { useContext, useEffect, useState } from 'react';
import {
  SearchOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HeartOutlined,
  HomeOutlined,
  MessageOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Switch, message } from 'antd';
import logo from '../assets/logo.png';
import logo_vertical from '../assets/logo_vertical.png';
import admin from '../assets/admin.jpg';
import { useNavigate, Outlet } from 'react-router-dom';
import Search from '../component/Search';
import Notify from '../component/Notify';
import { AppContext } from '../context/AppContext';
import { useCookies } from 'react-cookie';
import { changeTheme } from '../service/user';
const { Header, Sider} = Layout;
const AppLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {SubMenu}  = Menu
  const navigate = useNavigate()
  const [cookies,setCookie, removeCookie] = useCookies(['loginToken', 'user']);
  const {activeMenu, setActiveMenu,
     openSearch, setOpenSearch,
     openNofity, setOpenNotify, user, setUser} = useContext(AppContext)   

  const handleMenuSelect = ({ key }) => {
    setActiveMenu(key);
  };
  const {
    token: { colorBgContainer, colorBgSecondary },
  } = theme.useToken();


  const logOut = () =>{
    removeCookie('loginToken')
    removeCookie('user');
    localStorage.removeItem('user')
    localStorage.removeItem('search');
    navigate('/login')
  }

  useEffect(() =>{
    if(!cookies.loginToken){
      navigate('/login')
    }
  }, []) 

  const handleChangeTheme = async (value) =>{
    try {
      const res = await changeTheme(cookies.loginToken, value ? 1 : 0)
        if(res.data.status === 200){
            props.theme(res.data.nightMode)
            setUser({...user, nightMode: res.data.nightMode})
            setCookie('user', JSON.stringify({ ...cookies.user, nightMode: res.data.nightMode}));
          message.success(res.data.message)
        }else{
          message.error(res.data.message)
        }
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  return (
    <Layout className='main' style={{background: colorBgSecondary, padding: '12px',}}>
      <Sider id='left_menu' trigger={null} collapsible collapsed={collapsed} width={240} collapsedWidth={100}
      style={{ backgroundColor: colorBgContainer, borderRadius: '20px'}}>
        <div>
            <div className="demo-logo-verticalc flex-center" style={{padding: '4px'}}>
              <img src={collapsed ? logo : logo_vertical} width={collapsed ? 90 : 190}/>
            </div>
            <Menu
            mode="inline"
            selectedKeys={[activeMenu]}
            onSelect={handleMenuSelect}
            items={[
                {
                key: 'home',
                icon: <HomeOutlined />,
                label: 'Home',
                onClick: () => {navigate('/'), setOpenSearch(false), setOpenNotify(false)}
                },
                {
                key: 'seacrch',
                icon: <SearchOutlined />,
                label: 'Search',
                onClick: () => {setOpenSearch(!openSearch), setOpenNotify(false)}
                },
                {
                key: 'redirect',
                icon: <MessageOutlined />,
                label: 'Message',
                onClick: () => {navigate('/redirect/0'), setOpenSearch(false), setOpenNotify(false)}
                },
                {
                key: 'notify',
                icon: <HeartOutlined />,
                label: 'Notification',
                onClick: () => {setOpenSearch(false), setOpenNotify(!openNofity)}
                },
            ]}
            />
        </div>
        <Menu
          mode="vertical"
            selectedKeys={[activeMenu]} 
            onSelect={handleMenuSelect} 
            style={{borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'}}
        >
          <Menu.Item
                key="6"
                icon={<Switch 
                    className='switch'
                    defaultValue={cookies.user.nightMode}
                    onChange={(value) => handleChangeTheme(value)}
                    />}
                label="Night mode"
                >
                Night mode
            </Menu.Item>
           <SubMenu
              key="5"
              icon={<img width={30} height={30} style={{objectFit: 'cover', borderRadius: '100%'}} src={user.avatar}/>}
              title={`${user.firstName} ${user.lastName}`}
            >
              <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => navigate('/profile')}>My Profile</Menu.Item>
              <Menu.Item key="5-2" icon={<LogoutOutlined />} onClick={logOut}>Log out</Menu.Item>
            </SubMenu>
            
        </Menu>
      </Sider>
      <Layout style={{background: colorBgSecondary, marginLeft: '24px'}} id='layout_main'>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            borderTopLeftRadius:'20px',
            borderTopRightRadius: '20px'
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined/>}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <div className='flex-center h-100 position-relative'>
          {openSearch && <Search/>}
          {openNofity && <Notify/>}
          <Outlet className='h-100'/>
        </div>
      </Layout>
    </Layout>
  );
};
export default AppLayout;