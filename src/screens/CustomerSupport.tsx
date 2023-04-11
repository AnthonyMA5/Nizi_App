/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable semi */
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationProp, RouteProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const CustomerSupport: React.FC<Props> = ({navigation, route}) => {

  const { userID } = route.params;

  const handleFB = () => {
    Linking.openURL('https://www.facebook.com/profile.php?id=100091813294051&mibextid=ZbWKwL');
  };

  const handleIG = () => {
    Linking.openURL('https://instagram.com/nizi_off_?igshid=ZDdkNTZiNTM=');
  };

  const handleTW = () => {
    Linking.openURL('https://twitter.com/Nizi_Official_?t=ltop2pBIcMtgxEQleUCNJg&s=08');
  };

  const handleWEB = () => {
    Linking.openURL('https://nizi.red-utz.com/');
  };

  const handleEMail = () => {
    Linking.openURL('mailto:nizi.corporation@gmail.com?subject=Atención al Cliente&body=Hola, buen día.');
  };

  const handleTelephone = () => {
    Linking.openURL('tel:3334559076');
  };

  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>


          <View style={styles.head}>
            <View style={styles.menu_container}>
              <TouchableOpacity onPressOut={()=>navigation.navigate('Home', {userID: userID})}>
                <Image style={styles.iconMenu} source={require('../img/back.png')}/>
              </TouchableOpacity>
            </View>

            <View style={styles.title_container}>
              <Text style={styles.section_title}>Atención al Cliente</Text>
            </View>
          </View>

          <Text style={styles.text_info}>
            Si tienes alguna duda o consulta, puedes contactarnos a través de nuestra línea telefónica disponible las 24 horas
            del día, nuestro correo electrónico, nuestra página web o nuestras redes sociales. Estamos comprometidos a brindarte
            la mejor atención y resolver cualquier inquietud que tengas de manera rápida y efectiva.
          </Text>


          <Text style={styles.text_divider}>Redes sociales</Text>

          <TouchableOpacity onPressOut={handleFB}>
            <View style={styles.button_container}>
              <View style={styles.icon_button_container}>
                <Image style={styles.icon_button} source={require('../img/facebook_logo.png')} />
              </View>
              <View style={styles.text_button_container}>
                <Text style={styles.text_button}>Nizi_Official</Text>
              </View>
              <View style={styles.go_button_container}>
                <TouchableOpacity onPressOut={handleFB}>
                  <Image style={styles.go_button} source={require('../img/next_simple.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPressOut={handleIG}>
            <View style={styles.button_container}>
              <View style={styles.icon_button_container}>
                <Image style={styles.icon_button} source={require('../img/instagram_logo.png')} />
              </View>
              <View style={styles.text_button_container}>
                <Text style={styles.text_button}>@Nizi_Off_</Text>
              </View>
              <View style={styles.go_button_container}>
                <TouchableOpacity onPressOut={handleIG}>
                  <Image style={styles.go_button} source={require('../img/next_simple.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPressOut={handleTW}>
            <View style={styles.button_container}>
              <View style={styles.icon_button_container}>
                <Image style={styles.icon_button} source={require('../img/twitter_logo.png')} />
              </View>
              <View style={styles.text_button_container}>
                <Text style={styles.text_button}>@Nizi_Official_</Text>
              </View>
              <View style={styles.go_button_container}>
                <TouchableOpacity onPressOut={handleTW}>
                  <Image style={styles.go_button} source={require('../img/next_simple.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <Text style={styles.text_divider}>Canales de comunicación</Text>

          <TouchableOpacity onPressOut={handleWEB}>
            <View style={styles.button_container}>
              <View style={styles.icon_button_container}>
                <Image style={styles.icon_button} source={require('../img/White_t_logo.png')} />
              </View>
              <View style={styles.text_button_container}>
                <Text style={styles.text_button}>Nizi Website</Text>
              </View>
              <View style={styles.go_button_container}>
                <TouchableOpacity onPressOut={handleWEB}>
                  <Image style={styles.go_button} source={require('../img/next_simple.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPressOut={handleEMail}>
            <View style={styles.button_container}>
              <View style={styles.icon_button_container}>
                <Image style={styles.icon_button} source={require('../img/email_icon.png')} />
              </View>
              <View style={styles.text_button_container}>
                <Text style={styles.text_button}>nizi.corporation@gmail.com</Text>
              </View>
              <View style={styles.go_button_container}>
                <TouchableOpacity onPressOut={handleEMail}>
                  <Image style={styles.go_button} source={require('../img/next_simple.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPressOut={handleTelephone}>
            <View style={styles.button_container}>
              <View style={styles.icon_button_container}>
                <Image style={styles.icon_button} source={require('../img/telephone_icon.png')} />
              </View>
              <View style={styles.text_button_container}>
                <Text style={styles.text_button}>33 3455 9076</Text>
              </View>
              <View style={styles.go_button_container}>
                <TouchableOpacity onPressOut={handleTelephone}>
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
      marginBottom: 50,
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

  second_container:{
    marginTop: 35,
    flexDirection: 'row',
  },

  photo_container:{
    alignItems: 'flex-start',
  },

  photo_profile:{
    width: 78,
    height: 78,
    borderRadius: 100,
  },

  full_name_container:{
    flex: 0.9,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 15,
  },

  text_fullname:{
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    color: '#000000',
    marginBottom:5,
  },

  text_date:{
    fontFamily: 'DMSans-Medium',
    fontSize: 13,
    color: '#595959',
    marginBottom:5,
  },

  icon_container:{
    flex: 0.2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  icon:{
    width: 25,
    height: 25,
  },

  text_divider:{
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    color: '#5C5C5C',
    marginTop:25,
  },

  button_container:{
    flexDirection: 'row',
    marginTop:15,
    marginBottom: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 12,
    padding: 7,
  },

  icon_button_container:{
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginStart: 12,
    marginTop: 2,
    marginBottom: 2,
  },

  icon_button:{
    width: 35,
    height: 35,
  },

  text_button_container:{
    flex: 0.8,
    alignItems: 'flex-start',
    marginLeft: 17,
    justifyContent: 'center',
  },

  text_button:{
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    color: '#000000',
  },

  go_button_container:{
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 5,
  },

  go_button:{
    width: 30,
    height: 30,
  },

  text_button_sign_out:{
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    color: '#006CD0',
  },

  text_button_delete_account:{
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    color: '#D00000',
  },

  text_info:{
    fontFamily: 'DMSans-Regular',
    fontSize: 15,
    color: '#000',
    textAlign: 'justify',
    marginTop: 20,
  },

})

export default CustomerSupport;