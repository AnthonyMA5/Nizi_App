/* eslint-disable prettier/prettier */
import { NavigationProp, RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import CustomModal from '../components/CustomModal';

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const Profile_Password: React.FC<Props> = ({navigation, route}) => {

  const { userID } = route.params;

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inLoop, setInLoop] = useState(false);

  const [functionData, setFunctionData] = useState({
    title: '',
    info: '',
    color: '',
    icon: null,
    btn: '',
  });

  const handleInputs = () => {
    setFunctionData({
      title: '¡Ups!',
      info: 'Algunos campos se encuentran vacíos, por favor completalos.',
      color: '#80D5FF',
      icon: require('../animations/warning_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(true);
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

  const handleFindByPassword = () => {
    setFunctionData({
      title: 'Error al cambiar tu contraseña',
      info: 'La contraseña que ingresaste en "Contraseña actual" es incorrecta.',
      color: '#C71D1D',
      icon: require('../animations/error_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(false);
    setIsModalVisible(true);
  };

  const handlePassword = () => {
    setFunctionData({
      title: 'Tus contraeñas no coinciden',
      info: 'Tu nueva contraseña y la confirmación de la misma no coinciden.',
      color: '#C71D1D',
      icon: require('../animations/error_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(false);
    setIsModalVisible(true);
  };

  const handleInvalidPassword = () => {
    setFunctionData({
      title: '¡Ups!',
      info: 'La nueva contraseña debe tener como mínimo 8 caracteres.',
      color: '#80D5FF',
      icon: require('../animations/warning_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(true);
    setIsModalVisible(true);
  };

  const handleData = () => {
    setFunctionData({
      title: 'Contraseña actualizada',
      info: 'La próxima vez que inicies sesión recuerda utilizar tu nueva contraseña.',
      color: '#00D4A1',
      icon: require('../animations/success_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(false);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
  if (functionData.title === 'Contraseña actualizada') {
    navigation.navigate('Profile', {userID:userID});
    setIsModalVisible(false);
  } else {
    setIsModalVisible(false);
  }
  };

  const handleUpdatePassword = () => {
      if ([password, newPassword, confirmPassword].includes('')){
        handleInputs();
      } else if (newPassword !== confirmPassword){
        handlePassword();
      } else if (newPassword.length < 8){
        handleInvalidPassword();
      } else {
        actualizarDatos();
      }
  };

  const actualizarDatos = () => {

    const documentLog = JSON.stringify({
      _id: userID,
      password: password,
      newPassword: newPassword,
    });
    console.log('Datos enviados al servidor:', documentLog);
    fetch('http://192.168.95.220:3000/update_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: documentLog,
    })
    .then((response) => {
      if (response.status === 400) {
        handleFindByPassword();
      } else if (response.status === 201) {
        handleData();
      } else if (response.status === 500) {
        handleServerError();
      }
    })
    .catch((error) => {
      console.log(error);
      handleServerError();
    });
  };

  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>


          <View style={styles.head}>
              <View style={styles.menu_container}>
                <TouchableOpacity onPressOut={() => navigation.navigate('Profile', {userID:userID})}>
                  <Image style={styles.iconMenu} source={require('../img/back_black_icon.png')}/>
                </TouchableOpacity>
              </View>

              <View style={styles.title_container}>
                <Text style={styles.section_title}>Cambiar contraseña</Text>
              </View>
          </View>


          <View style={styles.icon_password_container}>
            <Image style={styles.icon_password} source={require('../img/Key.png')} />
          </View>


          <View style={styles.information_main_container}>

            <View style={styles.information_container}>
              <Text style={styles.label}>Contraseña actual</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} placeholder="Ingresa tu contraseña actual" placeholderTextColor="#878787"
                value={password} onChangeText={setPassword}/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Nueva contraseña</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} placeholder="Ingresa tu nueva contraseña" placeholderTextColor="#878787"
                value={newPassword} onChangeText={setNewPassword}/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Confirmar mi nueva contraseña</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} placeholder="Repite tu nueva contraseña" placeholderTextColor="#878787"
                value={confirmPassword} onChangeText={setConfirmPassword}/>
              </View>
            </View>

          </View>


          <View style={styles.button_container}>
            <Pressable style={styles.button} onPress={handleUpdatePassword}
                       android_ripple={{ color: 'lightgray' }}>
                        <CustomModal
                                title={functionData.title}
                                info={functionData.info}
                                color={functionData.color}
                                icon={functionData.icon}
                                isVisible={isModalVisible}
                                onEvent={handleModalClose}
                                btn={functionData.btn}
                                loop={inLoop}/>
              <Text style={styles.text_button}>Actualizar contraseña</Text>
            </Pressable>
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

    icon_password_container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    icon_password:{
        width: 110,
        height: 110,
        position: 'relative',
    },

    icon_photo:{
        width: 40,
        height: 40,
        position: 'absolute',
        bottom: 6,
        left: 22,
    },

    information_main_container:{
        flex: 1,
        marginTop: 10,
    },

    information_container:{
      marginTop: 30,
    },

    label: {
      fontSize: 16,
      fontFamily: 'DMSans-Medium',
      color: '#000',
    },

    sectionStyle: {
        padding: 3,
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000000',
        marginTop: 10,
    },

    input: {
        fontFamily: 'DMSans-Medium',
        color: '#000',
        fontSize: 15,
        marginLeft: 15,
    },

    button_container:{
      flex: 1,
      marginTop: 30,
      marginBottom: 50,
    },

    button:{
      backgroundColor:'#0500EB',
      padding: 18,
      marginTop: 20,
      borderRadius: 12,
    },

    text_button:{
      fontFamily: 'DMSans-Bold',
      fontSize: 16,
      color: '#FFFFFF',
      textAlign: 'center',
    },

});

export default Profile_Password;
