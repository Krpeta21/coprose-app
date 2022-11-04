import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from 'react-native-elements'


import UserStack from "./UserStack";
import TrabajadoresStack from "./TrabajadoresStack";
import EmpresasStack from "./EmpresasStack";
import ProductosStack from "./ProductosStack";


const Tab = createBottomTabNavigator()

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator
             initialRouteName="Trabajadores"
             barStyle={{ backgroundColor: '#694fad' }}           
             screenOptions={ 
            ({route})  => ({
                     tabBarIcon:({color})=>screenOptions(route,color),
                     tabBarInactiveTintColor: "#19282F",
                     tabBarActiveTintColor: "#F2B61D"                     
             })}
             
            >      
            <Tab.Screen name='trabajadores' 
                    component={TrabajadoresStack}
                    options={{title:"Trabajadores"}}
            />
            <Tab.Screen name='empresas' 
                    component={EmpresasStack}
                    options={{title:"Empresas Afiliadas"}}
            />
            <Tab.Screen name='productos' 
                    component={ProductosStack}
                    options={{title:"Productos"}}
            />                          
            <Tab.Screen name='user' 
                    component={UserStack}
                    options={{title:"Usuario"}}
            />
                
            </Tab.Navigator>
        </NavigationContainer>
    )
}
function screenOptions(route,color){
    let iconName
    switch(route.name){        
        case 'user':
            iconName = 'account-circle'
        break
        case 'trabajadores':
            iconName = 'account-hard-hat'
        break
        case 'empresas':
            iconName = 'domain'
        break
        case 'productos':
            iconName = 'package-variant-closed'
        break
    }
    return(
        <Icon type='material-community' name={iconName} size={22} color={color}/>
    )
}