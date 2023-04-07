/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable semi */
/* eslint-disable keyword-spacing */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */

import React, {useState} from "react";
import { Alert, TextInput } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CheckBox from '@react-native-community/checkbox';
import TermsConditionsModal from "../components/TermsConditionsModal";
import CustomModal from "../components/CustomModal";

interface Props {
    navigation: any;
}

let emailCode: string, telephoneCode: string;

const Sign_Up: React.FC<Props> = ({navigation}) => {

    const [nombre, setNombre] = useState('');
    const [app, setApp] = useState('');
    const [apm, setApm] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [username, setUsername] = useState('');
    const [contrasena, setContrasena] = useState('');

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [inLoop, setInLoop] = useState(false);

    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    function validarCorreo(correo: string): boolean {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // Expresión regular para validar el correo
        return regex.test(correo); // Devuelve true si el correo es válido, false en caso contrario
    }

    function generarCodigo(): string {
        let codigo: string = "";
        for (let i = 0; i < 4; i++) {
          codigo += Math.floor(Math.random() * 10).toString();
        }
        return codigo;
    }

    const [functionData, setFunctionData] = useState({
        title: '',
        info: '',
        color: '',
        icon: null,
        btn: '',
    });

    const handleInputs = () => {
        setFunctionData({
          title: '¡Ups!',
          info: 'Algunos campos se encuentran vacíos, por favor completalos.',
          color: '#80D5FF',
          icon: require('../animations/warning_icon.json'),
          btn: 'Entendido',
        });
        setInLoop(true)
        setIsModalVisible(true);
    };

    const handleData = () => {
        setFunctionData({
          title: 'Tu cuenta ha sido creada',
          info: '¡Felicidades ya formas parte de Nizi!',
          color: '#00D4A1',
          icon: require('../animations/success_icon.json'),
          btn: 'Entendido',
        });
        setInLoop(false)
        setIsModalVisible(true);
    };

    const handleTermsConditions = () => {
        setFunctionData({
          title: 'Falta un paso más',
          info: 'Para continuar es necesario que aceptes los términos y condiciones.',
          color: '#80D5FF',
          icon: require('../animations/warning_icon.json'),
          btn: 'Entendido',
        });
        setInLoop(false)
        setIsModalVisible(true);
    };

    const handleTelephoneError = () => {
        setFunctionData({
          title: 'Número telefónico no disponible',
          info: 'El número telefónico que ingresaste ya se encuentra vinculado a otra cuenta.',
          color: '#C71D1D',
          icon: require('../animations/error_icon.json'),
          btn: 'OK',
        });
        setInLoop(false)
        setIsModalVisible(true);
    };
    
    const handleInvalidPhone = () => {
        setFunctionData({
          title: '¡Ups!',
          info: 'El número telefónico debe \ncontener 12 dígitos.\n\nCódigo de tu pais a 2 dígitos \nseguido de tu número a 10 dígitos.',
          color: '#80D5FF',
          icon: require('../animations/warning_icon.json'),
          btn: 'Entendido',
        });
        setInLoop(true)
        setIsModalVisible(true);
    };

    const handleInvalidPass = () => {
        setFunctionData({
          title: '¡Ups!',
          info: 'La contraseña debe tener 8 carácteres como mínimo.',
          color: '#80D5FF',
          icon: require('../animations/warning_icon.json'),
          btn: 'Entendido',
        });
        setInLoop(true)
        setIsModalVisible(true);
    };

    const handleEmailError = () => {
        setFunctionData({
          title: 'Correo electrónico no disponible',
          info: 'El correo electrónico que ingresaste ya se encuentra vinculado a otra cuenta.',
          color: '#C71D1D',
          icon: require('../animations/error_icon.json'),
          btn: 'OK',
        });
        setInLoop(false)
        setIsModalVisible(true);
    };

    const handleWarningEmail = () => {
        setFunctionData({
          title: '¡Ups!',
          info: 'La dirección de correo electrónico no debe contener espacios.',
          color: '#80D5FF',
          icon: require('../animations/warning_icon.json'),
          btn: 'Entendido',
        });
        setInLoop(true)
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
        setInLoop(false)
        setIsModalVisible(true);
    };

    const handleUsernameError = () => {
        setFunctionData({
          title: 'Nombre de usuario no disponible',
          info: 'El nombre de usuario que ingresaste no se encuentra disponible, por favor crea uno diferente.',
          color: '#C71D1D',
          icon: require('../animations/error_icon.json'),
          btn: 'Entendido',
        });
        setInLoop(false)
        setIsModalVisible(true);
    };

    const handleSignUp = () => {
        if ([nombre, app, apm, telefono, correo, username, contrasena].includes('')){
                handleInputs()
            } else if (toggleCheckBox === false) {
                handleTermsConditions()
            } else if (telefono.length < 12 || telefono.length > 12) {
                handleInvalidPhone()
            } else if (contrasena.length < 8) {
                handleInvalidPass()
            } else if (!correo.trim()) {
                handleWarningEmail()
            } else if (!validarCorreo(correo)) {
                handleInvalidEmail()
            } else {
                crearUsuario()
            }
    };

    const handleCloseModalAndNavigate = (documentLog: string) => {
        setIsModalVisible(false);
        navigation.navigate('EmailV', { userInfo: documentLog });
    };
      
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };
      
    const handleModalClose = () => {
        if (functionData.title === "Tu cuenta ha sido creada") {
            const documentLog = JSON.stringify({
                nombre: nombre,
                apellido_paterno: app,
                apellido_materno: apm,
                telefono: telefono,
                email: correo,
                username: username,
                password: contrasena,
                estadoEmail: false,
                numeroEmail: emailCode,
                estadoTelefono: false,
                numeroTelefono: telephoneCode,
            });
            handleCloseModalAndNavigate(documentLog);
        } else {
          handleCloseModal();
        }
    };

    const handleOpenModal2 = () => {
        setIsModalVisible2(true);
    };

    const handleCloseModal2 = () => {
        setIsModalVisible2(false);
    };

    const crearUsuario = () => {
        
        emailCode = generarCodigo();
        telephoneCode = generarCodigo();

        const documentLog = JSON.stringify({
          nombre: nombre,
          apellido_paterno: app,
          apellido_materno: apm,
          telefono: telefono,
          email: correo,
          username: username,
          password: contrasena,
          estadoEmail: false,
          numeroEmail: emailCode,
          estadoTelefono: false,
          numeroTelefono: telephoneCode,
        });
        console.log('Datos enviados al servidor:', documentLog);
        fetch('http://192.168.0.3:3000/crear_usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: documentLog,
        })
        .then((response) => {
          if (response.status === 400) {
            response.json().then((data) => {
              if (data.errores) {
                if (data.errores.email) {
                  handleEmailError();
                }
                if (data.errores.telefono) {
                  handleTelephoneError();
                }
                if (data.errores.username) {
                  handleUsernameError();
                }
              } else {
                Alert.alert('Error', 'No se pudo crear la cuenta de usuario');
              }
            });
          } else if (response.status === 201) {
            handleData();
          } else {
            Alert.alert('Error', 'Ocurrió un error en la comunicación con el servidor');
          }
        })
        .catch((error) => {
          console.log(error);
          Alert.alert('Error', 'Ocurrió un error en la comunicación con el servidor');
        });
    };

    return(
            <SafeAreaView style={styles.main_container}>
                <ScrollView style={{flex: 1, width:'100%'}} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center'}} showsVerticalScrollIndicator={false}>

                    <View style={styles.container}>

                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}> 

                            <View style={{flex: 0.7, alignItems: 'flex-start'}}>
                                <Text style={styles.title}>Regístrate +</Text>
                            </View>

                            <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                                <Image style={styles.logo} source={require('../img/White_logo.jpg')}/>
                            </View>

                        </View>

                        <Text style={styles.textInfo}>Ingresa la información solicitada para crear tu cuenta</Text>

                        <View style={{marginTop: 30}}>
                            <Text style={styles.label}>Nombre(s)</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput style={styles.input} placeholder= 'Ingresa tu(s) nombre(s)' 
                                placeholderTextColor={'#878787'} value={nombre} onChangeText={setNombre}/>
                            </View>
                        </View>

                        <View style={{marginTop: 20}}>
                            <Text style={styles.label}>Apellido paterno</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput style={styles.input} placeholder= 'Ingresa tu apellido paterno' 
                                placeholderTextColor={'#878787'} value={app} onChangeText={setApp}/>
                            </View>
                        </View>

                        <View style={{marginTop: 20}}>
                            <Text style={styles.label}>Apellido materno</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput style={styles.input} placeholder= 'Ingresa tu apellido materno' 
                                placeholderTextColor={'#878787'} value={apm} onChangeText={setApm}/>
                            </View>
                        </View>

                        <View style={{marginTop: 20}}>
                            <Text style={styles.label}>Número telefónico</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput style={styles.input} placeholder= 'Ingresa tu número telefónico' 
                                placeholderTextColor={'#878787'} value={telefono} onChangeText={setTelefono}
                                keyboardType='number-pad'/>
                            </View>
                        </View>

                        <View style={{marginTop: 20}}>
                            <Text style={styles.label}>Correo electrónico</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput style={styles.input} placeholder= 'tucorreo@ejemplo.com' 
                                placeholderTextColor={'#878787'} value={correo} onChangeText={setCorreo}
                                keyboardType='email-address'/>
                            </View>
                        </View>

                        <View style={{marginTop: 20}}>
                            <Text style={styles.label}>Nombre de usuario</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput style={styles.input} placeholder= 'Crea tu nombre de usuario' 
                                placeholderTextColor={'#878787'} value={username} onChangeText={setUsername}/>
                            </View>
                        </View>

                        <View style={{marginTop: 20}}>
                            <Text style={styles.label}>Contraseña</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput style={styles.input} placeholder= 'Crea tu contraseña' 
                                placeholderTextColor={'#878787'} value={contrasena} onChangeText={setContrasena}/>
                            </View>
                        </View> 

                        <View style={styles.terms_Container}>

                            <View style={{alignItems: 'flex-start', flexDirection: 'row'}}>
                                <CheckBox style={styles.checkTerms}
                                    disabled={false}
                                    value={toggleCheckBox}
                                    onValueChange={(newValue: boolean | ((prevState: boolean) => boolean)) => setToggleCheckBox(newValue)}
                                    tintColors = {{ true: '#0500FF' , false: '#000000' }}/>
                                <Text style={styles.textTerms}>Acepto los</Text>
                                <TouchableOpacity onPress={handleOpenModal2}>
                                    <TermsConditionsModal
                                        isVisible={isModalVisible2}
                                        onClose={handleCloseModal2}/>
                                    <Text style={styles.textBold}>Términos y Condiciones</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>


                        <TouchableOpacity onPress={handleSignUp}>
                            <CustomModal 
                                title={functionData.title}
                                info={functionData.info}
                                color={functionData.color}
                                icon={functionData.icon}
                                isVisible={isModalVisible}
                                onEvent={handleModalClose}
                                btn={functionData.btn}
                                loop={inLoop}/>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#7D08F2', '#00C2FF']} style={styles.btnCrearCuenta}>
                                <Text style={styles.buttonText}> Crear cuenta </Text>
                            </LinearGradient>
                        </TouchableOpacity>    

                        <View style={styles.signIn}>
                            <Text style={styles.textSignIn}>¿Ya tienes una cuenta?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                    <Text style={styles.textBold}>Inicia sesión</Text>
                            </TouchableOpacity>
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

    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: 35,
        marginRight: 35,
        backgroundColor: '#FFFFFF',
    },

    backIcon: {
        width: 25,
        height:25,
        resizeMode: 'stretch',
        alignItems: 'center',
    },

    title: {
        fontSize: 28,
        fontFamily: 'DMSans-Bold',
        marginTop: 20,
        color: '#000000',
    },

    logo: {
        marginTop: 12,
        width: 50,
        height: 50,
    },

    textInfo: {
        fontSize: 17,
        fontFamily: 'DMSans-Regular',
        color: '#000000',
        marginTop: 25,
    },

    label: {
        fontSize: 17,
        fontFamily: 'DMSans-Medium',
        color: '#000000',
    },

    sectionStyle: {
        padding: 3,
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000000',
        marginTop: 10,
    },

    input: {
        fontFamily: 'DMSans-Medium',
        fontSize: 16,
        marginLeft: 15,
        color: '#000',
    },

    terms_Container: {
        flexDirection: 'row',
        marginTop: 36,
    },

    checkTerms: {
        width: 20,
        height: 20,
    },

    textTerms: {
        marginLeft: 12,
        fontSize: 15,
        fontFamily: 'DMSans-Medium',
        color: '#000000',
    },

    textBold: {
        marginLeft: 6,
        fontSize: 15,
        fontFamily: 'DMSans-Bold',
        color: '#0500FF',
    },

    btnCrearCuenta: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        marginTop: 36,
      },

    buttonText: {
        fontSize: 20,
        fontFamily: 'DMSans-Bold',
        textAlign: 'center',
        margin: 12,
        color: '#FFFFFF',
    },

    signIn: {
        flexDirection: 'row', 
        alignContent: 'center', 
        justifyContent: 'center',
        marginTop: 30,
    },

    textSignIn: {
        fontFamily: 'DMSans-Medium',
        color: '#000000',
        fontSize: 15,
        marginBottom: 30,
    },

})

export default Sign_Up;