/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

interface Props {
  navigation: any;
}

const Profile_Address: React.FC<Props> = ({navigation}) => {
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
                <Text style={styles.section_title}>Editar domicilio</Text>
              </View>
          </View>


          <View style={styles.icon_address_container}>
            <Image style={styles.icon_address} source={require('../img/Domicilio.png')} />
          </View>


          <View style={styles.name_container}>
            <Text style={styles.text_name}>Anthony Martinez Arellano</Text>
            <Text style={styles.text_date}>Miembro desde 15/03/2023</Text>
          </View>


          <View style={styles.information_main_container}>

            <View style={styles.information_container}>
              <Text style={styles.label}>Calle</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value="Azucena"/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Número Exterior</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value="26"/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Número Interior (opcional)</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value=""/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Colonia o Fraccionamiento</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value="Nuevo San Miguel"/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Ciudad o Municipio</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value="Tlajomulco de Zúñiga"/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Código Postal</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value="45660"/>
              </View>
            </View>

            <View style={styles.information_container}>
              <Text style={styles.label}>Estado</Text>
              <View style={styles.sectionStyle}>
                <TextInput style={styles.input} value="Jalisco"/>
              </View>
            </View>

          </View>


          <View style={styles.button_container}>
            <Pressable style={styles.button}
                       android_ripple={{ color: 'lightgray' }}>
              <Text style={styles.text_button}>Actualizar domicilio</Text>
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

    icon_address_container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    icon_address:{
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

export default Profile_Address;
