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
                <Image style={styles.iconMenu} source={require('../img/back.png')}/>
              </TouchableOpacity>
            </View>

            <View style={styles.title_container}>
              <Text style={styles.section_title}>Comercios disponibles</Text>
            </View>
          </View>

          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: 20.658037378059745,
              longitude: -103.36288148542783,
              latitudeDelta: 0.5,
              longitudeDelta: 0.45,
            }}
            >
              <Marker
                coordinate={{
                  latitude: 20.531162461878896,
                  longitude: -103.42355677485271,
                }}
                image={require('../img/Marcador.png')}
                title="Mariscos La Herradura"
                description="C. Constitución 84, Centro,45640, San Sebastián el Grande, Jal."
              />

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

  map: {
    width: '100%',
    height: 700,
    borderRadius:10,
    marginTop: 35,
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

 });

export default Comerce;