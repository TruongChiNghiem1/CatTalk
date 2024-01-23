import './App.scss'
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { HappyProvider } from '@ant-design/happy-work-theme';
import Login from './page/Login'
import NotFound from './page/NotFound';
import Home from './page/ChatHome.jsx';
import { useState } from 'react';
import SignUp from './page/SignUp';
import Profile from './page/Profile.jsx';
import AppLayout from './page/Layout.jsx';
import Redirect from './page/Redirect.jsx';
import AppContext from 'antd/es/app/context.js';
function App() {
  const [currentTheme, setCurrentTheme] = useState('light')

  const lightTheme = {
     token: {
        colorPrimary: '#44bccc',

        colorBgContainer : 'white',
        colorBgSecondary: '#D8FEFF',

        baseColor: 'white',

        colorLightSecondary: '#FFF5EB',
        colorBoldSecondary: '#FFBD59',

        controlItemBgActive: '#c4fcff',
        borderRadius: '20px',
        color: '#36a7b6',
        colorTextBase : 'black', 
        colorPrimaryText: 'black', 
        colorIcon: 'black', 
        colorLink: 'orange',

        colorFillSecondary: '#FFBD59',
        colorTextSecondary: '#FFF5EB',
        
        paragraph: {
            color: 'red',
            fontSize: '14px',
    }
      }
  }

  const darkTheme = {
     token: {
        colorPrimary: '#005f70',
        colorBgContainer : '#003a44',
        colorBgSecondary: '#001e24',
        baseColor: 'black',
        borderRadius: '30px',
        colorTextBase : 'white',
         colorPrimaryText: 'white',
         colorIcon: 'white', 
         colorLink: 'orange'
      }
  }

  return (
    <ConfigProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
     <HappyProvider>
        <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<AppLayout theme={setCurrentTheme}/> } >
            <Route index element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="redirect/:id" element={<Redirect/>} />
          </Route>~
          <Route path="/profile" element={<Profile/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </HappyProvider>
    </ConfigProvider>
  )
}

export default App
