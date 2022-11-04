import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'
import {size} from 'lodash'
export default function ListEmpresas({empresas, navigation}) {
  return (
    <View>
      <FlatList
        data={empresas}
        keyExtractor={(item, index)=> index.toString()}
        renderItem={(empresa)=>(
            <Empresa empresa={empresa} navigation={navigation}/>
        )}
      />
    </View>
  )
}
function Empresa({empresa, navigation}){
    const {id, images, name, encargado, correo, horario} = empresa.item
    const imageEmpresa = images[0]
    return (
        <TouchableOpacity>
            <View style={styles.viewEmpresa}>
                    <View style={styles.viewEmpresaImage}>
                    <Image
                        resizeMode='cover'
                        PlaceholderContent={<ActivityIndicator color='#fff'/>}
                        source={{uri: imageEmpresa}}
                        style={styles.imageEmpresa}
                    />
                    </View>
                
                <View>
                    <Text style={styles.empresaTitle}>
                        {name}
                    </Text>
                    <Text style={styles.empresaEncargado}>
                        {encargado}
                    </Text>
                    <Text style={styles.empresaHorario}>
                        {horario}
                    </Text>
                    <Text style={styles.empresaCorreo}>
                        {
                            size(correo) > 60
                            ? `${correo.substr(0,60)}...`
                            : correo
                        }
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
 viewEmpresa:{
     flexDirection: 'row',
     margin: 10
 },
 viewEmpresaImage:{
    marginRight: 15
 }
 ,
 imageEmpresa:{
     width: 90,
     height: 90

 },
empresaTitle:{
     fontWeight: 'bold'
 },
 empresaEncargado:{
     paddingTop: 2,
     color: 'gray'
 },
 empresaHorario:{
    paddingTop: 2,
    color: 'gray'
},
 empresaCorreo:{
     paddingTop: 2,
     color: 'gray'     
 }
})