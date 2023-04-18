/* eslint-disable prettier/prettier */
import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
    navigation: any;
    route: RouteProp<any, any>;
  }

const AdminMenu: React.FC<Props> = ({navigation, route}) => {

    const { userID } = route.params;
    const [productsInfo, setProductsInfo] = useState<any>();

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
    };

    useEffect(() => {
        fetch('http://192.168.95.220:3000/get_products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setProductsInfo(data);
            setRefreshing(false);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [refreshing]);

  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <View style={styles.container}>

          <View style={styles.head}>

            <View style={styles.menu_container}>
              <TouchableOpacity onPress={()=>navigation.navigate('Home_Admin', {userID:userID})}>
                <Image style={styles.iconMenu} source={require('../img/back_black_icon.png')}/>
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

            <TouchableOpacity style={styles.service}>
                <View style={styles.servicesNewProduct}>
                    <Image style={styles.iconServices} source={require('../img/add_icon.png')}/>
                    <Text style={styles.textNameService}>Añadir{'\n'}producto</Text>
                </View>
            </TouchableOpacity>

          </View>

            <View style={styles.services_mainContainer}>
                {productsInfo && productsInfo.map((product) => (
                    <TouchableOpacity style={styles.service} key={product.id}>
                    <View style={styles.servicesContainerGlobal}>
                    {product.nombre === 'Ensalada de pollo con vegetales' ? (
                          <Image source={require('../img/platillo2.png')} style={styles.iconServices}/>
                        ) : product.nombre === 'Papas fritas caseras' ? (
                          <Image source={require('../img/platillo3.png')} style={styles.iconServices}/>
                        ) : product.nombre === 'Café cappuccino' ? (
                          <Image source={require('../img/platillo4.png')} style={styles.iconServices}/>
                        ) : (
                          <Image source={require('../img/White_t_logo.png')} style={styles.iconServices}/>
                        )}
                        <Text style={styles.textNameService}>{product.nombre}</Text>
                    </View>
                    </TouchableOpacity>
                ))}
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

service:{
    flex: 0.33,
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginRight: 10,
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
    width: 40,
    height: 40,
    resizeMode: 'contain',
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
