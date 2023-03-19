/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable semi */
import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { ScrollView } from 'react-native'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

interface Props {
    navigation: DrawerNavigationProp<any, any>
}

const Menu: React.FC<Props> = ({navigation}) => {

  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container}>
        <View style={styles.container}>


          <View style={styles.header_container}>

            <View style={styles.left_container}>
              <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                <Image style={styles.back_icon} source={require('../img/menu_barra.png')} />
              </TouchableOpacity>
            </View>

            <View style={styles.center_container}>

              <View style={styles.search_container}>
                <View style={styles.search_icon_container}>
                  <TouchableOpacity>
                    <Image style={styles.back_icon} source={require('../img/lupa.png')} />
                  </TouchableOpacity>
                </View>
                <View style={styles.search_input}>
                  <TextInput style={styles.input} placeholder= "Buscar..." placeholderTextColor={'#878787'} />
                </View>
              </View>

            </View>

            <View style={styles.right_container}>
              <TouchableOpacity>
                <Image style={styles.cart_icon} source={require('../img/carrito.png')} />
              </TouchableOpacity>
            </View>

          </View>

          <Text style={styles.title}>Menú digital</Text>
          <Text style={styles.subtitle}>Platillos de la semana</Text>

          <View style={styles.sectionContainer}>
              <ScrollView horizontal={true} style={{flex: 1}} showsHorizontalScrollIndicator={false}>

                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#5433FF', '#00E0FF']} style={styles.cardView}>

                    <View style={styles.subcontainer_food}>
                      <Image source={require('../img/platillo2.png')} style={styles.food_image}/>
                    </View>

                    <View style={styles.info_container}>
                      <View style={styles.left_info}>
                        <Text style={styles.text_name}>Ensalada de pollo con vegetales</Text>
                      </View>

                      <View style={styles.right_info}>
                        <View style={styles.price_container}>
                          <Text style={styles.text_price}>$ 85.00</Text>
                        </View>
                      </View>

                    </View>
                  </LinearGradient>

                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#CA33FF', '#0075FF']} style={styles.cardView}>

                    <View style={styles.subcontainer_food}>
                      <Image source={require('../img/platillo1.png')} style={styles.food_image}/>
                    </View>

                    <View style={styles.info_container}>
                      <View style={styles.left_info}>
                        <Text style={styles.text_name}>Ensalada de pollo con vegetales</Text>
                      </View>

                      <View style={styles.right_info}>
                        <View style={styles.price_container}>
                          <Text style={styles.text_price}>$ 85.00</Text>
                        </View>
                      </View>

                    </View>
                  </LinearGradient>

                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#5433FF', '#00E0FF']} style={styles.cardView}>

                    <View style={styles.subcontainer_food}>
                      <Image source={require('../img/platillo2.png')} style={styles.food_image}/>
                    </View>

                    <View style={styles.info_container}>
                      <View style={styles.left_info}>
                        <Text style={styles.text_name}>Ensalada de pollo con vegetales</Text>
                      </View>

                      <View style={styles.right_info}>
                        <View style={styles.price_container}>
                          <Text style={styles.text_price}>$ 85.00</Text>
                        </View>
                      </View>

                    </View>
                  </LinearGradient>

              </ScrollView>
          </View>


          <View style={styles.sectionContainer2}>
              <ScrollView horizontal={true} style={{flex: 1}} showsHorizontalScrollIndicator={false}>

                  <TouchableOpacity style={[
                    styles.categories_container,
                    selectedCategory === 'Todos' &&
                    styles.selected_category_container]}
                    onPress={() => handleCategorySelect('Todos')}>

                      <Text style={[styles.catg_text,
                        selectedCategory === 'Todos' &&
                        styles.selected_category_text]}>Todos</Text>

                  </TouchableOpacity>

                  <TouchableOpacity style={[
                    styles.categories_container,
                    selectedCategory === 'Ensaladas' &&
                    styles.selected_category_container]}
                    onPress={() => handleCategorySelect('Ensaladas')}>

                    <View style={styles.catg_left}>
                      <Text style={[styles.catg_text,
                        selectedCategory === 'Ensaladas' &&
                        styles.selected_category_text]}>Ensaladas</Text>
                    </View>

                    <View style={styles.catg_right}>
                        <Image source={require('../img/ensalada_icon.png')} style={styles.catg_icon}/>
                    </View>

                  </TouchableOpacity>

                  <TouchableOpacity style={[
                    styles.categories_container,
                    selectedCategory === 'Snacks' &&
                    styles.selected_category_container]}
                    onPress={() => handleCategorySelect('Snacks')}>

                    <View style={styles.catg_left}>
                      <Text style={[styles.catg_text,
                        selectedCategory === 'Snacks' &&
                        styles.selected_category_text]}>Snacks</Text>
                    </View>

                    <View style={styles.catg_right}>
                        <Image source={require('../img/snack_icon.png')} style={styles.catg_icon}/>
                    </View>

                  </TouchableOpacity>

                  <TouchableOpacity style={[
                    styles.categories_container,
                    selectedCategory === 'Bebidas' &&
                    styles.selected_category_container]}
                    onPress={() => handleCategorySelect('Bebidas')}>

                    <View style={styles.catg_left}>
                      <Text style={[styles.catg_text,
                        selectedCategory === 'Bebidas' &&
                        styles.selected_category_text]}>Bebidas</Text>
                    </View>

                    <View style={styles.catg_right}>
                        <Image source={require('../img/bebidas_icon.png')} style={styles.catg_icon}/>
                    </View>

                  </TouchableOpacity>

              </ScrollView>
          </View>


          <View style={styles.sectionContainer3}>

            <Pressable style={styles.product_main_container}
              android_ripple={{ color: 'lightgray', borderless: false }}
              onPressOut={() => navigation.navigate('ProductDetails')}>

              <View style={styles.product_left}>
                <Image source={require('../img/platillo1.png')} style={styles.product_image}/>
              </View>

              <View style={styles.product_right}>
                <Text style={styles.name_product}>Ensalada griega</Text>
                <Text style={styles.desc_product}>Un plato de la dieta mediterránea saludable con lechuga, queso panela.</Text>
                <View style={styles.price_product_container}>
                  <Text style={styles.price_product}>$ 90.00</Text>
                </View>
              </View>

            </Pressable>

            <Pressable style={styles.product_main_container}
            android_ripple={{ color: 'lightgray', borderless: false }}>

              <View style={styles.product_left}>
                <Image source={require('../img/platillo3.png')} style={styles.product_image}/>
              </View>

              <View style={styles.product_right}>
                <Text style={styles.name_product}>Papas fritas</Text>
                <Text style={styles.desc_product}>Papas naturales fritas con chile en polvo.</Text>
                <View style={styles.price_product_container}>
                  <Text style={styles.price_product}>$ 25.00</Text>
                </View>
              </View>

            </Pressable>

            <Pressable style={styles.product_main_container}
            android_ripple={{ color: 'lightgray', borderless: false }}>

              <View style={styles.product_left}>
                <Image source={require('../img/platillo4.png')} style={styles.product_image}/>
              </View>

              <View style={styles.product_right}>
                <Text style={styles.name_product}>Café cappuccino</Text>
                <Text style={styles.desc_product}>Café mezclado con leche y crema de leche.</Text>
                <View style={styles.price_product_container}>
                  <Text style={styles.price_product}>$ 32.00</Text>
                </View>
              </View>

            </Pressable>

          </View>


        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

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

  header_container:{
    flexDirection: 'row',
    marginTop: 35,
  },

  left_container:{
    flex: 0.2,
    alignItems: 'center',
    flexDirection: 'row',
  },

  back_icon:{
    width: 30,
    height: 30,
  },

  center_container:{
    flex: 0.8,
    alignItems: 'center',
    flexDirection: 'row',
  },

  search_container:{
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 50,
  },

  search_icon_container:{
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  search_input:{
    flex: 0.8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
  },

  input: {
    flex: 1,
    width: '100%',
    height: 40,
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
    color: '#000000',
  },

  right_container:{
    flex: 0.2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  cart_icon:{
    width: 32,
    height: 32,
  },

  title:{
    fontFamily: 'DMSans-Bold',
    fontSize: 24,
    color: '#000000',
    marginTop: 30,
  },

  subtitle:{
    fontFamily: 'DMSans-Medium',
    fontSize: 20,
    color: '#000000',
    marginTop: 25,
  },

  sectionContainer:{
    flex: 1,
    marginTop: 25,
    width: '100%',
  },

  sectionContainer2:{
    flex: 1,
    marginTop: 35,
    width: '100%',
  },

  sectionContainer3:{
    flex: 1,
    marginTop: 10,
    width: '100%',
  },

  cardView:{
    width: 300,
    height: 220,
    borderRadius: 15,
    marginRight: 12,
  },

  subcontainer_food:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  food_image:{
    width: 130,
    height: 130,
  },

  info_container:{
    flexDirection: 'row',
    marginTop: 15,
    marginStart: 15,
    marginEnd: 15,
  },

  left_info:{
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  text_name:{
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
    color: '#FFF',
  },

  right_info:{
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  price_container:{
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#000',
  },

  text_price:{
    fontFamily: 'DMSans-Medium',
    fontSize: 14,
    color: '#FFF',
  },

  categories_container:{
    flexDirection: 'row',
    backgroundColor: '#EDEDED',
    padding: 8,
    borderRadius: 9,
    marginEnd: 12,
    alignItems: 'center',
  },

  selected_category_container:{
    backgroundColor: '#282828',
  },

  catg_left:{
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: 5,
  },

  catg_text:{
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
    color: '#000',
  },

  selected_category_text:{
    color: '#FFF',
  },

  catg_right:{
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },

  catg_icon:{
    width: 25,
    height: 25,
  },

  product_main_container:{
    flexDirection: 'row',
    marginTop: 30,
    padding: 5,
  },

  product_left:{
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  product_image:{
    width: 105,
    height: 105,
    resizeMode: 'contain',
  },

  product_right:{
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginStart: 25,
  },

  name_product:{
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    color: '#000',
  },

  desc_product:{
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    textAlign: 'justify',
    color: '#000',
    marginTop: 10,
  },

  price_product_container:{
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 12,
    backgroundColor: '#EEEEEE',
  },

  price_product:{
    fontFamily: 'DMSans-Bold',
    fontSize: 14,
    textAlign: 'justify',
    color: '#000',
    marginLeft: 7,
    marginRight: 7,
  },

  more_info_text:{
    fontFamily: 'DMSans-Medium',
    fontSize: 14,
    alignSelf: 'auto',
    color: '#0500FF',
  },


})

export default Menu;