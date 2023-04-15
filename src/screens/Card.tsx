/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable semi */
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, RefreshControl } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import CustomModal from '../components/CustomModal';

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const Card: React.FC<Props> = ({navigation, route}) => {

  const { userID } = route.params;
  const [userInfo, setUserInfo] = useState<any>();
  const fechaCreacion = userInfo && userInfo.tarjeta[0].fechaVencimiento ? new Date(userInfo.tarjeta[0].fechaVencimiento) : null;
  const fechaFormateada = fechaCreacion ? format(fechaCreacion, 'dd/MM/yyyy') : null;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inLoop, setInLoop] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
  };

  const [functionData, setFunctionData] = useState({
    title: '',
    info: '',
    color: '',
    icon: null,
    btn: '',
  });

  const handleData = () => {
    if (userInfo.tarjeta[0].estadoTarjeta !== 'Desactivada') {
      setFunctionData({
        title: 'Tu tarjeta ha sido desactivada',
        info: '¡Haz desactivado tu tarjeta!',
        color: '#00D4A1',
        icon: require('../animations/success_icon.json'),
        btn: 'Entendido',
      });
    } else {
      setFunctionData({
        title: 'Tu tarjeta ha sido activada',
        info: '¡Haz activado tu tarjeta, ya puedes realizar compras en los establecimientos participantes!',
        color: '#00D4A1',
        icon: require('../animations/success_icon.json'),
        btn: 'Entendido',
      });
    }
    setInLoop(false);
    setIsModalVisible(true);
  };

  const handleData2 = () => {
      setFunctionData({
        title: 'Tu tarjeta ha sido eliminada',
        info: 'Haz eliminado tu tarjeta, por ende algunos servicios de Nizi no se encontrarán disponibles.',
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

  const handleCloseModal = () => {
      setRefreshing(false);
      setIsModalVisible(false);
  };

  const updateCardState = () => {

    const documentLog = JSON.stringify({
      _id: userInfo ? userInfo._id : '',
      _idTarjeta: userInfo ? userInfo.tarjeta[0]._id : '',
      estadoTarjeta: userInfo ? userInfo.tarjeta[0].estadoTarjeta : '',
    });
    console.log('Datos enviados al servidor:', documentLog);
    fetch('http://192.168.0.3:3000/update_card_state', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: documentLog,
    })
    .then((response) => {
      if (response.status === 200) {
        handleData();
      } else {
        handleServerError();
      }
      onRefresh();
    })
    .catch((error) => {
      console.log(error);
      handleServerError();
    });
  };

  const deleteCard = () => {
    const documentLog = JSON.stringify({
      _id: userInfo ? userInfo._id : '',
    });
    console.log('Datos enviados al servidor:', documentLog);
    fetch('http://192.168.0.3:3000/delete_card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: documentLog,
    })
    .then((response) => {
      if (response.status === 200) {
        handleData2();
      } else {
        handleServerError();
      }
    })
    .catch((error) => {
      console.log(error);
      handleServerError();
    });
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

  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <View style={styles.container}>

          {/*Este apartado funciona como la parte superior de la pantalla de mi tarjeta*/}
          <View style={styles.head}>

            <View style={styles.menu_container}>
              <TouchableOpacity onPressOut={()=>navigation.navigate('Home', {userID:userID})}>
                <Image style={styles.iconMenu} source={require('../img/back_black_icon.png')}/>
              </TouchableOpacity>
            </View>

            <View style={styles.title_container}>
              <Text style={styles.section_title}>Mi Tarjeta</Text>
            </View>

          </View>

          {/*Este apartado funciona como la creación de la vista para la tarjeta virtual*/}

          {userInfo && userInfo.tarjeta && userInfo.tarjeta.length > 0 && userInfo.tarjeta[0].estadoTarjeta === 'Desactivada' ? (
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#BBBBBB', '#DDDDDD', '#EEEEEE']} style={styles.cardView}>
              <View style={styles.marginCardContainer}>
                <View style={styles.headCard}>
                    <View style={styles.containerTextCard}>
                        <Text style={styles.titleCard}>Nizi Card</Text>
                    </View>
                    <View style={styles.containerIconCard}>
                        <Image style={styles.iconCard} source={require('../img/contactless.png')}/>
                    </View>
                </View>
            </View>
            </LinearGradient>
          ) : (
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
            </View>
            </LinearGradient>
          )}

          {/*Este apartado funciona como la creación de los datos de la tarjeta virtual*/}
          <View style={styles.cardInformation_container}>

            <View style={styles.information_container}>
              <Text style={styles.titleInfo}>Nombre del propietario</Text>
              <Text style={styles.textInfo}>
                {userInfo ? userInfo.nombre : ''} {userInfo ? userInfo.apellido_paterno : ''} {userInfo ? userInfo.apellido_materno : ''}
              </Text>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.titleInfo}>Número de tarjeta</Text>
              {userInfo ? userInfo.tarjeta.map(tarjeta => (
                <Text key={tarjeta._id} style={styles.textInfo}>
                  {tarjeta.numeroTarjeta.match(/.{1,4}/g).join(' ')}
                </Text>
              )) : ''}
            </View>

            <View style={styles.information_container}>
              <Text style={styles.titleInfo}>Fecha de vencimiento</Text>
              <Text style={styles.textInfo}>{fechaFormateada}</Text>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.titleInfo}>CVV</Text>
              <Text style={styles.textInfo}>{userInfo ? userInfo.tarjeta[0].cvv : ''}</Text>
            </View>

          </View>

          {/*Este apartado funcina para la creación de los botones */}
          <View style={styles.buttons_container}>

            <View style={styles.button_background}>
              <TouchableOpacity style={styles.button_content} onPress={updateCardState}>
                <CustomModal 
                    title={functionData.title}
                    info={functionData.info}
                    color={functionData.color}
                    icon={functionData.icon}
                    isVisible={isModalVisible}
                    onEvent={handleCloseModal}
                    btn={functionData.btn}
                    loop={inLoop}/>
                <Image style={styles.iconButton} source={userInfo && userInfo.tarjeta[0].estadoTarjeta === 'Desactivada' ? require('../img/complete_icon.png') : require('../img/Desactivar_tarjeta.png')}/>
                <Text style={styles.textButton}>
                  {userInfo && userInfo.tarjeta[0].estadoTarjeta === 'Desactivada' ? 'Activar\ntarjeta' : 'Desactivar\ntarjeta'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.button_background2}>
              <TouchableOpacity style={styles.button_content}>
                <Image style={styles.iconButton} source={require('../img/Eliminar_tarjeta.png')}/>
                <Text style={styles.textButton}>Cancelar{'\n'}tarjeta</Text>
              </TouchableOpacity>
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
      width: 320,
      height: 165,
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