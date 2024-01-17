import NotFoundImg from '../assets/not_found.png'
import {Button} from 'antd'
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const NotFound = () =>{
    const navigate = useNavigate()
    return(
        <div className="wrapper not_found flex-column-center"> 
           <img height={500} src={NotFoundImg}/>
            <Button icon={<HomeOutlined/>} onClick={() => navigate('/')}>Go to home page</Button>
        </div>
    )
}

export default NotFound