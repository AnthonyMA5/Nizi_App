/* eslint-disable prettier/prettier */
// CustomModal.tsx
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import CustomModal from './CustomModal';

interface CustomModalProps {
  title: string;
  info: string;
  color: string;
  icon: any;
  btn: string;
  isVisible: boolean;
  loop: boolean;
  onEvent: () => void;
}

let newPassword: string;

const RecoverPassModal = (props: CustomModalProps) => {

    const [email, setEmail] = useState('');

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inLoop, setInLoop] = useState(false);

    function generarNewPass(): string {
        const caracteres = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';
        let newPass = '';
        for (let i = 0; i < 12; i++) {
          newPass += caracteres[Math.floor(Math.random() * caracteres.length)];
        }
        return newPass;
    }

    function validarCorreo(correo: string): boolean {
      const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // Expresión regular para validar el correo
      return regex.test(correo); // Devuelve true si el correo es válido, false en caso contrario
  }

    const [functionData, setFunctionData] = useState({
        title: '',
        info: '',
        color: '',
        icon: null,
        btn: '',
    });

    const handleRecoverPass = () => {
      console.log(email);
        if (email.trim().length === 0){
            handleInputs();
        } else if (!validarCorreo(email)) {
          handleInvalidEmail();
        } else {
            recoverPass();
        }
    };

    const handleInputs = () => {
        setFunctionData({
          title: '¡Ups!',
          info: 'No puedes dejar el campo de correo electrónico vacío.',
          color: '#80D5FF',
          icon: require('../animations/warning_icon.json'),
          btn: 'Entendido',
        });
        setInLoop(true);
        setIsModalVisible(true);
    };

    const handleInvalidEmail = () => {
      setFunctionData({
        title: 'Correo electrónico no válido',
        info: 'Por favor ingresa una dirección de correo electrónico válida',
        color: '#C71D1D',
        icon: require('../animations/error_icon.json'),
        btn: 'Entendido',
      });
      setInLoop(false);
      setIsModalVisible(true);
    };

    const handleSuccess = () => {
        setFunctionData({
          title: 'Tu contraseña ha sido restaurada',
          info: 'Hemos enviado toda la información sobre tu solicitud vía correo electrónico',
          color: '#00D4A1',
          icon: require('../animations/success_icon.json'),
          btn: 'Entendido',
        });
        setInLoop(false);
        setIsModalVisible(true);
    };

    const handleData = () => {
        setFunctionData({
          title: 'Cuenta inexistente',
          info: 'El correo electrónico que nos proporcionaste no pertenece a ninguna cuenta.',
          color: '#C71D1D',
          icon: require('../animations/error_icon.json'),
          btn: 'OK',
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

    const recoverPass = () => {

        newPassword = generarNewPass();

        const documentLog = JSON.stringify({
          email: email,
          password: newPassword,
        });
        fetch('http://192.168.95.220:3000/recoverPass',{
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
                handleSuccess();
              }
            } else {
              handleData();
            }
          }).catch((error) => {
            console.log(error);
            handleServerError();
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
    <Modal backdropOpacity={0.5} style={styles.main_container} isVisible={props.isVisible}
        animationInTiming={250}
        animationOutTiming={600}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={600}>
        <View style={styles.container}>
          <TouchableOpacity onPressOut={props.onEvent}>
            <Image source={require('../img/x.png')} style={styles.exit_icon}/>
          </TouchableOpacity>

          <Text style={styles.title_text}>{props.title}</Text>
          <Text style={styles.info_text}>{props.info}</Text>

          <LottieView source={props.icon} style={styles.icon}
          autoPlay
          loop={props.loop}/>

          <View style={styles.sectionStyle}>
            <TextInput style={styles.input} placeholder= "ejemplo@tucorreo.com" placeholderTextColor={'#878787'}
                value={email} onChangeText={setEmail}/>
          </View>

          <Pressable style={[styles.button, {backgroundColor: props.color}]} onPress={handleRecoverPass} android_ripple={{ color: 'lightgray' }}>
            <CustomModal
                title={functionData.title}
                info={functionData.info}
                color={functionData.color}
                icon={functionData.icon}
                isVisible={isModalVisible}
                onEvent={handleCloseModal}
                btn={functionData.btn}
                loop={inLoop}/>
            <Text style={styles.button_text}>{props.btn}</Text>
          </Pressable>
        </View>
    </Modal>
    );
};

const styles = StyleSheet.create({

    main_container:{
        justifyContent: 'center',
        alignItems:'center',
    },

    container:{
        width: '100%',
        padding: 15,
        backgroundColor: '#FFF',
        borderRadius: 12,
    },

    exit_icon:{
        width: 20,
        height: 20,
        marginTop: 5,
        marginBottom: 15,
        alignSelf: 'flex-end',
    },

    icon:{
        width: 180,
        height: 180,
        alignSelf: 'center',
    },

    title_text:{
        fontFamily: 'DMSans-Bold',
        color:'#000',
        fontSize: 19,
        marginBottom: 15,
        textAlign: 'center',
    },

    info_text:{
        fontFamily: 'DMSans-Regular',
        color:'#6A6A6A',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
    },

    button:{
        padding: 15,
        width:'100%',
        borderRadius: 10,
        marginTop: 30,
        marginBottom: 10,
    },

    button_text:{
        fontFamily: 'DMSans-Medium',
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center',
    },

    sectionStyle: {
        borderWidth: 0.4,
        borderRadius: 10,
        borderColor: '#6A6A6A',
        marginTop: 15,
    },

    input: {
        fontFamily: 'DMSans-Medium',
        fontSize: 15,
        marginLeft: 5,
        color: '#000000',
        marginStart: 10,
    },

});

export default RecoverPassModal;
