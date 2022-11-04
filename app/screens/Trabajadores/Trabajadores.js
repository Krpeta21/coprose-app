import React, {useState, useEffect, useCallback} from "react";
import { StyleSheet, View, Text} from 'react-native';
import { Icon } from "react-native-elements";
import {firebaseApp} from '../../utils/firebase';
import Loading from "../../components/Loading";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/firestore';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import { getTrabajadores } from "../../utils/actions";
import {size} from 'lodash';
import ListTrabajadores from "../../components/Trabajadores/ListTrabajadores";

export default function Trabajadores(){
    const navigation = useNavigation()
    const [user, setUser] = useState(null)
    const [startTrabajador, setStartTrabajador] = useState(null)
    const [trabajadores, setTrabajadores] = useState([])
    const [loading, setLoading] = useState(false)
    const limitTrabajadores = 7
    
    
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((userInfo)=>{
            setUser(userInfo)
        })
    },[])
    
    useFocusEffect(
        React.useCallback(() => {
            async function fetchData(){
            setLoading(true)
            const response = await getTrabajadores(limitTrabajadores)
            
            if(response.statusResponse){                
                setStartTrabajador(response.startTrabajador)
                setTrabajadores(response.trabajadores)
            }
            setLoading(false)
            }
            fetchData();
        },[])
    )

    return(
        <View style={styles.viewBody}>
            {
                size(trabajadores) > 0 ? (
                    <ListTrabajadores 
                        trabajadores={trabajadores}
                        navigation={navigation}
                    />
                )
                 :(
                    <View style={styles.notFoundView}>
                        <Text style={styles.notFoundText}>No hay trabajadores registrados.</Text>
                    </View>                
                 )
            }
            {user &&(
            <Icon
                reverse
                type='material-community'
                name='plus'
                color='#F2B61D'
             containerStyle={styles.btnContainer}
             onPress={()=> navigation.navigate('add-trabajadores')}
            />
            )}
        <Loading isVisible={loading} text="Cargando Trabajadores..." />
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor:'#fff'
    },
    btnContainer:{
        position: 'absolute',
        bottom: 10,
        right: 10,
        shadowColor: 'black',
        shadowOffset:{width: 2,height: 2},
        shadowOpacity: 0.5
    },
    notFoundView:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    notFoundText:{
        fontSize: 18,
        fontWeight: "bold"
    }

})