/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable eol-last */
/* eslint-disable semi */
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationProp, RouteProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const Comerce: React.FC<Props> = ({navigation, route}) => {

  const { userID } = route.params;

  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>

            <View style={styles.head}>
              <View style={styles.menu_container}>
                <TouchableOpacity onPressOut={()=>navigation.navigate('Home', {userID:userID})}>
                  <Image style={styles.iconMenu} source={require('../img/back_black_icon.png')}/>
                </TouchableOpacity>
              </View>

              <View style={styles.title_container}>
                <Text style={styles.section_title}>Comercios disponibles</Text>
              </View>
            </View>

            <View style={styles.commerce_container}>
              <View style={styles.commerce_left}>
                <Image style={styles.commerce_icon} source={require('../img/coffee_win.jpg')}/>
              </View>
              <View style={styles.commerce_right}>
                <Text style={styles.commerce_name}>
                    Coffee Win
                </Text>
                <Text style={styles.commerce_address}>
                  Carretera Santa Cruz-San Isidro 880 A Santa Cruz de las Flores, 45640 Tlajomulco de Zúñiga, Jal.
                </Text>
              </View>
            </View>

            <View style={styles.mapContainer}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                  latitude: 20.48257609509584,
                  longitude: -103.53270144917131,
                  latitudeDelta: 0.05, // ajusta este valor para controlar el nivel de zoom
                  longitudeDelta: 0.05, // ajusta este valor para controlar el nivel de zoom
                }}
              >
                <Marker
                  coordinate={{
                    latitude: 20.48257609509584,
                    longitude: -103.53270144917131,
                  }}
                  image={require('../img/Marcador.png')}
                  title="Coffee Win"
                  description="Carretera Santa cruz-San Isidro 880 A, Santa Cruz de las Flores, 45640 Tlajomulco de Zuñiga, Jal.          "
                />
              </MapView>
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

  scroll_container:{
      flex: 1,
      width:'100%',
  },

  container:{
      flex: 1,
      justifyContent: 'center',
      marginLeft: 35,
      marginBottom: 50,
      marginRight: 35,
      backgroundColor: '#FFFFFF',
  },

  head:{
    flexDirection: 'row',
    marginTop: 35,
  },

  menu_container:{
    alignItems: 'flex-start',
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

  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 35,
  },

  map: {
    width: '100%',
    height: 600,
  },

  bubble:{
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#FFF',
    borderRadius: 6,
    borderColor: '#CCC',
    borderWidth: 0.5,
    padding:15,
    width: 150,
  },

  commerce_container:{
    flexDirection: 'row',
    marginTop: 30,
    padding: 15,
    backgroundColor: '#FFFDEA',
    alignItems: 'center',
    borderRadius: 10,
  },

  commerce_left:{
    flex: 0.2,
    alignItems: 'center',
  },

  commerce_right:{
    flex: 0.8,
  },

  commerce_name:{
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    marginBottom: 3,
    color: '#000',
    textAlign: 'justify',
  },

  commerce_address:{
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    color: '#595959',
    textAlign: 'justify',
  },

  commerce_icon:{
    width: 45,
    height: 45,
    borderRadius: 50,
  },

 });

export default Comerce;