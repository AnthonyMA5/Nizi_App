/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

interface Props {
  navigation: any;
}

const Profile_Password: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container}>
        <View style={styles.container}>


          <View style={styles.head}>
              <View style={styles.menu_container}>
                <TouchableOpacity onPressOut={() => navigation.navigate('Profile')}>
                  <Image style={styles.iconMenu} source={require('../img/back.png')}/>
                </TouchableOpacity>
              </View>

              <View style={styles.title_container}>
                <Text style={styles.section_title}>Cambiar contraseña</Text>
              </View>
          </View>


          <View style={styles.icon_password_container}>
            <Image style={styles.icon_password} source={require('../img/Key.png')} />
          </View>


          <View style={styles.information_main_container}>

            <View style={styles.information_container}>
              <Text style={styles.label}>Contraseña actual</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} placeholder="Ingresa tu contraseña actual" placeholderTextColor="#878787"/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Nueva contraseña</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} placeholder="Ingresa tu nueva contraseña" placeholderTextColor="#878787"/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Confirmar mi nueva contraseña</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} placeholder="Repite tu nueva contraseña" placeholderTextColor="#878787"/>
              </View>
            </View>

          </View>


          <View style={styles.button_container}>
            <Pressable style={styles.button}
                       android_ripple={{ color: 'lightgray' }}>
              <Text style={styles.text_button}>Actualizar contraseña</Text>
            </Pressable>
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
        justifyContent: 'center',
        marginLeft: 35,
        marginRight: 35,
        backgroundColor: '#FFFFFF',
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

    icon_password_container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    icon_password:{
        width: 110,
        height: 110,
        position: 'relative',
    },

    icon_photo:{
        width: 40,
        height: 40,
        position: 'absolute',
        bottom: 6,
        left: 22,
    },

    information_main_container:{
        flex: 1,
        marginTop: 10,
    },

    information_container:{
      marginTop: 30,
    },

    label: {
      fontSize: 16,
      fontFamily: 'DMSans-Medium',
      color: '#000',
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
        color: '#000',
        fontSize: 15,
        marginLeft: 15,
    },

    button_container:{
      flex: 1,
      marginTop: 30,
      marginBottom: 50,
    },

    button:{
      backgroundColor:'#0500EB',
      padding: 18,
      marginTop: 20,
      borderRadius: 12,
    },

    text_button:{
      fontFamily: 'DMSans-Bold',
      fontSize: 16,
      color: '#FFFFFF',
      textAlign: 'center',
    },

});

export default Profile_Password;
