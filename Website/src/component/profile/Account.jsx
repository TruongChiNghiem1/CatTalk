import {Input, Button, message, Layout, Form} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useState, useContext } from 'react';
import {SaveOutlined, KeyOutlined} from '@ant-design/icons'
import { changePassword } from '../../service/user';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const {Content} = Layout;
const Account = (props) => {
    const [form] = useForm()
    const [loading, setLoading] = useState(false);
    const [forget, setForget] = useState(false)
    const {user, setUser} = useContext(AppContext)
      const [cookies, setCookie, removeCookie] = useCookies(['user', 'loginToken']);
      const navigate = useNavigate()
    const handleChangePassword = async () =>{
        const values = await form.validateFields();
        setLoading(true);
        const res = await changePassword(values, cookies.loginToken)
        if(res.data.status ===  200){
                message.success(res.data.message);
                removeCookie('loginToken')
                navigate('/login')
            }else{
                message.error(res.data.message);
            }   
                setLoading(false);
    }

     return (
        <Content className='column-start'>
           {forget ? (
            <>
             <Form
                className='w-100'
                form={form}
                layout="horizontal"
                labelCol={{
                    span: 4,
                }}
            >
                <Form.Item
                    name='currentpass'
                    label='Password'
                >
                   <Input.Password placeholder='Current password'/>
                </Form.Item>

                <Form.Item
                    label='New password'
                    name='newpass'
                >
                     <Input.Password placeholder='New password'/>
                </Form.Item>

                <Form.Item
                    label='Repeat password'
                    name='repass'
                >
                     <Input.Password placeholder='Repeat new password'/>
                </Form.Item>
                 <div className="w-100 flex-center"> 
                    <Button 
                      icon={<SaveOutlined />} 
                      loading={loading}
                      onClick={handleChangePassword}
                      >Save</Button>
                </div>
            </Form>
            </>
           ) : (
            <div className="w-100 flex-center"> 
                <Button onClick={() => setForget(true)} icon={<KeyOutlined />}>Change Password</Button>
              </div>
           )}
        </Content>
    )
}

export default Account