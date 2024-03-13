import { useForm } from "antd/es/form/Form";
import { Layout, Form, Input, Select, Tag, Switch} from "antd";
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
    return (
        <Content className='column-start'>
            <Form
                form={form}
                layout="horizontal"
                labelCol={{
                    span: 4,
                }}
            >
                <Form.Item
                    label='Description'
                >
                    <Input placeholder="Add your desciption..." value={props.user.description} readOnly={!props.isEdit}/>
                </Form.Item>

                <Form.Item
                    label='Hobbies'
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
                <Form.Item
                    label='Show your hobbies'
                >
                    <Switch defaultChecked disabled={!props.isEdit}/>
                </Form.Item>
            </Form>
        </Content>
    )
}

export default AboutMe