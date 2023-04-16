/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable semi */
import { View, Text, SafeAreaView, StyleSheet, Pressable, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import CustomModal from '../components/CustomModal'

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const Menu: React.FC<Props> = ({navigation, route}) => {

  const { userID } = route.params;
  const [userInfo, setUserInfo] = useState<any>();
  const [menuInfo, setMenuInfo] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const categoriasFiltradas = menuInfo ? menuInfo.filter((producto) => producto.categoria === selectedCategory) : [];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inLoop, setInLoop] = useState(false);

  const colors = [
    ['#5433FF', '#00E0FF'],
    ['#FF9897', '#F650A0'],
    ['#00B8BA', '#00FFED'],
  ];

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
      setInLoop(false)
      setIsModalVisible(true);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const onRefresh = () => {
    setRefreshing(true);
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
                handleData()
            }
        }
        setRefreshing(false);
    })
      })
      .catch((error) => {
        handleData()
        console.log(error)
      })
  }, [userID._id, refreshing])

  useEffect(() => {
    fetch('http://192.168.0.3:3000/get_menu', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((data) => {
        console.log(data);
        setMenuInfo(data);
    })
    .catch((error) => {
        console.log(error);
    });
  }, []);

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

          <View style={styles.header_container}>

            <View style={styles.left_container}>
              <TouchableOpacity onPress={()=>navigation.navigate('Home', {userID:userID})}>
                <Image style={styles.back_icon} source={require('../img/back_black_icon.png')} />
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
              <TouchableOpacity onPress={()=>navigation.navigate('Cart', {userID: userID})}>
                <Image style={styles.cart_icon} source={require('../img/carrito.png')} />
              </TouchableOpacity>
            </View>

          </View>

          <Text style={styles.title}>Menú digital</Text>
          <Text style={styles.subtitle}>Nuevos platillos</Text>

          <View style={styles.sectionContainer}>
              <ScrollView horizontal={true} style={{flex: 1}} showsHorizontalScrollIndicator={false}>

                {menuInfo.slice(0, 3).map((producto, index) => {
                  const randomColorIndex = Math.floor(Math.random() * colors.length);
                  const randomColors = colors[randomColorIndex];

                  return (
                    <LinearGradient key={index} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={randomColors} style={styles.cardView}>
                      <View style={styles.subcontainer_food}>
                        {producto.nombre === 'Ensalada de pollo con vegetales' ? (
                          <Image source={require('../img/platillo2.png')} style={styles.food_image}/>
                        ) : producto.nombre === 'Papas fritas caseras' ? (
                          <Image source={require('../img/platillo3.png')} style={styles.food_image}/>
                        ) : producto.nombre === 'Café cappuccino' ? (
                          <Image source={require('../img/platillo4.png')} style={styles.food_image}/>
                        ) : (
                          <Image source={require('../img/White_t_logo.png')} style={styles.food_image}/>
                        )}
                      </View>
                      <View style={styles.info_container}>
                        <View style={styles.left_info}>
                          <Text style={styles.text_name}>{producto.nombre}</Text>
                        </View>

                        <View style={styles.right_info}>
                          <View style={styles.price_container}>
                            <Text style={styles.text_price}>$ {producto.precio.toFixed(2)}</Text>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>
                  );
                })}

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

            { selectedCategory === 'Todos' ?
              menuInfo.map((producto, index) => {
                return (
                  <Pressable key={index} style={styles.product_main_container}
                    android_ripple={{ color: 'lightgray', borderless: false }}
                    onPress={() => navigation.navigate('ProductDetails', {userID: userID, productID: producto._id})}>

                    <View style={styles.product_left}>
                      {producto.nombre === 'Ensalada de pollo con vegetales' ? (
                        <Image source={require('../img/platillo2.png')} style={styles.product_image}/>
                      ) : producto.nombre === 'Papas fritas caseras' ? (
                        <Image source={require('../img/platillo3.png')} style={styles.product_image}/>
                      ) : producto.nombre === 'Café cappuccino' ? (
                        <Image source={require('../img/platillo4.png')} style={styles.product_image}/>
                      ) : (
                        <Image source={require('../img/White_t_logo.png')} style={styles.product_image}/>
                      )}
                    </View>

                    <View style={styles.product_right}>
                      <Text style={styles.name_product}>{producto.nombre}</Text>
                          <Text style={styles.desc_product}>{producto.descripcion}</Text>
                      <View style={styles.price_product_container}>
                        <Text style={styles.price_product}>$ {producto.precio.toFixed(2)}</Text>
                      </View>
                    </View>

                  </Pressable>
                );
              })
              :
                categoriasFiltradas && categoriasFiltradas.map((producto, index) => {
                return (
                  <Pressable key={index} style={styles.product_main_container}
                    android_ripple={{ color: 'lightgray', borderless: false }}
                    onPress={() => navigation.navigate('ProductDetails', {userID: userID, productID: producto._id})}>

                    <View style={styles.product_left}>
                      {producto.nombre === 'Ensalada de pollo con vegetales' ? (
                        <Image source={require('../img/platillo2.png')} style={styles.product_image}/>
                      ) : producto.nombre === 'Papas fritas caseras' ? (
                        <Image source={require('../img/platillo3.png')} style={styles.product_image}/>
                      ) : producto.nombre === 'Café cappuccino' ? (
                        <Image source={require('../img/platillo4.png')} style={styles.product_image}/>
                      ) : (
                        <Image source={require('../img/White_t_logo.png')} style={styles.product_image}/>
                      )}
                    </View>

                    <View style={styles.product_right}>
                      <Text style={styles.name_product}>{producto.nombre}</Text>
                          <Text style={styles.desc_product}>{producto.descripcion}</Text>
                      <View style={styles.price_product_container}>
                        <Text style={styles.price_product}>$ {producto.precio.toFixed(2)}</Text>
                      </View>
                    </View>

                  </Pressable>
                );
              })
            }

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
    resizeMode: 'contain',
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