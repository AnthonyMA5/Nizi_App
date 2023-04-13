/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { RouteProp } from '@react-navigation/native';

interface Props {
  navigation: any;
  route: RouteProp<any, any>;
}

const AdminRequests: React.FC<Props> = ({navigation, route}) => {

  const { userID } = route.params;

  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [solicitudesInfo, setSolicitudesInfo] = useState<any>();
  const solicitudesFiltradas = solicitudesInfo ? solicitudesInfo.filter((solicitud) => solicitud.estado === selectedCategory) : [];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    fetch('http://192.168.0.3:3000/get_solicitudes', {
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
        setSolicitudesInfo(data);
    })
    .catch((error) => {
        console.log(error);
    });
}, []);

  return (
    <SafeAreaView style={styles.main_container}>
        <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>

              <View style={styles.head}>

                <View style={styles.menu_container}>
                  <TouchableOpacity onPress={()=>navigation.navigate('Home_Admin', {userID:userID})}>
                    <Image style={styles.iconMenu} source={require('../img/back_black_icon.png')}/>
                  </TouchableOpacity>
                </View>

                <View style={styles.title_container}>
                  <Text style={styles.section_title}>Solicitudes</Text>
                </View>

              </View>

              <View style={styles.sectionContainer2}>
                <ScrollView horizontal={true} style={{flex: 1}} showsHorizontalScrollIndicator={false}>

                    <TouchableOpacity style={[
                      styles.categories_container,
                      selectedCategory === 'Todas' &&
                      styles.selected_category_container]}
                      onPress={() => handleCategorySelect('Todas')}>

                        <Text style={[styles.catg_text,
                          selectedCategory === 'Todas' &&
                          styles.selected_category_text]}>Todas</Text>

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
                      selectedCategory === 'Aprobada' &&
                      styles.selected_category_container]}
                      onPress={() => handleCategorySelect('Aprobada')}>

                      <View style={styles.catg_left}>
                        <Text style={[styles.catg_text,
                          selectedCategory === 'Aprobada' &&
                          styles.selected_category_text]}>Aprobadas</Text>
                      </View>

                      <View style={styles.catg_right}>
                          <Image source={require('../img/complete_icon.png')} style={styles.catg_icon}/>
                      </View>

                    </TouchableOpacity>

                    <TouchableOpacity style={[
                      styles.categories_container,
                      selectedCategory === 'Rechazada' &&
                      styles.selected_category_container]}
                      onPress={() => handleCategorySelect('Rechazada')}>

                      <View style={styles.catg_left}>
                        <Text style={[styles.catg_text,
                          selectedCategory === 'Rechazada' &&
                          styles.selected_category_text]}>Rechazadas</Text>
                      </View>

                      <View style={styles.catg_right}>
                          <Image source={require('../img/Desactivar_tarjeta.png')} style={styles.catg_icon}/>
                      </View>

                    </TouchableOpacity>

                </ScrollView>
              </View>

              { selectedCategory === 'Todas' ?
                solicitudesInfo && solicitudesInfo.map((solicitud, index) => {
                const fechaSolicitud = solicitud && solicitud.fecha ? new Date(solicitud.fecha) : null;
                const horaFormateada = fechaSolicitud ? format(fechaSolicitud, 'h:mm a', {timeZone: 'UTC'}) : null;
                const fechaFormateada = fechaSolicitud ? format(fechaSolicitud, "dd MMMM',' yyyy", { locale: es }) : null;
                return (
                    <>
                        <View key={index} style={solicitud.estado === 'En espera' ?
                        styles.yellow_container : solicitud.estado === 'Aprobada' ?
                        styles.green_container : solicitud.estado === 'Rechazada' ? styles.red_container : styles.gray_container}>
                            <View style={styles.subtitle_container}>
                                 <View style={styles.left}>
                                     <Text style={styles.subtitle1}>Solicitud #{solicitud._id.slice(0, 5)}</Text>
                                 </View>
                                 <View style={styles.right}>
                                     <Text style={solicitud.estado === 'En espera' ?
                                     styles.orange_subtitle : solicitud.estado === 'Aprobada' ?
                                     styles.green_subtitle : solicitud.estado === 'Rechazada' ?
                                     styles.red_subtitle : styles.gray_subtitle}>{solicitud.estado}</Text>
                                 </View>
                             </View>
                             <View style={styles.subtitle_container}>
                                 <View style={styles.left}>
                                     <Text style={styles.light_subtitle}>{fechaFormateada}</Text>
                                 </View>
                                 <View style={styles.right}>
                                     <Text style={styles.light_subtitle}>{horaFormateada}</Text>
                                 </View>
                             </View>
                             <View style={styles.divisor} />
                             <Text style={styles.subtitle1}>Solicitante</Text>
                             <View style={styles.subtitle_container}>
                                 <View style={styles.left}>
                                   <Text style={styles.light_subtitle}>
                                     {solicitud.solicitante[0].nombre} {solicitud.solicitante[0].apellido_paterno} {solicitud.solicitante[0].apellido_materno}
                                     </Text>
                                 </View>
                                 <View style={styles.right}>
                                     <TouchableOpacity>
                                         <Text style={styles.light_subtitle2}>Ver detalles</Text>
                                     </TouchableOpacity>
                                 </View>
                            </View>
                         </View>
                         </>
                    );
                })
                :
                solicitudesFiltradas && solicitudesFiltradas.map((solicitud, index) => {
                  const fechaSolicitud = solicitud && solicitud.fecha ? new Date(solicitud.fecha) : null;
                  const horaFormateada = fechaSolicitud ? format(fechaSolicitud, 'h:mm a', {timeZone: 'UTC'}) : null;
                  const fechaFormateada = fechaSolicitud ? format(fechaSolicitud, "dd MMMM',' yyyy", { locale: es }) : null;
                  return (
                      <>
                          <View key={index} style={solicitud.estado === 'En espera' ?
                          styles.yellow_container : solicitud.estado === 'Aprobada' ?
                          styles.green_container : solicitud.estado === 'Rechazada' ? styles.red_container : styles.gray_container}>
                              <View style={styles.subtitle_container}>
                                   <View style={styles.left}>
                                       <Text style={styles.subtitle1}>Solicitud #{solicitud._id.slice(0, 5)}</Text>
                                   </View>
                                   <View style={styles.right}>
                                       <Text style={solicitud.estado === 'En espera' ?
                                       styles.orange_subtitle : solicitud.estado === 'Aprobada' ?
                                       styles.green_subtitle : solicitud.estado === 'Rechazada' ?
                                       styles.red_subtitle : styles.gray_subtitle}>{solicitud.estado}</Text>
                                   </View>
                               </View>
                               <View style={styles.subtitle_container}>
                                   <View style={styles.left}>
                                       <Text style={styles.light_subtitle}>{fechaFormateada}</Text>
                                   </View>
                                   <View style={styles.right}>
                                       <Text style={styles.light_subtitle}>{horaFormateada}</Text>
                                   </View>
                               </View>
                               <View style={styles.divisor} />
                               <Text style={styles.subtitle1}>Solicitante</Text>
                               <View style={styles.subtitle_container}>
                                   <View style={styles.left}>
                                     <Text style={styles.light_subtitle}>
                                       {solicitud.solicitante[0].nombre} {solicitud.solicitante[0].apellido_paterno} {solicitud.solicitante[0].apellido_materno}
                                       </Text>
                                   </View>
                                   <View style={styles.right}>
                                       <TouchableOpacity>
                                           <Text style={styles.light_subtitle2}>Ver detalles</Text>
                                       </TouchableOpacity>
                                   </View>
                              </View>
                           </View>
                           </>
                      );
                  })
              }

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

  gray_container:{
    flex: 1,
    width: '100%',
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
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
  color: '#002DCC',
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

gray_subtitle:{
  fontFamily: 'DMSans-Medium',
  fontSize: 16,
  color: 'gray',
  marginBottom: 5,
},

divisor:{
  width: '100%',
  height: 15,
},

});

export default AdminRequests;
