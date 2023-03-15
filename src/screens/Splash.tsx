/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React from 'react'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'
import { StatusBar } from 'react-native'
import { View } from 'react-native'

interface Props {
    navigation: any;
}

const Splash: React.FC<Props> = ({navigation}) => {

    setTimeout(()=>{
        navigation.navigate('Login')
    },2000)

    return (
        <View style={styles.main_container}>
            <StatusBar barStyle="dark-content" hidden={false}/>
            <Image source={require('../img/White_logo.jpg')} style={styles.logo}/>
            <Text style={styles.title}>Nizi</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    main_container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    logo:{
        width: 100,
        height: 100,
    },

    title:{
        fontFamily: 'DMSans-Medium',
        fontSize:40,
        textAlign: 'center',
        color: '#000000',
        marginTop: 25,
    },

})

export default Splash
