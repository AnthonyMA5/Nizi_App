/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eol-last */
/* eslint-disable semi */
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { ScrollView } from 'react-native'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native'

interface Props {
    navigation: DrawerNavigationProp<any, any>
}

const Menu: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container}>
        <View style={styles.container}>


          <View style={styles.header_container}>

            <View style={styles.left_container}>
              <TouchableOpacity>
                <Image style={styles.back_icon} source={require('../img/back.png')} />
              </TouchableOpacity>
            </View>

            <View style={styles.center_container}>

              <View style={styles.search_container}>
                <View style={styles.search_icon_container}>
                  <TouchableOpacity>
                    <Image style={styles.back_icon} source={require('../img/lupa.png')} />
                  </TouchableOpacity>
                </View>
                <View style={styles.search_input}>
                  <TextInput style={styles.input} placeholder= "Buscar..." placeholderTextColor={'#878787'} />
                </View>
              </View>

            </View>

            <View style={styles.right_container}>
              <TouchableOpacity>
                <Image style={styles.cart_icon} source={require('../img/carrito.png')} />
              </TouchableOpacity>
            </View>

          </View>

          <Text style={styles.title}>Menú digital</Text>
          <Text style={styles.subtitle}>Platillos de la semana</Text>

          


        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  main_container:{
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#FFFFFF',
  },

  scroll_container:{
    flex: 1,
    width:'100%',
  },

  container:{
    flex: 1,
    justifyContent: 'center',
    marginLeft: 35,
    marginRight: 35,
    backgroundColor: '#FFFFFF',
  },

  header_container:{
    flexDirection: 'row',
    marginTop: 35,
  },

  left_container:{
    flex: 0.2,
    alignItems: 'center',
    flexDirection: 'row',
  },

  back_icon:{
    width: 30,
    height: 30,
  },

  center_container:{
    flex: 0.8,
    alignItems: 'center',
    flexDirection: 'row',
  },

  search_container:{
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 50,
  },

  search_icon_container:{
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  search_input:{
    flex: 0.8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
  },

  input: {
    flex: 1,
    width: '100%',
    height: 40,
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
    color: '#000000',
  },

  right_container:{
    flex: 0.2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  cart_icon:{
    width: 32,
    height: 32,
  },

  title:{
    fontFamily: 'DMSans-Bold',
    fontSize: 24,
    color: '#000000',
    marginTop: 35,
  },

  subtitle:{
    fontFamily: 'DMSans-Medium',
    fontSize: 20,
    color: '#000000',
    marginTop: 25,
  },



})

export default Menu;