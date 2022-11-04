import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Productos from "../screens/Productos/Productos";
import AddProductos from "../screens/Productos/AddProductos";


const Stack = createNativeStackNavigator();

export default function ProductosStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='products'
                component={Productos}
                options={{headerShown: false}}
            />   
            <Stack.Screen
                name='add-productos'
                component={AddProductos}
                options={{title:'Añadir Productos'}}
            />                       
        </Stack.Navigator>
    )
}