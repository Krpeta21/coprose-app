import React from 'react'
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native'
import { Overlay } from 'react-native-elements'

export default function Loading(props){
    const {isVisible, text} = props
    return(
        <Overlay
            isVisible = {isVisible}
            windowBackgroundColor = 'rgba(0,0,0,0,0.5)'
            overlayBackgroundColor = 'transparent'
            overlayStyle = {styles.overlay}
        >
            <View>
                <ActivityIndicator size='large' color='#F2B61D'/>
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay:{
        height:110,
        width: 150,
        backgroundColor: '#F7F5F2',
        borderColor: '#F2B61D',
        borderWidth: 3,
        borderRadius: 25
    },
    text:{       
       fontWeight:'bold',
       color:'#F2B61D',
       textTransform: 'uppercase',
       marginTop: 10,
       textAlign: 'center'
    }
})