/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavigationProp, RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomModal from '../components/CustomModal';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Props {
    navigation: NavigationProp<any, any>;
    route: RouteProp<any, any>;
}

const Ticket: React.FC<Props> = ({navigation, route}) => {

    const {userID} = route.params;
    const [userInfo, setUserInfo] = useState<any>();
    const [carritoInfo, setCarritoInfo] = useState<any>();

    const fechaSolicitud = carritoInfo && carritoInfo.fecha ? new Date(carritoInfo.fecha) : null;
    const horaFormateada = fechaSolicitud ? format(fechaSolicitud, 'h:mm a', {timeZone: 'UTC'}) : null;
    const fechaFormateada = fechaSolicitud ? format(fechaSolicitud, 'dd/MM/yyyy', { locale: es }) : null;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inLoop, setInLoop] = useState(false);

    const [functionData, setFunctionData] = useState({
        title: '',
        info: '',
        color: '',
        icon: null,
        btn: '',
    });

    const handleData = () => {
        setFunctionData({
          title: 'Ocurrió un error al obtener información de la aplicación',
          info: 'Te recomendar reiniciar la aplicación e intentarlo más tarde.',
          color: '#C71D1D',
          icon: require('../animations/sorry_icon.json'),
          btn: 'OK',
        });
        setInLoop(false);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
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
                    handleData();
                }
            }
        });
          })
          .catch((error) => {
            handleData();
            console.log(error);
          });
    }, [userID._id]);

    useEffect(() => {
        const documentLog = JSON.stringify({
            idUsuario : userID._id,
          });
          fetch('http://192.168.0.3:3000/get_order',{
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
                  setCarritoInfo(data);
                } else {
                    handleData();
                }
            }
        });
          })
          .catch((error) => {
            handleData();
            console.log(error);
          });
    }, [userID._id]);

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
                                <Text style={styles.content_text}>#{carritoInfo && carritoInfo._id ? carritoInfo._id.slice(0, 10) : ''}</Text>
                            </View>
                        </View>

                        <View style={styles.data_container}>
                            <View style={styles.left_container}>
                                <Text style={styles.title_text}>Fecha:</Text>
                            </View>

                            <View style={styles.right_container}>
                                <Text style={styles.content_text}>{fechaFormateada}</Text>
                            </View>
                        </View>

                        <View style={styles.data_container}>
                            <View style={styles.left_container}>
                                <Text style={styles.title_text}>Entregar a:</Text>
                            </View>

                            <View style={styles.right_container}>
                                <Text style={styles.content_text}>
                                    {userInfo ? userInfo.nombre : ''} {userInfo ? userInfo.apellido_paterno : ''} {userInfo ? userInfo.apellido_materno : ''}
                                </Text>
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

                            <View style={styles.column_product}>
                                <Text style={styles.table_title}>Producto</Text>
                            </View>

                            <View style={styles.column_c}>
                                <Text style={styles.table_title}>Cant</Text>
                            </View>

                            <View style={styles.column}>
                                <Text style={styles.table_title}>Precio</Text>
                            </View>

                            <View style={styles.column_total}>
                                <Text style={styles.table_title}>Total</Text>
                            </View>

                        </View>

                        {carritoInfo && carritoInfo.productos && carritoInfo.productos.map((producto) => {
                            return (
                                <View style={styles.rows_container} key={producto._id}>
                                    <View style={styles.row_product}>
                                        <Text style={styles.table_subtitle}>{producto.idProducto.nombre}</Text>
                                    </View>
                                    <View style={styles.row_c}>
                                        <Text style={styles.table_subtitle}>{producto.cantidad}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        {producto.idProducto && producto.idProducto.precio && (
                                            <Text style={styles.table_subtitle}>${producto.idProducto.precio.toFixed(2)}</Text>
                                        )}
                                    </View>
                                    <View style={styles.row_total}>
                                        <Text style={styles.table_subtitle}>
                                            ${producto.idProducto && producto.idProducto.precio
                                            ? (producto.idProducto.precio * producto.cantidad).toFixed(2)
                                            : ''}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}

                        <View style={styles.divider}/>

                        <View style={styles.data_container}>
                            <View style={styles.left_container}>
                                <Text style={styles.title_text}>Total:</Text>
                            </View>

                            <View style={styles.right_container}>
                                <Text style={styles.content_text}>
                                    ${carritoInfo && carritoInfo.total ? carritoInfo.total.toFixed(2) : ''}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.divider}/>

                        <View style={styles.data_container}>
                            <View style={styles.left_container}>
                                <Text style={styles.title_text}>Pago con tarjeta:</Text>
                            </View>

                            <View style={styles.right_container}>
                                {userInfo ? userInfo.tarjeta.map(tarjeta => (
                                    <Text key={tarjeta._id} style={styles.content_text}>
                                        {'**** **** **** **' + tarjeta.numeroTarjeta.slice(-2)}
                                    </Text>
                                )) : ''}
                            </View>
                        </View>

                        <View style={styles.data_container}>
                            <View style={styles.left_container}>
                                <Text style={styles.title_text}>Estado del pedido:</Text>
                            </View>

                            <View style={styles.right_container}>
                                <Text style={styles.content_text}>{carritoInfo ? carritoInfo.estado : ''}</Text>
                            </View>
                        </View>

                        <View style={styles.thanks_container}>
                            <Text style={styles.thanks_text}>¡Gracias por utilizar Nizi buen provecho!</Text>
                            <Image source={require('../img/thanks.png')} style={styles.thanks_icon}/>
                        </View>

                        <View style={styles.buttons_container}>

                            <View style={styles.button_background}>
                            <Pressable style={styles.button_content} android_ripple={{ color: 'lightgray' }} onPressOut={()=>navigation.navigate('Menu', {userID:userID})}>
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

    column_total: {
        flex: 0.25,
        marginRight: 5,
        alignItems: 'flex-end',
    },

    column_product:{
        flex:0.35,
    },

    column:{
        flex:0.2,
        alignItems: 'flex-end',
    },

    column_c:{
        flex:0.2,
        alignItems: 'center',
    },

    rows_container:{
        flex: 1,
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
    },

    row_total: {
        flex: 0.25,
        marginRight: 5,
        alignItems: 'flex-end',
    },

    row_product:{
        flex:0.35,
    },

    row:{
        flex:0.2,
        alignItems: 'flex-end',
    },

    row_c:{
        flex:0.2,
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

