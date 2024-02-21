import react from 'react'
import { ImageBackground, View } from 'react-native'
import {images} from '../../../constant'

function SignUp(res){
    return (
        <View style={{ 
            flex: 1
         }}>
            <ImageBackground source={images.background}
                style={{ 
                    flex: 1
                }}
            >
                <View></View>
            </ImageBackground>
        </View>
    )
}

export default SignUp