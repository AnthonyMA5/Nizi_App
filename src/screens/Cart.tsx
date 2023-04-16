/* eslint-disable prettier/prettier */
import { NavigationProp, RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomModal from '../components/CustomModal';

interface Props {
    navigation: NavigationProp<any, any>;
    route: RouteProp<any, any>;
  }

const Cart: React.FC<Props> = ({navigation, route}) => {

    const { userID } = route.params;
    const [userInfo, setUserInfo] = useState<any>();
    const [carritoInfo, setCarritoInfo] = useState<any>();

    const [refreshing, setRefreshing] = useState(false);
    let total = 0;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inLoop, setInLoop] = useState(false);

    const incrementQuantity = (id: string, currentQuantity: number) => {
        const updatedCarrito = { ...carritoInfo };
        const updatedProduct = updatedCarrito.productos.find(
          (producto) => producto.idProducto._id === id
        );
        updatedProduct.cantidad = currentQuantity + 1;
        total += updatedProduct.idProducto.precio;
        setCarritoInfo(updatedCarrito);
        updateCartState(id, currentQuantity + 1, total);
    };

    const decrementQuantity = (id: string, currentQuantity: number) => {
        const updatedCarrito = { ...carritoInfo };
        const updatedProduct = updatedCarrito.productos.find(
          (producto) => producto.idProducto._id === id
        );
        updatedProduct.cantidad = currentQuantity - 1;
        total -= updatedProduct.idProducto.precio;
        setCarritoInfo(updatedCarrito);
        updateCartState(id, currentQuantity - 1, total);
    };

    const onRefresh = () => {
        setRefreshing(true);
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

    const [functionData, setFunctionData] = useState({
        title: '',
        info: '',
        color: '',
        icon: null,
        btn: '',
    });

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

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

    const paidOrder = () => {
        setFunctionData({
          title: 'Se ha acreditado el pago de tu pedido',
          info: 'Tu pedido ha sido pagado en su totalidad, recuerda acudir al comercio y presentar tu tarjeta o ticket de compra.',
          color: '#00D4A1',
          icon: require('../animations/success_icon.json'),
          btn: 'Entendido',
        });
        setInLoop(false)
        setIsModalVisible(true);
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
            setRefreshing(false);
        });
          })
          .catch((error) => {
            handleData();
            console.log(error);
          });
    }, [userID._id, refreshing]);

    useEffect(() => {
        const documentLog = JSON.stringify({
            idUsuario : userID._id,
          });
          fetch('http://192.168.0.3:3000/get_cart',{
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
            setRefreshing(false);
        });
          })
          .catch((error) => {
            handleData();
            console.log(error);
          });
    }, [userID._id, refreshing]);

    const updateCartState = (id: string, newQuantity: number, newTotal: number) => {
        const documentLog = JSON.stringify({
          idUsuario: userID._id,
          idProducto: id,
          cantidad: newQuantity,
          newTotal: newTotal,
        });
        console.log('Datos enviados al servidor:', documentLog);
        fetch('http://192.168.0.3:3000/update_quantity_cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: documentLog,
        })
          .then((response) => {
            if (response) {
              onRefresh();
            }
          })
          .catch((error) => {
            console.log(error);
            handleServerError();
          });
    };

    const deleteProductCart = (id: string) => {
        const documentLog = JSON.stringify({
          idUsuario: userID._id,
          idProducto: id,
        });
        console.log('Datos enviados al servidor:', documentLog);
        fetch('http://192.168.0.3:3000/delete_product_cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: documentLog,
        })
          .then((response) => {
            if (response) {
              onRefresh();
            }
          })
          .catch((error) => {
            console.log(error);
            handleServerError();
          });
    };

    const payOrder = (id: string) => {
        const documentLog = JSON.stringify({
          idUsuario: userID._id,
        });
        console.log('Datos enviados al servidor:', documentLog);
        fetch('http://192.168.0.3:3000/pay_order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: documentLog,
        })
        .then(response => {
            if (response.ok) {
                // Si la respuesta del servidor fue exitosa, se muestra un mensaje de éxito
                console.log('Pedido pagado exitosamente');
                paidOrder();
            } else {
                // Si la respuesta del servidor contiene errores, se muestran los mensajes de error
                response.json().then(data => {
                    data.messages.forEach(message => {
                        if (message.type === 'stock_error') {
                            handleStockError(message.message);
                        } else if (message.type === 'card_status') {
                            handleCardStatus(message.message);
                        } else if (message.type === 'card_amount') {
                            handleCardAmount(message.message);
                        } else {
                            console.error(message.message);
                        }
                    });
                });
            }
        })
        .catch(error => {
            console.error('Error en la petición:', error);
        });
    };

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

                    <View style={styles.head}>
                        <View style={styles.menu_container}>
                            <TouchableOpacity onPressOut={()=>navigation.navigate('Menu', {userID:userID})}>
                                <Image style={styles.iconMenu} source={require('../img/back_black_icon.png')}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.title_container}>
                            <Text style={styles.section_title}>Carrito de compras</Text>
                        </View>
                    </View>

                    <Text style={styles.title_text}>
                        Realiza tu pedido ahora y lo tendremos listo para recogerlo en:
                    </Text>

                    <View style={styles.subtitle_container}>
                        <Image style={styles.logo} source={require('../img/coffee_win.jpg')} />
                        <Text style={styles.subtitle_text}>Coffee Win</Text>
                        <TouchableOpacity onPress={()=> navigation.navigate('Commerce', {userID:userID})}>
                            <Text style={styles.subtitle2_text}>Ver ubicación</Text>
                        </TouchableOpacity>
                    </View>

                    <View>

                    {carritoInfo && carritoInfo.productos.map((producto) => {
                        total += producto.idProducto.precio * producto.cantidad;
                        return (
                            <View style={styles.product_main_container} key={producto._id}>
                                <View style={styles.product_left}>
                                {producto.idProducto.nombre === 'Ensalada de pollo con vegetales' ? (
                                    <Image source={require('../img/platillo2.png')} style={styles.product_image}/>
                                    ) : producto.idProducto.nombre === 'Papas fritas caseras' ? (
                                    <Image source={require('../img/platillo3.png')} style={styles.product_image}/>
                                    ) : producto.idProducto.nombre === 'Café cappuccino' ? (
                                    <Image source={require('../img/platillo4.png')} style={styles.product_image}/>
                                    ) : (
                                    <Image source={require('../img/White_t_logo.png')} style={styles.product_image}/>
                                )}
                                </View>
                                <View style={styles.product_center}>
                                    <Text style={styles.name_product}>{producto.idProducto.nombre}</Text>
                                    <View style={styles.quantity_container}>
                                        <TouchableOpacity style={styles.quantity_button} onPress={() => decrementQuantity(producto.idProducto._id, producto.cantidad)}>
                                            <Text style={styles.symbol}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.text_quantity}>{producto.cantidad}</Text>
                                        <TouchableOpacity style={styles.quantity_button} onPress={() => incrementQuantity(producto.idProducto._id, producto.cantidad)}>
                                            <Text style={styles.symbol}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity onPress={() => deleteProductCart(producto.idProducto._id)}>
                                        <Text style={styles.delete_product}>Eliminar producto</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.product_right}>
                                    <Text style={styles.price_product}>${(producto.idProducto.precio * producto.cantidad)}</Text>
                                </View>
                            </View>
                        );
                    })}
                    </View>

                    <View style={styles.divider}/>

                    <View style={styles.section_container}>

                        <View style={styles.section_left}>
                            <Text style={styles.title_text_section}>Costos adicionales de entrega</Text>
                            <Text style={styles.subtitle_text_section}>Sin costos adicionales</Text>
                        </View>

                        <View style={styles.section_right}>
                            <Text style={styles.price_product}>$0.00</Text>
                        </View>

                    </View>

                    <View style={styles.divider}/>

                    <View style={styles.section_container}>

                        <View style={styles.section_left}>
                            <Text style={styles.title_text_section}>Total a pagar</Text>
                        </View>

                        <View style={styles.section_right}>
                            <Text style={styles.price_product}>${total.toFixed(2)}</Text>
                        </View>

                    </View>

                    <View style={styles.button_container}>
                        <Pressable style={styles.button}
                                android_ripple={{ color: 'lightgray' }} onPressOut={()=>navigation.navigate('Ticket', {userInfo:userInfo})}>
                        <Text style={styles.text_button}>Pagar</Text>
                        </Pressable>
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

    title_text:{
        fontFamily: 'DMSans-Medium',
        fontSize: 15,
        color: '#000000',
        textAlign: 'justify',
        marginTop: 30,
    },

    subtitle_container:{
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 12,
        alignContent: 'center',
    },

    subtitle_text:{
        fontFamily: 'DMSans-Medium',
        fontSize: 16,
        color: '#000000',
        textAlign: 'justify',
    },

    logo:{
        marginRight: 12,
        width: 25,
        height: 25,
    },

    subtitle2_text:{
        marginLeft: 20,
        fontFamily: 'DMSans-Medium',
        fontSize: 16,
        color: '#0500FF',
        textAlign: 'justify',
    },

    product_main_container:{
        flexDirection: 'row',
        flex: 1,
        marginTop: 30,
        marginBottom: 20,
        justifyContent: 'center',
    },

    product_left:{
        flex: 0.3,
        alignItems: 'center',
    },

    product_image:{
        width: 105,
        height: 105,
        resizeMode: 'contain',
    },

    product_center:{
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginStart: 20,
    },

    quantity_container:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },

    quantity_button:{
        width: 30,
        height: 30,
        backgroundColor: '#F1F0F0',
        borderRadius: 10,
        justifyContent: 'center',
    },

    symbol:{
        fontFamily: 'DMSans-Bold',
        fontSize: 14,
        color: '#000',
        textAlign: 'center',
    },

    text_quantity:{
        flex: 0.33,
        fontFamily: 'DMSans-Bold',
        fontSize: 14,
        color: '#000',
        textAlign: 'center',
    },

    product_right:{
        flex: 0.2,
    },

    name_product:{
        fontFamily: 'DMSans-Medium',
        fontSize: 14,
        color: '#000',
    },

    delete_product:{
        fontFamily: 'DMSans-Medium',
        fontSize: 14,
        color: '#D00000',
        marginTop: 15,
    },

    price_product:{
        fontFamily: 'DMSans-Bold',
        fontSize: 14,
        textAlign: 'center',
        color: '#000',
    },

    divider:{
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },

    section_container:{
        flexDirection: 'row',
        flex: 1,
        marginTop: 25,
        marginBottom: 25,
    },

    section_left:{
        flex: 0.8,
        alignItems: 'flex-start',
    },

    title_text_section:{
        fontFamily: 'DMSans-Bold',
        fontSize: 15,
        color: '#000000',
    },

    subtitle_text_section:{
        fontFamily: 'DMSans-Medium',
        fontSize: 14,
        color: '#767676',
        textAlign: 'justify',
        marginTop: 8,
    },

    section_right:{
        flex: 0.2,
    },

    button_container:{
        flex: 1,
        marginTop: 30,
        marginBottom: 50,
    },

    button:{
        backgroundColor:'#0008D4',
        padding: 15,
        marginTop: 20,
        borderRadius: 12,
    },

    text_button:{
        fontFamily: 'DMSans-Bold',
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
    },

});

export default Cart;
