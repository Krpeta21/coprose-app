import React, {useState, useEffect} from "react"
import {View, StyleSheet,Text} from 'react-native'
import firebase from "firebase/compat/app"
import Toast from "react-native-toast-message"
import { Button } from "react-native-elements"
import InfoUser from "../../components/User/InfoUser"
import UserOptions from "../../components/User/UserOptions"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function UserLogged(){
    const [userInfo, setUserInfo] = useState(null)
    const [reloadUserInfo, setReloadUserInfo] = useState(false)
    
    useEffect(()=>{
        (async()=>{
           const user= await firebase.auth().currentUser
           setUserInfo(user)
        })()
    setReloadUserInfo(false)
    }, [reloadUserInfo])

    return(
        <KeyboardAwareScrollView>
        <View style={styles.viewUserInfo}>
            {userInfo&&(<InfoUser userInfo={userInfo} setReloadUserInfo={setReloadUserInfo} />)}
            <UserOptions userInfo = {userInfo} setReloadUserInfo={setReloadUserInfo}/>
            <Button 
            containerStyle={styles.btnCointainerSignOut}
            buttonStyle={styles.btnSignOut}
            title='Cerrar sesión' onPress={()=>firebase.auth().signOut()}/>
            <Toast/>
        </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
      minHeight:'100%'      
    },
    btnCointainerSignOut:{       
        width: '50%',
        borderRadius:10,
        marginLeft: 100 ,
        marginTop:50,
        paddingTop: 10,
        paddingBottom: 10
        
    },
    btnSignOut:{       
        backgroundColor:'#F2B61D' 
    }
})