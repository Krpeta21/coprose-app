import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Empresas from "../screens/Empresas/Empresas";
import AddEmpresas from "../screens/Empresas/AddEmpresas";



const Stack = createNativeStackNavigator();

export default function EmpresasStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='empresaC'
                component={Empresas}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name='add-empresas'
                component={AddEmpresas}
                options={{title:'Añadir Empresa'}}
            />                          
        </Stack.Navigator>
    )
}