/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable semi */
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, Pressable, TouchableOpacity, RefreshControl } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { RouteProp } from '@react-navigation/native'
import CustomModal from '../components/CustomModal'
import { format } from 'date-fns'
import { es } from 'date-fns/locale';

interface Props {
    navigation: any;
    route: RouteProp<any, any>;
}

const AdminHome: React.FC<Props> = ({navigation, route}) => {

    const { userID } = route.params;
    const [userInfo, setUserInfo] = useState<any>();

    const [solicitudesInfo, setSolicitudesInfo] = useState<any>();
    const [solicitudesTotal, setSolicitudesTotal] = useState<any>();

    const [pedidosInfo, setPedidosInfo] = useState<any>();
    const [pedidosTotal, setPedidosTotal] = useState<any>();

    const [gananciasInfo, setGananciasInfo] = useState<any>();

    const [productosInfo, setProductosInfo] = useState<any>();

    const [greeting, setGreeting] = useState('');
    const [greetingIcon, setGreetingIcon] = useState(0);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inLoop, setInLoop] = useState(false);

    const [refreshing, setRefreshing] = useState(false);

    const handleData = () => {
        setFunctionData({
          title: 'Ocurrió un error al obtener tu información',
          info: 'Te recomendar reiniciar la aplicación e intentarlo de nuevo más tarde.',
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

    const [functionData, setFunctionData] = useState({
        title: '',
        info: '',
        color: '',
        icon: null,
        btn: '',
    });

    const onRefresh = () => {
        setRefreshing(true);
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
            setRefreshing(false);
          })
          .catch((error) => {
            handleData()
            console.log(error)
          })
    }, [refreshing])

    useEffect(() => {
        fetch('http://192.168.0.3:3000/get_solicitudes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setSolicitudesInfo(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [refreshing]);

    useEffect(() => {
        fetch('http://192.168.0.3:3000/count_solicitudes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setSolicitudesTotal(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [refreshing]);

    useEffect(() => {
        fetch('http://192.168.0.3:3000/get_pedidos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setPedidosInfo(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [refreshing]);
    
    useEffect(() => {
        fetch('http://192.168.0.3:3000/count_pedidos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setPedidosTotal(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [refreshing]);

    useEffect(() => {
        fetch('http://192.168.0.3:3000/count_revenue', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setGananciasInfo(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [refreshing]);

    useEffect(() => {
        fetch('http://192.168.0.3:3000/count_productos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setProductosInfo(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [refreshing]);

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

                    {/*Este apartado funciona como la parte superior de la pantalla de inicio*/}
                    <View style={styles.head}>
                        
                        <View style={styles.profilePhoto_container}>
                            <TouchableOpacity disabled={true}>
                                <Image style={styles.profilePhoto} source={require('../img/coffee_win.jpg')}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.welcomeText_container}>
                            <Text style={styles.welcomeText1}>{userInfo ? userInfo.nombre : ''}</Text>
                            <View style={styles.welcomeText2_container}>
                                <Text style={styles.welcomeText2}>{greeting}</Text>
                                <Image style={styles.welcomeIcon} source={greetingIcon === 1 ? require('../img/moon_icon.png') : greetingIcon === 2 ? require('../img/sun_icon.png') : require('../img/Cara_sonrisa.png')}/>
                            </View>
                        </View>

                        <View style={styles.menu_maincontainer}>
                            <View style={styles.menu_container}>
                                <TouchableOpacity onPressOut={()=>navigation.navigate('Login')}>
                                    <Image style={styles.menu_icon} source={require('../img/Door.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                
                    {/*Este apartado funciona como la sección de Servicios*/}

                    <View style={styles.sectionContainer}>

                        <Text style={styles.textTitleSection}>Actividad diaria</Text>
                        <View style={styles.services_mainContainer}>

                            <ScrollView horizontal={true} style={{flex: 1}} showsHorizontalScrollIndicator={false}>
                            
                                <TouchableOpacity onPress={()=>navigation.navigate('Revenues_Admin', {userID:userID, gananciasInfo: gananciasInfo})}>
                                    <View style={styles.servicesContainerGreen}>
                                        <Image style={styles.iconServices} source={require('../img/ganancias_icon.png')}/>
                                        <Text style={styles.text_cant}>$ {gananciasInfo ? gananciasInfo.toFixed(2) : '0.00'}</Text>
                                        <Text style={styles.text_name_service}>Ganancias</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>navigation.navigate('Orders_Admin', {userID:userID})}>
                                    <View style={styles.servicesContainerBlue}>
                                        <Image style={styles.iconServices} source={require('../img/pedidos_icon.png')}/>
                                        <Text style={styles.text_cant}>{pedidosTotal}</Text>
                                        <Text style={styles.text_name_service}>Pedidos</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>navigation.navigate('Requests_Admin', {userID:userID})}>
                                    <View style={styles.servicesContainerPink}>
                                        <Image style={styles.iconServices} source={require('../img/soli_icon.png')}/>
                                        <Text style={styles.text_cant}>{solicitudesTotal}</Text>
                                        <Text style={styles.text_name_service}>Solicitudes</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>navigation.navigate('Menu_Admin', {userID:userID})}>
                                    <View style={styles.servicesContainerOrange}>
                                        <Image style={styles.iconServices} source={require('../img/menu_icon.png')}/>
                                        <Text style={styles.text_cant}>{productosInfo}</Text>
                                        <Text style={styles.text_name_service}>Productos</Text>
                                    </View>
                                </TouchableOpacity>

                            </ScrollView>

                        </View>

                    </View>

                    <View style={styles.sectionContainer}>
                        <Text style={styles.textTitleSection}>Ganancias</Text>
                        <View style={styles.second_container}>
                            <Text style={styles.chart_title}>Ganancias del día</Text>
                            <Text style={styles.chart_cant}>+  $ {gananciasInfo ? gananciasInfo.toFixed(2) : '0.00'}</Text>
                        </View>
                    </View>

                    <View style={styles.sectionContainer}>
                        <Text style={styles.textTitleSection}>Pedidos</Text>
                        <View style={styles.second_container}>
                            <View style={styles.subtitle_container}>
                                <View style={styles.left}>
                                    <Text style={styles.subtitle1}>Más recientes</Text>
                                </View>
                                <View style={styles.right}>
                                    <TouchableOpacity onPress={()=>navigation.navigate('Orders_Admin', {userID:userID})}>
                                        <Text style={styles.subtitle2}>Ver más</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            { pedidosInfo && pedidosInfo.slice(0, 1).map((pedido, index) => {
                                const fechaSolicitud = pedido && pedido.fecha ? new Date(pedido.fecha) : null;
                                const horaFormateada = fechaSolicitud ? format(fechaSolicitud, 'h:mm a', {timeZone: 'UTC'}) : null;
                                const fechaFormateada = fechaSolicitud ? format(fechaSolicitud, "dd 'de' MMMM 'del' yyyy", { locale: es }) : null;
                                return (
                                    <View key={pedido._id} style={styles.third_container}>
                                        <View style={styles.subtitle_container}>
                                            <View style={styles.left}>
                                                <Text style={styles.subtitle1}>Pedido #{pedido._id.slice(0, 6)}</Text>
                                            </View>
                                            <View style={styles.right}>
                                            <Text style={pedido.estado === 'En cocina' ?
                                                styles.orange_subtitle : pedido.estado === 'Entregado' ?
                                                styles.green_subtitle : pedido.estado === 'En espera' ?
                                                styles.red_subtitle : styles.gray_subtitle}>{pedido.estado}</Text>
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
                                        <Text style={styles.subtitle1}>Cliente</Text>
                                        <View style={styles.subtitle_container}>
                                                <View style={styles.left2}>
                                                <Text style={styles.light_subtitle}>
                                                    {pedido.cliente[0].nombre} {pedido.cliente[0].apellido_paterno} {pedido.cliente[0].apellido_materno}
                                                </Text>
                                               </View>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </View>

                    <View style={styles.sectionContainer}>
                        <Text style={styles.textTitleSection}>Solicitudes</Text>
                        <View style={styles.second_container}>
                            <View style={styles.subtitle_container}>
                                <View style={styles.left}>
                                    <Text style={styles.subtitle1}>Más recientes</Text>
                                </View>
                                <View style={styles.right}>
                                    <TouchableOpacity onPress={()=>navigation.navigate('Requests_Admin', {userID:userID})}>
                                        <Text style={styles.subtitle2}>Ver más</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            { solicitudesInfo && solicitudesInfo.slice(0, 1).map((solicitud, index) => {
                                const fechaSolicitud = solicitud && solicitud.fecha ? new Date(solicitud.fecha) : null;
                                const horaFormateada = fechaSolicitud ? format(fechaSolicitud, 'h:mm a', {timeZone: 'UTC'}) : null;
                                const fechaFormateada = fechaSolicitud ? format(fechaSolicitud, "dd 'de' MMMM 'del' yyyy", { locale: es }) : null;
                                return (
                                    <View key={solicitud._id} style={styles.third_container}>
                                        <View style={styles.subtitle_container}>
                                            <View style={styles.left}>
                                                <Text style={styles.subtitle1}>Solicitud #{solicitud._id.slice(0, 6)}</Text>
                                            </View>
                                            <View style={styles.right}>
                                            <Text style={solicitud.estado === 'En espera' ?
                                                styles.orange_subtitle : solicitud.estado === 'Aprobada' ?
                                                styles.green_subtitle : solicitud.estado === 'Rechazada' ?
                                                styles.red_subtitle : styles.gray_subtitle}>{solicitud.estado}</Text>
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
                                                <View style={styles.left2}>
                                                <Text style={styles.light_subtitle}>
                                                {solicitud.solicitante[0].nombre} {solicitud.solicitante[0].apellido_paterno} {solicitud.solicitante[0].apellido_materno}
                                                </Text>
                                               </View>
                                        </View>
                                    </View>
                                )
                            })}
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
        marginLeft: 35,
        marginRight: 35,
        backgroundColor: '#FFFFFF',
        marginBottom: 50,
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

    menu_maincontainer:{
        flex: 0.1, 
        alignItems: 'flex-end',
    },

    menu_container:{
        width: 55,
        height: 55,
        borderRadius: 8,
        backgroundColor: '#FFECEC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    menu_icon:{
        width: 32,
        height: 32,
    },

    sectionContainer:{
        marginTop: 30,
    },

    textTitleSection:{
        fontFamily: 'DMSans-Bold',
        fontSize: 20,
        color: '#000000',
        marginTop: 15,
    },

    services_mainContainer:{
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
    },

    servicesContainerPink:{
        width: 125,
        height: 170,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#FFEBF9',
        borderRadius: 10,
        marginRight: 20,
    },

    servicesContainerGreen:{
        width: 125,
        height: 170,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#E9F9E4',
        borderRadius: 10,
        marginRight: 20,
    },

    servicesContainerBlue:{
        width: 125,
        height: 170,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#E2F5FB',
        borderRadius: 10,
        marginRight: 20,
    },

    servicesContainerOrange:{
        width: 125,
        height: 170,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#FFF7EB',
        borderRadius: 10,
        marginRight: 20,
    },

    iconServices:{
        width: 65, 
        height: 65,
        alignSelf: 'flex-start',
    },

    text_cant:{
        fontFamily: 'DMSans-Bold',
        fontSize: 16,
        color: '#000000',
        marginTop: 10,
    },

    text_name_service:{
        fontFamily: 'DMSans-Medium',
        fontSize: 16,
        color: '#000000',
        marginTop: 3,
    },

    second_container:{
        width: '100%',
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#CCCCCC',
        padding: 15,
    },

    third_container:{
        flex: 1,
        width: '100%',
        backgroundColor: '#F0FAFE',
        padding: 15,
        borderRadius: 10,
    },

    divisor_box:{
        marginTop: 15,
        marginBottom: 15,
    },

    subtitle_container:{
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },

    left:{
        flex: 0.6,
        alignItems: 'flex-start',
    },

    left2:{
        flex: 1,
        alignItems: 'flex-start',
    },

    right:{
        flex: 0.4,
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

    chart_title:{
        fontFamily: 'DMSans-Bold',
        fontSize: 16,
        color: '#000000',
    },

    chart_cant:{
        fontFamily: 'DMSans-Bold',
        fontSize: 16,
        color: '#3FBFA0',
        marginTop: 5,
    },
    
    green_subtitle:{
        fontFamily: 'DMSans-Medium',
        fontSize: 16,
        color: '#00BE35',
        marginBottom: 5,
    },
    
    red_subtitle:{
        fontFamily: 'DMSans-Medium',
        fontSize: 16,
        color: '#E50909',
        marginBottom: 5,
    },
    
    gray_subtitle:{
        fontFamily: 'DMSans-Medium',
        fontSize: 16,
        color: 'gray',
        marginBottom: 5,
    },

})

export default AdminHome;