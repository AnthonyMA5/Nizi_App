/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable semi */
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { DrawerNavigationProp } from '@react-navigation/drawer'

interface Props {
    navigation: DrawerNavigationProp<any, any>
}

const Profile: React.FC<Props> = ({navigation}) => {
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Text style={{color: '#000', fontFamily:'DMSans-Medium', fontSize:26}}>Vista de perfil</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Profile;