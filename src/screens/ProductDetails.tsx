/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NavigationProp, RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomModal from '../components/CustomModal';

interface Props {
    navigation: NavigationProp<any, any>;
    route: RouteProp<any, any>;
}

const ProductDetails: React.FC<Props> = ({navigation, route}) => {

    const { userID, productID } = route.params;

    const [userInfo, setUserInfo] = useState<any>();
    const [productInfo, setProductInfo] = useState<any>();
    const [commerceInfo, setCommerceInfo] = useState<any>();

    const [quantity, setQuantity] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

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

    const handleError = () => {
        setFunctionData({
          title: 'No pudimos procesar tu solicitud',
          info: 'Ocurrió un error inesperado durante el proceso, te recomendamos intentarlo de nuevo más tarde.',
          color: '#C71D1D',
          icon: require('../animations/sorry_icon.json'),
          btn: 'Entendido',
        });
        setInLoop(false);
        setIsModalVisible(true);
    };

    const onRefresh = () => {
        setRefreshing(true);
    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };
      
    const decrementQuantity = () => {
        if (quantity > 1) {
          setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        agregarAlCarrito();
    };

    const handleSuccessAddToCart = () => {
        const message = `Has añadido ${quantity} ${productInfo ? productInfo.nombre : ''} a tu carrito`;
        setFunctionData({
          title: 'Producto añadido al carrito',
          info: message,
          color: '#00D4A1',
          icon: require('../animations/success_icon.json'),
          btn: 'Entendido',
        });
        setInLoop(false);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleQuantity = () => {
        setFunctionData({
          title: 'Existencia insuficientes',
          info: 'No hay suficientes existencias disponibles para agregarlas a tu carrito.',
          color: '#C71D1D',
          icon: require('../animations/error_icon.json'),
          btn: 'Entendido',
        });
        setInLoop(false);
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
            idProducto : productID,
          });
          fetch('http://192.168.0.3:3000/get_product_info',{
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
                  setProductInfo(data);
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
    }, [productID, refreshing]);

    useEffect(() => {
        if (productInfo) {
          const documentLog = JSON.stringify({
            idEstablecimiento: productInfo.idEstablecimiento
              ? productInfo.idEstablecimiento
              : '',
          });
          fetch('http://192.168.0.3:3000/get_product_info_commerce', {
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
                    setCommerceInfo(data);
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
        }
    }, [productInfo, refreshing]);

    const agregarAlCarrito = () => {

        const documentLog = JSON.stringify({
          idUsuario : userID._id,
          idProducto : productID,
          cantidadSolicitada : quantity,
        });
        console.log('Datos enviados al servidor:', documentLog);
        fetch('http://192.168.0.3:3000/add_to_cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: documentLog,
        })
        .then((response) => {
          if (response.status === 400) {
            response.json().then((data) => {
              if (data.errores) {
                if (data.errores.stock) {
                  handleQuantity();
                }
              } else {
                handleError();
              }
            });
          } else if (response.status === 200) {
            handleSuccessAddToCart();
          } else {
            handleServerError();
          }
        })
        .catch((error) => {
          console.log(error);
          handleServerError();
        });
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

                    <View style={styles.head}>
                        <View style={styles.menu_container}>
                        <TouchableOpacity onPressOut={()=>navigation.navigate('Menu', {userID: userID})}>
                            <Image style={styles.iconMenu} source={require('../img/back_black_icon.png')}/>
                        </TouchableOpacity>
                        </View>

                        <View style={styles.title_container}>
                        <Text style={styles.section_title}>Detalles del producto</Text>
                        </View>
                    </View>

                    {productInfo ? (
                    <Image
                        source={
                        productInfo.nombre === 'Ensalada de pollo con vegetales'
                            ? require('../img/platillo2.png')
                            : productInfo.nombre === 'Papas fritas caseras'
                            ? require('../img/platillo3.png')
                            : productInfo.nombre === 'Café cappuccino'
                            ? require('../img/platillo4.png')
                            : require('../img/White_t_logo.png')
                        }
                        style={styles.food_img}
                    />
                    ) : null}

                    <Text style={styles.food_title}>{productInfo ? productInfo.nombre : ''}</Text>

                    <Text style={styles.food_desc}>
                        {productInfo ? productInfo.descripcion : ''}
                    </Text>

                    <View style={styles.table_container}>

                        <View style={styles.row}>
                            <Text style={styles.table_title}>{productInfo ? productInfo.informacionNutrimental[0].porcion : ''}</Text>
                            <Text style={styles.table_subtitle}>porc</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.table_title}>{productInfo ? productInfo.informacionNutrimental[0].kilocalorias : ''}</Text>
                            <Text style={styles.table_subtitle}>kcal</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.table_title}>{productInfo ? productInfo.informacionNutrimental[0].grasas : ''}</Text>
                            <Text style={styles.table_subtitle}>grasa</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.table_title}>{productInfo ? productInfo.informacionNutrimental[0].carbohidratos : ''}</Text>
                            <Text style={styles.table_subtitle}>carbh</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.table_title}>{productInfo ? productInfo.informacionNutrimental[0].proteina : ''}</Text>
                            <Text style={styles.table_subtitle}>prot</Text>
                        </View>

                    </View>

                    <View style={styles.info_container}>
                        <Text style={styles.title_text_price}>Precio:</Text>
                        <Text style={styles.text_price}>${productInfo ? productInfo.precio.toFixed(2) : ''}</Text>
                    </View>

                    <View style={styles.info_container}>
                        <Text style={styles.title_text_price}>Disponible en:</Text>
                        <View style={styles.info_subcontainer}>
                            {productInfo ? (
                            <Image
                                source={
                                commerceInfo && commerceInfo.length > 0 && commerceInfo[0].nombre === 'Coffee Win'
                                    ? require('../img/coffee_win.jpg')
                                    : require('../img/White_t_logo.png')
                                }
                                style={styles.commerce_icon}
                            />
                            ) : null}
                            <Text style={styles.commerce_title}>{commerceInfo ? commerceInfo[0].nombre : ''}</Text>
                        </View>
                    </View>

                    <View style={styles.buttons_container}>

                        <View style={styles.quantity_main_container}>

                            <View style={styles.quantity_container}>
                                <TouchableOpacity style={styles.quantity_button} onPress={decrementQuantity}>
                                    <Text style={styles.symbol}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.text_quantity}>{quantity}</Text>
                                <TouchableOpacity style={styles.quantity_button} onPress={incrementQuantity}>
                                    <Text style={styles.symbol}>+</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={styles.cart_main_container}>

                            <TouchableOpacity style={styles.cart_container} onPress={handleAddToCart}>
                                <Text style={styles.text_cart}>Añadir al carrito</Text>
                            </TouchableOpacity>

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

    food_img:{
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 50,
        width: 280,
        height: 280,
        resizeMode: 'contain',
    },

    food_title:{
        fontFamily: 'DMSans-Bold',
        fontSize: 22,
        textAlign: 'center',
        color: '#000000',
        marginTop: 20,
    },

    food_desc:{
        fontFamily: 'DMSans-Regular',
        fontSize: 16,
        textAlign: 'justify',
        color: '#3A3A3A',
        marginTop: 20,
    },

    table_container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        borderColor: '#C1C1C1',
        flexDirection: 'row',
    },

    row: {
        flex: 0.2, 
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
    },

    table_title:{
        fontFamily: 'DMSans-Medium',
        fontSize: 14,
        color: '#000',
    },

    table_subtitle:{
        fontFamily: 'DMSans-Regular',
        fontSize: 14,
        marginTop: 5,
        color: '#767676',
    },

    info_container:{
        flexDirection: 'row',
        marginTop: 15,
    },

    title_text_price:{
        fontFamily: 'DMSans-Medium',
        fontSize: 16,
        color: '#000000',
        marginTop: 10,
    },

    text_price:{
        fontFamily: 'DMSans-Bold',
        fontSize: 16,
        color: '#000000',
        marginTop: 10,
        marginLeft: 10,
    },

    info_subcontainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6,
    },

    commerce_icon:{
        marginLeft: 10,
        width: 30,
        height: 30,
        borderRadius: 50,
    },

    commerce_title:{
        fontFamily: 'DMSans-Bold',
        fontSize: 16,
        color: '#000000',
        marginLeft: 10,
    },

    buttons_container:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 35,
    },

    quantity_main_container:{
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        marginEnd: 30,
    },

    quantity_container:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    quantity_button:{
        flex: 0.33,
        backgroundColor: '#F1F0F0',
        borderRadius: 10,
        justifyContent: 'center',
        padding: 10,
    },

    symbol:{
        fontFamily: 'DMSans-Bold',
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },

    text_quantity:{
        flex: 0.33,
        fontFamily: 'DMSans-Bold',
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },

    cart_main_container:{
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    cart_container:{
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#0008D4',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text_cart:{
        fontFamily: 'DMSans-Medium',
        fontSize: 15,
        color: '#FFF',
    },

});

export default ProductDetails;
