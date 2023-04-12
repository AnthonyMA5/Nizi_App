/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable semi */
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, Pressable, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import CustomModal from '../components/CustomModal'
import { format } from 'date-fns'
import { es } from 'date-fns/locale';

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const Home: React.FC<Props> = ({navigation, route}) => {

    const { userID } = route.params;
    const [userInfo, setUserInfo] = useState<any>()
    const [solicitudInfo, setSolicitudInfo] = useState<any>();

    const fechaSolicitud = solicitudInfo && solicitudInfo.fecha ? new Date(solicitudInfo.fecha) : null;
    const horaFormateada = fechaSolicitud ? format(fechaSolicitud, 'h:mm a', {timeZone: 'UTC'}) : null;
    const fechaFormateada = fechaSolicitud ? format(fechaSolicitud, "dd MMMM',' yyyy", { locale: es }) : null;

    const [greeting, setGreeting] = useState('');
    const [greetingIcon, setGreetingIcon] = useState(0);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inLoop, setInLoop] = useState(false);

    const Anuncios = () => {
        const [anuncios, setAnuncios] = useState([
          require('../img/anuncio1.jpeg'),
          require('../img/anuncio2.jpg'),
          require('../img/anuncio3.jpg'),
        ]);
      
        return (
          <View style={styles.sectionContainer}>
            <Text style={styles.textTitleSection}>Anuncios</Text>
            <View style={styles.announcementsContainer}>
              <ScrollView horizontal={true} style={{flex: 1}}>
                {anuncios.map((anuncio, index) => (
                  <Image key={index} source={anuncio} style={styles.announcement_style} />
                ))}
              </ScrollView>
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

    useEffect(() => {
        const date = new Date();
        const hour = date.getHours();

        if (hour >= 19 || hour < 6) {
        setGreeting('Buenas noches');
        setGreetingIcon(1)
        } else if (hour >= 6 && hour < 12) {
        setGreeting('Buenos días');
        setGreetingIcon(2)
        } else {
        setGreeting('Buenas tardes');
        setGreetingIcon(3)
        }
    }, []);

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
                    handleData()
                }
            }})
          })
          .catch((error) => {
            handleData()
            console.log(error)
          })
    }, [])
  
    useEffect(() => {
        const documentLog = JSON.stringify({
            _id : userID._id,
          });
          fetch('http://192.168.0.3:3000/get_solicitud',{
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
                  setSolicitudInfo(data);
                } else {
                    handleData()
                }
            }})
          })
          .catch((error) => {
            handleData()
            console.log(error)
          })
    }, [])
    
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

                    {/*Este apartado funciona como la parte superior de la pantalla de inicio*/}
                    <View style={styles.head}>
                        
                        <View style={styles.profilePhoto_container}>
                            <TouchableOpacity onPress={()=>navigation.navigate('Profile', {userID: userID})}>
                                <Image style={styles.profilePhoto} source={require('../img/D&D.jpg')}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.welcomeText_container}>
                            <Text style={styles.welcomeText1}>Hola {userInfo ? userInfo.nombre : ''}</Text>
                            <View style={styles.welcomeText2_container}>
                                <Text style={styles.welcomeText2}>{greeting}</Text>
                                <Image style={styles.welcomeIcon} source={greetingIcon === 1 ? require('../img/moon_icon.png') : greetingIcon === 2 ? require('../img/sun_icon.png') : require('../img/Cara_sonrisa.png')}/>
                            </View>
                        </View>

                        <View style={styles.notifications_maincontainer}>
                            <View style={styles.notifications_container}>
                                <Pressable onPressOut={()=>navigation.navigate('Login')}>
                                    <Image style={styles.notifications_icon} source={require('../img/Door.png')}/>
                                </Pressable>
                            </View>
                        </View>

                    </View>
                    
                    {/*Este apartado funciona como la creación de la vista para la tarjeta virtual desde el inicio*/}
                    <View style={styles.main_container_card_view}>
                        { solicitudInfo !== undefined ? (
                            <View style={styles.yellow_container}>
                                <View style={styles.subtitle_container}>
                                    <View style={styles.left}>
                                        <Text style={styles.subtitle1}>Solicitud</Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={styles.orange_subtitle}>{solicitudInfo ? solicitudInfo.estado : ''}</Text>
                                    </View>
                                </View>
                                <View style={styles.subtitle_container}>
                                    <View style={styles.left}>
                                        <Text style={styles.light_subtitle}>{fechaFormateada}</Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={styles.light_subtitle}>{horaFormateada}</Text>
                                    </View>
                                </View>
                                <View style={styles.divisor} />
                                <Text style={styles.subtitle1}>Solicitante</Text>
                                <View style={styles.subtitle_container}>
                                    <View>
                                        <Text style={styles.light_subtitle}>{userInfo ? userInfo.nombre : ''} {userInfo ? userInfo.apellido_paterno : ''} {userInfo ? userInfo.apellido_materno : ''}</Text>
                                    </View>
                                </View>
                            </View>
                        ) : userInfo && userInfo.tarjeta && userInfo.tarjeta.length === 0 ? (
                            <Pressable onPressIn={() => navigation.navigate('Card_Request', { userInfo: userInfo })}>
                                <View style={styles.borderRequest}>
                                    <Image style={styles.iconRequest} source={require('../img/add_icon.png')}/>
                                    <Text style={styles.textNameService}>Solicitar tarjeta</Text>
                                </View>
                            </Pressable>
                        ) : (
                            <>
                            <Pressable>
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
                                        <Text style={styles.moneyTextCard}>$500.00</Text>
                                        <Text style={styles.numberTextCard}>**** **** **** **89</Text>
                                    </View>
                                </LinearGradient>
                            </Pressable>
                            </>
                        )}
                    </View>
                    {/*Este apartado funciona como la sección de Servicios*/}

                    <View style={styles.sectionContainer}>

                        <Text style={styles.textTitleSection}>Servicios</Text>
                        <View style={styles.services_mainContainer}>

                            <ScrollView horizontal={true} style={{flex: 1}} showsHorizontalScrollIndicator={false}>

                                <View>
                                    {userInfo && userInfo.tarjeta && userInfo.tarjeta.length === 0 ? (
                                        <TouchableOpacity onPressOut={()=>navigation.navigate('Recharge')} 
                                        disabled={true}>
                                            <View style={styles.servicesContainerGray}>
                                                <Image style={styles.iconServicesDisabled} source={require('../img/Dinero.png')}/>
                                                <Text style={styles.textNameService}>Recargar{'\n'}tarjeta</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity onPressIn={()=>navigation.navigate('Recharge')}>
                                            <View style={styles.servicesContainerGreen}>
                                                <Image style={styles.iconServices} source={require('../img/Dinero.png')}/>
                                                <Text style={styles.textNameService}>Recargar{'\n'}tarjeta</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                <View>
                                    {userInfo && userInfo.tarjeta && userInfo.tarjeta.length === 0 ? (
                                        <TouchableOpacity onPressOut={()=>navigation.navigate('Recharge')} 
                                        disabled={true}>
                                            <View style={styles.servicesContainerGray}>
                                                <Image style={styles.iconServicesDisabled} source={require('../img/Movimientos.png')}/>
                                                <Text style={styles.textNameService}>Mi{'\n'}actividad</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity onPressIn={()=>navigation.navigate('Recharge')}>
                                            <View style={styles.servicesContainerPink}>
                                                <Image style={styles.iconServices} source={require('../img/Movimientos.png')}/>
                                                <Text style={styles.textNameService}>Mi{'\n'}actividad</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                <View>
                                    {userInfo && userInfo.tarjeta && userInfo.tarjeta.length === 0 ? (
                                        <TouchableOpacity onPressOut={()=>navigation.navigate('Recharge')} 
                                        disabled={true}>
                                            <View style={styles.servicesContainerGray}>
                                                <Image style={styles.iconServicesDisabled} source={require('../img/Tarjeta.png')}/>
                                                <Text style={styles.textNameService}>Mi{'\n'}tarjeta</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity>
                                            <View style={styles.servicesContainerSkyBlue}>
                                                <Image style={styles.iconServices} source={require('../img/Tarjeta.png')}/>
                                                <Text style={styles.textNameService}>Mi{'\n'}tarjeta</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                <View>
                                    {userInfo && userInfo.tarjeta && userInfo.tarjeta.length === 0 ? (
                                        <TouchableOpacity onPressOut={()=>navigation.navigate('Recharge')} 
                                        disabled={true}>
                                            <View style={styles.servicesContainerGray}>
                                                <Image style={styles.iconServicesDisabled} source={require('../img/pedidos_icon.png')}/>
                                                <Text style={styles.textNameService}>Mis{'\n'}pedidos</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity>
                                            <View style={styles.servicesContainerBlue}>
                                                <Image style={styles.iconServices} source={require('../img/pedidos_icon.png')}/>
                                                <Text style={styles.textNameService}>Mis{'\n'}pedidos</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                <TouchableOpacity onPress={()=>navigation.navigate('Support', {userID: userID})}>
                                    <View style={styles.servicesContainerPurple}>
                                        <Image style={styles.iconServices} source={require('../img/support_icon.png')}/>
                                        <Text style={styles.textNameService}>Atención{'\n'}al cliente</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPressOut={()=>navigation.navigate('Messagges', {userID : userID})}>
                                    <View style={styles.servicesContainerYellow}>
                                        <Image style={styles.iconServices} source={require('../img/Notificaciones.png')}/>
                                        <Text style={styles.textNameService}>Mis{'\n'}mensajes</Text>
                                    </View>
                                </TouchableOpacity>

                                <View>
                                    {userInfo && userInfo.tarjeta && userInfo.tarjeta.length === 0 ? (
                                        <TouchableOpacity onPressOut={()=>navigation.navigate('Recharge')} 
                                        disabled={true}>
                                            <View style={styles.servicesContainerGray}>
                                                <Image style={styles.iconServicesDisabled} source={require('../img/menu_icon.png')}/>
                                                <Text style={styles.textNameService}>Menú{'\n'}digital</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity>
                                            <View style={styles.servicesContainerProfile}>
                                                <Image style={styles.iconServices} source={require('../img/menu_icon.png')}/>
                                                <Text style={styles.textNameService}>Menú{'\n'}digital</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                <TouchableOpacity onPressOut={()=>navigation.navigate('Profile', {userID: userID})}>
                                    <View style={styles.servicesContainerOrange}>
                                        <Image style={styles.iconServices} source={require('../img/Perfil.png')}/>
                                        <Text style={styles.textNameService}>Mi{'\n'}perfil</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPressOut={()=>navigation.navigate('Commerce', {userID: userID})}>
                                    <View style={styles.servicesContainerRed}>
                                        <Image style={styles.iconServices} source={require('../img/Comercios.png')}/>
                                        <Text style={styles.textNameService}>Comercios{'\n'}disponibles</Text>
                                    </View>
                                </TouchableOpacity>

                            </ScrollView>

                        </View>

                    </View>

                    {/*Este apartado funciona como la sección de Anuncios*/}

                    <Anuncios />
                    
                    <View style={[styles.sectionContainer, {marginBottom: 30}]}>

                        {userInfo && userInfo.tarjeta && userInfo.tarjeta.movimientos ? (
                            <>
                                <View style={styles.movementTitles}>
                                    <View style={styles.movementText1}>
                                        <Text style={styles.textTitleSection}>Actividad Reciente</Text>
                                    </View>
                                    <View style={styles.movementText2}>
                                        <TouchableOpacity>
                                            <Text style={styles.textMoreMovements}>Ver más</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.movementContainer}>

                                    <View style={styles.iconMainMovement_container}>
                                        <View style={styles.iconMovement_container}>
                                            <Image style={styles.iconMovement} source={require('../img/Compra.png')}/>
                                        </View>
                                    </View>

                                    <View style={styles.informationMovement_container}>
                                        <Text style={styles.movementTypeText}>Compra de comida</Text>
                                        <Text style={styles.dateText}>25 Febrero, 2023</Text>
                                    </View>

                                    <View style={styles.detailMovement_container}>
                                        <Text style={styles.RestmountText}>- $200.00</Text>
                                        <Text style={styles.hourText}>23:25 P.M</Text>
                                    </View>

                                </View>

                                <View style={styles.movementContainer}>

                                    <View style={styles.iconMainMovement_container}>
                                        <View style={styles.iconMovement_container}>
                                            <Image style={styles.iconMovement} source={require('../img/Ingreso.png')}/>
                                        </View>
                                    </View>

                                    <View style={styles.informationMovement_container}>
                                        <Text style={styles.movementTypeText}>Recarga de Saldo</Text>
                                        <Text style={styles.dateText}>25 Febrero, 2023</Text>
                                    </View>

                                    <View style={styles.detailMovement_container}>
                                        <Text style={styles.AddmountText}>+ $200.00</Text>
                                        <Text style={styles.hourText}>22:43 P.M</Text>
                                    </View>

                                </View>
                            </>
                        ) : (
                            <>
                            </>
                        )}
                        
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

    profilePhoto_container:{
        alignItems: 'flex-start',
    },

    profilePhoto:{
        width: 55,
        height: 55,
        borderRadius: 100,
    },

    welcomeText_container:{
        flex: 0.9,
        alignItems: 'flex-start',
        marginLeft: 12,
    },

    welcomeText1:{
        fontFamily: 'DMSans-Medium',
        fontSize: 18,
        color: '#000000',
        marginBottom:5,
        textAlign: 'left',
    },

    welcomeText2_container:{
        flex: 0.5, 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },

    welcomeIcon:{
        width: 20,
        height: 20,
    },

    welcomeText2:{
        fontFamily: 'DMSans-Medium',
        fontSize: 16,
        color: '#484848',
        marginRight: 5,
    },

    notifications_maincontainer:{
        flex: 0.1, 
        alignItems: 'flex-end',
    },

    notifications_container:{
        width: 55,
        height: 55,
        borderRadius: 8,
        backgroundColor: '#FFECEC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    notifications_icon:{
        width: 32,
        height: 32,
    },

    main_container_card_view:{
        alignContent: 'center',
        flex:1,
        justifyContent: 'center', 
        alignItems: 'center',
    },

    iconRequest:{
        height: 35,
        width: 35,
        marginBottom: 5,
    },

    borderRequest:{
        width: 320,
        height: 165,
        marginTop: 40,
        borderRadius: 12,
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#5237FF',
        borderStyle: 'dotted',
        justifyContent: 'center',
        alignItems: 'center',
    },

    marginCardContainer:{
        flex:1, 
        marginLeft: 20, 
        marginRight: 20, 
        marginTop: 15,
        marginBottom:15,
        justifyContent: 'center',
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
        marginTop: 38,
    },

    numberTextCard:{
        fontFamily: 'DMSans-Medium',
        fontSize: 17,
        color: '#FFFFFF',
        marginTop: 30,
    },

    sectionContainer:{
        marginTop: 30,
    },

    textTitleSection:{
        fontFamily: 'DMSans-Bold',
        fontSize: 18,
        color: '#000000',
    },

    services_mainContainer:{
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
    },

    iconServices:{
        width: 55, 
        height: 55,
    },

    iconServicesDisabled:{
        width: 55, 
        height: 55,
        opacity: 0.35,
    },

    servicesContainerProfile:{
        width: 125,
        height: 170,
        padding: 10,
        borderRadius: 10,
        marginRight: 20,
        backgroundColor: '#FFF9EB',
        justifyContent: 'center',
        alignItems: 'center',
    },

    servicesContainerPurple:{
        width: 125,
        height: 170,
        padding: 10,
        borderRadius: 10,
        marginRight: 20,
        backgroundColor: '#EBEFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    servicesContainerRed:{
        width: 125,
        height: 170,
        padding: 10,
        borderRadius: 10,
        marginRight: 20,
        backgroundColor: '#FFEBEB',
        justifyContent: 'center',
        alignItems: 'center',
    },

    servicesContainerPink:{
        width: 125,
        height: 170,
        padding: 10,
        borderRadius: 10,
        marginRight: 20,
        backgroundColor: '#F8FFEB',
        justifyContent: 'center',
        alignItems: 'center',
    },

    servicesContainerSkyBlue:{
        width: 125,
        height: 170,
        padding: 10,
        borderRadius: 10,
        marginRight: 20,
        backgroundColor: '#EBFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    servicesContainerYellow:{
        width: 125,
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFFEEB',
        borderRadius: 10,
        marginRight: 20,
    },

    servicesContainerGreen:{
        width: 125,
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#E9F9E4',
        borderRadius: 10,
        marginRight: 20,
    },

    servicesContainerGray:{
        width: 125,
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#D4D4D4',
        borderRadius: 10,
        marginRight: 20,
    },

    servicesContainerBlue:{
        width: 125,
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#E2F5FB',
        borderRadius: 10,
        marginRight: 20,
    },

    servicesContainerOrange:{
        width: 125,
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFF6EB',
        borderRadius: 10,
        marginRight: 20,
    },

    textNameService:{
        fontFamily: 'DMSans-Medium',
        fontSize: 15,
        color: '#000000',
        textAlign: 'center',
        marginTop: 5,
    },

    announcementsContainer:{
        marginTop: 20,
    },

    announcement_style:{
        width: 260,
        height: 120,
        borderRadius: 12,
        marginRight: 20,
        resizeMode: 'cover',
    },

    movementTitles:{
        flexDirection: 'row',
        width: '100%',
    },

    movementText1:{
        flex: 0.7,
        alignItems: 'flex-start',
    },

    movementText2:{
        flex: 0.3,
        alignItems: 'flex-end',
    },

    textMoreMovements:{
        fontFamily: 'DMSans-Bold',
        fontSize: 16,
        color: '#0500FF',
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

    yellow_container:{
        flex: 1,
        width: '100%',
        height: 150,
        backgroundColor: '#FEFDF0',
        padding: 15,
        borderRadius: 10,
        marginTop: 25,
    },

    subtitle_container:{
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    left:{
        flex: 0.5,
        alignItems: 'flex-start',
    },
    
    right:{
        flex: 0.5,
        alignItems: 'flex-end',
    },
    
    subtitle1:{
        fontFamily: 'DMSans-Medium',
        fontSize: 16,
        color: '#000000',
        marginBottom: 5,
    },
    
    subtitle2:{
        fontFamily: 'DMSans-Medium',
        fontSize: 16,
        color: '#002DCC',
        marginBottom: 12,
    },
    
    light_subtitle:{
      fontFamily: 'DMSans-Regular',
      fontSize: 14,
      color: '#939393',
    },
    
    light_subtitle2:{
      fontFamily: 'DMSans-Medium',
      fontSize: 14,
      color: '#000',
    },
    
    orange_subtitle:{
      fontFamily: 'DMSans-Medium',
      fontSize: 16,
      color: '#E58009',
      marginBottom: 5,
    },

    divisor:{
        width: '100%',
        height: 15,
    },

})

export default Home;