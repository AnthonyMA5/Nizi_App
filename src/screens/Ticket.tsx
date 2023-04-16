/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavigationProp, RouteProp } from '@react-navigation/native';
import React from 'react';
import { Image, PermissionsAndroid, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Props {
    navigation: NavigationProp<any, any>;
    route: RouteProp<any, any>;
}

const Ticket: React.FC<Props> = ({navigation, route}) => {

    const {userInfo, carritoInfo} = route.params;

    {console.log(userInfo)};
    {console.log(carritoInfo)};

    return (
        <SafeAreaView style={styles.main_container}>
            <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>

                        <Text style={styles.section_title}>Comprobante de compra</Text>

                        <View style={styles.brand_container}>
                            <View style={styles.brand_icon}>
                                <Image style={styles.logo_icon} source={require('../img/White_t_logo.png')}/>
                            </View>

                            <View style={styles.brand_name}>
                                <Text style={styles.text_brand}>Nizi</Text>
                            </View>
                        </View>

                        <View style={styles.data_container}>
                            <View style={styles.left_container}>
                                <Text style={styles.title_text}>Número de pedido:</Text>
                            </View>

                            <View style={styles.right_container}>
                                <Text style={styles.content_text}>#90886471</Text>
                            </View>
                        </View>

                        <View style={styles.data_container}>
                            <View style={styles.left_container}>
                                <Text style={styles.title_text}>Fecha:</Text>
                            </View>

                            <View style={styles.right_container}>
                                <Text style={styles.content_text}>20/03/2023</Text>
                            </View>
                        </View>

                        <View style={styles.data_container}>
                            <View style={styles.left_container}>
                                <Text style={styles.title_text}>Entregar a:</Text>
                            </View>

                            <View style={styles.right_container}>
                                <Text style={styles.content_text}>Anthony Martinez Arellano</Text>
                            </View>
                        </View>

                        <View style={styles.data_container}>
                            <View style={styles.left_container}>
                                <Text style={styles.title_text}>En:</Text>
                            </View>

                            <View style={styles.right_container}>
                                <Text style={styles.content_text}>Coffee Win</Text>
                            </View>
                        </View>

                        <View style={styles.divider}/>

                        <View style={styles.columns_container}>

                            <View style={styles.column_number}>
                                <Text style={styles.table_title}>#</Text>
                            </View>

                            <View style={styles.column_product}>
                                <Text style={styles.table_title}>Prod</Text>
                            </View>

                            <View style={styles.column}>
                                <Text style={styles.table_title}>Cant</Text>
                            </View>

                            <View style={styles.column}>
                                <Text style={styles.table_title}>Precio</Text>
                            </View>

                            <View style={styles.column}>
                                <Text style={styles.table_title}>Total</Text>
                            </View>

                        </View>

                        <View style={styles.rows_container}>

                            <View style={styles.row_number}>
                                <Text style={styles.table_subtitle}>5</Text>
                            </View>

                            <View style={styles.row_product}>
                                <Text style={styles.table_subtitle}>Ensalada de pollo con vegetales</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.table_subtitle}>1</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.table_subtitle}>85.00</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.table_subtitle}>85.00</Text>
                            </View>

                        </View>

                        <View style={styles.rows_container}>

                            <View style={styles.row_number}>
                                <Text style={styles.table_subtitle}>12</Text>
                            </View>

                            <View style={styles.row_product}>
                                <Text style={styles.table_subtitle}>Papas fritas</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.table_subtitle}>2</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.table_subtitle}>25.00</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.table_subtitle}>50.00</Text>
                            </View>

                        </View>

                        <View style={styles.divider}/>

                        <View style={styles.data_container}>
                            <View style={styles.left_container}>
                                <Text style={styles.title_text}>Total:</Text>
                            </View>

                            <View style={styles.right_container}>
                                <Text style={styles.content_text}>$135.00</Text>
                            </View>
                        </View>

                        <View style={styles.divider}/>

                        <View style={styles.data_container}>
                            <View style={styles.left_container}>
                                <Text style={styles.title_text}>Pago con tarjeta:</Text>
                            </View>

                            <View style={styles.right_container}>
                                <Text style={styles.content_text}>**** **** **** **89</Text>
                            </View>
                        </View>

                        <View style={styles.data_container}>
                            <View style={styles.left_container}>
                                <Text style={styles.title_text}>Estado del pedido:</Text>
                            </View>

                            <View style={styles.right_container}>
                                <Text style={styles.content_text}>Pagado</Text>
                            </View>
                        </View>

                        <View style={styles.thanks_container}>
                            <Text style={styles.thanks_text}>¡Gracias por utilizar Nizi buen provecho!</Text>
                            <Image source={require('../img/thanks.png')} style={styles.thanks_icon}/>
                        </View>

                        <View style={styles.buttons_container}>

                            <View style={styles.button_background}>
                            <Pressable style={styles.button_content} android_ripple={{ color: 'lightgray' }} onPressOut={()=>navigation.navigate('Menu')}>
                                <Image style={styles.iconButton} source={require('../img/Eliminar_tarjeta.png')}/>
                                <Text style={styles.textButton}>Cerrar{'\n'}ticket</Text>
                            </Pressable>
                            </View>

                            <View style={styles.button_background2}>
                            <Pressable style={styles.button_content} android_ripple={{ color: 'lightgray' }}>
                                <Image style={styles.iconButton} source={require('../img/guardar.png')}/>
                                <Text style={styles.textButton}>Guardar{'\n'}ticket</Text>
                            </Pressable>
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
        marginBottom: 50,
    },

    section_title:{
        fontFamily: 'DMSans-Bold',
        fontSize: 21,
        color: '#000000',
        marginTop: 35,
        textAlign: 'center',
    },

    brand_container:{
        flexDirection: 'row',
        marginTop: 45,
        marginBottom: 18,
    },

    brand_icon:{
        alignItems: 'flex-start',
    },

    logo_icon:{
          width: 30,
          height: 30,
    },

    brand_name:{
        flex: 0.9,
        marginLeft: 14,
    },

    text_brand:{
        fontFamily: 'DMSans-Bold',
        fontSize: 21,
        color: '#000000',
    },

    data_container:{
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },

    left_container:{
        flex: 0.5,
        alignItems: 'flex-start',
        flexDirection: 'row',
    },

    title_text:{
        fontFamily: 'DMSans-Bold',
        fontSize: 16,
        color: '#000000',
    },

    right_container:{
        flex: 0.5,
        alignItems: 'flex-end',
    },

    content_text:{
        fontFamily: 'DMSans-Regular',
        fontSize: 16,
        color: '#000000',
        textAlign: 'right',
    },

    divider:{
        borderBottomWidth: 2.2,
        borderBottomColor: '#000',
        borderStyle: 'dotted',
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },

    columns_container:{
        flex: 1,
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 2,
        borderRadius: 10,
        flexDirection: 'row',
    },

    column_number: {
        flex: 0.05,
        marginRight: 5,
    },

    column_product:{
        flex:0.5,
    },

    column:{
        flex:0.15,
        alignItems: 'center',
    },

    rows_container:{
        flex: 1,
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
    },

    row_number: {
        flex: 0.05,
        marginRight: 5,
    },

    row_product:{
        flex:0.5,
    },

    row:{
        flex:0.15,
        alignItems: 'center',
    },


    table_title:{
        fontFamily: 'DMSans-Medium',
        fontSize: 13,
        color: '#000',
    },

    table_subtitle:{
        fontFamily: 'DMSans-Regular',
        fontSize: 13,
        marginTop: 10,
        color: '#333333',
    },

    thanks_container:{
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 20,
        marginBottom: 10,
    },

    thanks_text:{
        fontFamily: 'DMSans-Medium',
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
    },

    thanks_icon:{
        width: 30,
        height: 30,
        alignSelf: 'center',
        marginTop: 3,
    },

    buttons_container:{
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
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
        resizeMode: 'contain',
      },

      textButton:{
        fontFamily: 'DMSans-Medium',
        fontSize: 13,
        color: '#000000',
        textAlign: 'center',
        marginTop: 7,
      },

});

export default Ticket;
function alert(arg0: string, uri: string): any {
    throw new Error('Function not implemented.');
}

