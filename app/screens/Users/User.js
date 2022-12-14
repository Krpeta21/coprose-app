import React, {useState, useEffect} from "react";
import {View, Text} from "react-native"
import firebase  from "firebase/compat/app"
import UserLogged from './UserLogged'
import Loading from "../../components/Loading";
import Login from "./Login";

export default function Account(){
    const [login, setLogin]= useState(null)

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            !user ? setLogin(false) : setLogin(true)
        })
    },[])

    if(login === null) return <Loading isVisible = {true} text = 'Espere un momento...'/>

    return login ? <UserLogged/> : <Login/>

}