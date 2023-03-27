/* eslint-disable prettier/prettier */
import {DrawerNavigationProp} from '@react-navigation/drawer';
import React from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  navigation: DrawerNavigationProp<any, any>;
}

const AdminMenu: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>

          <View style={styles.head}>

            <View style={styles.menu_container}>
              <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                <Image style={styles.iconMenu} source={require('../img/menu_barra.png')}/>
              </TouchableOpacity>
            </View>

            <View style={styles.title_container}>
              <Text style={styles.section_title}>Menú digital</Text>
            </View>

          </View>

          <Text style={styles.text_info}>
          En este apartado puedes visualizar y administrar todos los productos del menú de tu negocio,
          si deseas modificar la información sobre alguno solo debes presionar sobre él.
          </Text>

          <View style={styles.services_mainContainer}>

            <Pressable style={styles.service1}>
                <View style={styles.servicesNewProduct}>
                    <Image style={styles.iconServices} source={require('../img/add_icon.png')}/>
                    <Text style={styles.textNameService}>Añadir{'\n'}producto</Text>
                </View>
            </Pressable>

            <Pressable style={styles.service2}>
                <View style={styles.servicesContainerGlobal}>
                    <Image style={styles.iconServices} source={require('../img/menu_icon.png')}/>
                    <Text style={styles.textNameService}>Nombre{'\n'}producto</Text>
                </View>
            </Pressable>

            <Pressable style={styles.service3}>
                <View style={styles.servicesContainerGlobal}>
                    <Image style={styles.iconServices} source={require('../img/menu_icon.png')}/>
                    <Text style={styles.textNameService}>Nombre{'\n'}producto</Text>
                </View>
            </Pressable>

          </View>

          <View style={styles.services_mainContainer}>

            <Pressable style={styles.service1}>
                <View style={styles.servicesContainerGlobal}>
                    <Image style={styles.iconServices} source={require('../img/menu_icon.png')}/>
                    <Text style={styles.textNameService}>Nombre{'\n'}producto</Text>
                </View>
            </Pressable>

            <Pressable style={styles.service2}>
                <View style={styles.servicesContainerGlobal}>
                    <Image style={styles.iconServices} source={require('../img/menu_icon.png')}/>
                    <Text style={styles.textNameService}>Nombre{'\n'}producto</Text>
                </View>
            </Pressable>

            <Pressable style={styles.service3}>
                <View style={styles.servicesContainerGlobal}>
                    <Image style={styles.iconServices} source={require('../img/menu_icon.png')}/>
                    <Text style={styles.textNameService}>Nombre{'\n'}producto</Text>
                </View>
            </Pressable>

          </View>

          <View style={styles.services_mainContainer}>

            <Pressable style={styles.service1}>
                <View style={styles.servicesContainerGlobal}>
                    <Image style={styles.iconServices} source={require('../img/menu_icon.png')}/>
                    <Text style={styles.textNameService}>Nombre{'\n'}producto</Text>
                </View>
            </Pressable>

            <Pressable style={styles.service2}>
                <View style={styles.servicesContainerGlobal}>
                    <Image style={styles.iconServices} source={require('../img/menu_icon.png')}/>
                    <Text style={styles.textNameService}>Nombre{'\n'}producto</Text>
                </View>
            </Pressable>

            <Pressable style={styles.service3}>
                <View style={styles.servicesContainerGlobal}>
                    <Image style={styles.iconServices} source={require('../img/menu_icon.png')}/>
                    <Text style={styles.textNameService}>Nombre{'\n'}producto</Text>
                </View>
            </Pressable>

          </View>

          <View style={styles.services_mainContainer}>

            <Pressable style={styles.service1}>
                <View style={styles.servicesContainerGlobal}>
                    <Image style={styles.iconServices} source={require('../img/menu_icon.png')}/>
                    <Text style={styles.textNameService}>Nombre{'\n'}producto</Text>
                </View>
            </Pressable>

            <Pressable style={styles.service2}>
                <View style={styles.servicesContainerGlobal}>
                    <Image style={styles.iconServices} source={require('../img/menu_icon.png')}/>
                    <Text style={styles.textNameService}>Nombre{'\n'}producto</Text>
                </View>
            </Pressable>

            <Pressable style={styles.service3}>
                <View style={styles.servicesContainerGlobal}>
                    <Image style={styles.iconServices} source={require('../img/menu_icon.png')}/>
                    <Text style={styles.textNameService}>Nombre{'\n'}producto</Text>
                </View>
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

  text_info:{
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    color: '#000000',
    textAlign: 'justify',
    marginTop: 25,
  },

  services_mainContainer:{
    flexDirection: 'row',
    width: '100%',
    marginTop: 35,
},

service1:{
    flex: 0.33,
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginRight: 10,
},

service2:{
    flex: 0.33,
    marginRight: 10,
},

service3:{
    flex: 0.33,
    alignItems: 'flex-end',
},

servicesNewProduct:{
    width: '100%',
    height: 150,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderStyle: 'dotted',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
},

servicesContainerGlobal:{
    width: '100%',
    height: 150,
    backgroundColor: '#FFF',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
},

iconServices:{
    width: 38,
    height: 38,
},

textNameService:{
    fontFamily: 'DMSans-Medium',
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    marginTop: 5,
},

});

export default AdminMenu;
