import { Image ,theme, Layout, Button, message, Menu, Modal,Slider, Typography, Spin, Switch} from 'antd';
import { createRef, useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import {EditOutlined, SwapLeftOutlined, SaveOutlined, UserOutlined,TeamOutlined, CoffeeOutlined,CameraOutlined, CloseCircleOutlined, SettingOutlined} from '@ant-design/icons'
import qr from '../assets/qr_default.png'
import FormInfo from '../component/profile/FormInfo';
import ListFriend from '../component/profile/ListFriend';
import AboutMe from '../component/profile/AboutMe';
import { changePrivateAccount, uploadAvatar, uploadBackground} from '../service/user';
import AvatarEditor from 'react-avatar-editor'
import Account from '../component/profile/Account';
const {Content } = Layout;

const items = [
    {
        label: 'Infomation',
        key: 'info',
        icon: <UserOutlined />,
    },
    {
        label: 'About me',
        key: 'about',
        icon:<CoffeeOutlined />,
    },
    {
        label: 'Friends',
        key: 'friends',
        icon: <TeamOutlined />,
    },
    {
        label: 'Account',
        key: 'account',
        icon: <SettingOutlined />,
    },
]


const Profile = () =>{
    const {token: { colorBgContainer },} = theme.useToken();
    const {user, setUser, cookies, setCookie} = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)
    const [current, setCurrent] = useState('info');

    const [hasImage, setHasImage] = useState(false)
    const [hasBg, setHasBg] = useState(false)

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedBg, setSelectedBg] = useState(null);

    const [scale, setScale] = useState(1);

    const [loading, setLoading] = useState(false);
    const [bgLoad, setBgLoad] = useState(false);

    const [privateLoad, setPrivateLoad] = useState(false);

    const editorRef = createRef();
    const bgRef = createRef();

    const InfoContent = (current) =>{
    switch (current){
    case 'info':
        return  <FormInfo isEdit={isEdit} setEdit={setIsEdit} user={user}/> ;
    case 'about':
        return <AboutMe isEdit={isEdit} setEdit={setIsEdit} user={user}/>;
        case 'friends':
        return <ListFriend />;
    case 'account': 
        return <Account/>         
    default:
        return null;
    }
}

    const onClick = (e) => {
        setCurrent(e.key);
    };
   

     const handleUploadAvatar = async () =>{
        setLoading(true)
        const formData = new FormData();
        let canvasEdit = editorRef.current.getImageScaledToCanvas().toDataURL();
        const imageToUpload = canvasEdit || editorRef.current.getImage().toDataURL();
        formData.append('avatar', dataURLtoFile(imageToUpload, `${user.userName}_${Date.now().toString()}_avatar.png`));
        try {
            const res = await uploadAvatar(formData, cookies.loginToken);
            if(res.data.status ===  200){
                message.success(res.data.message);
                setHasImage(false);
                setUser({...user, avatar: res.data.avatar})
                setCookie('user', JSON.stringify({ ...cookies.user, avatar: res.data.avatar }));
                setLoading(false);
            }else{
                message.error(res.data.message);
            }
        } catch (e) {
            console.log("Error: " + e.message);
        }

    }

     const handleUploadBg = async () =>{
        setBgLoad(true)
        const formData = new FormData();
        const imageToUpload = bgRef.current.getImage().toDataURL();
        formData.append('background', dataURLtoFile(imageToUpload, `${user.userName}_${Date.now().toString()}_background.png`));
        try {
            const res = await uploadBackground(formData, cookies.loginToken);
            if(res.data.status ===  200){
                message.success(res.data.message);
                setHasBg(false);
                setUser({...user, background: res.data.background})
                setCookie('user', JSON.stringify({ ...cookies.user, background: res.data.background }));
                setBgLoad(false);
            }else{
                message.error(res.data.message);
            }
        } catch (e) {
            console.log("Error: " + e.message);
        }

    }


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(!['image/jpeg','image/pjpeg','image/png'].includes(file.type)){
            message.error('Image invalid')
        }
        else {
            setSelectedImage(URL.createObjectURL(file));
            setHasImage(true)
        }
    };


    const handleBgChange = (e) => {
        const file = e.target.files[0];
        if(!['image/jpeg','image/pjpeg','image/png'].includes(file.type)){
            message.error('Image invalid')
        }
        else {
            setSelectedBg(URL.createObjectURL(file));
            setHasBg(true)
        }
    }

    const dataURLtoFile = (dataURL, filename) => {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };


     const showConfirm = () => {
        Modal.confirm({
        title: 'Confirm cancellation of changes?',
        onOk: () => {
            setHasImage(false)
            setLoading(false)
            }   
        });
    };


    const cancelChangeBg = () => {
        setHasBg(false)
        setSelectedBg(null)
    }

    const handleChangePrivateAccount = async (value) => {
        setPrivateLoad(true)
        try{
            let privateValue = value ? 1 : 0;
            const res = await changePrivateAccount(privateValue, cookies.loginToken)
            setUser({...user, private: res.data.private})
            setCookie('user', JSON.stringify({ ...cookies.user, private: res.data.private }));
            setPrivateLoad(false)
        }catch (e) {
            console.log("Error: " + e.message);
        }
    }   

    console.log(user);
    

    return(
         <Content
          id='profile'
          className='container'
          style={{
            background: colorBgContainer,
          }}
        >
        <div className='background_box'>
            {hasBg ? (
                <div className='position-relative'>
                    <AvatarEditor
                        ref={bgRef}
                        image={selectedBg}
                        width={1500}
                        height={260}
                        borderRadius={0}
                        border={0}
                        color={[120, 199, 201, 0.26]} 
                        scale={scale}
                        rotate={0}
                        className='canvas_bg'
                    />
                    {bgLoad && (
                        <div className='load_bg_overlay'>
                            <Spin/>
                        </div>
                    )}
                    <div className='action_background'>
                        <Button icon={<CloseCircleOutlined/>} onClick={cancelChangeBg}>Close</Button>
                        <Button icon={<SaveOutlined/>} onClick={handleUploadBg}>Save</Button>
                    </div>
                </div>
               
            ) : (
                <div className='w-100 position-relative'>
                     <label htmlFor='bg' className='change_background'>
                        <CameraOutlined style={{marginRight: '8px'}}/> 
                        <span>Change background</span>
                        <input 
                            id='bg' 
                            type='file' 
                            hidden 
                            className='w-100 h-100' 
                            accept="image/jpeg,image/pjpeg,image/png"
                            onChange={handleBgChange}/>
                    </label>
                    <Image src={user.background} className='user_bg w-100'/>
                </div>
                
            )}

        </div>
    
        <div className='action_user'>
            <Button 
                className='mr-1' 
                onClick={() => setIsEdit(!isEdit)} 
                type={isEdit ? 'dashed' : 'primary'}
                icon={isEdit ? <SwapLeftOutlined /> : <EditOutlined />}
                >
                    {isEdit ? 'Return' : 'Edit'}
                    </Button>
        </div>
        <div className='user_form_box'>
        <div className='box_user'>
            <div className='avatar_box'>
                <img className='avt_user' src={user.avatar} />
                <label htmlFor='avatar' className='overlay_change'>
                    <CameraOutlined />
                    <input 
                        id='avatar' 
                        type='file' 
                        hidden 
                        className='w-100 h-100' 
                        accept="image/jpeg,image/pjpeg,image/png"
                         onChange={handleFileChange}/>
                </label>
            </div>
           
            <h2 className='userName'>{user.userName}</h2>
            <div className='flex-center mt-1 mb-1'>
                <Switch 
                    checked={user.private == 1 ? true : false} 
                    loading={privateLoad}
                    onChange={handleChangePrivateAccount}/>
                <Typography.Title level={5} style={{color: '#44bccc', margin: '0 0 0 8px',}}>Private account</Typography.Title>
            </div>
           
            <img src={qr} width={250}/>     
        </div>
           <div className='main_info'>
              <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
               <div style={{padding: '2rem'}}>
                 {InfoContent(current)}
               </div>
          </div>
        </div>
        
        <Modal
            open={hasImage}    
            centered
            title={'Edit your avatar'}
            onCancel={showConfirm}
            footer={
                <Button onClick={handleUploadAvatar} loading={loading} icon={<SaveOutlined/>}>Save</Button>
            }>
            <div className='w-100 flex-column-center'>
                 <AvatarEditor
                ref={editorRef}
                image={selectedImage}
                width={250}
                height={250}
                borderRadius={250}
                color={[120, 199, 201, 0.26]} 
                scale={scale}
                rotate={0}
            />
            <div style={{width: '350px'}}>
                <Slider
                    min={1}
                    max={2.5}
                    step={0.05}
                    defaultValue={1}
                    tooltip={{ open: false }}
                    onChange={(value) => setScale(value)} />
            </div>
            </div>
        </Modal>

        </Content>
    )
}

export default Profile

