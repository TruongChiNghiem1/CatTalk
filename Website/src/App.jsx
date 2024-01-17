import './App.scss'
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HappyProvider } from '@ant-design/happy-work-theme';
import Login from './page/login'
import NotFound from './page/NotFound';
import Home from './page/Home';
import { useState } from 'react';
function App() {
  const [currentTheme, setCurrentTheme] = useState('light')

  const lightTheme = {
     token: {
        colorPrimary: 'green'
      }
  }

  const darkTheme = {
     token: {
        colorPrimary: 'red'
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
