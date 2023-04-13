/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable semi */
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { format } from 'date-fns';
import DesitionModal from '../components/DesitionModal';

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const Profile: React.FC<Props> = ({navigation, route}) => {

  const { userID } = route.params;
  const [userInfo, setUserInfo] = useState<any>()
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fechaCreacion = userInfo && userInfo.fechaCreacion ? new Date(userInfo.fechaCreacion) : null;
  const fechaFormateada = fechaCreacion ? format(fechaCreacion, 'dd/MM/yyyy') : null;

  const handleCloseModal = () => {
      setIsModalVisible(false);
  };

  const handleLogin = () => {
    navigation.navigate('Login')
  };

  const handleDeleteAccount = () => {
    deleteAccount();
  }

  useEffect(() => {
    const documentLog = JSON.stringify({
        _id : userID._id,
      });
      fetch('http://192.168.0.3:3000/get_data',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: documentLog,
      })
      .then((response) => {
        response.text().then((text) => {
          if (text && text.length > 0) {
            const data = JSON.parse(text);
            if (data) {
              console.log(data);
              setUserInfo(data);
            } else {
                Alert.alert('No pudimos obtener tu información, intenta reiniciar la aplicación o ingresar más tarde.')
            }
        }})
      })
      .catch((error) => {
        Alert.alert('No pudimos obtener tu información, intenta reiniciar la aplicación o ingresar más tarde.')
        console.log(error)
      })
  }, [userID._id])

  const [desitionData, setDesitionData] = useState({
    title: '',
    info: '',
    successColor: '',
    cancelColor: '',
    icon: null,
    successBtn: '',
    cancelBtn: '',
  });


  const handleDesition = () => {
    setDesitionData({
      title: '¿Deseas cerrar tu sesión?',
      info: 'Recuerda que para acceder a tu cuenta deberás iniciar sesión nuevamente.',
      successColor: '#43BFEA',
      cancelColor: '#43BFEA',
      icon: require('../animations/warning_icon.json'),
      successBtn: 'Si, quiero cerrar mi sesión',
      cancelBtn: 'No, mantener mi sesión iniciada',
    });
    setIsModalVisible(true);
  };

  const handleCancelAccount = () => {
    setDesitionData({
      title: '¿Quieres eliminar tu cuenta?',
      info: 'Si eliminas tu cuenta ya no podras acceder más a Nizi y deberás crear una cuenta nueva.',
      successColor: '#EA4343',
      cancelColor: '#00BA87',
      icon: require('../animations/sorry_icon.json'),
      successBtn: 'Si, quiero eliminar mi cuenta',
      cancelBtn: 'No, quiero mantener mi cuenta',
    });
    setIsModalVisible(true);
  };

  const deleteAccount = () => {
    const documentLog = JSON.stringify({
      _id : userID._id,
    });
    fetch('http://192.168.0.3:3000/delete_account',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: documentLog,
    })
    .then((response) => {
      response.text().then((text) => {
        if (text && text.length > 0) {
          const data = JSON.parse(text);
          if (data) {
            console.log(data);
            navigation.navigate('Login');
          } else {
            Alert.alert('No pudimos eliminar tu cuenta, intenta reiniciar la aplicación o intentarlo más tarde.')
          }
      }})
    })
    .catch((error) => {
      Alert.alert('No pudimos eliminar tu cuenta, intenta reiniciar la aplicación o intentarlo más tarde.')
      console.log(error)
    })
  }


  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>

          <View style={styles.head}>
            <View style={styles.menu_container}>
              <TouchableOpacity onPressOut={()=>navigation.navigate('Home', {userID:userID})}>
                <Image style={styles.iconMenu} source={require('../img/back_black_icon.png')}/>
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
              <Text style={styles.text_fullname}>
                {userInfo ? userInfo.nombre : ''} {userInfo ? userInfo.apellido_paterno : ''} {userInfo ? userInfo.apellido_materno : ''}
              </Text>
              <Text style={styles.text_date}>Miembro desde {fechaFormateada}</Text>
            </View>
          </View>


          <Text style={styles.text_divider}>Datos personales</Text>

          <TouchableOpacity onPressOut={()=>navigation.navigate('Profile_Info', {userID:userID})}>
            <View style={styles.button_container}>
              <View style={styles.icon_button_container}>
                <Image style={styles.icon_button} source={require('../img/Editar.png')} />
              </View>
              <View style={styles.text_button_container}>
                <Text style={styles.text_button}>Información personal</Text>
              </View>
              <View style={styles.go_button_container}>
                <TouchableOpacity onPressOut={()=>navigation.navigate('Profile_Info', {userID:userID})}>
                  <Image style={styles.go_button} source={require('../img/next_simple.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPressOut={()=>navigation.navigate('Profile_Address', {userID:userID})}>
            <View style={styles.button_container}>
              <View style={styles.icon_button_container}>
                <Image style={styles.icon_button} source={require('../img/Domicilio.png')} />
              </View>
              <View style={styles.text_button_container}>
                <Text style={styles.text_button}>Domicilio</Text>
              </View>
              <View style={styles.go_button_container}>
                <TouchableOpacity onPressOut={()=>navigation.navigate('Profile_Address', {userID:userID})}>
                  <Image style={styles.go_button} source={require('../img/next_simple.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPressOut={()=>navigation.navigate('Profile_Password', {userID:userID})}>
            <View style={styles.button_container}>
              <View style={styles.icon_button_container}>
                <Image style={styles.icon_button} source={require('../img/Key.png')} />
              </View>
              <View style={styles.text_button_container}>
                <Text style={styles.text_button}>Cambiar contraseña</Text>
              </View>
              <View style={styles.go_button_container}>
                <TouchableOpacity onPressOut={()=>navigation.navigate('Profile_Password', {userID:userID})}>
                  <Image style={styles.go_button} source={require('../img/next_simple.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPressOut={()=>navigation.navigate('Profile_Fingerprint', {userID:userID})}>
            <View style={styles.button_container}>
              <View style={styles.icon_button_container}>
                <Image style={styles.icon_button} source={require('../img/huella.png')} />
              </View>
              <View style={styles.text_button_container}>
                <Text style={styles.text_button}>Huella dactilar</Text>
              </View>
              <View style={styles.go_button_container}>
                <TouchableOpacity onPressOut={()=>navigation.navigate('Profile_Fingerprint', {userID:userID})}>
                  <Image style={styles.go_button} source={require('../img/next_simple.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <Text style={styles.text_divider}>Mi cuenta</Text>

          <TouchableOpacity onPress={handleDesition}>
            <DesitionModal
              title={desitionData.title}
              info={desitionData.info}
              successColor={desitionData.successColor}
              cancelColor={desitionData.cancelColor}
              icon={desitionData.icon}
              successBtn={desitionData.successBtn}
              cancelBtn={desitionData.cancelBtn}
              isVisible={isModalVisible}
              successEvent={handleLogin}
              cancelEvent={handleCloseModal} />
            <View style={styles.button_container}>
              <View style={styles.icon_button_container}>
                <Image style={styles.icon_button} source={require('../img/Door.png')} />
              </View>
              <View style={styles.text_button_container}>
                <Text style={styles.text_button_sign_out}>Cerrar sesión</Text>
              </View>
              <View style={styles.go_button_container}>
                <TouchableOpacity onPress={handleDesition}>
                  <Image style={styles.go_button} source={require('../img/next_simple.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCancelAccount}>
            <DesitionModal
              title={desitionData.title}
              info={desitionData.info}
              successColor={desitionData.successColor}
              cancelColor={desitionData.cancelColor}
              icon={desitionData.icon}
              successBtn={desitionData.successBtn}
              cancelBtn={desitionData.cancelBtn}
              isVisible={isModalVisible}
              successEvent={handleDeleteAccount}
              cancelEvent={handleCloseModal} />
            <View style={styles.button_container}>
              <View style={styles.icon_button_container}>
                <Image style={styles.icon_button} source={require('../img/advertencia.png')} />
              </View>
              <View style={styles.text_button_container}>
                <Text style={styles.text_button_delete_account}>Eliminar cuenta</Text>
              </View>
              <View style={styles.go_button_container}>
                <TouchableOpacity onPress={handleCancelAccount}>
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

})

export default Profile;