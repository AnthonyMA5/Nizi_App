/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import CustomModal from '../components/CustomModal';
import Modal from 'react-native-modal';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Props {
  navigation: any;
  route: RouteProp<any, any>;
}

const AdminOrders: React.FC<Props> = ({navigation, route}) => {

  const { userID } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [pedidosInfo, setPedidosInfo] = useState<any>();

  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const pedidosFiltrados = pedidosInfo ? pedidosInfo.filter((pedido) => pedido.estado === selectedCategory) : [];
  const [pedidoDetails, setPedidoDetails] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inLoop, setInLoop] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const [functionData, setFunctionData] = useState({
    title: '',
    info: '',
    color: '',
    icon: null,
    btn: '',
  });

  const toggleModal = (pedido) => {
    setSelectedPedido(pedido);
    setPedidoDetails(!pedidoDetails);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSelectedPedido = (pedido) => {
    setSelectedPedido(pedido);
    sendStatusUpdate();
    toggleModal(pedido);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
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
      title: 'No pudimos procesar la solicitud',
      info: 'Ocurrió un error al procesar la solicitud, intentalo de nuevo más tarde.',
      color: '#C71D1D',
      icon: require('../animations/sorry_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(false);
    setIsModalVisible(true);
  };

  const handleData = () => {
    setFunctionData({
      title: 'Estado del pedido actualizado',
      info: 'Se ha actualizado la información del estado del pedido correctamente.',
      color: '#00D4A1',
      icon: require('../animations/success_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(false);
    setIsModalVisible(true);
  };

  useEffect(() => {
    fetch('http://192.168.0.3:3000/get_pedidos', {
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
        setPedidosInfo(data);
        setRefreshing(false);
    })
    .catch((error) => {
        console.log(error);
    });
  }, [refreshing]);

  const sendStatusUpdate = () => {
    const documentLog = JSON.stringify({
      idPedido: selectedPedido._id,
      estadoPedido: selectedPedido.estado,
    });
    console.log('Datos enviados al servidor:', documentLog);
    fetch('http://192.168.0.3:3000/update_order_status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: documentLog,
    })
    .then((response) => {
      if (response.status === 400) {
        handleError();
      } else if (response.status === 200) {
        handleData();
      } else {
        handleServerError();
      }
      onRefresh();
    })
    .catch((error) => {
      console.log(error);
      handleServerError();
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
                                                              onEvent={handleModalClose}
                                                              btn={functionData.btn}
                                                              loop={inLoop}/>

              <View style={styles.head}>

                <View style={styles.menu_container}>
                  <TouchableOpacity onPress={()=>navigation.navigate('Home_Admin', {userID:userID})}>
                    <Image style={styles.iconMenu} source={require('../img/back_black_icon.png')}/>
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
                      selectedCategory === 'Entregado' &&
                      styles.selected_category_container]}
                      onPress={() => handleCategorySelect('Entregado')}>

                      <View style={styles.catg_left}>
                        <Text style={[styles.catg_text,
                          selectedCategory === 'Entregado' &&
                          styles.selected_category_text]}>Entregados</Text>
                      </View>

                      <View style={styles.catg_right}>
                          <Image source={require('../img/complete_icon.png')} style={styles.catg_icon}/>
                      </View>

                    </TouchableOpacity>

                </ScrollView>
              </View>

              { selectedCategory === 'Todos' ?
                pedidosInfo && pedidosInfo.map((pedido, index) => {
                const fechaSolicitud = pedido && pedido.fecha ? new Date(pedido.fecha) : null;
                const horaFormateada = fechaSolicitud ? format(fechaSolicitud, 'h:mm a', {timeZone: 'UTC'}) : null;
                const fechaFormateada = fechaSolicitud ? format(fechaSolicitud, "dd 'de' MMMM 'del' yyyy", { locale: es }) : null;
                return (
                        <View key={pedido._id} style={pedido.estado === 'En espera' ?
                        styles.red_container : pedido.estado === 'En cocina' ?
                        styles.yellow_container : pedido.estado === 'Entregado' ? styles.green_container : styles.gray_container}>
                            <View style={styles.subtitle_container}>
                                 <View style={styles.left}>
                                     <Text style={styles.subtitle1}>Pedido #{pedido._id.slice(0, 6)}</Text>
                                 </View>
                                 <View style={styles.right}>
                                     <Text style={pedido.estado === 'En espera' ?
                                     styles.red_subtitle : pedido.estado === 'En cocina' ?
                                     styles.orange_subtitle : pedido.estado === 'Entregado' ?
                                     styles.green_subtitle : styles.gray_subtitle}>{pedido.estado}</Text>
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
                             <Text style={styles.subtitle1}>Cliente</Text>
                             <View style={styles.subtitle_container}>
                                 <View style={styles.left}>
                                 {pedido.cliente && pedido.cliente[0] &&
                                    <Text style={styles.light_subtitle}>
                                      {pedido.cliente[0].nombre} {pedido.cliente[0].apellido_paterno} {pedido.cliente[0].apellido_materno}
                                    </Text>
                                  }
                                 </View>
                                 <View style={styles.right}>
                                     <TouchableOpacity onPressOut={() => toggleModal(pedido)}>
                                          <Text style={styles.light_subtitle2}>Ver detalles</Text>
                                            <Modal backdropOpacity={0.3} style={styles.modal_main_container} isVisible={pedidoDetails}
                                            animationInTiming={250}
                                            animationOutTiming={600}
                                            backdropTransitionInTiming={250}
                                            backdropTransitionOutTiming={600}>
                                            <View style={styles.modal_container}>

                                              <TouchableOpacity onPressOut={() => toggleModal(pedido)}>
                                                <Image source={require('../img/x.png')} style={styles.exit_icon}/>
                                              </TouchableOpacity>

                                              <Text style={styles.title_text}>Pedido #{selectedPedido ? selectedPedido._id.slice(0, 6) : ''}</Text>
                                              {selectedPedido && (
                                                <Text style={selectedPedido.estado === 'En cocina' ? styles.orange_subtitle :
                                                            selectedPedido.estado === 'Entregado' ? styles.green_subtitle :
                                                            selectedPedido.estado === 'En espera' ? styles.red_subtitle :
                                                            styles.gray_subtitle}>
                                                  {selectedPedido.estado}
                                                </Text>
                                              )}
                                              <Text style={styles.title_text}>Nombre del cliente</Text>
                                              <Text style={styles.subtitle_text}>
                                                {selectedPedido ? selectedPedido.cliente[0].nombre + ' ' : ''}
                                                {selectedPedido ? selectedPedido.cliente[0].apellido_paterno + ' ' : ''}
                                                {selectedPedido ? selectedPedido.cliente[0].apellido_materno : ''}
                                              </Text>
                                              <Text style={styles.title_text}>Fecha de pedido</Text>
                                              <Text style={styles.subtitle_text}>
                                              {selectedPedido
                                                ? format(new Date(selectedPedido.fecha), "dd 'de' MMMM 'del' yyyy", { locale: es })
                                                : ''}
                                              {' '}
                                              a las
                                              {' '}
                                              {selectedPedido
                                                ? format(new Date(selectedPedido.fecha), 'h:mm a', {timeZone: 'UTC'}) : ''}
                                              </Text>
                                              <Text style={styles.title_text}>Productos</Text>
                                              {selectedPedido && selectedPedido.productos && selectedPedido.productos.map((producto, index) => (
                                                <Text key={index} style={styles.subtitle_text}>
                                                  {producto.datosProducto[0].nombre}{'\n'}
                                                  Cantidad: {producto.cantidad}{'\n'}
                                                </Text>
                                              ))}

                                          {selectedPedido && (selectedPedido.estado === 'En cocina' || selectedPedido.estado === 'En espera') ? (
                                            <View style={styles.buttons_container}>
                                                <TouchableOpacity style={styles.button_approve} onPress={() => handleSelectedPedido(pedido)}>
                                                  <Text style={styles.button_approve_text}>Actualizar estado del pedido</Text>
                                                </TouchableOpacity>
                                            </View>
                                          ) : (
                                            <View style={styles.divisor} />
                                          )}

                                            </View>
                                          </Modal>
                                     </TouchableOpacity>
                                 </View>
                            </View>
                         </View>
                    );
                })
                :
                pedidosFiltrados && pedidosFiltrados.map((pedido, index) => {
                  const fechaSolicitud = pedido && pedido.fecha ? new Date(pedido.fecha) : null;
                  const horaFormateada = fechaSolicitud ? format(fechaSolicitud, 'h:mm a', {timeZone: 'UTC'}) : null;
                  const fechaFormateada = fechaSolicitud ? format(fechaSolicitud, "dd 'de' MMMM 'del' yyyy", { locale: es }) : null;
                  return (
                    <View key={pedido._id} style={pedido.estado === 'En cocina' ?
                    styles.yellow_container : pedido.estado === 'Entregado' ?
                    styles.green_container : pedido.estado === 'En espera' ? styles.red_container : styles.gray_container}>
                        <View style={styles.subtitle_container}>
                             <View style={styles.left}>
                                 <Text style={styles.subtitle1}>Pedido #{pedido._id.slice(0, 6)}</Text>
                             </View>
                             <View style={styles.right}>
                                 <Text style={pedido.estado === 'En cocina' ?
                                 styles.orange_subtitle : pedido.estado === 'Entregado' ?
                                 styles.green_subtitle : pedido.estado === 'En espera' ?
                                 styles.red_subtitle : styles.gray_subtitle}>{pedido.estado}</Text>
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
                         <Text style={styles.subtitle1}>Cliente</Text>
                         <View style={styles.subtitle_container}>
                          <View style={styles.left}>
                            <Text style={styles.light_subtitle}>
                              {pedido.cliente[0]?.nombre} {pedido.cliente[0]?.apellido_paterno} {pedido.cliente[0]?.apellido_materno}
                            </Text>
                          </View>
                             <View style={styles.right}>
                                 <TouchableOpacity onPressOut={() => toggleModal(pedido)}>
                                      <Text style={styles.light_subtitle2}>Ver detalles</Text>
                                      <Modal backdropOpacity={0.3} style={styles.modal_main_container} isVisible={pedidoDetails}
                                        animationInTiming={250}
                                        animationOutTiming={600}
                                        backdropTransitionInTiming={250}
                                        backdropTransitionOutTiming={600}>
                                        <View style={styles.modal_container}>

                                          <TouchableOpacity onPressOut={() => toggleModal(pedido)}>
                                            <Image source={require('../img/x.png')} style={styles.exit_icon}/>
                                          </TouchableOpacity>

                                          <Text style={styles.title_text}>Solicitud #{selectedPedido ? selectedPedido._id.slice(0, 6) : ''}</Text>
                                          {selectedPedido && (
                                            <Text style={selectedPedido.estado === 'En cocina' ? styles.orange_subtitle :
                                                        selectedPedido.estado === 'Entregado' ? styles.green_subtitle :
                                                        selectedPedido.estado === 'En espera' ? styles.red_subtitle :
                                                        styles.gray_subtitle}>
                                              {selectedPedido.estado}
                                            </Text>
                                          )}
                                          <Text style={styles.title_text}>Nombre del cliente</Text>
                                          <Text style={styles.subtitle_text}>
                                            {selectedPedido?.cliente?.[0]?.nombre + ' '}
                                            {selectedPedido?.cliente?.[0]?.apellido_paterno + ' '}
                                            {selectedPedido?.cliente?.[0]?.apellido_materno}
                                          </Text>
                                          <Text style={styles.title_text}>Fecha de pedido</Text>
                                          <Text style={styles.subtitle_text}>
                                          {selectedPedido
                                            ? format(new Date(selectedPedido.fecha), "dd 'de' MMMM 'del' yyyy", { locale: es })
                                            : ''}
                                          {' '}
                                          a las
                                          {' '}
                                          {selectedPedido
                                            ? format(new Date(selectedPedido.fecha), 'h:mm a', {timeZone: 'UTC'}) : ''}
                                          </Text>
                                          <Text style={styles.title_text}>Productos</Text>
                                              {selectedPedido && selectedPedido.productos && selectedPedido.productos.map((producto, index) => (
                                                <Text key={index} style={styles.subtitle_text}>
                                                  {producto.datosProducto[0].nombre}{'\n'}
                                                  Cantidad: {producto.cantidad}{'\n'}
                                                </Text>
                                              ))}

                                          {selectedPedido && (selectedPedido.estado === 'En cocina' || selectedPedido.estado === 'En espera') ? (
                                            <View style={styles.buttons_container}>
                                                <TouchableOpacity style={styles.button_approve} onPress={() => handleSelectedPedido(pedido)}>
                                                  <Text style={styles.button_approve_text}>Actualizar estado del pedido</Text>
                                                </TouchableOpacity>
                                            </View>
                                          ) : (
                                            <View style={styles.divisor} />
                                          )}

                                        </View>
                                      </Modal>
                                 </TouchableOpacity>
                             </View>
                        </View>
                     </View>
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

  green_container:{
    flex: 1,
    width: '100%',
    backgroundColor: '#F0FEF2',
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
  },

  gray_container:{
    flex: 1,
    width: '100%',
    backgroundColor: 'gray',
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

divisor:{
  width: '100%',
  height: 15,
},

gray_subtitle:{
  fontFamily: 'DMSans-Medium',
  fontSize: 16,
  color: 'gray',
  marginBottom: 5,
},

modal_main_container:{
  justifyContent: 'center',
  alignItems:'center',
},

modal_container:{
    width: '100%',
    padding: 15,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
},

exit_icon:{
  width: 20,
  height: 20,
  marginTop: 5,
  alignSelf: 'flex-end',
},

title_text:{
  fontFamily: 'DMSans-Medium',
  color:'#000',
  fontSize: 16,
  marginTop: 15,
},

subtitle_text:{
  fontFamily: 'DMSans-Regular',
  color:'#424242',
  fontSize: 15,
  textAlign: 'left',
  marginTop: 5,
},

subtitle2_text:{
  fontFamily: 'DMSans-Regular',
  color:'#424242',
  fontSize: 15,
  textAlign: 'justify',
  marginTop: 5,
},

button_reject:{
  padding: 11,
  width:'100%',
  borderRadius: 10,
  marginTop: 30,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: '#C71D1D',
},

button_approve:{
  padding: 12,
  width:'100%',
  borderRadius: 10,
  marginTop: 30,
  marginBottom: 10,
  backgroundColor: '#00C999',
},

button_reject_text:{
  fontFamily: 'DMSans-Medium',
  color: '#000',
  fontSize: 14,
  textAlign: 'center',
},

button_approve_text:{
  fontFamily: 'DMSans-Medium',
  color: '#FFF',
  fontSize: 16,
  textAlign: 'center',
},

buttons_container:{
  flexDirection: 'row',
  alignItems: 'center',
},

button_left:{
    flex: 0.5,
    alignItems: 'flex-start',
    marginRight: 10,
},

button_right:{
    flex: 0.5,
    alignItems: 'flex-end',
    marginLeft: 10,
},

});

export default AdminOrders;
