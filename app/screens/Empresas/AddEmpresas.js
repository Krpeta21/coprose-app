import { StyleSheet, Text, View } from 'react-native'
import React,{useRef,useState} from 'react'
import Loading from '../../components/Loading'
import Toast from 'react-native-toast-message'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import AddEmpresasForm from '../../components/Empresas/AddEmpresasForm';

export default function AddEmpresas() {
    const toastRef = useRef()
    const [loading, setLoading] = useState(false)
  return (
    <KeyboardAwareScrollView>
        <AddEmpresasForm toastRef={toastRef} setLoading={setLoading}/>
      <Loading isVisible={loading} text="Añadiendo Empresa..."/>
      <Toast position='top' opacity={0.9}/>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({})