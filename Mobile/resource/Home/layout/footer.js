import React, { useState, useEffect } from 'react';
import {Text, View, ImageBackground} from 'react-native';
import {SearchBar, TabBar} from '@ant-design/react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons/faArrowRightToBracket';
import {Icon} from '@ant-design/react-native';
import {images, fontSize, colors} from '../../../constant';
import Welcome from '../Welcome/index';
import Chat from '../chat/ChatItem';
import PhoneBookItem from '../phonebook/phoneBookItem';
import {faAddressBook} from '@fortawesome/free-solid-svg-icons/faAddressBook';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faStar} from '@fortawesome/free-solid-svg-icons/faStar';
import RenderProfile from '../profile/profile';
import Setting from '../setting/setting';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BasicTabBarExample = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('greenTab');
  const [user, setUser] = useState(null);

  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  const getDataFromAsyncStorage = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Error getting data from AsyncStorage:', error);
    }
  };

  const renderContent1 = () => {
    return <Chat user={user}></Chat>;
  };

  const renderContent2 = () => {
    return <PhoneBookItem user={user}></PhoneBookItem>;
  };

  const renderContent3 = () => {
    return <Welcome user={user}></Welcome>;
  };

  const renderContent4 = () => {
    return <Setting user={user}></Setting>;
  };

  const renderContent = (pageText) => {
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'red'}}>
        <Text style={{margin: 50}}>{pageText}</Text>
      </View>
    );
  };

  const onChangeTab = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="#f5f5f5"
    >
      <TabBar.Item
        title="Tin nhắn"
        icon={<FontAwesomeIcon icon={faArrowRightToBracket} />}
        selected={selectedTab === 'blueTab'}
        onPress={() => onChangeTab('blueTab')}
      >
        {renderContent1('Life Tab')}
      </TabBar.Item>
      <TabBar.Item
        icon={<FontAwesomeIcon icon={faAddressBook} />}
        title="Danh bạ"
        badge={2}
        selected={selectedTab === 'redTab'}
        onPress={() => onChangeTab('redTab')}
      >
        {renderContent2('Koubei Tab')}
      </TabBar.Item>
      <TabBar.Item
        icon={<FontAwesomeIcon icon={faStar} />}
        title="Welcome"
        selected={selectedTab === 'greenTab'}
        onPress={() => onChangeTab('greenTab')}
      >
        {renderContent3('Friend Tab')}
      </TabBar.Item>
      <TabBar.Item
        icon={<FontAwesomeIcon icon={faUser} />}
        title="Cá nhân"
        selected={selectedTab === 'yellowTab'}
        onPress={() => onChangeTab('yellowTab')}
      >
        {renderContent4()}
      </TabBar.Item>
    </TabBar>
  );
};

export default BasicTabBarExample;
