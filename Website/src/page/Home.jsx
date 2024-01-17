import React, { useState } from 'react';
import {
  SearchOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HeartOutlined,
  HomeOutlined,
  MessageOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import logo from '../assets/logo.png';
import logo_vertical from '../assets/logo_vertical.png';
import admin from '../assets/admin.jpg';

const { Header, Sider, Content } = Layout;
const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
   const [activeKey, setActiveKey] = useState('1'); // Trạng thái active của menu item

  const handleMenuSelect = ({ key }) => {
    setActiveKey(key);
  };
  const {
    token: { colorBgContainer, colorBgSecondary },
  } = theme.useToken();
  return (
    <Layout className='main' style={{background: colorBgSecondary, padding: '12px'}}>
      <Sider id='left_menu' trigger={null} collapsible collapsed={collapsed} width={240} collapsedWidth={100}
      style={{ backgroundColor: colorBgContainer}}>
        <div>
            <div className="demo-logo-verticalc flex-center"><img src={collapsed ? logo : logo_vertical} width={collapsed ? 90 : 190}/></div>
            <Menu
            mode="inline"
            defaultSelectedKeys={[activeKey]}
            onSelect={handleMenuSelect}
            items={[
                {
                key: '1',
                icon: <HomeOutlined />,
                label: 'Home',
                },
                {
                key: '2',
                icon: <SearchOutlined />,
                label: 'Search',
                },
                {
                key: '3',
                icon: <MessageOutlined />,
                label: 'Message',
                },
                {
                key: '4',
                icon: <HeartOutlined />,
                label: 'Notification',
                },
            ]}
            />
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[activeKey]}
            onSelect={handleMenuSelect}
          items={[
            {
                key: '5',
                icon: () => (
                    collapsed ? <img width={60} height={60} style={{ borderRadius: 100 }} src={admin} alt="Admin" /> : 'User admin'
                ),
                label: null,
            },
            {
              key: '6',
              icon: <SettingOutlined />,
              label: 'Settings',
            },
          ]}
        />

      </Sider>
      <Layout style={{background: colorBgSecondary, marginLeft: '24px'}}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
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
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;