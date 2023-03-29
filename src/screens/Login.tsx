/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
/* eslint-disable semi */

import React, { useState } from 'react'
import { Image, TextInput } from 'react-native'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import { TouchableOpacity } from 'react-native'
import CustomModal from '../components/CustomModal'

interface Props {
    navigation: any;
}

const Login: React.FC<Props> = ({navigation}) => {

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [username, setUsername] = useState('')
	const [pass, setPass] = useState('')

  const [functionData, setFunctionData] = useState({
    title: '',
    info: '',
    color: '',
    icon: null,
    btn: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inLoop, setInLoop] = useState(false);

  const handleInputs = () => {
    setFunctionData({
      title: 'Ups!',
      info: 'Algunos campos se encuentran vacíos, por favor completalos.',
      color: '#D4004D',
      icon: require('../animations/warning_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(true)
    setIsModalVisible(true);
  };

  const handleData = () => {
    setFunctionData({
      title: 'Listo',
      info: 'Datos correctos, pásate estas wapa.',
      color: '#00D4A1',
      icon: require('../animations/success_icon.json'),
      btn: 'Entendido',
    });
    setInLoop(false)
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleLogin = () => {
    if ([username, pass].includes('')){
			handleInputs()
		} else {
      handleData()
    }
  };

  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={{flex: 1, width:'100%'}} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center'}} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>

          <View style={styles.img_container}>
            <Image style={styles.logo} source={require('../img/White_logo.jpg')}/>
          </View>

          <Text style={styles.title}>Inicio de Sesión</Text>
          <Text style={styles.subtitle}>Inicia sesión con tu cuenta Nizi</Text>

          <View style={{marginTop: 15}}/>

          <View style={styles.field}>
            <Text style={styles.label}>Nombre de Usuario</Text>
            <View style={styles.sectionStyle}>
              <TextInput style={styles.input} placeholder= 'Ingresa tu nombre de usuario' placeholderTextColor={'#878787'}
                value={username}
                onChangeText={setUsername}/>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.sectionStyle}>
              <TextInput style={styles.input} placeholder= 'Ingresa tu contraseña' placeholderTextColor={'#878787'}
                value={pass}
                onChangeText={setPass}/>
            </View>
          </View>

          <View style={styles.forgotRemember}>

            <View style={{flex: 0.5, alignItems: 'flex-start', flexDirection: 'row'}}>
              <CheckBox style={styles.checkRemember}
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={(newValue: boolean | ((prevState: boolean) => boolean)) => setToggleCheckBox(newValue)}
                  tintColors = {{ true: '#0500FF' , false: '#000000' }}/>
              <Text style={styles.textRemember}>Recordarme</Text>
            </View>

            <View style={{flex: 0.5, alignItems: 'flex-end'}}>
              <TouchableOpacity onPressOut={()=>navigation.navigate("Home_Admin")}>
                <Text style={styles.textForgot}>Olvidé mi contraseña</Text>
              </TouchableOpacity>
            </View>
                        
          </View>

          <TouchableOpacity onPress={handleLogin}>
          <CustomModal 
            title={functionData.title}
            info={functionData.info}
            color={functionData.color}
            icon={functionData.icon}
            isVisible={isModalVisible}
            onClose={handleCloseModal}
            btn={functionData.btn}
            loop={inLoop}
          />
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#09EE65', '#00E0FF']} style={styles.btnIngresar}>
              <Text style={styles.buttonText}> Ingresar </Text>
            </LinearGradient>
          </TouchableOpacity>  

          <View style={styles.signUp}>
            <Text style={styles.textSignUp}>¿Aún no tienes una cuenta?</Text>
            <TouchableOpacity onPressOut={()=>navigation.navigate("SignUp")}>
              <Text style={styles.signUpButton}>Regístrate</Text>
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

  container:{
    flex: 1,
    justifyContent: 'center',
    marginLeft: 35,
    marginRight: 35,
    backgroundColor: '#FFFFFF',
  },

  img_container:{
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo:{
    width: 100,
    height: 100,
  },

  title:{
    fontFamily: 'DMSans-Bold',
    fontSize: 29,
    color: '#000000',
    textAlign: 'center',
    marginTop: 19,
  },

  subtitle:{
    fontFamily: 'DMSans-Regular',
    fontSize: 17,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    marginTop: 19,
  },

  field: {
    marginTop: 35,
  },

  label: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },

  input: {
    flex: 1,
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
    marginLeft: 5,
    color: '#000000',
    marginStart: 10,
  },

  sectionStyle: {
    padding: 2,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000000',
    marginTop: 15,
  },

  forgotRemember: {
    flexDirection: 'row',
    marginTop: 36,
  },

  checkRemember: {
    width: 20,
    height: 20,
  },

  textRemember: {
    marginLeft: 12,
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
    color: '#000000',
  },

  textForgot: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    color: '#0500FF',
  },

  btnIngresar: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    marginTop: 36,
  },

  buttonText: {
    fontSize: 21,
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
    margin: 12,
    color: '#FFFFFF',
  },

  signUp: {
    flexDirection: 'row', 
    alignContent: 'center', 
    justifyContent: 'center',
    marginTop: 38,
  },

  textSignUp: {
    fontFamily: 'DMSans-Medium',
    color: '#000000',
    fontSize: 15,
    marginBottom: 30,
  },

  signUpButton: {
    marginLeft: 8,
    fontSize: 15,
    fontFamily: 'DMSans-Bold',
    color: '#0500FF',
  },

  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    padding: 10,
  },

})

export default Login
