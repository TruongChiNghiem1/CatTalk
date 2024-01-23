import { useState } from 'react';
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
import { Layout, Menu, Button, theme, Switch } from 'antd';
import logo from '../assets/logo.png';
import logo_vertical from '../assets/logo_vertical.png';
import admin from '../assets/admin.jpg';
import { useNavigate, Outlet } from 'react-router-dom';
import Search from '../component/Search';
import Notify from '../component/Notify';

const { Header, Sider} = Layout;
const AppLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState('home');
  const {SubMenu}  = Menu
  const navigate = useNavigate()
  const [openSeach, setOpenSearch] = useState(false)
  const [openNofity, setOpenNotify] = useState(false)

  const handleMenuSelect = ({ key }) => {
    setActiveKey(key);
  };
  const {
    token: { colorBgContainer, colorBgSecondary },
  } = theme.useToken();
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
            selectedKeys={[activeKey]}
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
                onClick: () => {setOpenSearch(!openSeach), setOpenNotify(false)}
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
            selectedKeys={[activeKey]} 
            onSelect={handleMenuSelect} 
            style={{borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'}}
        >
          <Menu.Item
                key="6"
                icon={<Switch 
                    className='switch'
                    onChange={(value) => props.theme(value ? 'dark' : 'light')}
                    />}
                label="Night mode"
                >
                Night mode
            </Menu.Item>
           <SubMenu
              key="5"
              icon={<img width={30} height={30} style={{objectFit: 'cover', borderRadius: '100%'}} src={admin}/>}
              title="User Admin"
            >
              <Menu.Item key="5-1" icon={<UserOutlined />} onClick={() => navigate('/profile')}>My Profile</Menu.Item>
              <Menu.Item key="5-2" icon={<LogoutOutlined />} onClick={() => navigate('/login')}>Log out</Menu.Item>
            </SubMenu>
            
        </Menu>
      </Sider>
      <Layout style={{background: colorBgSecondary, marginLeft: '24px'}}>
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
        <div className='flex-center h-100'>
          {openSeach && <Search/>}
          {openNofity && <Notify/>}
          <Outlet className='h-100'/>
        </div>
      </Layout>
    </Layout>
  );
};
export default AppLayout;