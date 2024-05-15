import react, {useEffect, useState} from 'react';
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
import moment from 'moment';
import {deleteMessage} from '../../../service/chat'

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

function RenderViewChatItem(res) {
  const {data, profileUser, typeChat,myUserName,chatId, setData} = res;

  let timeoutId;
  const [isLongPress, setIsLongPress] = useState(false);
  const handlePressIn = () => {
    if(isLongPress){
      setIsLongPress(false);
    } else {
      timeoutId = setTimeout(() => {
        setIsLongPress(true);
      }, 500); // Thời gian nhấn giữ (500ms trong ví dụ này)
    }
  };

  const handlePressOut = () => {
    clearTimeout(timeoutId);
    // setIsLongPress(false);
  };

  const deleteMessageButton = async () => {
    setData(prevData => prevData.filter(item => item._id !== data._id));
    await deleteMessage(myUserName,data, chatId);
  }

  let chatItem = (
    <View>
      <View style={{marginBottom: 10}}>
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 10,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
              <View style={{ 
                height: '100',
                marginBottom: 5,
                // backgroundColor: 'red',
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
                <Image
                  source={{ uri: profileUser[0].avatar }}
                  style={{
                    marginRight: 10,
                    borderRadius: 100,
                    width: 30,
                    height: 30,
                  }}></Image>
              </View>
            <View>
            <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut}>
              {typeChat == 'multi' ? 
                <Text style={{ 
                  color: 'black',
                  marginLeft: 5,
                  marginBottom: 6
                  }}>{profileUser[0].firstName + ' ' + profileUser[0].lastName}
                </Text> : <></>
              }
              {data.typeMessage == 2 ? 
                <Image
                  source={{ uri: data.content }}
                  style={{
                    marginTop: 7,
                    width: 250,
                    height: 150,
                    borderRadius: 20,
                  }}></Image>
                :
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  width: 250,
                  borderWidth: 0,
                  paddingVertical: 11,
                  paddingLeft: 12,
                  paddingRight: 10,
                  borderRadius: 20,
                  backgroundColor: colors.colorFooterMenu,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: fontSize.h4,
                  }}>
                  {data.content}
                </Text>
                <Text
                  style={{
                    color: '#b4b4b4c7',
                    marginTop: 5,
                    fontSize: fontSize.h5,
                  }}>
                  {moment(data.createdAt).format('HH:mm')}
                </Text>
              </View>}
            </TouchableOpacity>

              {/* <Image
                source={images.testImg2}
                style={{
                  marginTop: 7,
                  width: 250,
                  height: 150,
                  borderRadius: 20,
                }}></Image> */}
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          width: 413,
          height: 80,
          display: isLongPress ? 'flex' : 'none',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            backgroundColor: colors.bgHeader,
            width: 250,
            height: 80,
            marginLeft: 50,
            borderRadius: 13,
          }}>
          <TouchableOpacity
            style={{
              width: 250,
              paddingLeft: 10,
              paddingTop: 10,
              height: 40,
              borderBottomColor: colors.colorBgButton,
              borderBottomWidth: 1,
            }}>
            <Text
              style={{
                color: colors.primary,
              }}>
              Chuyển tiếp
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={deleteMessageButton}
            style={{
              width: 250,
              height: 30,
              paddingLeft: 10,
              paddingTop: 10,
            }}>
            <Text
              style={{
                color: 'red',
              }}>
              Xóa
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  //   let chatItems = [];
  //   for (let i = 0; i < 12; i++) {
  //     chatItems.push(chatItem);
  //   }
  return <>{chatItem}</>;
}

export default RenderViewChatItem;
