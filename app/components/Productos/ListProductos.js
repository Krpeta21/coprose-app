import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'
import {size} from 'lodash'
export default function ListProductos({productos, navigation}) {
  return (
    <View>
      <FlatList
        data={productos}
        keyExtractor={(item, index)=> index.toString()}
        renderItem={(producto)=>(
            <Producto producto={producto} navigation={navigation}/>
        )}
      />
    </View>
  )
}
function Producto({producto, navigation}){
    const {id, images,codigo, name, stock, precio} = producto.item
    const imageProducto = images[0]
    return (
        <TouchableOpacity>
            <View style={styles.viewProducto}>
                    <View style={styles.viewProductoImage}>
                    <Image
                        resizeMode='cover'
                        PlaceholderContent={<ActivityIndicator color='#fff'/>}
                        source={{uri: imageProducto}}
                        style={styles.imageProducto}
                    />
                    </View>
                
                <View>
                    <Text style={styles.productoTitle}>
                        {name}
                    </Text>
                    <Text style={styles.productoId}>
                        id: {codigo}
                    </Text>
                    <Text style={styles.productoStock}>
                        Stock: {stock}
                    </Text>
                    <Text style={styles.productoPrecio}>
                        Precio: {
                            size(precio) > 60
                            ? `${precio.substr(0,60)}...`
                            : precio
                        }
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
 viewProducto:{
     flexDirection: 'row',
     margin: 10
 },
 viewProductoImage:{
    marginRight: 15
 }
 ,
 imageProducto:{
     width: 90,
     height: 90

 },
productoTitle:{
     fontWeight: 'bold'
 },
 productoId:{
     paddingTop: 2,
     color: 'gray'
 },
 productoStock:{
    paddingTop: 2,
    color: 'gray'
},
 productoPrecio:{
     paddingTop: 2,
     color: 'gray'     
 }
})