/* eslint-disable prettier/prettier */


/* eslint-disable eol-last */
/* eslint-disable semi */
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { DrawerNavigationProp } from '@react-navigation/drawer'

interface Props {
    navigation: DrawerNavigationProp<any, any>
}

const Recharge: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>


          <View style={styles.head}>

            <View style={styles.menu_container}>
              <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                <Image style={styles.iconMenu} source={require('../img/back.png')}/>
              </TouchableOpacity>
            </View>

            <View style={styles.title_container}>
              <Text style={styles.section_title}>Recargar tarjeta</Text>
            </View>

          </View>


          <Text style={styles.text_info}>
            ¿No cuentas con saldo suficiente? No te preocupes,
            Nizi cuenta con puntos de recarga en establecimientos participantes al igual que recargas utilizando PayPal.
          </Text>

          <TouchableOpacity onPressOut={()=>navigation.navigate('Commerce')}>
            <View style={styles.button_container}>
              <View style={styles.icon_button_container}>
                <Image style={styles.icon_button} source={require('../img/Dinero.png')} />
              </View>
              <View style={styles.text_button_container}>
                <Text style={styles.text_button}>Recarga en establecimiento</Text>
              </View>
              <View style={styles.go_button_container}>
                <TouchableOpacity onPressOut={()=>navigation.navigate('Commerce')}>
                  <Image style={styles.go_button} source={require('../img/next_simple.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPressOut={()=>navigation.navigate('Payment')}>
            <View style={styles.button_container}>
              <View style={styles.icon_button_container}>
                <Image style={styles.icon_button} source={require('../img/paypal.png')} />
              </View>
              <View style={styles.text_button_container}>
                <Text style={styles.text_button}>Recarga con PayPal</Text>
              </View>
              <View style={styles.go_button_container}>
                <TouchableOpacity onPressOut={()=>navigation.navigate('Payment')}>
                  <Image style={styles.go_button} source={require('../img/next_simple.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

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

  head:{
    flexDirection: 'row',
    marginTop: 35,
  },

  menu_container:{
      alignItems: 'flex-start',
  },

  iconMenu:{
      width: 30,
      height: 30,
  },

  title_container:{
      flex: 0.9,
      marginLeft: 14,
  },

  section_title:{
      fontFamily: 'DMSans-Bold',
      fontSize: 21,
      color: '#000000',
  },

  text_info:{
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    color: '#000000',
    textAlign: 'justify',
    marginTop: 40,
  },

  button_container:{
    flexDirection: 'row',
    marginTop:25,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 12,
    padding: 7,
  },

  icon_button_container:{
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginStart: 10,
    marginTop: 2,
    marginBottom: 2,
    marginEnd: 15,
  },

  icon_button:{
    width: 35,
    height: 35,
  },

  text_button_container:{
    flex: 0.9,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  text_button:{
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
    color: '#000000',
  },

  go_button_container:{
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 5,
  },

  go_button:{
    width: 30,
    height: 30,
  },

})

export default Recharge;