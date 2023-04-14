/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { RouteProp } from '@react-navigation/native';
import CustomModal from '../components/CustomModal';

interface Props {
  navigation: any;
  route: RouteProp<any, any>;
}

const AdminRequests: React.FC<Props> = ({navigation, route}) => {

  const { userID } = route.params;

  const [numeroTarjeta] = useState('35981167');
  const [codigoTarjeta, setCodigoTarjeta] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [solicitudesInfo, setSolicitudesInfo] = useState<any>();
  const solicitudesFiltradas = solicitudesInfo ? solicitudesInfo.filter((solicitud) => solicitud.estado === selectedCategory) : [];

  const [solicitudDetails, setSolicitudDetails] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [cardDetails, setCardDetails] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inLoop, setInLoop] = useState(false);

  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [cvv, setCvv] = useState(generarCVV());

  const [functionData, setFunctionData] = useState({
    title: '',
    info: '',
    color: '',
    icon: null,
    btn: '',
  });

  const handleFechaChange = (text) => {
    // remueve cualquier caracter que no sea un número
    const cleaned = text.replace(/[^0-9]/g, '');
    // si tiene más de 2 dígitos, agrega el separador /
    if (cleaned.length > 2) {
      const day = cleaned.slice(0, 2);
      const month = cleaned.slice(2, 4);
      const year = cleaned.slice(4, 8);
      setFechaVencimiento(`${day}/${month}/${year}`);
    } else {
      setFechaVencimiento(cleaned);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const toggleModal = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setSolicitudDetails(!solicitudDetails);
  };

  const goCardDetails = (solicitud) => {
    setCardDetails(!cardDetails);
  };

  function generarCVV(): string {
    let codigo: string = '';
    for (let i = 0; i < 3; i++) {
      codigo += Math.floor(Math.random() * 10).toString();
    }
    return codigo;
  }

  const handleInputs = () => {
    setFunctionData({
      title: '¡Ups!',
      info: 'Algunos campos se encuentran vacíos, por favor completalos.',
      color: '#80D5FF',
      icon: require('../animations/warning_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(true);
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
      title: 'No pudimos procesar la solicitud',
      info: 'Ocurrió un error al procesar la solicitud, intentalo de nuevo más tarde.',
      color: '#C71D1D',
      icon: require('../animations/sorry_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(false);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleModalClose = () => {
    if (functionData.title === 'Solicitud aprobada' || 'Solicitud rechazada') {
      setSolicitudDetails(false);
      setCardDetails(false);
      setIsModalVisible(false);
      navigation.navigate('Requests_Admin', {userID:userID});
    } else {
      handleCloseModal();
    }
  };

  const handleData = () => {
    setFunctionData({
      title: 'Solicitud aprobada',
      info: 'La solicitud fue aprobada con éxito.',
      color: '#00D4A1',
      icon: require('../animations/success_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(false);
    setIsModalVisible(true);
  };

  const handleData2 = () => {
    setFunctionData({
      title: 'Solicitud rechazada',
      info: 'La solicitud fue rechazada con éxito.',
      color: '#00D4A1',
      icon: require('../animations/success_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(false);
    setIsModalVisible(true);
  };

  const handleRequest = () => {
    if ([codigoTarjeta, cvv, numeroTarjeta, fechaVencimiento].includes('')){
            handleInputs();
        } else {
            sendRequestApproveResponse();
        }
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

  const sendRequestApproveResponse = () => {

    const [day, month, year] = fechaVencimiento.split('/');
    const fecha = new Date(year, month - 1, day);

    const documentLog = JSON.stringify({
      idSolicitud: selectedSolicitud._id,
      estado: 'Aprobada',
      idUsuario: selectedSolicitud.solicitante[0]._id,
      numeroTarjeta: numeroTarjeta+codigoTarjeta,
      cvv: cvv,
      fechaVencimiento: fecha,
    });
    console.log('Datos enviados al servidor:', documentLog);
    fetch('http://192.168.0.3:3000/update_assign_card_request', {
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
    })
    .catch((error) => {
      console.log(error);
      handleServerError();
    });
  };

  const sendRequestRejectedResponse = () => {

    const [day, month, year] = fechaVencimiento.split('/');
    const fecha = new Date(year, month - 1, day);

    const documentLog = JSON.stringify({
      idSolicitud: selectedSolicitud._id,
      estado: 'Rechazada',
      idUsuario: selectedSolicitud.solicitante[0]._id,
      numeroTarjeta: numeroTarjeta,
      cvv: cvv,
      fechaVencimiento: fecha,
    });
    console.log('Datos enviados al servidor:', documentLog);
    fetch('http://192.168.0.3:3000/update_assign_card_request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: documentLog,
    })
    .then((response) => {
      if (response.status === 200) {
        handleData2();
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
                        <View key={solicitud._id} style={solicitud.estado === 'En espera' ?
                        styles.yellow_container : solicitud.estado === 'Aprobada' ?
                        styles.green_container : solicitud.estado === 'Rechazada' ? styles.red_container : styles.gray_container}>
                            <View style={styles.subtitle_container}>
                                 <View style={styles.left}>
                                     <Text style={styles.subtitle1}>Solicitud #{solicitud._id.slice(0, 6)}</Text>
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
                                     <TouchableOpacity onPressOut={() => toggleModal(solicitud)}>
                                          <Text style={styles.light_subtitle2}>Ver detalles</Text>
                                          <Modal backdropOpacity={0.3} style={styles.modal_main_container} isVisible={solicitudDetails}
                                            animationInTiming={250}
                                            animationOutTiming={600}
                                            backdropTransitionInTiming={250}
                                            backdropTransitionOutTiming={600}>
                                            <View style={styles.modal_container}>

                                              <TouchableOpacity onPressOut={() => toggleModal(solicitud)}>
                                                <Image source={require('../img/x.png')} style={styles.exit_icon}/>
                                              </TouchableOpacity>

                                              <Text style={styles.title_text}>Solicitud #{selectedSolicitud ? selectedSolicitud._id.slice(0, 6) : ''}</Text>
                                              {selectedSolicitud && (
                                                <Text style={selectedSolicitud.estado === 'En espera' ? styles.orange_subtitle :
                                                            selectedSolicitud.estado === 'Aprobada' ? styles.green_subtitle :
                                                            selectedSolicitud.estado === 'Rechazada' ? styles.red_subtitle :
                                                            styles.gray_subtitle}>
                                                  {selectedSolicitud.estado}
                                                </Text>
                                              )}
                                              <Text style={styles.title_text}>Nombre del solicitante</Text>
                                              <Text style={styles.subtitle_text}>
                                                {selectedSolicitud ? selectedSolicitud.solicitante[0].nombre + ' ' : ''}
                                                {selectedSolicitud ? selectedSolicitud.solicitante[0].apellido_paterno + ' ' : ''}
                                                {selectedSolicitud ? selectedSolicitud.solicitante[0].apellido_materno : ''}
                                              </Text>
                                              <Text style={styles.title_text}>Domicilio</Text>
                                              <Text style={styles.subtitle_text}>
                                                {selectedSolicitud ? selectedSolicitud.solicitante[0].direccion[0].calle + ' #' : ''}
                                                {selectedSolicitud ? selectedSolicitud.solicitante[0].direccion[0].numeroExterior + ', ' : ''}
                                                {selectedSolicitud ? selectedSolicitud.solicitante[0].direccion[0].numeroInterior + ' ' : ''}
                                                {selectedSolicitud ? selectedSolicitud.solicitante[0].direccion[0].colonia + ', ' : ''}
                                                {selectedSolicitud ? selectedSolicitud.solicitante[0].direccion[0].municipio + ', ' : ''}
                                                {selectedSolicitud ? selectedSolicitud.solicitante[0].direccion[0].codigoPostal + ', ' : ''}
                                                {selectedSolicitud ? selectedSolicitud.solicitante[0].direccion[0].estado + '.' : ''}
                                              </Text>
                                              <Text style={styles.title_text}>Número de teléfono</Text>
                                              <Text style={styles.subtitle_text}>
                                                {selectedSolicitud ? selectedSolicitud.solicitante[0].telefono : ''}
                                              </Text>

                                              <Text style={styles.title_text}>Correo electrónico</Text>
                                              <Text style={styles.subtitle_text}>
                                                {selectedSolicitud ? selectedSolicitud.solicitante[0].email : ''}
                                              </Text>

                                              <Text style={styles.title_text}>Fecha de solicitud</Text>
                                              <Text style={styles.subtitle_text}>
                                              {selectedSolicitud
                                                ? format(new Date(selectedSolicitud.fecha), "dd 'de' MMMM 'del' yyyy", { locale: es })
                                                : ''}
                                              {' '}
                                              a las
                                              {' '}
                                              {selectedSolicitud
                                                ? format(new Date(selectedSolicitud.fecha), 'h:mm a', {timeZone: 'UTC'}) : ''}
                                              </Text>

                                              {selectedSolicitud && selectedSolicitud.estado === 'En espera' ? (
                                                <View style={styles.buttons_container}>
                                                  <View style={styles.button_left}>
                                                    <TouchableOpacity style={styles.button_reject} onPressOut={sendRequestRejectedResponse}>
                                                      <CustomModal
                                                                  title={functionData.title}
                                                                  info={functionData.info}
                                                                  color={functionData.color}
                                                                  icon={functionData.icon}
                                                                  isVisible={isModalVisible}
                                                                  onEvent={handleModalClose}
                                                                  btn={functionData.btn}
                                                                  loop={inLoop}/>
                                                      <Text style={styles.button_reject_text}>Rechazar solicitud</Text>
                                                    </TouchableOpacity>
                                                  </View>
                                                  <View style={styles.button_right}>
                                                    <TouchableOpacity style={styles.button_approve} onPressOut={() =>goCardDetails(solicitud)}>
                                                      <Text style={styles.button_approve_text}>Aprobar solicitud</Text>
                                                      <Modal backdropOpacity={0.6} style={styles.modal_main_container} isVisible={cardDetails}
                                                        animationInTiming={250}
                                                        animationOutTiming={600}
                                                        backdropTransitionInTiming={250}
                                                        backdropTransitionOutTiming={600}>
                                                        <View style={styles.modal_container}>

                                                          <TouchableOpacity onPressOut={() => goCardDetails(solicitud)}>
                                                            <Image source={require('../img/x.png')} style={styles.exit_icon}/>
                                                          </TouchableOpacity>

                                                          <Text style={styles.title_text}>Información de la tarjeta</Text>
                                                          <Text style={styles.subtitle2_text}>Para completar la aprobación de la solicitud es necesario que llenes la información de la tarjeta que será asignada y enviada a{' '}
                                                          {selectedSolicitud ? selectedSolicitud.solicitante[0].nombre : ''}.</Text>

                                                          <View style={styles.divisor}/>

                                                          <Text style={styles.title_text}>Número de tarjeta</Text>
                                                          <View style={styles.divisor}/>
                                                          <View style={styles.cardnumber}>
                                                            <TextInput style={styles.disabled_input} value={numeroTarjeta.match(/.{1,4}/g).join(' ')} editable={false}/>
                                                            <View style={styles.horizontal_divisor}/>
                                                            <TextInput style={styles.input} placeholder= "8 dígitos de tarjeta RFID    " value={codigoTarjeta ? codigoTarjeta.match(/(\d{1,4})/g).join(' ') : ''}
                                                            onChangeText={setCodigoTarjeta} placeholderTextColor={'#878787'} keyboardType="number-pad" maxLength={9}/>
                                                          </View>

                                                          <View style={styles.cardnumber}>
                                                            <View style={styles.left2}>
                                                              <Text style={styles.title_text}>Fecha vencimiento</Text>
                                                              <View style={styles.divisor}/>
                                                              <TextInput
                                                              style={styles.input}
                                                              placeholder="DD/MM/AAAA"
                                                              value={fechaVencimiento}
                                                              onChangeText={handleFechaChange}
                                                              placeholderTextColor="#878787"
                                                              keyboardType="numeric"
                                                              />
                                                            </View>
                                                            <View style={styles.right2}>
                                                              <Text style={styles.title_text}>CVV</Text>
                                                              <View style={styles.divisor}/>
                                                              <TextInput
                                                              style={styles.disabled_input}
                                                              value={cvv}
                                                              placeholderTextColor="#878787" editable={false}
                                                              />
                                                            </View>
                                                          </View>

                                                          <View style={styles.buttons_container}>
                                                              <TouchableOpacity style={styles.button_approve} onPress={handleRequest}>
                                                                <CustomModal
                                                                    title={functionData.title}
                                                                    info={functionData.info}
                                                                    color={functionData.color}
                                                                    icon={functionData.icon}
                                                                    isVisible={isModalVisible}
                                                                    onEvent={handleModalClose}
                                                                    btn={functionData.btn}
                                                                    loop={inLoop}/>
                                                                <Text style={styles.button_approve_text}>Asignar tarjeta</Text>
                                                              </TouchableOpacity>
                                                          </View>

                                                        </View>
                                                      </Modal>
                                                    </TouchableOpacity>
                                                  </View>
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
                solicitudesFiltradas && solicitudesFiltradas.map((solicitud, index) => {
                  const fechaSolicitud = solicitud && solicitud.fecha ? new Date(solicitud.fecha) : null;
                  const horaFormateada = fechaSolicitud ? format(fechaSolicitud, 'h:mm a', {timeZone: 'UTC'}) : null;
                  const fechaFormateada = fechaSolicitud ? format(fechaSolicitud, "dd MMMM',' yyyy", { locale: es }) : null;
                  return (
                    <View key={solicitud._id} style={solicitud.estado === 'En espera' ?
                    styles.yellow_container : solicitud.estado === 'Aprobada' ?
                    styles.green_container : solicitud.estado === 'Rechazada' ? styles.red_container : styles.gray_container}>
                        <View style={styles.subtitle_container}>
                             <View style={styles.left}>
                                 <Text style={styles.subtitle1}>Solicitud #{solicitud._id.slice(0, 6)}</Text>
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
                                 <TouchableOpacity onPressOut={() => toggleModal(solicitud)}>
                                      <Text style={styles.light_subtitle2}>Ver detalles</Text>
                                      <Modal backdropOpacity={0.3} style={styles.modal_main_container} isVisible={solicitudDetails}
                                        animationInTiming={250}
                                        animationOutTiming={600}
                                        backdropTransitionInTiming={250}
                                        backdropTransitionOutTiming={600}>
                                        <View style={styles.modal_container}>

                                          <TouchableOpacity onPressOut={() => toggleModal(solicitud)}>
                                            <Image source={require('../img/x.png')} style={styles.exit_icon}/>
                                          </TouchableOpacity>

                                          <Text style={styles.title_text}>Solicitud #{selectedSolicitud ? selectedSolicitud._id.slice(0, 6) : ''}</Text>
                                          {selectedSolicitud && (
                                            <Text style={selectedSolicitud.estado === 'En espera' ? styles.orange_subtitle :
                                                        selectedSolicitud.estado === 'Aprobada' ? styles.green_subtitle :
                                                        selectedSolicitud.estado === 'Rechazada' ? styles.red_subtitle :
                                                        styles.gray_subtitle}>
                                              {selectedSolicitud.estado}
                                            </Text>
                                          )}
                                          <Text style={styles.title_text}>Nombre del solicitante</Text>
                                          <Text style={styles.subtitle_text}>
                                            {selectedSolicitud ? selectedSolicitud.solicitante[0].nombre + ' ' : ''}
                                            {selectedSolicitud ? selectedSolicitud.solicitante[0].apellido_paterno + ' ' : ''}
                                            {selectedSolicitud ? selectedSolicitud.solicitante[0].apellido_materno : ''}
                                          </Text>
                                          <Text style={styles.title_text}>Domicilio</Text>
                                          <Text style={styles.subtitle_text}>
                                            {selectedSolicitud ? selectedSolicitud.solicitante[0].direccion[0].calle + ' #' : ''}
                                            {selectedSolicitud ? selectedSolicitud.solicitante[0].direccion[0].numeroExterior + ', ' : ''}
                                            {selectedSolicitud ? selectedSolicitud.solicitante[0].direccion[0].numeroInterior + ' ' : ''}
                                            {selectedSolicitud ? selectedSolicitud.solicitante[0].direccion[0].colonia + ', ' : ''}
                                            {selectedSolicitud ? selectedSolicitud.solicitante[0].direccion[0].municipio + ', ' : ''}
                                            {selectedSolicitud ? selectedSolicitud.solicitante[0].direccion[0].codigoPostal + ', ' : ''}
                                            {selectedSolicitud ? selectedSolicitud.solicitante[0].direccion[0].estado + '.' : ''}
                                          </Text>
                                          <Text style={styles.title_text}>Número de teléfono</Text>
                                          <Text style={styles.subtitle_text}>
                                            {selectedSolicitud ? selectedSolicitud.solicitante[0].telefono : ''}
                                          </Text>

                                          <Text style={styles.title_text}>Correo electrónico</Text>
                                          <Text style={styles.subtitle_text}>
                                            {selectedSolicitud ? selectedSolicitud.solicitante[0].email : ''}
                                          </Text>

                                          <Text style={styles.title_text}>Fecha de solicitud</Text>
                                          <Text style={styles.subtitle_text}>
                                          {selectedSolicitud
                                            ? format(new Date(selectedSolicitud.fecha), "dd 'de' MMMM 'del' yyyy", { locale: es })
                                            : ''}
                                          {' '}
                                          a las
                                          {' '}
                                          {selectedSolicitud
                                            ? format(new Date(selectedSolicitud.fecha), 'h:mm a', {timeZone: 'UTC'}) : ''}
                                          </Text>

                                          {selectedSolicitud && selectedSolicitud.estado === 'En espera' ? (
                                            <View style={styles.buttons_container}>
                                              <View style={styles.button_left}>
                                                <TouchableOpacity style={styles.button_reject} onPressOut={sendRequestRejectedResponse}>
                                                  <CustomModal
                                                              title={functionData.title}
                                                              info={functionData.info}
                                                              color={functionData.color}
                                                              icon={functionData.icon}
                                                              isVisible={isModalVisible}
                                                              onEvent={handleModalClose}
                                                              btn={functionData.btn}
                                                              loop={inLoop}/>
                                                  <Text style={styles.button_reject_text}>Rechazar solicitud</Text>
                                                </TouchableOpacity>
                                              </View>
                                              <View style={styles.button_right}>
                                                <TouchableOpacity style={styles.button_approve} onPressOut={() =>goCardDetails(solicitud)}>
                                                  <Text style={styles.button_approve_text}>Aprobar solicitud</Text>
                                                  <Modal backdropOpacity={0.6} style={styles.modal_main_container} isVisible={cardDetails}
                                                    animationInTiming={250}
                                                    animationOutTiming={600}
                                                    backdropTransitionInTiming={250}
                                                    backdropTransitionOutTiming={600}>
                                                    <View style={styles.modal_container}>

                                                      <TouchableOpacity onPressOut={() => goCardDetails(solicitud)}>
                                                        <Image source={require('../img/x.png')} style={styles.exit_icon}/>
                                                      </TouchableOpacity>

                                                      <Text style={styles.title_text}>Información de la tarjeta</Text>
                                                      <Text style={styles.subtitle2_text}>Para completar la aprobación de la solicitud es necesario que llenes la información de la tarjeta que será asignada y enviada a{' '}
                                                      {selectedSolicitud ? selectedSolicitud.solicitante[0].nombre : ''}.</Text>

                                                      <View style={styles.divisor}/>

                                                      <Text style={styles.title_text}>Número de tarjeta</Text>
                                                      <View style={styles.divisor}/>
                                                      <View style={styles.cardnumber}>
                                                        <TextInput style={styles.disabled_input} value={numeroTarjeta.match(/.{1,4}/g).join(' ')} editable={false}/>
                                                        <View style={styles.horizontal_divisor}/>
                                                        <TextInput style={styles.input} placeholder= "8 dígitos de tarjeta RFID    " value={codigoTarjeta ? codigoTarjeta.match(/(\d{1,4})/g).join(' ') : ''}
                                                        onChangeText={setCodigoTarjeta} placeholderTextColor={'#878787'} keyboardType="number-pad" maxLength={9}/>
                                                      </View>

                                                      <View style={styles.cardnumber}>
                                                        <View style={styles.left2}>
                                                          <Text style={styles.title_text}>Fecha vencimiento</Text>
                                                          <View style={styles.divisor}/>
                                                          <TextInput
                                                          style={styles.input}
                                                          placeholder="DD/MM/AAAA"
                                                          value={fechaVencimiento}
                                                          onChangeText={handleFechaChange}
                                                          placeholderTextColor="#878787"
                                                          keyboardType="numeric"
                                                          />
                                                        </View>
                                                        <View style={styles.right2}>
                                                          <Text style={styles.title_text}>CVV</Text>
                                                          <View style={styles.divisor}/>
                                                          <TextInput
                                                          style={styles.disabled_input}
                                                          value={cvv}
                                                          placeholderTextColor="#878787" editable={false}
                                                          />
                                                        </View>
                                                      </View>

                                                      <View style={styles.buttons_container}>
                                                          <TouchableOpacity style={styles.button_approve} onPress={handleRequest}>
                                                            <CustomModal
                                                                title={functionData.title}
                                                                info={functionData.info}
                                                                color={functionData.color}
                                                                icon={functionData.icon}
                                                                isVisible={isModalVisible}
                                                                onEvent={handleModalClose}
                                                                btn={functionData.btn}
                                                                loop={inLoop}/>
                                                            <Text style={styles.button_approve_text}>Asignar tarjeta</Text>
                                                          </TouchableOpacity>
                                                      </View>

                                                    </View>
                                                  </Modal>
                                                </TouchableOpacity>
                                              </View>
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

  left2:{
    flex: 0.6,
    alignItems: 'flex-start',
},

  right2:{
    flex: 0.4,
    alignItems: 'flex-start',
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
    backgroundColor: '#00D4A1',
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
    fontSize: 14,
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

  disabled_input: {
    padding: 10,
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    color: '#000',
    backgroundColor: '#E2E2E2',
    borderRadius: 10,
  },

  input: {
    padding: 10,
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    color: '#000',
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
  },

  horizontal_divisor:{
    width: 8,
    height: '100%',
  },

  cardnumber:{
    flexDirection: 'row',
  },

  extradata:{
    flex:1,
    flexDirection: 'row',
    marginTop: 12,
  },

});

export default AdminRequests;
