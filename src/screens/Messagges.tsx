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

const Messagges: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>

        {/*Este apartado funciona como la parte superior de la pantalla de notificaciones*/}
        <View style={styles.head}>

          <View style={styles.menu_container}>
            <TouchableOpacity onPress={()=>navigation.openDrawer()}>
              <Image style={styles.iconMenu} source={require('../img/menu_barra.png')}/>
            </TouchableOpacity>
          </View>

          <View style={styles.title_container}>
            <Text style={styles.section_title}>Mensajes</Text>
          </View>

        </View>

        {/*Este apartado es enfocado en generar cada recuadro de los mensajes*/}

        <View style={styles.message_container}>

          <View style={styles.left}>
            <Image style={styles.icon_msg} source={require('../img/Seguridad.png')}/>
          </View>

          <View style={styles.right}>
            <Text style={styles.title_msg}>Revisión de seguridad</Text>
            <Text style={styles.content_msg}>Te recomendamos revisar tus datos personales y tu tarjeta para mantener tus compras seguras.</Text>
            <Text style={styles.hour_msg}>Hace 5 minutos</Text>
          </View>

        </View>

        <View style={styles.message_container}>

          <View style={styles.left}>
            <Image style={styles.icon_msg} source={require('../img/Email_recibido.png')}/>
          </View>

          <View style={styles.right}>
            <Text style={styles.title_msg}>Solicitud enviada</Text>
            <Text style={styles.content_msg}>Hemos recibido tu solicitud, pronto tendrás una respuesta.</Text>
            <Text style={styles.hour_msg}>Hace 25 minutos</Text>
          </View>

        </View>

        <View style={styles.message_container}>

          <View style={styles.left}>
            <Image style={styles.icon_msg} source={require('../img/Sonrisa.png')}/>
          </View>

          <View style={styles.right}>
            <Text style={styles.title_msg}>Cuenta creada</Text>
            <Text style={styles.content_msg}>Te damos la más cordial bienvenida a la familia Nizi.</Text>
            <Text style={styles.hour_msg}>Hace 1 hora</Text>
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
    marginBottom: 50,
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

  message_container:{
    flexDirection: 'row',
    width: '100%',
    marginTop: 30,
    borderRadius: 12,
    backgroundColor: '#F0FEFA',
  },

  left:{
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },

  icon_msg:{
    width: 42,
    height: 42,
  },

  right:{
    flex: 0.9,
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 10,
  },

  title_msg:{
    fontFamily: 'DMSans-Bold',
    fontSize: 16,
    color: '#000000',
    marginTop: 10,
  },

  content_msg:{
    fontFamily: 'DMSans-Medium',
    fontSize: 13,
    color: '#404040',
    marginTop: 5,
    textAlign: 'justify',
    marginRight: 10,
  },

  hour_msg:{
    fontFamily: 'DMSans-Regular',
    fontSize: 12,
    color: '#939393',
    marginTop: 7,
    textAlign: 'justify',
    marginBottom: 10,
  },

})

export default Messagges