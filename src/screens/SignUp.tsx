/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable keyword-spacing */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */

import React, {useState} from "react";
import { TextInput } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import { Image, View } from "react-native";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CheckBox from '@react-native-community/checkbox';

interface Props {
    navigation: any;
}

const Sign_Up: React.FC<Props> = ({navigation}) => {

    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    return(
            <SafeAreaView style={styles.main_container}>
                <ScrollView style={{flex: 1, width:'100%'}} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center'}}>

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
                                <TextInput style={styles.input} placeholder= 'Ingresa tu(s) nombre(s)' placeholderTextColor={'#878787'}/>
                            </View>
                        </View>

                        <View style={{marginTop: 20}}>
                            <Text style={styles.label}>Apellido paterno</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput style={styles.input} placeholder= 'Ingresa tu apellido paterno' placeholderTextColor={'#878787'}/>
                            </View>
                        </View>

                        <View style={{marginTop: 20}}>
                            <Text style={styles.label}>Apellido materno</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput style={styles.input} placeholder= 'Ingresa tu apellido materno' placeholderTextColor={'#878787'}/>
                            </View>
                        </View>

                        <View style={{marginTop: 20}}>
                            <Text style={styles.label}>Número telefónico</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput style={styles.input} placeholder= 'Ingresa tu número telefónico' placeholderTextColor={'#878787'}/>
                            </View>
                        </View>

                        <View style={{marginTop: 20}}>
                            <Text style={styles.label}>Correo electrónico</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput style={styles.input} placeholder= 'tucorreo@ejemplo.com' placeholderTextColor={'#878787'}/>
                            </View>
                        </View>

                        <View style={{marginTop: 20}}>
                            <Text style={styles.label}>Nombre de usuario</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput style={styles.input} placeholder= 'Crea tu nombre de usuario' placeholderTextColor={'#878787'}/>
                            </View>
                        </View>

                        <View style={{marginTop: 20}}>
                            <Text style={styles.label}>Contraseña</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput style={styles.input} placeholder= 'Crea tu contraseña' placeholderTextColor={'#878787'}/>
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
                                <Text style={styles.textBold}>Términos y Condiciones</Text>
                            </View>
                            
                        </View>


                        <TouchableOpacity onPressOut={() => navigation.navigate("EmailV")}>
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