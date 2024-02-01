import { TextInput } from "react-native"
function UIInput(prop){
    var {placeholder} = prop
    return (
        <TextInput
            secureTextEntry={true}
            placeholder={placeholder}
            placeholderTextColor={'#44C1C6'}
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
            }}
            />
    )
}

export default UIInput