import React from 'react';
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

export default class BasicTabBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'greenTab',
      user: null,
      token: null,
    };
    const {navigation} = props;
    this.navigation = navigation
    const { route } = props;

    this.getDataFromAsyncStorage();
  }

  getDataFromAsyncStorage = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      if (user) {
        this.setState({ user: JSON.parse(user), token });
      }
    } catch (error) {
      console.error('Error getting data from AsyncStorage:', error);
    }
  };

  renderContent1(pageText) {
    return <Chat user={this.state.user}></Chat>;
  }

  renderContent2(pageText) {
    return <PhoneBookItem user={this.state.user}></PhoneBookItem>;
  }

  renderContent3(pageText) {
    return <Welcome user={this.state.user}></Welcome>;
  }

  renderContent4(res) {
    return <Setting  user={this.state.user}></Setting>;
  }

  renderContent(pageText) {
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'red'}}>
        <Text style={{margin: 50}}>{pageText}</Text>
      </View>
    );
  }

  onChangeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }

  render() {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="#f5f5f5">
        <TabBar.Item
          title="Tin nhắn"
          icon={<FontAwesomeIcon icon={faArrowRightToBracket} />}
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => this.onChangeTab('blueTab')}>
          {this.renderContent1('Life Tab')}
        </TabBar.Item>
        <TabBar.Item
          icon={<FontAwesomeIcon icon={faAddressBook} />}
          title="Danh bạ"
          badge={2}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => this.onChangeTab('redTab')}>
          {this.renderContent2('Koubei Tab')}
        </TabBar.Item>
        <TabBar.Item
          icon={<FontAwesomeIcon icon={faStar} />}
          title="Welcome"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => this.onChangeTab('greenTab')}>
          {this.renderContent3('Friend Tab')}
        </TabBar.Item>
        <TabBar.Item
          icon={<FontAwesomeIcon icon={faUser} />}
          title="Cá nhân"
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => this.onChangeTab('yellowTab')}>
          {this.renderContent4(this.navigation)}
        </TabBar.Item>
      </TabBar>
    );
  }
}
