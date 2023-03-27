/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

interface Props {
  navigation: any;
}

const Profile_Info: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>


          <View style={styles.head}>
              <View style={styles.menu_container}>
                <TouchableOpacity onPressOut={() => navigation.navigate('Profile')}>
                  <Image style={styles.iconMenu} source={require('../img/back.png')}/>
                </TouchableOpacity>
              </View>

              <View style={styles.title_container}>
                <Text style={styles.section_title}>Editar información</Text>
              </View>
          </View>


          <View style={styles.photo_profile_container}>
            <Image style={styles.photo_profile} source={require('../img/D&D.jpg')} />
            <TouchableOpacity>
              <Image style={styles.icon_photo} source={require('../img/camera.png')}/>
            </TouchableOpacity>
          </View>


          <View style={styles.name_container}>
            <Text style={styles.text_name}>Anthony Martinez Arellano</Text>
            <Text style={styles.text_date}>Miembro desde 15/03/2023</Text>
          </View>


          <View style={styles.information_main_container}>

            <View style={styles.information_container}>
              <Text style={styles.label}>Nombres(s)</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value="Anthony"/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Apellido Paterno</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value="Martinez"/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Apellido Materno</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value="Arellano"/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Número Telefónico</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value="2741439734"/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Correo Electrónico</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value="Anthony_Ar2003@outlook.com"/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Nombre de Usuario</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value="Anthony_1000"/>
              </View>
            </View>

          </View>


          <View style={styles.button_container}>
            <Pressable style={styles.button}
                       android_ripple={{ color: 'lightgray' }}>
              <Text style={styles.text_button}>Actualizar información</Text>
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

    photo_profile_container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    photo_profile:{
        width: 110,
        height: 110,
        borderRadius: 100,
        position: 'relative',
    },

    icon_photo:{
        width: 40,
        height: 40,
        position: 'absolute',
        bottom: 6,
        left: 22,
    },

    name_container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
    },

    text_name:{
        fontFamily: 'DMSans-Medium',
        fontSize: 18,
        color: '#000000',
    },

    text_date:{
        fontFamily: 'DMSans-Regular',
        fontSize: 14,
        color: '#595959',
        marginTop: 5,
    },

    information_main_container:{
        flex: 1,
    },

    information_container:{
      marginTop: 20,
    },

    label: {
      fontSize: 14,
      fontFamily: 'DMSans-Medium',
      color: '#6C6C6C',
    },

    sectionStyle: {
        justifyContent: 'center',
        borderWidth: 0.5,
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

export default Profile_Info;
