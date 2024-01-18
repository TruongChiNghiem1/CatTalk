import React from "react";
import {Button, Image, ImageBackground, Text, View, TextInput, Linking} from "react-native"
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {images} from '../../constant'
function mainScreen(res){
    return (
        <View style={{ 
            backgroundColor: "#83FBFF",
            flex: 1
         }}>
            <ImageBackground source={ require('../../assets/img/login/pattern-5.svg') } resizeMode="cover"
                style={{ 
                    flex: 1
                }}>
                <View style={{ 
                    marginTop: 150,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image source={ images.logo }
                        style={{ 
                            width: 200,
                            height: 200
                        }}>
                    </Image>
                    <TextInput placeholder="Email" placeholderTextColor={'#44C1C6'} 
                        style={{ 
                            width: 300,
                            height: 40,
                            backgroundColor: '#D8FEFF',
                            borderRadius: 20,
                            borderColor: '#D8FEFF',
                            borderWidth: 1,
                            paddingHorizontal: 15,
                            paddingTop: 15
                        }}/>
                    <TextInput secureTextEntry={true} placeholder="Password" placeholderTextColor={'#44C1C6'}
                        style={{ 
                            marginTop: 10,
                            marginBottom: 4,
                            width: 300,
                            height: 40,
                            backgroundColor: '#D8FEFF',
                            borderRadius: 20,
                            borderColor: '#D8FEFF',
                            borderWidth: 1,
                            paddingHorizontal: 15,
                            paddingTop: 15,
                        }}/>
                    <View style={{ width: 300, display: 'flex' ,alignItems: 'flex-end' }}>
                        <Text onPress={() => Linking.openURL('')}
                            style={{
                                width: 100,
                                fontSize: 12,
                                marginBottom: 20,
                            }}>Forgot password ?</Text>
                    </View>
                    <Button style={{ 
                        width: 100,
                        height: 100,
                        backgroundColor: '#D2FDFF',
                        borderRadius: 100
                     }} title="Login"/>
                </View>
            </ImageBackground>
        </View>
    )
}

export default mainScreen
/*
import {sum2Number, subtract2Number} from '../utilies/caculator'
const mainScreen = (props) => {
    // alert(`x = ${props.x} y = ${props.y}`)
    // return <Text>Main screen nghiem x = {props.x} y = {props.y}</Text>

    //Destructer
    const {x, y} = props
    const {person} = props
    const {name, age, email} = person
    const {products} = props

    return (
        <View> 
            <Text>Main screen nghiem x = {x} y = {y}</Text>
            <Text>
                Tên: {name},
                Tuổi: {age},
                Email: {email}
            </Text>
            //{ <Text>{JSON.stringify(products)}</Text> }
            {products.map(eachProduct => <Text>Product Name: {eachProduct.productName} - Year: {eachProduct.year}</Text>)}
            <Text>Sum 2 and 3 = {sum2Number(2,3)}</Text>
            <Text>SUbtract 2 and 3 = {subtract2Number(2,3)}</Text>
        </View>
    )
}
*/
// export default mainScreen