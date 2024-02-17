import { Breadcrumb ,theme, Image} from 'antd';
import {
  HomeOutlined,
  UserOutlined
} from '@ant-design/icons';
import bg from '../assets/default_bg.jpg';


const Profile = () =>{
     const {token: { colorBgContainer, colorBgSecondary },} = theme.useToken();
    return(
        <div className="wrapper" style={{background: colorBgSecondary}}>
            <Breadcrumb
                items={[
                {
                    href: '/',
                    title: <HomeOutlined />,
                },
                {
                    title: (
                    <>
                        <UserOutlined />
                        <span>User Admin</span>
                    </>
                    ),
                },
                ]}
            />
            <Image style={{height: '250px', width: '100vw', objectFit: 'cover'}} src={bg}/>
        </div>
    )
}

export default Profile

