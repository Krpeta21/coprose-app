import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import User from "../screens/Users/User"


const Stack = createNativeStackNavigator();

export default function UserStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='users'
                component={User}
                options={{headerShown: false}}
            />                      
        </Stack.Navigator>
    )
}