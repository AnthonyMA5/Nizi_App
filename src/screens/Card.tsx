/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable semi */
import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { DrawerNavigationProp } from '@react-navigation/drawer'

interface Props {
  navigation: DrawerNavigationProp<any, any>
}

const Card: React.FC<Props> = ({navigation}) => {

  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container}>
        <View style={styles.container}>

          {/*Este apartado funciona como la parte superior de la pantalla de mi tarjeta*/}
          <View style={styles.head}>

            <View style={styles.menu_container}>
              <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                <Image style={styles.iconMenu} source={require('../img/menu_barra.png')}/>
              </TouchableOpacity>
            </View>

            <View style={styles.title_container}>
              <Text style={styles.section_title}>Mi Tarjeta</Text>
            </View>

          </View>

          {/*Este apartado funciona como la creación de la vista para la tarjeta virtual*/}

          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#5433FF', '#20BDFF', '#64FFA6']} style={styles.cardView}>
            <View style={styles.marginCardContainer}>
                <View style={styles.headCard}>
                    <View style={styles.containerTextCard}>
                        <Text style={styles.titleCard}>Nizi Card</Text>
                    </View>
                    <View style={styles.containerIconCard}>
                        <Image style={styles.iconCard} source={require('../img/contactless.png')}/>
                    </View>
                </View>
                <Text style={styles.moneyTextCard} />
                <Text style={styles.numberTextCard}>**** **** **** **89</Text>
            </View>
          </LinearGradient>

          {/*Este apartado funciona como la creación de los datos de la tarjeta virtual*/}
          <View style={styles.cardInformation_container}>

            <View style={styles.information_container}>
              <Text style={styles.titleInfo}>Nombre del propietario</Text>
              <Text style={styles.textInfo}>Anthony Martinez Arellano</Text>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.titleInfo}>Número de tarjeta</Text>
              <Text style={styles.textInfo}>9980 7765 1125 7089</Text>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.titleInfo}>Fecha de vencimiento</Text>
              <Text style={styles.textInfo}>28/10/2029</Text>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.titleInfo}>CVV</Text>
              <Text style={styles.textInfo}>862</Text>
            </View>

          </View>

          {/*Este apartado funcina para la creación de los botones */}
          <View style={styles.buttons_container}>

            <View style={styles.button_background}>
              <View style={styles.button_content}>
                <Image style={styles.iconButton} source={require('../img/Desactivar_tarjeta.png')}/>
                <Text style={styles.textButton}>Desactivar{'\n'}tarjeta</Text>
              </View>
            </View>

            <View style={styles.button_background2}>
              <View style={styles.button_content}>
                <Image style={styles.iconButton} source={require('../img/Eliminar_tarjeta.png')}/>
                <Text style={styles.textButton}>Cancelar{'\n'}tarjeta</Text>
              </View>
            </View>

          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  
    marginCardContainer:{
      flex:1,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 15,
      marginBottom:15,
    },
  
    headCard:{
        flexDirection: 'row',
    },
  
    cardView:{
      width: '100%',
      height: 170,
      marginTop: 40,
      borderRadius: 12,
    },
  
    containerTextCard:{
        flex: 0.9,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
  
    titleCard:{
        color: '#FFFFFF',
        fontSize: 17,
        fontFamily: 'DMSans-Medium',
    },
  
    containerIconCard:{
        flex: 0.1,
        alignItems: 'flex-end',
    },
  
    iconCard:{
        width: 18,
        height: 22,
    },
  
    moneyTextCard:{
        textAlign: 'center',
        fontFamily: 'DMSans-Medium',
        fontSize: 22,
        color: '#FFFFFF',
        marginTop: 40,
    },
  
    numberTextCard:{
        fontFamily: 'DMSans-Medium',
        fontSize: 17,
        color: '#FFFFFF',
        marginTop: 30,
    },
  
    cardInformation_container:{
      marginTop:23,
    },
  
    information_container:{
      marginTop: 22,
    },
  
    titleInfo:{
      fontFamily: 'DMSans-Medium',
      fontSize: 17,
      color: '#000000',
    },
  
    textInfo:{
      fontFamily: 'DMSans-Regular',
      fontSize: 16,
      color: '#4E4E4E',
      marginTop: 8,
    },
  
    buttons_container:{
      flexDirection: 'row',
      width: '100%',
      marginTop: 40,
      marginBottom: 50,
    },
  
    button_background:{
      flex: 0.5,
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  
    button_background2:{
      flex: 0.5,
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  
    button_content:{
      width: 100,
      height: 100,
      backgroundColor: '#F2F2F2',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
    },
  
    iconButton:{
      width: 35,
      height: 35,
    },
  
    textButton:{
      fontFamily: 'DMSans-Medium',
      fontSize: 13,
      color: '#000000',
      textAlign: 'center',
      marginTop: 7,
    },
  
  
  })
  
  export default Card;