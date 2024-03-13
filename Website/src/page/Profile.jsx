import { Image ,theme, Layout, Form, Input, DatePicker, Select, Button, message, Menu} from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import bg from '../assets/default_bg.jpg'
import avt from '../assets/default_avt.jpg';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import {EditOutlined, SwapLeftOutlined, SaveOutlined, UserOutlined,TeamOutlined, CoffeeOutlined} from '@ant-design/icons'
import customParseFormat from 'dayjs/plugin/customParseFormat'; 
import { useCookies } from 'react-cookie';
import { editProfile } from '../service/user';
import qr from '../assets/qr_default.png'
import FormInfo from '../component/profile/FormInfo';
import ListFriend from '../component/profile/ListFriend';
import AboutMe from '../component/profile/AboutMe';
dayjs.extend(customParseFormat);    
const {Content } = Layout;

const items = [
    {
        label: 'Infomation',
        key: 'info',
        icon: <UserOutlined />,
    },
    {
        label: 'About me',
        key: 'about',
        icon:<CoffeeOutlined />,
    },
    {
        label: 'Friends',
        key: 'friends',
        icon: <TeamOutlined />,
    },
]


const Profile = () =>{
    const {token: { colorBgContainer },} = theme.useToken();
    const {user} = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)
    const [loadSave, setLoadSave] = useState(false)
    const [cookies] = useCookies(['loginToken'])
    const [form] = useForm();
    const [current, setCurrent] = useState('info');

    const InfoContent = (current) =>{
    switch (current){
    case 'info':
        return  <FormInfo isEdit={isEdit} user={user}/> ;
    case 'about':
        return <AboutMe isEdit={isEdit} user={user}/>;
        case 'friends':
        return <ListFriend />;    
    default:
        return null;
    }
}

    const onClick = (e) => {
        setCurrent(e.key);
    };
    const handleChangeInfo = async () => {
        try{
            let values = await form.validateFields();
            values['username'] = user.username;
            setLoadSave(true)
            const res = await editProfile(values, cookies.loginToken)
                if(res.data.status == 200){
                    message.succes(res.data.message)    
                }else {
                    message.error(res.data.message)   
                }
                setIsEdit(false)
                setLoadSave(false)
        }catch(e){
            console.log('Erorr: ', e.message)
        }
       
    }

    return(
         <Content
          id='profile'
          className='container'
          style={{
            background: colorBgContainer,
          }}
        >
        <div className='background_box'>
            <Image src={bg} className='user_bg w-100'/>
        </div>
    
        <div className='action_user'>
            <Button className='mr-1' onClick={() => setIsEdit(!isEdit)} icon={isEdit ? <SwapLeftOutlined /> : <EditOutlined />}>{isEdit ? 'Return' : 'Edit'}</Button>
            {isEdit && (<Button icon={<SaveOutlined />} loading={loadSave} onClick={handleChangeInfo}>Save</Button>)}
        </div>
        <div className='user_form_box'>
        <div className='box_user'>
            <img className='avt_user' src={avt} />
            <h2 className='userName'>superadmin123</h2>
            <p className='mt-0'>{user.description}</p>
            <img src={qr} width={250}/>   
        </div>
           <div className='main_info'>
              <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
               <div style={{padding: '2rem'}}>
                 {InfoContent(current)}
               </div>
          </div>
        </div>
        
      
        </Content>
    )
}

export default Profile

