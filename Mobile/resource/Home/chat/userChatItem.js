import react from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {images, colors, fontSize} from '../../../constant';
import {Image} from 'react-native';
import {UIInput} from '../../../components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons/faArrowRightToBracket';
import {height} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {AppRegistry} from 'react-native';
import {Button, Icon, WhiteSpace, WingBlank} from '@ant-design/react-native';
import RenderViewChat from './viewChat';

function renderContent1(pageText) {
  return <RenderViewChat></RenderViewChat>;
}

function UserChatItem(props) {
  var {data} = props;
  const {navigation} = props;

  return (
    <View
      onPress={() => this.renderContent1('blueTab')}
      style={{
        margin: 15,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Image
          source={{uri: data.avatar}}
          style={{
            marginRight: 15,
            width: 50,
            height: 50,
            borderRadius: 100,
          }}></Image>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: fontSize.h3,
            }}>
            {data.name}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: fontSize.h4,
            }}>
            {data.contentNew}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default UserChatItem;
