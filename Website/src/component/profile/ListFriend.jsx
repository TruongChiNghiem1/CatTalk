import {Row, Col , Layout, Image, Dropdown} from 'antd'
import avt from '../../assets/admin.jpg'
import {MoreOutlined} from '@ant-design/icons'
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
    return (
        <Content
            id='list_friend'
        >
            <Row gutter={[24, 24]}>
                <Col span={12} className=''>
                <div className='box_friend'>
                    <Image src={avt} className='avt_friend'/>
                    <span className='info_friend'>
                        <h4>Nguyễn Uyển Quyên</h4>
                        <span>Có 7 bạn chung</span>
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
            </Row>  
        </Content>
    )
}

export default ListFriend