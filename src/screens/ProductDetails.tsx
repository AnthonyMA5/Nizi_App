/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    navigation: any;
}

const ProductDetails: React.FC<Props> = ({navigation}) => {

    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };
      
    const decrementQuantity = () => {
        if (quantity > 1) {
          setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        // Lógica para agregar al carrito
    };
      

    return (
        <SafeAreaView style={styles.main_container}>
            <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                    <View style={styles.head}>
                        <View style={styles.menu_container}>
                        <TouchableOpacity onPressOut={()=>navigation.navigate('Menu')}>
                            <Image style={styles.iconMenu} source={require('../img/back.png')}/>
                        </TouchableOpacity>
                        </View>

                        <View style={styles.title_container}>
                        <Text style={styles.section_title}>Detalles del producto</Text>
                        </View>
                    </View>

                    <Image style={styles.food_img} source={require('../img/platillo1.png')}/>

                    <Text style={styles.food_title}>Ensalada griega</Text>

                    <Text style={styles.food_desc}>
                        Deliciosa ensalada con una gran porción de pollo como proteína, 
                        acompañada de granos de elote, rebanadas de pimiento rojo, 
                        zanahoria rebanada y lechuga
                    </Text>

                    <View style={styles.table_container}>

                        <View style={styles.row}>
                            <Text style={styles.table_title}>500 gr</Text>
                            <Text style={styles.table_subtitle}>porc</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.table_title}>65</Text>
                            <Text style={styles.table_subtitle}>kcal</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.table_title}>1.25 gr</Text>
                            <Text style={styles.table_subtitle}>grasa</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.table_title}>10.6 gr</Text>
                            <Text style={styles.table_subtitle}>carbh</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.table_title}>62 gr</Text>
                            <Text style={styles.table_subtitle}>prot</Text>
                        </View>

                    </View>

                    <View style={styles.info_container}>
                        <Text style={styles.title_text_price}>Precio:</Text>
                        <Text style={styles.text_price}>$85.00</Text>
                    </View>

                    <View style={styles.info_container}>
                        <Text style={styles.title_text_price}>Disponible en:</Text>
                        <View style={styles.info_subcontainer}>
                            <Image style={styles.commerce_icon} source={require('../img/White_t_logo.png')}/>
                            <Text style={styles.commerce_title}>Coffee Win</Text>
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

                            <TouchableOpacity style={styles.cart_container}>
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
