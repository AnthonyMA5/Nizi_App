/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable semi */
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { NavigationProp, RouteProp } from '@react-navigation/native';
import CustomModal from '../components/CustomModal';

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const Messagges: React.FC<Props> = ({navigation, route}) => {

  const { userID } = route.params;

  const [messagesInfo, setMessagesInfo] = useState<any>();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inLoop, setInLoop] = useState(false);

  useEffect(() => {
    const documentLog = JSON.stringify({
        _id : userID._id,
      });
      fetch('http://192.168.0.3:3000/get_messages',{
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
              setMessagesInfo(data);
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
      <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}>
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

          {/*Este apartado funciona como la parte superior de la pantalla de notificaciones*/}
          <View style={styles.head}>

            <View style={styles.menu_container}>
              <TouchableOpacity onPressOut={()=>navigation.navigate('Home', {userID : userID})}>
                <Image style={styles.iconMenu} source={require('../img/back_black_icon.png')}/>
              </TouchableOpacity>
            </View>

            <View style={styles.title_container}>
              <Text style={styles.section_title}>Mensajes</Text>
            </View>

          </View>

          {/*Este apartado es enfocado en generar cada recuadro de los mensajes*/}

          {messagesInfo === undefined ? (
            <View style={styles.container_noMessages}>
              <Text style={styles.noMessages}>Aún no tienes mensajes</Text>
            </View>
          ) : (
            <View style={styles.message_container}>

              <View style={styles.left}>
                <Image style={styles.icon_msg} source={require('../img/Sonrisa.png')}/>
              </View>

              <View style={styles.right}>
                <Text style={styles.title_msg}>Cuenta creada</Text>
                <Text style={styles.content_msg}>Te damos la más cordial bienvenida a la familia Nizi.</Text>
                <Text style={styles.hour_msg}>Hace 1 hora</Text>
              </View>

            </View>
          )}

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
    marginBottom: 50,
  },

  container_noMessages:{
    flex: 1,
    marginTop: '100%',
    marginBottom: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#FFF',
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

  noMessages:{
    fontFamily: 'DMSans-Medium',
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
  },

  message_container:{
    flexDirection: 'row',
    width: '100%',
    marginTop: 30,
    borderRadius: 12,
    backgroundColor: '#F0FEFA',
  },

  left:{
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },

  icon_msg:{
    width: 42,
    height: 42,
  },

  right:{
    flex: 0.9,
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 10,
  },

  title_msg:{
    fontFamily: 'DMSans-Bold',
    fontSize: 16,
    color: '#000000',
    marginTop: 10,
  },

  content_msg:{
    fontFamily: 'DMSans-Medium',
    fontSize: 13,
    color: '#404040',
    marginTop: 5,
    textAlign: 'justify',
    marginRight: 10,
  },

  hour_msg:{
    fontFamily: 'DMSans-Regular',
    fontSize: 12,
    color: '#939393',
    marginTop: 7,
    textAlign: 'justify',
    marginBottom: 10,
  },

})

export default Messagges