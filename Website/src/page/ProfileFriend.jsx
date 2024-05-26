import { useContext, useEffect, useState } from 'react';
import { Layout, theme, Row, Col, Spin, Image, Typography, Button, Form, Input, Timeline, Select, Tag, message} from 'antd'
import {UserAddOutlined,MessageOutlined} from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom';
import { addFriend, getInfoOtherUser } from '../service/user';
import { AppContext } from '../context/AppContext';
import img from '../assets/cat_1.png'
import dayjs from 'dayjs';
const { Content} = Layout;
const ProfileFriend = () => {
    const {cookies} = useContext(AppContext)
    const {token: { colorBgContainer, colorBgSecondary},} = theme.useToken();
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState([])
    const [isMyFriend, setIsMyFriend] = useState(0);
    const [chatId, setChatId] = useState(null)
    const [loadingBtn, setLoadingBtn] = useState(false)
    let navigate = useNavigate()
    const {id} = useParams();
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

    const handleGetDayaOtherUser = async () => {
        try {
            const res = await getInfoOtherUser(id, cookies.loginToken)
            setChatId(res.data.chatId)
            setUserInfo(res.data.info)
            setIsMyFriend(res.data.isMyFriend)
            setLoading(false)
        } catch (error) {
            console.log('Error: ', error.message);
        }
    }

    useEffect(() => {
        handleGetDayaOtherUser()
    }, [])
        

    const tagRender = (props) => {
        const { label, value } = props;
        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
            color={value}
            onMouseDown={onPreventMouseDown}
            style={{
                marginRight: 3,
            }}
            >
            {label}
            </Tag>
        );
    };


    const handleAddFriend = async () => {
        setLoadingBtn(true);
        try{
            const res = await addFriend(userInfo.userName, cookies.loginToken)
            if(res.data.status === 200){
                setLoadingBtn(false);
                setIsMyFriend(1);
                message.success(res.data.message)
            }else{
                message.error(res.data.message)
            }
            
        }catch(e){
            console.log('Error: ', e.message);
        }
    }

    return (
        <Content
          id='other-user'
          className='container'
          style={{
            background: colorBgContainer,
          }}
        >
            {loading ? (
                <Row>
                    <Col span={24} className='w-100 flex-center' >
                        <Spin/>
                    </Col>
                </Row>
            ) : (
                <Row justify='center'>
                    <Col span={24}  className='background'>
                        <Image src={userInfo.background} style={{borderRadius: '20px', height: '16rem', width: '100%', objectFit: 'cover'}}/>
                    </Col>
                    <Col span={23}
                        style={{
                            background: colorBgSecondary,
                            borderRadius: '20px',
                            height: '9rem',
                            marginTop: '-3rem'
                        }}
                    >
                        <Row className='flex-start h-100 w-100'>
                            <Col span={3} style={{paddingLeft: '2.5rem'}}   className='avatar'>
                                <Image src={userInfo.avatar}
                                    style={{
                                        borderRadius: '100%',
                                        height: '7rem',
                                        width: '7rem'
                                    }}
                                />
                            </Col>
                            <Col span={15}>
                                <Typography.Title level={2} style={{fontWeight: 'bold', marginBottom: '4px'}}>{userInfo.firstName}{' '}{userInfo.lastName}</Typography.Title>
                                <Typography.Paragraph style={{color: 'orange', fontSize: 16, fontWeight: 'bold', }}>{userInfo.userName}</Typography.Paragraph>

                            </Col>
                            <Col span={6} className='text-end' style={{paddingRight: '2.5rem'}}>
                                {isMyFriend === 1 ? (
                                     <Button 
                                        type='primary'
                                        size='large'
                                        onClick={() => navigate(`/redirect/${chatId}`)}
                                        icon={<MessageOutlined  size='large' />}>
                                        Chat now
                                    </Button>
                                ) : (
                                     <Button 
                                        type='primary'
                                        size='large'
                                        loading={loadingBtn}
                                        onClick={handleAddFriend}
                                        icon={<UserAddOutlined size='large' />}>
                                        Add friend
                                    </Button>

                                )}
                            </Col>
                        </Row>
                    </Col>
                          
                                 {
                                    userInfo.private === 1 ? (
                                        <div className='flex-center w-100' style={{margin: '4rem'}}>
                                            <img style={{width: '20rem'}} src={img}/>
                                            <div>
                                                <Typography.Title level={4} style={{color: 'black', fontWeight: 'bold', marginBottom: '.5rem'}}>{userInfo.firstName}{' '}{userInfo.lastName} has hidden the display of personal information</Typography.Title>
                                                <Typography.Title style={{color: 'orange', marginTop: 0}} level={2}>Let's get to know {`${userInfo.gender == 1 ? 'him' : userInfo.gender == 0 ? 'her' : 'their'}` } by chatting</Typography.Title>
                                            </div>
                                        </div>
                                    ) : (
                                          <Col span={14} style={{marginTop: '2rem'}}>
                                        <Form
                                            className="w-100"
                                            layout="horizontal"
                                            labelCol={{
                                                span: 5,
                                            }}
                                        >
                                             <Timeline
                                                items={[
                                                {
                                                    children:(
                                                        <>
                                                        <Typography.Title level={5} style={{color: 'orange'}}>User infomation</Typography.Title>
                                                        <div className='flex-between w-100'>
                                                            <Form.Item
                                                                label="Birthday"
                                                                style={{width: '69%'}}
                                                            >
                                                                <Input value={dayjs(userInfo.birthDay).format('DD/MM/YYYY')} readOnly></Input>
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="Gender"
                                                                style={{width: '30%'}}
                                                            >
                                                                <Input value={userInfo.gender == 1 ? 'Male' : userInfo.gender == 0 ? 'Female' : 'Other'} readOnly></Input>
                                                        
                                                            </Form.Item>
                                                        </div>
                                                        <div className='flex-between w-100'>
                                                            <Form.Item
                                                                label="Hometown: "
                                                                style={{width: '69%'}}
                                                            >
                                                                {userInfo.hometown ? (
                                                                    <Input value={userInfo.hometown} readOnly></Input>
                                                                   ) : (
                                                                       <Input placeholder={'Not update'} readOnly/>
                                                                   )}
                                                            </Form.Item>
                                                        </div>
                                                        <div className='flex-between w-100'>
                                                            <Form.Item
                                                                label="Join date: "
                                                                style={{width: '69%'}}
                                                            >
                                                                {userInfo.createdAt ? (
                                                                    <Input value={dayjs(userInfo.createdAt).format('MMMM D, YYYY')} readOnly></Input>
                                                                   ) : (
                                                                       <Input placeholder={'Not update'} readOnly/>
                                                                   )}
                                                            </Form.Item>
                                                        </div>
                                                        </>
                                                    ),
                                                },
                                                {
                                                    children:(
                                                        <>
                                                            <Typography.Title level={5} style={{color: 'orange'}}>About {`${userInfo.gender == 1 ? 'him' : userInfo.gender === 0 ? 'her' : 'their'}`}</Typography.Title>
                                                             <div className='flex-between w-100'>
                                                                <Form.Item
                                                                    label='Description: '
                                                                    style={{width: '69%'}}
                                                                >
                                                                   {userInfo.description ? (
                                                                     <Input value={userInfo.description} readOnly/>
                                                                   ) : (
                                                                       <Input placeholder={'Not update'} readOnly/>
                                                                   )}
                                                                </Form.Item>
                                                            </div>
                                                            <div className='flex-between w-100'>
                                                                <Form.Item
                                                                    label='Hobbies: '
                                                                    style={{width: '69%'}}
                                                                >
                                                                   {userInfo.hobbies.length > 0 ? (
                                                                     <Select
                                                                        mode="multiple"
                                                                        tagRender={tagRender}
                                                                        defaultValue={userInfo.hobbies}
                                                                        style={{
                                                                        width: '100%',
                                                                        }}
                                                                        options={options}
                                                                    />
                                                                   ) : (
                                                                       <Input placeholder={'Not update'} readOnly/>
                                                                   )}
                                                                </Form.Item>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                                
                                                ]}
                                            />
                                             
                                        </Form>
                                         </Col>
                                    )
                                }   
                           
                </Row>
            )}
        

        </Content>
    )
}

export default ProfileFriend