/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { NavigationProp, RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ToggleSwitch from 'toggle-switch-react-native';

interface Props {
    navigation: NavigationProp<any, any>;
    route: RouteProp<any, any>;
  }

const Profile_Fingerprint: React.FC<Props> = ({navigation, route}) => {

  const { userID } = route.params;

  const [toggleValue, setToggleValue] = useState(false);

  const handleToggle = () => {
            setToggleValue(!toggleValue);
  };

  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>


          <View style={styles.head}>
              <View style={styles.menu_container}>
                <TouchableOpacity onPressOut={() => navigation.navigate('Profile', {userID : userID})}>
                  <Image style={styles.iconMenu} source={require('../img/back_black_icon.png')}/>
                </TouchableOpacity>
              </View>

              <View style={styles.title_container}>
                <Text style={styles.section_title}>Huella dactilar</Text>
              </View>
          </View>


          <View style={styles.icon_fingerprint_container}>
            <Image style={styles.icon_fingerprint} source={require('../img/huella.png')} />
          </View>


          <View style={styles.information_main_container}>

            <Text style={styles.text_info}>
            Ingresa a Nizi con tu huella digital de forma rápida y segura.
            {'\n'}{'\n'}
            ¡Ten precaución! Si tienes configuradas  huellas digitales adicionales a las tuyas la persona agregada
            podrá acceder a tu cuenta dentro de la aplicación mientras tengas activado el ingreso con huella dactilar.
            </Text>

            <View style={styles.switch_container}>

                <View style={styles.left}>
                    <Text style={styles.switch_text}>Inicio de sesión con huella</Text>
                </View>
                <View style={styles.right}>
                    <LinearGradient
                        colors={['#0500FF', '#C463FF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ borderRadius: 20 }}
                        >
                        <ToggleSwitch
                            isOn={toggleValue}
                            onColor="transparent"
                            offColor="#D9D4E2"
                            size="medium"
                            onToggle={handleToggle}
                            animationSpeed={250}
                        />
                    </LinearGradient>
                </View>

            </View>

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
        marginBottom: 50,
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

    icon_fingerprint_container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    icon_fingerprint:{
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

    text_info:{
        fontFamily: 'DMSans-Regular',
        fontSize: 16,
        color: '#000000',
        textAlign: 'justify',
        marginTop: 15,
    },

    switch_container:{
        flexDirection: 'row',
        marginTop: 40,
        padding: 17,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.4)',
    },

    left:{
        flex: 0.8,
        alignItems: 'flex-start',
        marginTop: 2,
        marginBottom: 2,
    },

    switch_text:{
        fontFamily: 'DMSans-Medium',
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
    },

    right:{
        flex: 0.2,
        alignItems: 'flex-end',
        marginTop: 2,
        marginBottom: 2,
    },

});

export default Profile_Fingerprint;
