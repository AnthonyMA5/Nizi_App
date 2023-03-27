/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {DrawerNavigationProp} from '@react-navigation/drawer';
import React, { useState } from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  navigation: DrawerNavigationProp<any, any>;
}

const Orders: React.FC<Props> = ({navigation}) => {

  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView style={styles.main_container}>
        <ScrollView style={styles.scroll_container}>
            <View style={styles.container}>

              <View style={styles.head}>

                <View style={styles.menu_container}>
                  <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                    <Image style={styles.iconMenu} source={require('../img/menu_barra.png')}/>
                  </TouchableOpacity>
                </View>

                <View style={styles.title_container}>
                  <Text style={styles.section_title}>Pedidos</Text>
                </View>

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
                      selectedCategory === 'En espera' &&
                      styles.selected_category_container]}
                      onPress={() => handleCategorySelect('En espera')}>

                      <View style={styles.catg_left}>
                        <Text style={[styles.catg_text,
                          selectedCategory === 'En espera' &&
                          styles.selected_category_text]}>En espera</Text>
                      </View>

                      <View style={styles.catg_right}>
                          <Image source={require('../img/espera_icon.png')} style={styles.catg_icon}/>
                      </View>

                    </TouchableOpacity>

                    <TouchableOpacity style={[
                      styles.categories_container,
                      selectedCategory === 'En cocina' &&
                      styles.selected_category_container]}
                      onPress={() => handleCategorySelect('En cocina')}>

                      <View style={styles.catg_left}>
                        <Text style={[styles.catg_text,
                          selectedCategory === 'En cocina' &&
                          styles.selected_category_text]}>En cocina</Text>
                      </View>

                      <View style={styles.catg_right}>
                          <Image source={require('../img/cocinando_icon.png')} style={styles.catg_icon}/>
                      </View>

                    </TouchableOpacity>

                    <TouchableOpacity style={[
                      styles.categories_container,
                      selectedCategory === 'Entregados' &&
                      styles.selected_category_container]}
                      onPress={() => handleCategorySelect('Entregados')}>

                      <View style={styles.catg_left}>
                        <Text style={[styles.catg_text,
                          selectedCategory === 'Entregados' &&
                          styles.selected_category_text]}>Entregados</Text>
                      </View>

                      <View style={styles.catg_right}>
                          <Image source={require('../img/complete_icon.png')} style={styles.catg_icon}/>
                      </View>

                    </TouchableOpacity>

                </ScrollView>
              </View>

              <View style={styles.green_container}>
                  <View style={styles.subtitle_container}>
                      <View style={styles.left}>
                          <Text style={styles.subtitle1}>Pedido #01</Text>
                      </View>
                      <View style={styles.right}>
                          <Text style={styles.green_subtitle}>Entregado</Text>
                      </View>
                  </View>
                  <View style={styles.subtitle_container}>
                      <View style={styles.left}>
                          <Text style={styles.light_subtitle}>24 Enero, 2023</Text>
                      </View>
                      <View style={styles.right}>
                          <Text style={styles.light_subtitle}>9:00 am</Text>
                      </View>
                  </View>
                  <View style={styles.divisor} />
                  <View style={styles.subtitle_container}>
                      <View style={styles.right2}>
                          <TouchableOpacity>
                              <Text style={styles.light_subtitle2}>Ver detalles</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>

              <View style={styles.yellow_container}>
                  <View style={styles.subtitle_container}>
                      <View style={styles.left}>
                          <Text style={styles.subtitle1}>Pedido #02</Text>
                      </View>
                      <View style={styles.right}>
                          <Text style={styles.orange_subtitle}>En cocina</Text>
                      </View>
                  </View>
                  <View style={styles.subtitle_container}>
                      <View style={styles.left}>
                          <Text style={styles.light_subtitle}>24 Enero, 2023</Text>
                      </View>
                      <View style={styles.right}>
                          <Text style={styles.light_subtitle}>9:00 am</Text>
                      </View>
                  </View>
                  <View style={styles.divisor} />
                  <View style={styles.subtitle_container}>
                      <View style={styles.right2}>
                          <TouchableOpacity>
                              <Text style={styles.light_subtitle2}>Ver detalles</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>

              <View style={styles.red_container}>
                  <View style={styles.subtitle_container}>
                      <View style={styles.left}>
                          <Text style={styles.subtitle1}>Pedido #03</Text>
                      </View>
                      <View style={styles.right}>
                          <Text style={styles.red_subtitle}>En espera</Text>
                      </View>
                  </View>
                  <View style={styles.subtitle_container}>
                      <View style={styles.left}>
                          <Text style={styles.light_subtitle}>24 Enero, 2023</Text>
                      </View>
                      <View style={styles.right}>
                          <Text style={styles.light_subtitle}>9:00 am</Text>
                      </View>
                  </View>
                  <View style={styles.divisor} />
                  <View style={styles.subtitle_container}>
                      <View style={styles.right2}>
                          <TouchableOpacity>
                              <Text style={styles.light_subtitle2}>Ver detalles</Text>
                          </TouchableOpacity>
                      </View>
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

  sectionContainer2:{
    flex: 1,
    marginTop: 35,
    width: '100%',
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

  green_container:{
    flex: 1,
    width: '100%',
    backgroundColor: '#F0FEF2',
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
  },

  yellow_container:{
    flex: 1,
    width: '100%',
    backgroundColor: '#FEFDF0',
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
  },

  red_container:{
    flex: 1,
    width: '100%',
    backgroundColor: '#FEF0F0',
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
  },

  subtitle_container:{
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
},

left:{
    flex: 0.5,
    alignItems: 'flex-start',
},

right:{
    flex: 0.5,
    alignItems: 'flex-end',
},

right2:{
    flex: 1,
    alignItems: 'flex-end',
},

subtitle1:{
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
},

subtitle2:{
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    color: '#002DCC',
    marginBottom: 12,
},

light_subtitle:{
  fontFamily: 'DMSans-Regular',
  fontSize: 14,
  color: '#939393',
},

light_subtitle2:{
  fontFamily: 'DMSans-Medium',
  fontSize: 14,
  color: '#000',
},

orange_subtitle:{
  fontFamily: 'DMSans-Medium',
  fontSize: 16,
  color: '#E58009',
  marginBottom: 5,
},

green_subtitle:{
  fontFamily: 'DMSans-Medium',
  fontSize: 16,
  color: '#00BE35',
  marginBottom: 5,
},

red_subtitle:{
  fontFamily: 'DMSans-Medium',
  fontSize: 16,
  color: '#E50909',
  marginBottom: 5,
},

divisor:{
  width: '100%',
  height: 15,
},

});

export default Orders;
