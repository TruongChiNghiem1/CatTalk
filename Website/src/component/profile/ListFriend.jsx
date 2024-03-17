import {Row, Col , Layout, Image, Dropdown, Empty, theme, Typography} from 'antd'
import {MoreOutlined} from '@ant-design/icons'
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { getFriends } from '../../service/user';
const {Content} = Layout

const items = [
  {
    label: <a href="https://www.antgroup.com">View profile</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">Unfollow</a>,
    key: '1',
  },
];

const ListFriend = () => {
    const [cookies] = useCookies('loginToken')
    const [listFriend, setListFriend] = useState([])

    const {
    token: { colorBoldSecondary },
  } = theme.useToken();
    const handelLoadFriend = async () => {
        try {
            const items = await getFriends(cookies.loginToken);
            setListFriend(items.data.data)
        } catch (error) {   
            console.log('Error: ', error.message);
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
                                            <h4 style={{color: colorBoldSecondary}}>{item.firstName} {item.lastName}</h4>
                                            <Typography.Text >Có 7 bạn chung</Typography.Text >
                                        </span>

                                        <Dropdown
                                            menu={{ 
                                            items,
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