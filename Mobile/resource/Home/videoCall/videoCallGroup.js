import React, { Component } from 'react';
import {ZegoUIKitPrebuiltCall, GROUP_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'
import {ImageBackground, Text, View, TouchableOpacity} from 'react-native';

export default function VoiceCallPageGroup(props) {
    var {myUserNameOne, chatId, myFullName} = props.route.params;
    return (
        <View style={{ flex: 1 }}>
            <ZegoUIKitPrebuiltCall
                appID={931810259}
                appSign={"b31ff68303a087a1053b5d96111bcae9cd1305ad265cd795c64db38708238b0e"}
                userID={myUserNameOne}
                userName={myFullName}
                callID={chatId}

                config={{
                    // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
                    ...GROUP_VIDEO_CALL_CONFIG,
                    onOnlySelfInRoom: () => { props.navigation.navigate('BasicTabBarExample') },
                    onHangUp: () => { props.navigation.navigate('BasicTabBarExample') },
                }}
            />
        </View>
    );
}
// style={styles.container}
// appID="931810259"
// appSign="b31ff68303a087a1053b5d96111bcae9cd1305ad265cd795c64db38708238b0e"
// userID="AAA"
// userName="nghiem"
// callID="testcall"