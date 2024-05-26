import Form, { useForm } from "antd/es/form/Form"
import {Input, DatePicker, Select, Button, message} from 'antd';
import {SaveOutlined} from "@ant-design/icons"
import { useContext, useEffect, useState} from "react";
import { editProfile } from "../../service/user";
import { AppContext } from "../../context/AppContext";
import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
const FormInfo = (props) => {
    const [form] = useForm();
    const {cookies, user, setCookie, setUser} = useContext(AppContext)
    const [loadSave, setLoadSave] = useState(false)
     useEffect(() => {
        form.setFieldsValue(
            {firstName: props.user.firstName, 
            lastName: props.user.lastName,
            birthday: props.user.birthday ? dayjs(props.user.birthday) : null,
            gender: props.user.gender, 
            hometown: props.user.hometown
        })
    })

     const handleChangeInfo = async () => {
        try{
            let values = await form.validateFields();
            values['userName'] = user.userName;
            setLoadSave(true)
            const res = await editProfile(values, cookies.loginToken)
                if(res.data.status == 200){
                    setUser({...user, birthday: values.birthday, gender: values.gender, hometown: values.hometown})
                    setCookie('user', JSON.stringify({ ...cookies.user,  birthday: values.birthday, gender: values.gender, hometown: values.hometown}));
                    message.success(res.data.message)    
                }else {
                    message.error(res.data.message)   
                }
                props.setEdit(false)
                setLoadSave(false)
        }catch(e){
            console.log('Erorr: ', e.message)
        }
       
    }

    return (
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
                        required: props.isEdit,
                        message: 'First name is required'
                    },
                    ]}
                >
                    <Input placeholder='First name' readOnly={!props.isEdit}/>
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Last name"
                        style={{width: '49%'}}
                    rules={[
                    {
                        required: props.isEdit,
                        message: 'Last name is required'
                    },
                    ]}
                >
                    <Input placeholder='Last name'  readOnly={!props.isEdit}/>
                </Form.Item>
            </div>
            <div className='flex-between w-100'>
                    <Form.Item
                        name="birthday"
                        label="Birthday"
                        style={{width: '49%'}}
                        rules={[
                        {
                            required: props.isEdit,
                            message: 'Your birthday is required'
                        },
                        ]}
                    >
                        <DatePicker 
                            placeholder='Your birthday' 
                            className='w-100'
                            format='DD/MM/YYYY'
                            disabled={!props.isEdit}
                            />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                         style={{width: '49%'}}
                        rules={[
                        {
                            required: props.isEdit,
                            message: 'Gender is required'
                        },
                        ]}
                    >
                        <Select placeholder='Gender' disabled={!props.isEdit}>
                            <Select.Option value='1'>Male</Select.Option>
                            <Select.Option value='0'>Female</Select.Option>
                            <Select.Option value='2'>Other</Select.Option>
                        </Select>
                    </Form.Item>
                    </div>
                 <div className='flex-between w-100'>
                    <Form.Item
                        label="Email"
                        style={{width: '49%'}}
                
                    >
                        <Input placeholder='Email' value={props.user.email} readOnly/>
                    </Form.Item>
                    <Form.Item
                        name="hometown"
                        label="Hometown"
                         style={{width: '49%'}}
                    >
                         <Input placeholder='Hometown'  readOnly={!props.isEdit}/>
                    </Form.Item>
                    </div>   
                    {props.isEdit && (
                        <div className='flex-center w-100'>
                    <Form.Item
                        name="password"
                        label="Password"
                        style={{width: '49%'}}
                        rules={[
                        {
                            required: props.isEdit,
                            message: 'Password is required'
                        },
                        ]}
                    >
                        <Input.Password placeholder='Password'/>
                    </Form.Item>
                    </div>
                    )}
                <div className="w-100 flex-center">
                    {props.isEdit && (
                        <Button 
                            type='primary'
                            icon={<SaveOutlined />} 
                            loading={loadSave} 
                            onClick={handleChangeInfo}
                            >
                                Save
                        </Button>
                    )}
                </div>
            </Form>
    )
}
export default FormInfo