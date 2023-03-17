/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eol-last */
/* eslint-disable semi */
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
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

  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container}>
        <View style={styles.container}>


          <View style={styles.header_container}>

            <View style={styles.left_container}>
              <TouchableOpacity>
                <Image style={styles.back_icon} source={require('../img/back.png')} />
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


})

export default Menu;