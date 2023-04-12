/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';
import {Dimensions} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import CustomModal from '../components/CustomModal';

interface Props {
  navigation: any;
  route: RouteProp<any, any>;
}

const Email_Vrf: React.FC<Props> = ({navigation, route}) => {

  const routeParams = route.params;
  const userInfo = routeParams ? routeParams.userInfo : null;
  const userInfoObj = userInfo ? JSON.parse(userInfo) : null;
  
  const screenWidth = Dimensions.get('window').width;
  const barWidth = screenWidth * 0.5;
  const [progress, setProgress] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inLoop, setInLoop] = useState(false);

  const [code, setCode] = useState<string[]>([]);
  const codeString = code.join('');
  const codeInput1Ref = useRef<TextInput>(null);
  const codeInput2Ref = useRef<TextInput>(null);
  const codeInput3Ref = useRef<TextInput>(null);
  const codeInput4Ref = useRef<TextInput>(null);

  const [timeLeft, setTimeLeft] = useState(180); // 3 minutos en segundos

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const timeString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const newEmailCode = generarCodigo();

  setTimeout(() => {
    setProgress(0.5);
  }, 350);

  function generarCodigo(): string {
    let codigo: string = '';
    for (let i = 0; i < 4; i++) {
      codigo += Math.floor(Math.random() * 10).toString();
    }
    return codigo;
  }

  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    switch (index) {
      case 0:
        codeInput2Ref.current?.focus();
        break;
      case 1:
        codeInput3Ref.current?.focus();
        break;
      case 2:
        codeInput4Ref.current?.focus();
        break;
      case 3:
        Keyboard.dismiss();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Limpiar el temporizador después de salir del componente
    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft]);

  const resetTimer = () => {
    setTimeLeft(180);
    generarNuevoCode(); //Llamada a la función
    // Agrega cualquier otra lógica que desees ejecutar al reiniciar el temporizador
  };

  const [functionData, setFunctionData] = useState({
    title: '',
    info: '',
    color: '',
    icon: null,
    btn: '',
  });

  const handleSuccessVerifyCode = () => {
    setFunctionData({
      title: 'Tu correo electrónico ha sido verificado',
      info: '¡Estás a un solo paso de utilizar tu cuenta Nizi!',
      color: '#00D4A1',
      icon: require('../animations/success_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(false);
    setIsModalVisible(true);
  };

  const handleNewCode = () => {
    setFunctionData({
      title: 'Nuevo código de verificación generado',
      info: 'Hemos enviado tu nuevo código de verificación vía correo electrónico',
      color: '#00D4A1',
      icon: require('../animations/success_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(false);
    setIsModalVisible(true);
  };

  const handleErrorVerifyCode = () => {
    setFunctionData({
      title: 'Código incorrecto',
      info: 'El código que ingresaste es incorrecto, por favor verificalo o genera un nuevo código.',
      color: '#C71D1D',
      icon: require('../animations/error_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(false);
    setIsModalVisible(true);
  };

  const handleError = () => {
    setFunctionData({
      title: '¡Lo sentimos!',
      info: 'No fue posible generar un nuevo código de verificación.',
      color: '#C71D1D',
      icon: require('../animations/sorry_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(false);
    setIsModalVisible(true);
  };

  const handleServerError = () => {
    setFunctionData({
      title: 'Error',
      info: 'Ocurrió un error en la comunicación con el servidor',
      color: '#C71D1D',
      icon: require('../animations/error_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(false);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleInputs = () => {
    setFunctionData({
      title: '¡Ups!',
      info: 'Debes colocar todos los dígitos de tu código de verificación.',
      color: '#80D5FF',
      icon: require('../animations/warning_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(true);
    setIsModalVisible(true);
  };

  const handleVerification = () => {
    if (codeString.length < 4) {
      handleInputs();
    } else {
      verificarCode();
    }
  };

  const handleCloseModalAndNavigate = (documentLog: string) => {
    setIsModalVisible(false);
    navigation.navigate('TelephoneV', { userInfo: documentLog });
  };

  const handleModalClose = () => {
    if (functionData.title === 'Tu correo electrónico ha sido verificado') {
        const documentLog = JSON.stringify({
            nombre: userInfoObj.nombre,
            apellido_paterno: userInfoObj.apellido_paterno,
            apellido_materno: userInfoObj.apellido_materno,
            telefono: userInfoObj.telefono,
            email: userInfoObj.email,
            username: userInfoObj.email,
            password: userInfoObj.password,
            estadoEmail: true,
            numeroEmail: null,
            estadoTelefono: userInfoObj.estadoTelefono,
            numeroTelefono: userInfoObj.numeroTelefono,
        });
        handleCloseModalAndNavigate(documentLog);
    } else {
      handleCloseModal();
    }
  };

  const generarNuevoCode = () => {

    const documentLog = JSON.stringify({
      nombre: userInfoObj.nombre,
      email: userInfoObj.email,
      numeroEmail: newEmailCode,
    });

    console.log('Datos enviados al servidor:', documentLog);
    fetch('http://192.168.0.3:3000/nuevo_codigo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: documentLog,
    })
    .then((response) => {
      if (response.status === 201) {
        handleNewCode();
      } else {
        handleError();
      }
    })
    .catch((error) => {
      console.log(error);
      handleServerError();
    });

  };

  const verificarCode = () => {

    const documentLog = JSON.stringify({
      telefono: userInfoObj.telefono,
      numeroTelefono: userInfoObj.numeroTelefono,
      email: userInfoObj.email,
      estadoEmail: true,
      numeroEmail: codeString,
    });

    console.log('Datos enviados al servidor:', documentLog);
    fetch('http://192.168.0.3:3000/verificar_codigo_email', {
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
            handleSuccessVerifyCode();
        } else {
          handleErrorVerifyCode();
        }
      });
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
          <Progress.Bar
            style={{alignSelf: 'center'}}
            width={barWidth}
            height={10}
            borderRadius={10}
            progress={progress}
            color="#00E0F8"
            unfilledColor="#F2F2F2"
            borderColor="transparent"
            indeterminateAnimationDuration={5000}
          />
          <Text style={styles.step}>Paso 1 de 2</Text>
          <Text style={styles.title}>Verifica tu correo electrónico</Text>
          <Text style={styles.subtitle}>
            Hemos enviado un código a tu correo electrónico para verificar que
            te pertenece, si no lo has recibido espera unos minutos además recuerda revisar tu bandeja de spam.
          </Text>
          <View style={styles.code_container}>
            <TextInput
              maxLength={1}
              keyboardType="number-pad"
              placeholder=""
              value={code[0]}
              onChangeText={(text) => handleCodeChange(text, 0)}
              style={styles.input}
              ref={codeInput1Ref}
            />
            <TextInput
              maxLength={1}
              keyboardType="number-pad"
              placeholder=""
              value={code[1]}
              onChangeText={(text) => handleCodeChange(text, 1)}
              style={styles.input}
              ref={codeInput2Ref}
            />
            <TextInput
              maxLength={1}
              keyboardType="number-pad"
              placeholder=""
              value={code[2]}
              onChangeText={(text) => handleCodeChange(text, 2)}
              style={styles.input}
              ref={codeInput3Ref}
            />
            <TextInput
              maxLength={1}
              keyboardType="number-pad"
              placeholder=""
              value={code[3]}
              onChangeText={(text) => handleCodeChange(text, 3)}
              style={styles.input}
              ref={codeInput4Ref}
            />
          </View>
          <TouchableOpacity onPress={handleVerification}>
            <CustomModal 
              title={functionData.title}
              info={functionData.info}
              color={functionData.color}
              icon={functionData.icon}
              isVisible={isModalVisible}
              onEvent={handleModalClose}
              btn={functionData.btn}
              loop={inLoop}/>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#3733EF', '#3733EF']}
              style={styles.btnContinuar}>
              <Text style={styles.btnContinuarText}> Continuar </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={resetTimer} disabled={timeLeft > 0}>
            <Text style={timeLeft <= 0 ? styles.time_expired : styles.time_count}>
              {timeLeft <= 0 ? 'Generar código' : `Generar nuevo código en ${timeString}`}
            </Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  scroll_container: {
    flex: 1,
    width: '100%',
    marginTop: 50,
  },

  container: {
    flex: 1,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 50,
    backgroundColor: '#FFFFFF',
  },

  step: {
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginTop: 22,
  },

  title: {
    fontFamily: 'DMSans-Bold',
    fontSize: 21,
    fontWeight: '600',
    color: '#000000',
    marginTop: 40,
    textAlign: 'center',
  },

  subtitle: {
    fontFamily: 'DMSans-Regular',
    fontSize: 15,
    color: '#000000',
    marginTop: 30,
    textAlign: 'center',
  },

  code_container: {
    marginTop: 40,
    flexDirection: 'row',
  },

  input: {
    fontFamily: 'DMSans-Medium',
    flex: 0.25,
    textAlign: 'center',
    color: '#000000',
    fontSize: 22,
    borderWidth: 1,
    borderColor: '#000000',
    margin: 17,
    width: 200,
    borderRadius: 10,
  },

  btnContinuar: {
    backgroundColor: '#0500EB',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  btnContinuarText: {
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
  },

  time_count: {
    fontFamily: 'DMSans-Medium',
    marginTop: 35,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#939393',
  },

  time_expired: {
    fontFamily: 'DMSans-Medium',
    marginTop: 35,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#0500EB',
  },
  
});

export default Email_Vrf;
