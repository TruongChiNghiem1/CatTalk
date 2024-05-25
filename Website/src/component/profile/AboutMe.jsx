import { useForm } from "antd/es/form/Form";
import { Layout, Form, Input, Select, Tag, Switch, Button, message} from "antd";
import { updateAboutUs } from "../../service/user";
import { useContext, useState, useEffect } from "react";
import { AppContext } from '../../context/AppContext';
import {SaveOutlined} from '@ant-design/icons'
const {Content} = Layout;
const options = [
  {
    label: 'Photography',
    value: 'gold',
  },
  {
    label: 'Sport',
    value: 'lime',
  },
  {
    label: 'Jogging',
    value: 'green',
  },
  {
    label: 'Listen to music',
    value: 'cyan',
  },
];
const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};

const AboutMe = (props) => {
    const [form] = useForm()
    const [loading, setLoading] = useState(false)
    const {cookies, setCookie, user, setUser} = useContext(AppContext)

    const handleUpdateAboutUs = async() => {
      try {
        const values = await form.validateFields();
        setLoading(true);
        const res = await updateAboutUs(values, cookies.loginToken)
        if(res.data.status ===  200){
                message.success(res.data.message);
                setUser({...user, description: res.data.description, hobbies: res.data.hobbies})
                setCookie('user', JSON.stringify({ ...cookies.user, description: res.data.description, hobbies: res.data.hobbies}));
                setLoading(false);
                props.setEdit(false)
            }else{
                message.error(res.data.message);
            }
        
      } catch (error) {
        console.log("Error: ", error);
      }
    } 

    useEffect(() => {
        form.setFieldsValue(
            {description: props.user.description, 
            hobbies: props.user.hobbies,
        })
    })

    return (
        <Content className='column-start'>
            <Form
              className="w-100"
                form={form}
                layout="horizontal"
                labelCol={{
                    span: 4,
                }}
            >
                <Form.Item
                    name='description'
                    label='Description'
                >
                    <Input placeholder="Add your desciption..." value={props.user.description} readOnly={!props.isEdit}/>
                </Form.Item>

                <Form.Item
                    label='Hobbies'
                    name='hobbies'
                >
                     <Select
                        disabled={!props.isEdit}
                        mode="multiple"
                        tagRender={tagRender}
                        defaultValue={props.user.hobbies}
                        placeholder='What is your hobby?'
                        style={{
                        width: '100%',
                        }}
                        options={options}
                    />
                </Form.Item>
               {props.isEdit && (
                 <div className="w-100 flex-center"> 
                    <Button 
                      icon={<SaveOutlined />} 
                      loading={loading}
                      onClick={handleUpdateAboutUs}
                      >Save</Button>
                </div>
               )}
            </Form>
        </Content>
    )
}

export default AboutMe