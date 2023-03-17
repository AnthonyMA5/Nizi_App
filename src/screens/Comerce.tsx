/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable eol-last */
/* eslint-disable semi */
import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

interface Props {
    navigation: DrawerNavigationProp<any, any>
}

const Comerce: React.FC<Props> = ({navigation}) => {
  return (
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
  )
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
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