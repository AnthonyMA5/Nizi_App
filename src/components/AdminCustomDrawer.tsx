/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

interface Props extends DrawerContentComponentProps{}

const CustomDrawer: React.FC<Props> = (props: Props) => {

  return (
    <View style={styles.main_container}>
      <DrawerContentScrollView contentContainerStyle={styles.main_background} {...props}>
        <ImageBackground style={styles.background} source={require('../img/navbackground.png')}>
          <Image style={styles.picture} source={require('../img/coffee_win.jpg')}/>
          <Text style={styles.name}>Coffee Win</Text>
        </ImageBackground>
        <View style={styles.second_container}>
          <DrawerItemList {...props}/>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottom_container}>
        <TouchableOpacity>
          <Pressable style={styles.exit_container}>
            <Image style={styles.exit_icon} source={require('../img/Door.png')} />
            <Text style={styles.exit_text}>Cerrar sesión</Text>
          </Pressable>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  main_container: {
    flex: 1,
  },

  main_background: {
    backgroundColor: '#0162fe',
  },

  background: {
    padding: 20,
  },

  picture: {
    height: 60,
    width: 60,
    borderRadius: 40,
    marginBottom: 10,
  },

  name: {
    fontFamily: 'DMSans-Medium',
    fontSize: 18,
    color: '#FFFFFF',
  },

  second_container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
  },

  bottom_container: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#CCD',
  },

  exit_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  exit_icon: {
    height: 30,
    width: 30,
  },

  exit_text: {
    color: '#C30000',
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
    marginLeft: 5,
  },

})

export default CustomDrawer
