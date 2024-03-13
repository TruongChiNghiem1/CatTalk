import Form, { useForm } from "antd/es/form/Form"
import {Input, DatePicker, Select} from 'antd';
import { useEffect } from "react";
const FormInfo = (props) => {
    const [form] = useForm();

     useEffect(() => {
        form.setFieldsValue(
            {firstName: props.user.firstName, 
            lastName: props.user.lastName,
            birthDay: props.user.birthDay,
            gender: props.user.gender,
            email: props.user.email, 
            hometown: props.user.hometown
        })
    })


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
                        name="birthDay"
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
                         <Input placeholder='Hometown'  readOnly={!props.isEdit}/>
                    </Form.Item>
                    </div>   
                    {props.isEdit && (
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
    )
}
export default FormInfo