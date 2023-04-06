/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable semi */
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, Pressable } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { RouteProp } from '@react-navigation/native'

interface Props {
  navigation: any;
  route: RouteProp<any, any>;
}

const Home: React.FC<Props> = ({navigation, route}) => {

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
                                <Image style={styles.profilePhoto} source={require('../img/D&D.jpg')}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.welcomeText_container}>
                            <Text style={styles.welcomeText1}>Hola {nombre}</Text>
                            <View style={styles.welcomeText2_container}>
                                <Text style={styles.welcomeText2}>{greeting}</Text>
                                <Image style={styles.welcomeIcon} source={greetingIcon === 1 ? require('../img/moon_icon.png') : greetingIcon === 2 ? require('../img/sun_icon.png') : require('../img/Cara_sonrisa.png')}/>
                            </View>
                        </View>

                        <View style={styles.notifications_maincontainer}>
                            <View style={styles.notifications_container}>
                                <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                                    <Image style={styles.notifications_icon} source={require('../img/menu_barra.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                    {/*Este apartado funciona como la creación de la vista para la tarjeta virtual desde el inicio*/}
                    <Pressable style={{alignContent: 'center', flex:1, justifyContent: 'center', alignItems: 'center'}} onPressIn={() => navigation.navigate('Card_Request')}>
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
                    {/*Este apartado funciona como la sección de Servicios*/}

                    <View style={styles.sectionContainer}>
                        <Text style={styles.textTitleSection}>Servicios</Text>

                        <View style={styles.services_mainContainer}>
                            
                            <Pressable style={styles.service1} onPress={()=>navigation.navigate('Recharge')}>
                                <View style={styles.servicesContainerGlobal}>
                                    <Image style={styles.iconServices} source={require('../img/Dinero.png')}/>
                                    <Text style={styles.textNameService}>Recargar{'\n'}tarjeta</Text>
                                </View>
                            </Pressable>

                            <Pressable style={styles.service2} onPress={()=>navigation.navigate('Movement')}>
                                <View style={styles.servicesContainerGlobal}>
                                    <Image style={styles.iconServices} source={require('../img/Movimientos.png')}/>
                                    <Text style={styles.textNameService}>Mi{'\n'}actividad</Text>
                                </View>
                            </Pressable>

                            <Pressable style={styles.service3} onPress={()=>navigation.navigate('Card')}>
                                <View style={styles.servicesContainerGlobal}>
                                    <Image style={styles.iconServices} source={require('../img/Tarjeta.png')}/>
                                    <Text style={styles.textNameService}>Mi{'\n'}tarjeta</Text>
                                </View>
                            </Pressable>

                        </View>

                        <View style={styles.services_mainContainer}>
                            
                            <Pressable style={styles.service1} onPress={()=>navigation.navigate('Messagges')}>
                                <View style={styles.servicesContainerGlobal}>
                                    <Image style={styles.iconServices} source={require('../img/Notificaciones.png')}/>
                                    <Text style={styles.textNameService}>Mensajes</Text>
                                </View>
                            </Pressable>

                            <Pressable style={styles.service2} onPress={()=>navigation.navigate('Menu')}>
                                <View style={styles.servicesContainerGlobal}>
                                    <Image style={styles.iconServices} source={require('../img/Menú.png')}/>
                                    <Text style={styles.textNameService}>Menú</Text>
                                </View>
                            </Pressable>

                            <Pressable style={styles.service3} onPress={()=>navigation.navigate('Commerce')}>
                                <View style={styles.servicesContainerGlobal}>
                                    <Image style={styles.iconServices} source={require('../img/Comercios.png')}/>
                                    <Text style={styles.textNameService}>Comercios</Text>
                                </View>
                            </Pressable>

                        </View>

                    </View>

                    {/*Este apartado funciona como la sección de Anuncios*/}

                    <View style={styles.sectionContainer}>
                        <Text style={styles.textTitleSection}>Anuncios</Text>
                        <View style={styles.announcementsContainer}>
                            <ScrollView horizontal={true} style={{flex: 1}}>
                                <Image source={require('../img/anuncio1.jpeg')} style={styles.announcement_style}/>
                                <Image source={require('../img/anuncio2.jpg')} style={styles.announcement_style}/>
                                <Image source={require('../img/anuncio3.jpg')} style={styles.announcement_style}/>
                            </ScrollView>
                        </View>
                    </View>
                    
                    <View style={[styles.sectionContainer, {marginBottom: 30}]}>

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
                                    <Image style={styles.iconMovement} source={require('../img/Ingreso.png')}/>
                                </View>
                            </View>

                            <View style={styles.informationMovement_container}>
                                <Text style={styles.movementTypeText}>Recarga de Saldo</Text>
                                <Text style={styles.dateText}>26 Febrero, 2023</Text>
                            </View>

                            <View style={styles.detailMovement_container}>
                                <Text style={styles.AddmountText}>+ $500.50</Text>
                                <Text style={styles.hourText}>00:10 A.M</Text>
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
        backgroundColor: '#ECFCFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    notifications_icon:{
        width: 32,
        height: 32,
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

    service1:{
        flex: 0.33, 
        alignItems: 'flex-start', 
        flexDirection: 'row',
        marginRight: 20,
    },

    service2:{
        flex: 0.33,
        marginRight: 20,
    },

    service3:{
        flex: 0.33, 
        alignItems: 'flex-end',
    },

    servicesContainerGlobal:{
        width: '100%',
        height: 120,
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    iconServices:{
        width: 38, 
        height: 38,
    },

    textNameService:{
        fontFamily: 'DMSans-Medium',
        fontSize: 14,
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

})

export default Home;