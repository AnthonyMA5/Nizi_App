/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable semi */
import { View, Text } from 'react-native'
import React from 'react'
import { DrawerNavigationProp } from '@react-navigation/drawer'

interface Props {
    navigation: DrawerNavigationProp<any, any>
}

const Recharge: React.FC<Props> = ({navigation}) => {
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Text style={{color: '#000', fontFamily:'DMSans-Medium', fontSize:26}}>Vista de recarga de la tarjeta</Text>
    </View>
  )
}

export default Recharge;