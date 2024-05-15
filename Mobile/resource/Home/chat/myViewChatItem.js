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

function RenderMyViewChatItem(res) {
  const [loading, setLoading] = useState(false);
  const {data, socket,myUserName,chatId, setData} = res;
  const [avatar, setAvatar] = useState(
    'https://static.vecteezy.com/system/resources/previews/024/766/958/original/default-male-avatar-profile-icon-social-media-user-free-vector.jpg',
  );

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

  const recallMessage = () => {
    socket.emit('recall-message', {data, chatId});
  }

  const deleteMessageButton = async () => {
    setData(prevData => prevData.filter(item => item._id !== data._id));
    await deleteMessage(myUserName,data, chatId);
  }

  let myChatItem = (
    <View>
      <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <View style={{marginBottom: 10}}>
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 10,
              display: 'flex',
              alignItems: 'flex-end',
            }}>
            {data.typeMessage == 2 ? (
              <Image
                source={{uri: data.content}}
                style={{
                  marginTop: 7,
                  width: 250,
                  height: 150,
                  borderRadius: 20,
                }}></Image>
            ) : (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
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
                    backgroundColor: '#FFEFD8',
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
                </View>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: 413,
          height: 123,
          display: isLongPress ? 'flex' : 'none',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            backgroundColor: colors.bgHeader,
            width: 250,
            height: 123,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginRight: 10,
            borderRadius: 13,
          }}>
          <TouchableOpacity
            style={{
              width: 250,
              paddingLeft: 10,
              height: 30,
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
            onPress={recallMessage}
            style={{
              width: 250,
              paddingLeft: 10,
              height: 40,
              borderBottomColor: colors.colorBgButton,
              borderBottomWidth: 1,
              paddingLeft: 10,
              paddingTop: 10,
            }}>
            <Text
              style={{
                color: colors.primary,
              }}>
              Thu hồi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={deleteMessageButton}
            style={{
              width: 250,
              height: 40,
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
  return <>{myChatItem}</>;
}

export default RenderMyViewChatItem;
