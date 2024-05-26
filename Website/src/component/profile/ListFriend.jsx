import {Row, Col , Layout, Image, Dropdown, Empty, theme, Typography, message, Popconfirm, Button} from 'antd'
import {MoreOutlined} from '@ant-design/icons'
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { deleteFriend, getFriends } from '../../service/user';
import { Link, useNavigate } from 'react-router-dom';
const {Content} = Layout

const ListFriend = () => {
    const [cookies] = useCookies('loginToken')
    const navigate = useNavigate()
    const [listFriend, setListFriend] = useState([])

    const { token: { colorBoldSecondary }, } = theme.useToken();
    const handelLoadFriend = async () => {
        try {
            const items = await getFriends(cookies.loginToken);
            setListFriend(items.data.data)
        } catch (error) {   
            console.log('Error: ', error.message);
        }
    }


    const handleDeleteFriend = async (userNameDelete) => {
        try {
            const res = await deleteFriend(userNameDelete, cookies.loginToken)
            if(res.data.status === 200){
                message.success(res.data.message)
                const updateFriend = listFriend.filter(item => item.userName !== userNameDelete)
                setListFriend(updateFriend)
            }else{
                message.error(res.data.message)
            }
        } catch (error) {
            console.log('Error: ', error.message)
        }
    }

    useEffect(() => {
        handelLoadFriend();
    }, [])
    

    return (
        <Content
            id='list_friend'
        >
            <Row gutter={[24, 24]}>
                {!listFriend.length ? (
                    <Col span={24} className='text-center'><Empty/></Col>
                ) : (
                    <>
                    {
                        listFriend.map(item => {
                            return (
                                <Col span={12} className='' key={item.userName}>
                                    <div className='box_friend'>
                                        <Image src={item.avatar} className='avt_friend'/>
                                        <span className='info_friend'>
                                            <Link to={`/user/${item._id}`} style={{color: colorBoldSecondary}}>{item.firstName} {item.lastName}</Link>
                                            <Typography.Text >{item.mutual_friends} mutual friends</Typography.Text >
                                        </span>

                                        <Dropdown
                                            menu={{ 
                                            items: [
                                                {
                                                    label: <span>View profile</span>,
                                                    key: '0',
                                                    onClick: () => navigate(`/user/${item._id}`)
                                                },
                                                {
                                                
                                                    label: <Popconfirm
                                                                title="Confirm to delete friend"
                                                                description="Are you sure to delete this friend?"
                                                                onConfirm={()=> handleDeleteFriend(item.userName)}
                                                                // onCancel={}
                                                                okText="Yes"
                                                                cancelText="No"
                                                            >
                                                                <span>Delete</span>
                                                            </Popconfirm>,
                                                    key: '1',
                                                },
                                            ],
                                            }}
                                            trigger={['click']}
                                        >
                                            <a onClick={(e) => e.preventDefault()}>
                                                <span className='act_friend'>
                                                    <MoreOutlined />
                                                </span>
                                            </a>
                                        </Dropdown>
                                        
                                    </div>  
                                </Col>
                            )
                        })
                    }
                    </>
                )}
                
            </Row>  
        </Content>
    )
}

export default ListFriend