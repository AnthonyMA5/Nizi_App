/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable semi */
import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, Pressable } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import Graph from '../components/Graph'

interface Props {
  navigation: DrawerNavigationProp<any, any>
}

const AdminHome: React.FC<Props> = ({navigation}) => {

  return (

    <SafeAreaView style={styles.main_container}>
            <ScrollView style={styles.scroll_container}>
                <View style={styles.container}>

                    {/*Este apartado funciona como la parte superior de la pantalla de inicio*/}
                    <View style={styles.head}>
                        
                        <View style={styles.profilePhoto_container}>
                            <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
                                <Image style={styles.profilePhoto} source={require('../img/coffee_win.jpg')}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.welcomeText_container}>
                            <Text style={styles.welcomeText1}>Coffee Win</Text>
                            <View style={styles.welcomeText2_container}>
                                <Image style={styles.welcomeIcon} source={require('../img/Cara_sonrisa.png')}/>
                                <Text style={styles.welcomeText2}>Buenos días</Text>
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
                        <View style={styles.chart_container}>
                            <Text style={styles.chart_title}>Ganancias de hoy</Text>
                            <Text style={styles.chart_cant}>$ 2000.00</Text>
                            <Graph />
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
    },

    head:{
        flexDirection: 'row',
        marginTop: 35,
    },

    profilePhoto_container:{
        flex: 0.2, 
        alignItems: 'flex-start', 
        flexDirection: 'row',
    },

    profilePhoto:{
        width: 55,
        height: 55,
        borderRadius: 100,
    },

    welcomeText_container:{
        flex: 0.6,
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
        marginLeft: 5,
    },

    menu_maincontainer:{
        flex: 0.2, 
        alignItems: 'flex-start',
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

    chart_container:{
        width: '100%',
        marginTop: 20,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#CCCCCC',
        padding: 15,
    },

    chart_title:{
        fontFamily: 'DMSans-Medium',
        fontSize: 16,
        color: '#262626',
    },

    chart_cant:{
        fontFamily: 'DMSans-Medium',
        fontSize: 16,
        marginTop: 7,
        color: '#3FBFA0',
    },

})

export default AdminHome;