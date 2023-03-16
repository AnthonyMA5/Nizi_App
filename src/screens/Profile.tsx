/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable semi */
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props {
    navigation: DrawerNavigationProp<any, any>
}

const Profile: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container}>
        <View style={styles.container}>


          <View style={styles.head}>
            <View style={styles.menu_container}>
              <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                <Image style={styles.iconMenu} source={require('../img/menu_barra.png')}/>
              </TouchableOpacity>
            </View>

            <View style={styles.title_container}>
              <Text style={styles.section_title}>Mi Perfil</Text>
            </View>
          </View>


          <View style={styles.second_container}>
            <View style={styles.photo_container}>
              <Image style={styles.photo_profile} source={require('../img/D&D.jpg')} />
            </View>

            <View style={styles.full_name_container}>
              <Text style={styles.text_fullname}>Anthony Martinez</Text>
              <Text style={styles.text_date}>Miembro desde 15/03/2023</Text>
            </View>

            <View style={styles.icon_container}>
              <TouchableOpacity onPressOut={()=>navigation.navigate('Profile_Info')}>
                <Image style={styles.icon} source={require('../img/Editar.png')} />
              </TouchableOpacity>
            </View>
          </View>


          <Text style={styles.text_divider}>Datos personales</Text>

          <TouchableOpacity>
            <View style={styles.button_container}>
              <View style={styles.icon_button_container}>
                <Image style={styles.icon_button} source={require('../img/Domicilio.png')} />
              </View>
              <View style={styles.text_button_container}>
                <Text style={styles.text_button}>Domicilio</Text>
              </View>
              <View style={styles.go_button_container}>
                <TouchableOpacity>
                  <Image style={styles.go_button} source={require('../img/next_simple.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.button_container}>
              <View style={styles.icon_button_container}>
                <Image style={styles.icon_button} source={require('../img/Key.png')} />
              </View>
              <View style={styles.text_button_container}>
                <Text style={styles.text_button}>Cambiar contraseña</Text>
              </View>
              <View style={styles.go_button_container}>
                <TouchableOpacity>
                  <Image style={styles.go_button} source={require('../img/next_simple.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.button_container}>
              <View style={styles.icon_button_container}>
                <Image style={styles.icon_button} source={require('../img/huella.png')} />
              </View>
              <View style={styles.text_button_container}>
                <Text style={styles.text_button}>Huella dactilar</Text>
              </View>
              <View style={styles.go_button_container}>
                <TouchableOpacity>
                  <Image style={styles.go_button} source={require('../img/next_simple.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <Text style={styles.text_divider}>Mi cuenta</Text>

          <TouchableOpacity>
            <View style={styles.button_container}>
              <View style={styles.icon_button_container}>
                <Image style={styles.icon_button} source={require('../img/Door.png')} />
              </View>
              <View style={styles.text_button_container}>
                <Text style={styles.text_button_sign_out}>Cerrar sesión</Text>
              </View>
              <View style={styles.go_button_container}>
                <TouchableOpacity>
                  <Image style={styles.go_button} source={require('../img/next_simple.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.button_container}>
              <View style={styles.icon_button_container}>
                <Image style={styles.icon_button} source={require('../img/advertencia.png')} />
              </View>
              <View style={styles.text_button_container}>
                <Text style={styles.text_button_delete_account}>Eliminar cuenta</Text>
              </View>
              <View style={styles.go_button_container}>
                <TouchableOpacity>
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

  second_container:{
    marginTop: 35,
    flexDirection: 'row',
  },

  photo_container:{
    flex: 0.3,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },

  photo_profile:{
    width: 78,
    height: 78,
    borderRadius: 100,
  },

  full_name_container:{
    flex: 0.6,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 5,
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
    marginTop:35,
  },

  button_container:{
    flexDirection: 'row',
    marginTop:15,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 12,
    padding: 7,
  },

  icon_button_container:{
    flex: 0.2,
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginStart: 12,
    marginTop: 2,
    marginBottom: 2,
  },

  icon_button:{
    width: 40,
    height: 40,
  },

  text_button_container:{
    flex: 0.6,
    alignItems: 'flex-start',
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

})

export default Profile;