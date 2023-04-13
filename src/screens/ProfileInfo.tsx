/* eslint-disable prettier/prettier */
import { NavigationProp, RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { format } from 'date-fns';
import CustomModal from '../components/CustomModal';

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const Profile_Info: React.FC<Props> = ({navigation, route}) => {

  const { userID } = route.params;
  const [userInfo, setUserInfo] = useState<any>();

  const fechaCreacion = userInfo && userInfo.fechaCreacion ? new Date(userInfo.fechaCreacion) : null;
  const fechaFormateada = fechaCreacion ? format(fechaCreacion, 'dd/MM/yyyy') : null;

  const [nombre, setNombre] = useState(userInfo ? userInfo.nombre : '');
  const [app, setApp] = useState(userInfo ? userInfo.apellido_paterno : '');
  const [apm, setApm] = useState(userInfo ? userInfo.apellido_materno : '');
  const [telefono, setTelefono] = useState(userInfo ? userInfo.telefono : '');
  const [email, setEmail] = useState(userInfo ? userInfo.email : '');
  const [username, setUsername] = useState(userInfo ? userInfo.nombre : '');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inLoop, setInLoop] = useState(false);

  const editable = false;

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
              setNombre(data.nombre);
              setApp(data.apellido_paterno);
              setApm(data.apellido_materno);
              setUsername(data.username);
              setTelefono(data.telefono);
              setEmail(data.email);
            } else {
                handleData();
            }
        }});
      })
      .catch((error) => {
        handleData();
        console.log(error);
      });
  }, [userID._id]);

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

  const handleUsernameError = () => {
    setFunctionData({
      title: 'Nombre de usuario no disponible',
      info: 'El nombre de usuario que ingresaste no se encuentra disponible, por favor ingresa uno diferente.',
      color: '#C71D1D',
      icon: require('../animations/error_icon.json'),
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

  const handleError = () => {
    setFunctionData({
      title: 'No pudimos actualizar tu información',
      info: 'Ocurrió un error al procesar tu solicitud, intentalo de nuevo más tarde.',
      color: '#C71D1D',
      icon: require('../animations/sorry_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(false);
    setIsModalVisible(true);
  };

  const handleData = () => {
    setFunctionData({
      title: 'Información actualizada',
      info: 'La proxima vez que ingreses a tu cuenta verás los cambios reflejados.',
      color: '#00D4A1',
      icon: require('../animations/success_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(false);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
  if (functionData.title === 'Información actualizada') {
    navigation.navigate('Profile', {userID:userID});
    setIsModalVisible(false);
  } else {
    setIsModalVisible(false);
  }
  };

  const handleUpdateInfo = () => {
    if ([nombre, app, apm, telefono, username, email].includes('')){
            handleInputs();
        } else {
            actualizarDatos();
        }
  };

  const actualizarDatos = () => {

    const documentLog = JSON.stringify({
      _id: userID,
      nombre: nombre,
      apellido_paterno: app,
      apellido_materno: apm,
      username: username,
    });
    console.log('Datos enviados al servidor:', documentLog);
    fetch('http://192.168.0.3:3000/update_personal_info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: documentLog,
    })
    .then((response) => {
      if (response.status === 400) {
        response.json().then((data) => {
          if (data.errores) {
            if (data.errores.username) {
              handleUsernameError();
            }
          } else {
            handleError();
          }
        });
      } else if (response.status === 201) {
        handleData();
      } else {
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
                <TouchableOpacity onPressOut={() => navigation.navigate('Profile', {userID: userID})}>
                  <Image style={styles.iconMenu} source={require('../img/back_black_icon.png')}/>
                </TouchableOpacity>
              </View>

              <View style={styles.title_container}>
                <Text style={styles.section_title}>Editar información</Text>
              </View>
          </View>


          <View style={styles.photo_profile_container}>
            <Image style={styles.photo_profile} source={require('../img/D&D.jpg')} />
            <TouchableOpacity>
              <Image style={styles.icon_photo} source={require('../img/camera.png')}/>
            </TouchableOpacity>
          </View>


          <View style={styles.name_container}>
            <Text style={styles.text_name}>
              {userInfo ? userInfo.nombre : ''} {userInfo ? userInfo.apellido_paterno : ''} {userInfo ? userInfo.apellido_materno : ''}
            </Text>
            <Text style={styles.text_date}>Miembro desde {fechaFormateada}</Text>
          </View>


          <View style={styles.information_main_container}>

            <View style={styles.information_container}>
              <Text style={styles.label}>Nombres(s)</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value={nombre} onChangeText={setNombre}/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Apellido Paterno</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value={app} onChangeText={setApp}/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Apellido Materno</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value={apm} onChangeText={setApm}/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Nombre de Usuario</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value={username} onChangeText={setUsername}/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Número Telefónico</Text>
              <View style={[styles.sectionStyle, !editable && styles.sectionDisabledStyle]}>
                <TextInput style={styles.input} value={telefono} onChangeText={setTelefono} editable={editable}/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Correo Electrónico</Text>
              <View style={[styles.sectionStyle, !editable && styles.sectionDisabledStyle]}>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} editable={editable}/>
              </View>
            </View>

          </View>


          <View style={styles.button_container}>
            <Pressable style={styles.button} onPress={handleUpdateInfo}
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
              <Text style={styles.text_button}>Actualizar información</Text>
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

    photo_profile_container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    photo_profile:{
        width: 110,
        height: 110,
        borderRadius: 100,
        position: 'relative',
    },

    icon_photo:{
        width: 40,
        height: 40,
        position: 'absolute',
        bottom: 6,
        left: 22,
    },

    name_container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
    },

    text_name:{
        fontFamily: 'DMSans-Medium',
        fontSize: 18,
        color: '#000000',
    },

    text_date:{
        fontFamily: 'DMSans-Regular',
        fontSize: 14,
        color: '#595959',
        marginTop: 5,
    },

    information_main_container:{
        flex: 1,
    },

    information_container:{
      marginTop: 20,
    },

    label: {
      fontSize: 14,
      fontFamily: 'DMSans-Medium',
      color: '#6C6C6C',
    },

    sectionStyle: {
        justifyContent: 'center',
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: '#000000',
        marginTop: 10,
    },

    sectionDisabledStyle: {
      justifyContent: 'center',
      borderWidth: 0.2,
      borderRadius: 5,
      borderColor: '#000000',
      backgroundColor: '#EFEFEF',
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

export default Profile_Info;
