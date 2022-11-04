import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'
import {size} from 'lodash'
export default function ListTrabajadores({trabajadores, navigation}) {
  return (
    <View>
      <FlatList
        data={trabajadores}
        keyExtractor={(item, index)=> index.toString()}
        renderItem={(trabajador)=>(
            <Trabajador trabajador={trabajador} navigation={navigation}/>
        )}
      />
    </View>
  )
}
function Trabajador({trabajador, navigation}){
    const {id, images, name, puesto, correo, telefono} = trabajador.item
    const imageTrabajador = images[0]
    return (
        <TouchableOpacity>
            <View style={styles.viewTrabajador}>
                    <View style={styles.viewTrabajadorImage}>
                    <Image
                        resizeMode='cover'
                        PlaceholderContent={<ActivityIndicator color='#fff'/>}
                        source={{uri: imageTrabajador}}
                        style={styles.imageTrabajador}
                    />
                    </View>
                
                <View>
                    <Text style={styles.trabajadorTitle}>
                        {name}
                    </Text>
                    <Text style={styles.trabajadorPuesto}>
                        {puesto}
                    </Text>
                    <Text style={styles.trabajadorTelefono}>
                        {telefono}
                    </Text>
                    <Text style={styles.trabajadorCorreo}>
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
 viewTrabajador:{
     flexDirection: 'row',
     margin: 10
 },
 viewTrabajadorImage:{
    marginRight: 15
 }
 ,
 imageTrabajador:{
     width: 90,
     height: 90

 },
 trabajadorTitle:{
     fontWeight: 'bold'
 },
 trabajadorPuesto:{
     paddingTop: 2,
     color: 'gray'
 },
 trabajadorTelefono:{
    paddingTop: 2,
    color: 'gray'
},
 trabajadorCorreo:{
     paddingTop: 2,
     color: 'gray'     
 }
})