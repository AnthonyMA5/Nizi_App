/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable semi */
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, RefreshControl } from 'react-native'
import React, { useEffect, useState  } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { format } from 'date-fns';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import CustomModal from '../components/CustomModal';

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const Profile: React.FC<Props> = ({navigation, route}) => {

  const { userID } = route.params;
  const [userInfo, setUserInfo] = useState<any>();

  const fechaCreacion = userInfo && userInfo.fechaCreacion ? new Date(userInfo.fechaCreacion) : null;
  const fechaFormateada = fechaCreacion ? format(fechaCreacion, 'dd/MM/yyyy') : null;

  const [signOut, setSignOut] = useState(false);
  const [cancelAccount, setCancelAccount] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inLoop, setInLoop] = useState(false);

  const handleModalSignOutCloseAndNavigate = () => {
    setSignOut(false);
    navigation.navigate('Login');
  };

  const handleModalSignOutClose = () => {
    setSignOut(false);
  };

  const handleModalSignOutOpen = () => {
    setSignOut(true);
  };

  const handleCancelAccount = () => {
    setCancelAccount(true);
  };

  const handleCloseCancelAccount = () => {
    setCancelAccount(false);
  };

  const handleCloseModal = () => {
    if (functionData.title === 'Tu cuenta ha sido eliminada'){
      setIsModalVisible(false);
      navigation.navigate('Login');
    } else {
      setIsModalVisible(false);
    }
};

  const [functionData, setFunctionData] = useState({
    title: '',
    info: '',
    color: '',
    icon: null,
    btn: '',
  });

  const handleModalOpen = () => {
    setSignOut(true);
  };

  const handleData = () => {
      setFunctionData({
        title: 'Tu cuenta ha sido eliminada',
        info: 'Lamentamos que hayas eliminado tu cuenta, esperamos tenerte pronto de regreso con nosotros.',
        color: '#00D4A1',
        icon: require('../animations/success_icon.json'),
        btn: 'Entendido',
      });
    setInLoop(false);
    setIsModalVisible(true);
  };

  const handleServerError = () => {
    setFunctionData({
      title: 'Error al comunicarse con el servidor',
      info: 'Ocurrió un error al procesar tu solicitud, intentalo de nuevo más tarde.',
      color: '#C71D1D',
      icon: require('../animations/error_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(false);
    setIsModalVisible(true);
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
  };

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
        }
        setRefreshing(false);
      })
      })
      .catch((error) => {
        Alert.alert('No pudimos obtener tu información, intenta reiniciar la aplicación o ingresar más tarde.')
        console.log(error)
      })
  }, [userID._id, refreshing])

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
            handleData();
          } else {
            handleServerError();
          }
      }})
    })
    .catch((error) => {
      handleServerError();
      console.log(error)
    })
  }


  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <View style={styles.container}>

                  <CustomModal
                    title={functionData.title}
                    info={functionData.info}
                    color={functionData.color}
                    icon={functionData.icon}
                    isVisible={isModalVisible}
                    onEvent={handleCloseModal}
                    btn={functionData.btn}
                    loop={inLoop}/>

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

          <TouchableOpacity onPress={handleModalSignOutOpen}>
            <Modal backdropOpacity={0.6} style={styles.modal_main_container} isVisible={signOut}
                                            animationInTiming={250}
                                            animationOutTiming={600}
                                            backdropTransitionInTiming={250}
                                            backdropTransitionOutTiming={600}>
                                            <View style={styles.modal_container}>
                                            <LottieView source={require('../animations/warning_icon.json')} style={styles.iconLottie}
                                              autoPlay
                                              loop={true}/>
                                              <Text style={styles.title_text}>¿Quieres cerrar tu sesión?</Text>
                                              <Text style={styles.subtitle_text}>Recuerda que deberás volver a iniciar sesión para acceder a tu cuenta.</Text>
                                              <View style={styles.buttons_container}>
                                                <View style={styles.button_left}>
                                                  <TouchableOpacity style={styles.button_reject} onPressOut={handleModalSignOutCloseAndNavigate}>
                                                    <Text style={styles.button_reject_text}>Si, quiero cerrar mi sesión</Text>
                                                  </TouchableOpacity>
                                                </View>
                                                <View style={styles.button_right}>
                                                  <TouchableOpacity style={styles.button_approve} onPress={handleModalSignOutClose}>
                                                    <Text style={styles.button_approve_text}>No, mantener mi sesión iniciada</Text>
                                                  </TouchableOpacity>
                                                </View>
                                              </View>
                                              <View style={styles.divisor} />
                                            </View>
              </Modal>
            <View style={styles.button_container}>
              <View style={styles.icon_button_container}>
                <Image style={styles.icon_button} source={require('../img/Door.png')} />
              </View>
              <View style={styles.text_button_container}>
                <Text style={styles.text_button_sign_out}>Cerrar sesión</Text>
              </View>
              <View style={styles.go_button_container}>
                <TouchableOpacity onPress={handleModalOpen}>
                  <Image style={styles.go_button} source={require('../img/next_simple.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCancelAccount}>
            <Modal backdropOpacity={0.6} style={styles.modal_main_container} isVisible={cancelAccount}
                                            animationInTiming={250}
                                            animationOutTiming={600}
                                            backdropTransitionInTiming={250}
                                            backdropTransitionOutTiming={600}>
                                            <View style={styles.modal_container}>
                                            <LottieView source={require('../animations/warning_icon.json')} style={styles.iconLottie}
                                              autoPlay
                                              loop={true}/>
                                              <Text style={styles.title_text}>¿Quieres eliminar tu cuenta?</Text>
                                              <Text style={styles.subtitle_text}>Recuerda que todos los beneficios, pedidos, tarjeta y saldo ligados a tu cuenta serán eliminados.</Text>
                                              <View style={styles.buttons_container}>
                                                <View style={styles.button_left}>
                                                  <TouchableOpacity style={styles.button_reject} onPressOut={deleteAccount}>
                                                    <Text style={styles.button_reject_text}>Si, quiero eliminar mi cuenta</Text>
                                                  </TouchableOpacity>
                                                </View>
                                                <View style={styles.button_right}>
                                                  <TouchableOpacity style={styles.button_approve} onPress={handleCloseCancelAccount}>
                                                    <Text style={styles.button_approve_text}>No, mantener mi cuenta</Text>
                                                  </TouchableOpacity>
                                                </View>
                                              </View>
                                              <View style={styles.divisor} />
                                            </View>
              </Modal>
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

  modal_main_container:{
    justifyContent: 'center',
    alignItems:'center',
  },

  modal_container:{
      width: '100%',
      padding: 15,
      justifyContent: 'center',
      backgroundColor: '#FFF',
      borderRadius: 12,
  },

  exit_icon:{
    width: 20,
    height: 20,
    marginTop: 5,
    alignSelf: 'flex-end',
  },

  title_text:{
    fontFamily: 'DMSans-Medium',
    color:'#000',
    fontSize: 20,
    marginTop: 15,
    textAlign: 'center',
  },

  subtitle_text:{
    fontFamily: 'DMSans-Regular',
    color:'#424242',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
  },

  button_reject:{
    padding: 11,
    width:'100%',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#C71D1D',
  },

  button_approve:{
    padding: 12,
    width:'100%',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: '#00C999',
  },

  button_reject_text:{
    fontFamily: 'DMSans-Medium',
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
  },

  button_approve_text:{
    fontFamily: 'DMSans-Medium',
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
  },

  buttons_container:{
    flexDirection: 'row',
    alignItems: 'center',
  },

  button_left:{
      flex: 0.5,
      alignItems: 'flex-start',
      marginRight: 10,
  },

  button_right:{
      flex: 0.5,
      alignItems: 'flex-end',
      marginLeft: 10,
  },

  divisor:{
    width: '100%',
    height: 15,
  },

  iconLottie:{
    width: 75,
    height: 75,
    alignSelf: 'center',
},

})

export default Profile;