/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable semi */
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { DrawerNavigationProp } from '@react-navigation/drawer'

interface Props {
  navigation: DrawerNavigationProp<any, any>
}

const Moves: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container}>
        <View style={styles.container}>

          {/*Este apartado funciona como la parte superior de la pantalla de notificaciones*/}
          <View style={styles.head}>

            <View style={styles.menu_container}>
              <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                <Image style={styles.iconMenu} source={require('../img/menu_barra.png')}/>
              </TouchableOpacity>
            </View>

            <View style={styles.title_container}>
              <Text style={styles.section_title}>Mi Actividad</Text>
            </View>

          </View>

          {/*Este apartado es enfocado en generar cada recuadro de los mensajes*/}

          <View style={styles.movementContainer}>

            <View style={styles.iconMainMovement_container}>
                <View style={styles.iconMovement_container}>
                    <Image style={styles.iconMovement} source={require('../img/Ingreso.png')}/>
                </View>
            </View>

            <View style={styles.informationMovement_container}>
                <Text style={styles.movementTypeText}>Recarga de Saldo</Text>
                <Text style={styles.dateText}>26 Febrero, 2023</Text>
            </View>

            <View style={styles.detailMovement_container}>
                <Text style={styles.AddmountText}>+ $500.50</Text>
                <Text style={styles.hourText}>00:10 A.M</Text>
            </View>

          </View>

          <View style={styles.movementContainer}>

              <View style={styles.iconMainMovement_container}>
                  <View style={styles.iconMovement_container}>
                      <Image style={styles.iconMovement} source={require('../img/Compra.png')}/>
                  </View>
              </View>

              <View style={styles.informationMovement_container}>
                  <Text style={styles.movementTypeText}>Compra de comida</Text>
                  <Text style={styles.dateText}>25 Febrero, 2023</Text>
              </View>

              <View style={styles.detailMovement_container}>
                  <Text style={styles.RestmountText}>- $200.00</Text>
                  <Text style={styles.hourText}>23:25 P.M</Text>
              </View>

          </View>

          <View style={styles.movementContainer}>

              <View style={styles.iconMainMovement_container}>
                  <View style={styles.iconMovement_container}>
                      <Image style={styles.iconMovement} source={require('../img/Ingreso.png')}/>
                  </View>
              </View>

              <View style={styles.informationMovement_container}>
                  <Text style={styles.movementTypeText}>Recarga de Saldo</Text>
                  <Text style={styles.dateText}>25 Febrero, 2023</Text>
              </View>

              <View style={styles.detailMovement_container}>
                  <Text style={styles.AddmountText}>+ $200.00</Text>
                  <Text style={styles.hourText}>22:43 P.M</Text>
              </View>

          </View>

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
    marginBottom: 20,
  },

  menu_container:{
      flex: 0.1,
      alignItems: 'flex-start',
      flexDirection: 'row',
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

  movementContainer:{
    flex:1,
    width: '100%',
    height: 80,
    backgroundColor: '#F0F4FE',
    marginTop: 20,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },

  iconMainMovement_container:{
      flex: 0.2,
      alignItems: 'flex-start',
      marginRight: 10,
  },

  iconMovement_container:{
      width: 45,
      height: 45,
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      marginLeft: 20,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
  },

  iconMovement:{
      width: 32,
      height: 32,
  },

  informationMovement_container:{
      flex: 0.5,
  },

  movementTypeText:{
      fontFamily: 'DMSans-Medium',
      fontSize: 15,
      color: '#000000',
  },

  dateText:{
      fontFamily: 'DMSans-Medium',
      fontSize: 15,
      color: '#939393',
      marginTop: 4,
  },

  detailMovement_container:{
      flex: 0.3,
      alignItems: 'flex-end',
      marginRight: 20,
  },

  AddmountText:{
      fontFamily: 'DMSans-Medium',
      fontSize: 15,
      color: '#00BE35',
  },

  RestmountText:{
      fontFamily: 'DMSans-Medium',
      fontSize: 15,
      color: '#EA0000',
  },

  hourText:{
      fontFamily: 'DMSans-Medium',
      fontSize: 15,
      color: '#939393',
      marginTop: 4,
  },

})

export default Moves