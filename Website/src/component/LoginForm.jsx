import React from 'react';
import { Carousel } from 'antd';
import logo_login from '../assets/logo_login.png';
import login_1 from '../assets/login_1.png';
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const LoginForm = () => {
    return(
        <div className='flex-center w-100 h-100' id='login_form'>
        <Carousel autoplay style={{width: '40vw', height: '50vh'}}>
            <div style={{width: '40vw'}}>
                <img style={{width: '35vw'}} src={login_1}/>
            </div>
            <div>
            <img style={{width: '35vw'}} src={login_1}/>
            </div>
            <div>
               <img style={{width: '35vw'}} src={login_1}/>
            </div>
            <div>
                 <img style={{width: '35vw'}} src={login_1}/>
            </div>
        </Carousel>

    <div className='form'>
            <img src={logo_login}/>
    </div>
    </div>
    )
   
    };
export default LoginForm;