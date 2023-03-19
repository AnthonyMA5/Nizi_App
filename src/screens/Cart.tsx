/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    navigation: any;
}

const Cart: React.FC<Props> = ({navigation}) => {

    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
          setQuantity(quantity - 1);
        }
    };

    return (
        <SafeAreaView style={styles.main_container}>
            <ScrollView style={styles.scroll_container}>
                <View style={styles.container}>

                    <View style={styles.head}>
                        <View style={styles.menu_container}>
                            <TouchableOpacity onPressOut={()=>navigation.navigate('Menu')}>
                                <Image style={styles.iconMenu} source={require('../img/x.png')}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.title_container}>
                            <Text style={styles.section_title}>Carrito de compras</Text>
                        </View>
                    </View>

                    <Text style={styles.title_text}>
                        Realiza tu pedido ahora y lo tendremos listo en aproximadamente 30 minutos en:
                    </Text>

                    <View style={styles.subtitle_container}>
                        <Text style={styles.subtitle_text}>Coffee Win</Text>
                        <Image style={styles.logo} source={require('../img/White_t_logo.png')} />
                        <TouchableOpacity>
                            <Text style={styles.subtitle2_text}>Ver ubicación</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.product_main_container}>

                        <View style={styles.product_left}>
                            <Image source={require('../img/platillo2.png')} style={styles.product_image}/>
                        </View>

                        <View style={styles.product_center}>
                            <Text style={styles.name_product}>Ensalada de pollo con vegetales</Text>
                            <View style={styles.quantity_container}>
                                <TouchableOpacity style={styles.quantity_button} onPress={decrementQuantity}>
                                    <Text style={styles.symbol}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.text_quantity}>{quantity}</Text>
                                <TouchableOpacity style={styles.quantity_button} onPress={incrementQuantity}>
                                    <Text style={styles.symbol}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.delete_product}>Eliminar producto</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.product_right}>
                            <Text style={styles.price_product}>$85.00</Text>
                        </View>

                    </View>

                    <View style={styles.divider}/>

                    <View style={styles.product_main_container}>

                        <View style={styles.product_left}>
                            <Image source={require('../img/platillo3.png')} style={styles.product_image}/>
                        </View>

                        <View style={styles.product_center}>
                            <Text style={styles.name_product}>Papas fritas</Text>
                            <View style={styles.quantity_container}>
                                <TouchableOpacity style={styles.quantity_button} onPress={decrementQuantity}>
                                    <Text style={styles.symbol}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.text_quantity}>{quantity}</Text>
                                <TouchableOpacity style={styles.quantity_button} onPress={incrementQuantity}>
                                    <Text style={styles.symbol}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.delete_product}>Eliminar producto</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.product_right}>
                            <Text style={styles.price_product}>$25.00</Text>
                        </View>

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
                            <Text style={styles.price_product}>$110.00</Text>
                        </View>

                    </View>

                    <View style={styles.button_container}>
                        <Pressable style={styles.button}
                                android_ripple={{ color: 'lightgray' }}>
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
        flex: 0.1,
        alignItems: 'flex-start',
        flexDirection: 'row',
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
        marginLeft: 12,
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
