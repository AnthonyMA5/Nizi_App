/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { format } from 'date-fns';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import CustomModal from '../components/CustomModal';

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const Profile_Address: React.FC<Props> = ({navigation, route}) => {

  const { userID } = route.params;
  const [userInfo, setUserInfo] = useState<any>();

  const fechaCreacion = userInfo && userInfo.fechaCreacion ? new Date(userInfo.fechaCreacion) : null;
  const fechaFormateada = fechaCreacion ? format(fechaCreacion, 'dd/MM/yyyy') : null;

  const [calle, setCalle] = useState(userInfo ? userInfo.calle : '');
  const [numeroExterior, setNumeroExterior] = useState(userInfo ? userInfo.numeroExterior : '');
  const [numeroInterior, setNumeroInterior] = useState(userInfo ? userInfo.numeroInterior : '');
  const [colonia, setColonia] = useState(userInfo ? userInfo.colonia : '');
  const [municipio, setMunicipio] = useState(userInfo ? userInfo.municipio : '');
  const [codigoPostal, setCodigoPostal] = useState(userInfo ? userInfo.codigoPostal : '');
  const [estado, setEstado] = useState(userInfo ? userInfo.estado : '');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inLoop, setInLoop] = useState(false);

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
              setCalle(data.direccion[0].calle);
              setNumeroExterior(data.direccion[0].numeroExterior);
              setNumeroInterior(data.direccion[0].numeroInterior);
              setColonia(data.direccion[0].colonia);
              setMunicipio(data.direccion[0].municipio);
              setCodigoPostal(data.direccion[0].codigoPostal.toString());
              setEstado(data.direccion[0].estado);
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
    if ([calle, numeroExterior, colonia, municipio, codigoPostal, estado].includes('')){
            handleInputs();
        } else {
            actualizarDatos();
        }
  };

  const actualizarDatos = () => {

    const documentLog = JSON.stringify({
      _id: userID,
      calle: calle,
      numeroExterior: numeroExterior,
      numeroInterior: numeroInterior,
      colonia: colonia,
      municipio: municipio,
      codigoPostal: codigoPostal,
      estado: estado,
    });
    console.log('Datos enviados al servidor:', documentLog);
    fetch('http://192.168.0.3:3000/update_address_info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: documentLog,
    })
    .then((response) => {
      if (response.status === 400) {
            handleError();
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
                  <Image style={styles.iconMenu} source={require('../img/back.png')}/>
                </TouchableOpacity>
              </View>

              <View style={styles.title_container}>
                <Text style={styles.section_title}>Editar domicilio</Text>
              </View>
          </View>


          <View style={styles.icon_address_container}>
            <Image style={styles.icon_address} source={require('../img/Domicilio.png')} />
          </View>


          <View style={styles.name_container}>
            <Text style={styles.text_name}>
              {userInfo ? userInfo.nombre : ''} {userInfo ? userInfo.apellido_paterno : ''} {userInfo ? userInfo.apellido_materno : ''}
            </Text>
            <Text style={styles.text_date}>Miembro desde {fechaFormateada}</Text>
          </View>


          <View style={styles.information_main_container}>

            <View style={styles.information_container}>
              <Text style={styles.label}>Calle</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value={calle} onChangeText={setCalle}/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Número Exterior</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value={numeroExterior} onChangeText={setNumeroExterior}/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Número Interior (opcional)</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value={numeroInterior} onChangeText={setNumeroInterior}/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Colonia o Fraccionamiento</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value={colonia} onChangeText={setColonia}/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Ciudad o Municipio</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value={municipio} onChangeText={setMunicipio}/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Código Postal</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value={codigoPostal} onChangeText={setCodigoPostal}/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Estado</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value={estado} onChangeText={setEstado}/>
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
              <Text style={styles.text_button}>Actualizar domicilio</Text>
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

    icon_address_container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    icon_address:{
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

export default Profile_Address;
