/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

interface Props extends DrawerContentComponentProps{}

const CustomDrawer: React.FC<Props> = (props: Props) => {

  return (
    <View style={styles.main_container}>
      <DrawerContentScrollView contentContainerStyle={styles.main_background} {...props}>
      <View style={styles.background}>
          <View style={styles.left}>
            <Image style={styles.picture} source={require('../img/coffee_win.jpg')}/>
          </View>
          <View style={styles.right}>
            <Text style={styles.name}>Coffee Win</Text>
            <TouchableOpacity>
              <Text style={styles.link}>Ver perfil</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: '#FFF',
  },

  background: {
    padding: 12,
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  left:{
    flex: 0.25,
  },

  right:{
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  picture: {
    height: 50,
    width: 50,
    borderRadius: 40,
  },

  name: {
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
    color: '#000',
  },

  link:{
    fontFamily: 'DMSans-Bold',
    fontSize: 12,
    color: '#6A6A6A',
    marginTop: 5,
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
