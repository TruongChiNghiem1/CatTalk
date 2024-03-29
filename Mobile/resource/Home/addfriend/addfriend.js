import react, {useState, useEffect} from 'react';
import {ImageBackground, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {images, colors, fontSize} from '../../../constant';
import {Image} from 'react-native';
import {UIInput} from '../../../components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons/faArrowRightToBracket';
import {height} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {AppRegistry} from 'react-native';
import {Button, Icon, WhiteSpace, WingBlank} from '@ant-design/react-native';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {url} from '../../../service/cattalk';
import ViewFriendItem from './viewFriendItem'

// import { DemoBlock } from './demo'
function AddFriend(res) {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `${url}/user/test-data`,
            );
            setData(res.data.data);
            
            const userStorage = await AsyncStorage.getItem('user');
            const user = JSON.parse(userStorage);

            setLoading(false);
        } catch (e) {
        console.log(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const searchFriend = () => {

    }

    return (
        <View
            style={{
                flex: 1,
            }}>
            <ImageBackground
                source={images.background}
                style={{
                flex: 1,
                }}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: colors.bgHeader,
                        height: 53,
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon
                            style={{marginTop: 3, marginLeft: 13}}
                            color={colors.primary}
                            size={20}
                            icon={faChevronLeft}
                        />
                    </TouchableOpacity>
                    <View style={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}>
                        <Text style={{ 
                            color: 'black',
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginTop: 3, 
                            marginLeft: 13
                        }}>Add Friend</Text>
                    </View>
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                    }}>
                    <UIInput placeholder="Nhập username hoặc email" width={340}></UIInput>
                    <TouchableOpacity
                        onPress={searchFriend}
                        title="Login">
                        <View
                            style={{
                                backgroundColor: 'white',
                                width: 41,
                                marginTop: 7,
                                height: 41,
                                borderRadius: 100,
                                marginLeft: 8,
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <FontAwesomeIcon icon={faUserPlus} color={colors.colorBgButton} />
                        </View>
                    </TouchableOpacity>
                </View>
                
                {loading ? (
                    <Text>loading....</Text>
                    ) : (
                    <ScrollView>
                        {data.length ? (
                        <>
                            {data.map(item => (
                            <ViewFriendItem data={item} />
                            ))}
                        </>
                        ) : (
                        <Text>Empty</Text>
                        )}
                    </ScrollView>
                )}
            </ImageBackground>
        </View>
    );
}

export default AddFriend;
