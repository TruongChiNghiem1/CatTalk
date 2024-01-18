import './App.scss'
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HappyProvider } from '@ant-design/happy-work-theme';
import Login from './page/Login'
import NotFound from './page/NotFound';
import Home from './page/Home';
import { useState } from 'react';
function App() {
  const [currentTheme, setCurrentTheme] = useState('light')

  const lightTheme = {
     token: {
        colorPrimary: '#44bccc',
        colorBgContainer : 'aliceblue',
        colorBgSecondary: '#D8FEFF',
        controlItemBgActive: '#c4fcff',
        borderRadius: '20px',
        color: '#36a7b6',
        colorTextBase : 'black', 
        colorTextQuaternary : 'black', 
        colorPrimaryText: 'black', 
        colorIcon: 'black', 
        colorLink: 'orange'
      }
  }

  const darkTheme = {
     token: {
        colorPrimary: '#005f70',
        colorBgContainer : '#003a44',
        colorBgSecondary: '#001e24',
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
          <Route path="/log_in" element={<Login />} />
          <Route path="/" element={<Home theme={setCurrentTheme}/> } />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </HappyProvider>
    </ConfigProvider>
  )
}

export default App
