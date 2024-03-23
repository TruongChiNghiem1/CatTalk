import React from 'react';
import {Provider, ActionSheet, Button} from '@ant-design/react-native';

export default class Test extends React.Component<any, any> {
  render() {
    return (
      <Provider>
        <Button onPress={this.showActionSheet}>showActionSheesssst</Button>
      </Provider>
    );
  }
  showActionSheet = () => {
    const BUTTONS = [
      'Operation1',
      'Operation2',
      'Operation3',
      'Delete',
      'Cancel',
    ];
    ActionSheet.showActionSheetWithOptions(
      {
        title: 'Title',
        message: 'Description',
        options: BUTTONS,
        cancelButtonIndex: 4,
        destructiveButtonIndex: 3,
      },
      (buttonIndex: any) => {
        this.setState({clicked: BUTTONS[buttonIndex]});
      },
    );
  };
}

export const title = 'ActionSheet';
export const description = 'ActionSheet example';
