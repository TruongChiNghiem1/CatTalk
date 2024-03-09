import { Image ,theme, Layout, Form, Input, DatePicker, Select, Button, message} from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import bg from '../assets/default_bg.jpg'
import avt from '../assets/default_avt.jpg';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import {EditOutlined, SwapLeftOutlined, SaveOutlined} from '@ant-design/icons'
import customParseFormat from 'dayjs/plugin/customParseFormat'; 
import { useCookies } from 'react-cookie';
import { editProfile } from '../service/user';
dayjs.extend(customParseFormat);    
const {Content } = Layout;
const Profile = () =>{
     const {token: { colorBgContainer },} = theme.useToken();
     const {user} = useContext(AppContext)
    const [form] = useForm();
    const [isEdit, setIsEdit] = useState(false)
    const [loadSave, setLoadSave] = useState(false)
    const [cookies] = useCookies(['loginToken'])

    useEffect(() => {
        form.setFieldsValue(
            {firstName: user.firstName, 
            lastName: user.lastName,
            birthDay: user.birthDay,
            gender: user.gender,
            email: user.email, 
            hometown: user.hometown
        })
    })

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
    
        <div className='w-100 flex-end mt-1'>
            <Button className='mr-1' onClick={() => setIsEdit(!isEdit)} icon={isEdit ? <SwapLeftOutlined /> : <EditOutlined />}>{isEdit ? 'Return' : 'Edit'}</Button>
            {isEdit && (<Button icon={<SaveOutlined />} loading={loadSave} onClick={handleChangeInfo}>Save</Button>)}
        </div>
       
        <div className='box_user'>
            <img className='avt_user' src={avt} />
            <h2 className='userName'>superadmin123</h2>
            <p className='mt-0'>Have a nice day!</p>
        </div>
       <div className='user_form_box'>
         <Form
            layout='vertical'
            className='user_form'
            form={form} 
        >
            <div className='flex-between'>
                <Form.Item
                    name="firstName"
                    label="First name"
                    style={{width: '49%'}}
                    rules={[
                    {
                        required: isEdit,
                        message: 'First name is required'
                    },
                    ]}
                >
                    <Input placeholder='First name' readOnly={!isEdit}/>
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Last name"
                        style={{width: '49%'}}
                    rules={[
                    {
                        required: isEdit,
                        message: 'Last name is required'
                    },
                    ]}
                >
                    <Input placeholder='Last name'  readOnly={!isEdit}/>
                </Form.Item>
            </div>
            <div className='flex-between w-100'>
                    <Form.Item
                        name="birthDay"
                        label="Birthday"
                        style={{width: '49%'}}
                        rules={[
                        {
                            required: isEdit,
                            message: 'Your birthday is required'
                        },
                        ]}
                    >
                        <DatePicker 
                            placeholder='Your birthday' 
                            className='w-100'
                            format='DD/MM/YYYY'
                            disabled={!isEdit}
                            />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                         style={{width: '49%'}}
                        rules={[
                        {
                            required: isEdit,
                            message: 'Gender is required'
                        },
                        ]}
                    >
                        <Select placeholder='Gender' disabled={!isEdit}>
                            <Select.Option value='1'>Male</Select.Option>
                            <Select.Option value='0'>Female</Select.Option>
                            <Select.Option value='2'>Other</Select.Option>
                        </Select>
                    </Form.Item>
                    </div>
                 <div className='flex-between w-100'>
                    <Form.Item
                        name="email"
                        label="Email"
                        style={{width: '49%'}}
                
                    >
                        <Input placeholder='Email' readOnly/>
                    </Form.Item>
                    <Form.Item
                        name="hometown"
                        label="Hometown"
                         style={{width: '49%'}}
                    >
                         <Input placeholder='Hometown'  readOnly={!isEdit}/>
                    </Form.Item>
                    </div>   
                    {isEdit && (
                        <div className='flex-center w-100'>
                    <Form.Item
                        name="password"
                        label="Password"
                        style={{width: '49%'}}
                
                    >
                        <Input placeholder='Password'/>
                    </Form.Item>
                    </div>
                    )}
            </Form>
       </div>
          
        
      
        </Content>
    )
}

export default Profile

