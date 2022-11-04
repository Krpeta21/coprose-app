import React,{useRef} from "react";
import { StyleSheet, View, Image } from 'react-native';
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginForm from '../../components/User/LoginForm';
const Login = () => {
    const toastRef = useRef();
  return (    
    <KeyboardAwareScrollView style={styles.fondo}>
        <Image
        source={require('../../../assets/img/coprose-logo.png')}
        resizeMode='contain'
        style={styles.logo}
            />
        <View style={styles.viewContainer}>
            <LoginForm toastRef={toastRef}/>
        </View>
        <Toast/>    
    </KeyboardAwareScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
    logo:{
        width:'100%',
        height: 150,
        marginTop: 20
    },
    viewContainer:{
        marginRight:40,
        marginLeft: 40        
    },
    divider:{
        backgroundColor: '#E83A14',
        margin: 40
    },
    textRegister:{
        marginTop: 15,
        marginLeft:10,
        marginRight: 10,
        textAlign: 'center'        
    },    
    loginText:{
        fontWeight: 'bold',
        marginTop: 25,
        textAlign:'center',
        fontSize: 25,        
        color: '#E83A14'
    },
    fondo:{
        backgroundColor: '#FFF'
    }
})