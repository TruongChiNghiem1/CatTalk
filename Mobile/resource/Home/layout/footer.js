import React from 'react';
import {Text, View, ImageBackground} from 'react-native';
import {SearchBar, TabBar} from '@ant-design/react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons/faArrowRightToBracket';
import {Icon} from '@ant-design/react-native';
import {images, fontSize, colors} from '../../../constant';
import Welcome from '../Welcome/index';
import Chat from '../chat/chat';
export default class BasicTabBarExample extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
    };
  }

  renderContent1(pageText: any) {
    return <Chat></Chat>;
  }

  renderContent3(pageText: any) {
    return <Welcome></Welcome>;
  }

  renderContent(pageText: any) {
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'red'}}>
        <Text style={{margin: 50}}>{pageText}</Text>
      </View>
    );
  }

  onChangeTab(tabName: any) {
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
          icon={<Icon name="home" />}
          title="Danh bạ"
          badge={2}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => this.onChangeTab('redTab')}>
          {this.renderContent('Koubei Tab')}
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="like" />}
          title="Welcome"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => this.onChangeTab('greenTab')}>
          {this.renderContent3('Friend Tab')}
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="user" />}
          title="Cá nhân"
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => this.onChangeTab('yellowTab')}>
          {this.renderContent('My Tab')}
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="user" />}
          title="Cá nhân"
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => this.onChangeTab('yellowTab')}>
          {this.renderContent('My Tab')}
        </TabBar.Item>
      </TabBar>
    );
  }
}
