import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Trabajadores from "../screens/Trabajadores/Trabajadores";
import AddTrabajadores from "../screens/Trabajadores/AddTrabajadores";


const Stack = createNativeStackNavigator();

export default function TrabajadoresStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='trabajadoresC'
                component={Trabajadores}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name='add-trabajadores'
                component={AddTrabajadores}
                options={{title:'Añadir Trabajador'}}
            />                      
        </Stack.Navigator>
    )
}