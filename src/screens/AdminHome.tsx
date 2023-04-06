/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable semi */
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, Pressable } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RouteProp } from '@react-navigation/native'

interface Props {
    navigation: any;
    route: RouteProp<any, any>;
  }

const AdminHome: React.FC<Props> = ({navigation, route}) => {

    const { userInfo } = route.params;
    const { nombre } = userInfo;

    const [greeting, setGreeting] = useState('');
    const [greetingIcon, setGreetingIcon] = useState(0);

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

  return (

    <SafeAreaView style={styles.main_container}>
            <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                    {/*Este apartado funciona como la parte superior de la pantalla de inicio*/}
                    <View style={styles.head}>
                        
                        <View style={styles.profilePhoto_container}>
                            <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
                                <Image style={styles.profilePhoto} source={require('../img/coffee_win.jpg')}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.welcomeText_container}>
                            <Text style={styles.welcomeText1}>{nombre}</Text>
                            <View style={styles.welcomeText2_container}>
                                <Text style={styles.welcomeText2}>{greeting}</Text>
                                <Image style={styles.welcomeIcon} source={greetingIcon === 1 ? require('../img/moon_icon.png') : greetingIcon === 2 ? require('../img/sun_icon.png') : require('../img/Cara_sonrisa.png')}/>
                            </View>
                        </View>

                        <View style={styles.menu_maincontainer}>
                            <View style={styles.menu_container}>
                                <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                                    <Image style={styles.menu_icon} source={require('../img/menu_barra.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                
                    {/*Este apartado funciona como la sección de Servicios*/}

                    <View style={styles.sectionContainer}>

                        <Text style={styles.textTitleSection}>Actividad diaria</Text>
                        <View style={styles.services_mainContainer}>

                            <ScrollView horizontal={true} style={{flex: 1}} showsHorizontalScrollIndicator={false}>
                            
                                <Pressable>
                                    <View style={styles.servicesContainerGreen}>
                                        <Image style={styles.iconServices} source={require('../img/ganancias_icon.png')}/>
                                        <Text style={styles.text_cant}>$ 2000.00</Text>
                                        <Text style={styles.text_name_service}>Ganancias</Text>
                                    </View>
                                </Pressable>

                                <Pressable>
                                    <View style={styles.servicesContainerBlue}>
                                        <Image style={styles.iconServices} source={require('../img/pedidos_icon.png')}/>
                                        <Text style={styles.text_cant}>35</Text>
                                        <Text style={styles.text_name_service}>Pedidos</Text>
                                    </View>
                                </Pressable>

                                <Pressable>
                                    <View style={styles.servicesContainerPink}>
                                        <Image style={styles.iconServices} source={require('../img/soli_icon.png')}/>
                                        <Text style={styles.text_cant}>15</Text>
                                        <Text style={styles.text_name_service}>Solicitudes</Text>
                                    </View>
                                </Pressable>

                                <Pressable>
                                    <View style={styles.servicesContainerOrange}>
                                        <Image style={styles.iconServices} source={require('../img/menu_icon.png')}/>
                                        <Text style={styles.text_cant}>5</Text>
                                        <Text style={styles.text_name_service}>Productos</Text>
                                    </View>
                                </Pressable>

                            </ScrollView>

                        </View>

                    </View>

                    <View style={styles.sectionContainer}>
                        <Text style={styles.textTitleSection}>Ganancias</Text>
                        <View style={styles.second_container}>
                            <Text style={styles.chart_title}>Ganancias de hoy</Text>
                            <Text style={styles.chart_cant}>$ 2000.00</Text>
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
                                    <TouchableOpacity>
                                        <Text style={styles.subtitle2}>Ver más</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.third_container}>
                                <View style={styles.subtitle_container}>
                                    <View style={styles.left}>
                                        <Text style={styles.subtitle1}>Pedido #05</Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={styles.orange_subtitle}>En espera</Text>
                                    </View>
                                </View>
                                <View style={styles.subtitle_container}>
                                    <View style={styles.left}>
                                        <Text style={styles.light_subtitle}>24 Enero, 2023</Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={styles.light_subtitle}>9:00 am</Text>
                                    </View>
                                </View>
                                <View style={styles.divisor} />
                                <Text style={styles.subtitle1}>Cliente</Text>
                                <View style={styles.subtitle_container}>
                                    <View style={styles.left}>
                                        <Text style={styles.light_subtitle}>Anthony Martinez Arellano</Text>
                                    </View>
                                    <View style={styles.right}>
                                        <TouchableOpacity>
                                            <Text style={styles.light_subtitle2}>Ver detalles</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
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
                                    <TouchableOpacity>
                                        <Text style={styles.subtitle2}>Ver más</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.third_container}>
                                <View style={styles.subtitle_container}>
                                    <View style={styles.left}>
                                        <Text style={styles.subtitle1}>Solicitud #05</Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={styles.orange_subtitle}>Sin respuesta</Text>
                                    </View>
                                </View>
                                <View style={styles.subtitle_container}>
                                    <View style={styles.left}>
                                        <Text style={styles.light_subtitle}>24 Enero, 2023</Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={styles.light_subtitle}>9:00 am</Text>
                                    </View>
                                </View>
                                <View style={styles.divisor} />
                                <Text style={styles.subtitle1}>Solicitante</Text>
                                <View style={styles.subtitle_container}>
                                    <View style={styles.left}>
                                        <Text style={styles.light_subtitle}>Anthony Martinez Arellano</Text>
                                    </View>
                                    <View style={styles.right}>
                                        <TouchableOpacity>
                                            <Text style={styles.light_subtitle2}>Ver detalles</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
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
        backgroundColor: '#ECFCFF',
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

})

export default AdminHome;