import react, {useEffect, useState, useRef} from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {images, colors, fontSize} from '../../../constant';
import {Image} from 'react-native';
import {UIInput} from '../../../components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons/faPaperclip';
import {faFaceSmile} from '@fortawesome/free-solid-svg-icons/faFaceSmile';
import {faImage} from '@fortawesome/free-solid-svg-icons/faImage';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons/faTrashCan';
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import {height} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {AppRegistry} from 'react-native';
import BasicTabBarExample from '../layout/footer';
import {useRoute, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getMessage} from '../../../service/chat';
import RenderMyViewChatItem from '../chat/myViewChatItem';
import RenderSystemViewChatItem from '../chat/systemViewChatItem';
import RenderViewChatGroupItem from '../chat/userViewChatItem';
import {socket} from '../../../service/cattalk';
import {io} from 'socket.io-client';
import axios from 'axios';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';
import ViewUserItem from './viewUserItem'
import { getMemberInGroup } from '../../../service/chat';

import {
  Button,
  Icon,
  WhiteSpace,
  WingBlank,
  InputItem,
  TextareaItem,
  Provider,
  ActionSheet,
  List,
  Switch,
} from '@ant-design/react-native';

function RenderMoreChatGroup(res) {
  const navigation = useNavigation();
  var {data} = res.route.params;
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState([]);
  const [myUserName, setMyUserName] = useState('');
  const [isLeader, setIsLeader] = useState('');
  const scrollViewRef = useRef();
  
  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userStorage = await AsyncStorage.getItem('user');
      const user = JSON.parse(userStorage);
      const getMember = await getMemberInGroup(token, data.objectChat._id)
      setMember(getMember.data.member)
      setMyUserName(user.userName)
      setIsLeader(data.objectChat.lead === user.userName ? 1 : 0)
    } catch (error) {
      console.log('Error fetching the messages', error);
    }
  };

  const backDisconnect = async () => {
    navigation.goBack()
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Provider>
        <ImageBackground
          source={images.background}
          style={{
            flex: 1,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: colors.bgHeader,
              height: 60,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <TouchableOpacity onPress={backDisconnect}>
                <FontAwesomeIcon
                  style={{marginRight: 10}}
                  color={colors.primary}
                  size={20}
                  icon={faChevronLeft}
                />
              </TouchableOpacity>
              
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: fontSize.h3,
                }}>
                Option
              </Text>
            </View>
          </View>
          
          <View style={{width: 420}}>
          <ScrollView ref={scrollViewRef}>
            <View style={{ 
              width: 411,
              marginVertical: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
             }} >
              <Image
                source={{uri: data.objectChat.avatar}}
                style={{
                  marginRight: 10,
                  width: 90,
                  height: 90,
                  borderRadius: 100,
                }}></Image>
              <Text style={{ 
                marginVertical: 10,
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: fontSize.h1
               }}>{data.objectChat.groupName}</Text>
            </View>
            <View style={{width: 420, backgroundColor: colors.colorHide }}>
              <List.Item extra={<Switch />}>Mute message</List.Item>
            </View>
            {member.map((userItem) => (
                <ViewUserItem fetchData={fetchData} data={userItem} isLead={isLeader} chatId={data.objectChat._id} myUserName={myUserName} />
            ))
            }
          
          
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateMemberThisGroup', {dataCreate: data })}
              style={{
                margin: 15,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      marginRight: 15,
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      backgroundColor: colors.bgInput,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <FontAwesomeIcon
                        style={{color: colors.colorBgButton}}
                        icon={faPlus}
                        size={20}
                      />
                    </View>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: fontSize.h3,
                    }}>
                    Add members
                  </Text>
                </View>
                
              </View>
            </TouchableOpacity>
            

            <TouchableOpacity style={{
              width: 411,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              height: 50,
              marginBottom: 1,
            }}>
              <View
                style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesomeIcon
                  style={{color: colors.colorBgButton, marginRight: 8}}
                  icon={faTrashCan}
                />
                <Text style={{color: colors.colorBgButton, fontSize: fontSize.h3}}>Delete chat </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{
              width: 411,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              height: 50,
            }}>
              <View
                style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: 'red', fontSize: fontSize.h3}}>Leave the group</Text>
                <FontAwesomeIcon
                  style={{color: 'red', marginLeft: 10}}
                  icon={faArrowRightFromBracket}
                />
              </View>
            </TouchableOpacity>
          </ScrollView>
          </View>
          
        </ImageBackground>
      </Provider>
    </View>
  );
}

export default RenderMoreChatGroup;
