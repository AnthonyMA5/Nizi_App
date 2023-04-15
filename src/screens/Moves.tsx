/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable semi */
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { NavigationProp, RouteProp } from '@react-navigation/native';
import CustomModal from '../components/CustomModal';
import { format } from 'date-fns'
import { es } from 'date-fns/locale';

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const Moves: React.FC<Props> = ({navigation, route}) => {

  const { userID } = route.params;

  const [movesInfo, setMovesInfo] = useState<any>();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inLoop, setInLoop] = useState(false);

  useEffect(() => {
    const documentLog = JSON.stringify({
        _id : userID._id,
      });
      fetch('http://192.168.0.3:3000/get_moves',{
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
              setMovesInfo(data);
            } else {
              console.log(data);
              handleData()
            }
        }})
      })
      .catch((error) => {
        handleData()
        console.log(error)
      })
  }, [])

  const renderMessages = ({ item }) => {
    const fechaMovimiento = item && item.fechaMovimiento ? new Date(item.fechaMovimiento) : null;
    const horaFormateadaMovimiento = fechaMovimiento ? format(fechaMovimiento, 'h:mm a', { timeZone: 'UTC' }) : null;
    const fechaFormateadaMovimiento = fechaMovimiento ? format(fechaMovimiento, 'dd MMMM, yyyy', { locale: es }) : null;

    return (
      <View style={styles.movementContainer}>
        <View style={styles.iconMainMovement_container}>
          <View style={styles.iconMovement_container}>
            <Image
              style={styles.iconMovement}
              source={item.tipoMovimiento === true ? require('../img/Dinero.png') : require('../img/Compra.png')}
            />
          </View>
        </View>

        <View style={styles.informationMovement_container}>
          <Text style={styles.movementTypeText}>
            {item.tipoMovimiento === true ? 'Recarga de Saldo' : 'Compra de comida'}
          </Text>
          <Text style={styles.dateText}>{fechaFormateadaMovimiento}</Text>
        </View>

        <View style={styles.detailMovement_container}>
          <Text style={item.tipoMovimiento === true ? styles.AddmountText : styles.RestmountText}>
            {item.tipoMovimiento === true ? '+' : '-'} ${item.monto}
          </Text>
          <Text style={styles.hourText}>{horaFormateadaMovimiento}</Text>
        </View>
      </View>
    );
  };

  const [functionData, setFunctionData] = useState({
    title: '',
    info: '',
    color: '',
    icon: null,
    btn: '',
  });

  const handleData = () => {
    setFunctionData({
      title: 'Ocurrió un error al obtener tu información',
      info: 'Te recomendar reiniciar la aplicación e intentarlo más tarde.',
      color: '#C71D1D',
      icon: require('../animations/sorry_icon.json'),
      btn: 'OK',
    });
    setInLoop(false)
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.main_container}>
        <View style={styles.container}>

          <CustomModal
            title={functionData.title}
            info={functionData.info}
            color={functionData.color}
            icon={functionData.icon}
            isVisible={isModalVisible}
            onEvent={handleCloseModal}
            btn={functionData.btn}
            loop={inLoop}
          />

          {/*Este apartado funciona como la parte superior de la pantalla de notificaciones*/}
          <View style={styles.head}>

            <View style={styles.menu_container}>
              <TouchableOpacity onPressOut={()=>navigation.navigate('Home', {userID : userID})}>
                <Image style={styles.iconMenu} source={require('../img/back_black_icon.png')}/>
              </TouchableOpacity>
            </View>

            <View style={styles.title_container}>
              <Text style={styles.section_title}>Mi Actividad</Text>
            </View>

          </View>

          {/*Este apartado es enfocado en generar cada recuadro de los mensajes*/}

          <View style={styles.scroll_container}>
            {movesInfo === undefined ? (
              <View style={styles.container_noMoves}>
                <Text style={styles.noMoves}>Aún no has hecho movimientos con tu tarjeta</Text>
              </View>
            ) : (
              <FlatList
                data={movesInfo}
                renderItem={renderMessages}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>

        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  main_container:{
    flex: 1,
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
    marginBottom: 20,
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

  movementContainer:{
    flex:1,
    width: '100%',
    height: 80,
    backgroundColor: '#F0F4FE',
    marginTop: 20,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },

  iconMainMovement_container:{
      alignItems: 'flex-start',
      marginRight: 10,
  },

  iconMovement_container:{
      width: 45,
      height: 45,
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      marginLeft: 15,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
  },

  iconMovement:{
      width: 32,
      height: 32,
  },

  informationMovement_container:{
      flex: 0.6,
      alignItems: 'flex-start',
  },

  movementTypeText:{
      fontFamily: 'DMSans-Medium',
      fontSize: 15,
      color: '#000000',
  },

  dateText:{
      fontFamily: 'DMSans-Medium',
      fontSize: 15,
      color: '#939393',
      marginTop: 4,
  },

  detailMovement_container:{
      flex: 0.4,
      alignItems: 'flex-end',
      marginRight: 15,
  },

  AddmountText:{
      fontFamily: 'DMSans-Medium',
      fontSize: 15,
      color: '#00BE35',
  },

  RestmountText:{
      fontFamily: 'DMSans-Medium',
      fontSize: 15,
      color: '#EA0000',
  },

  hourText:{
      fontFamily: 'DMSans-Medium',
      fontSize: 15,
      color: '#939393',
      marginTop: 4,
  },

  container_noMoves:{
    flex: 1,
    marginTop: '100%',
    marginBottom: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#FFF',
  },

  noMoves:{
    fontFamily: 'DMSans-Medium',
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
  },

})

export default Moves