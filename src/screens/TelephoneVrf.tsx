/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  navigation: any;
}

const Telephone_Vrf: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container}>
        <View style={styles.container}>
          <Text style={styles.step}>Paso 2 de 2</Text>
          <Text style={styles.title}>Verifica tu número telefónico</Text>
          <Text style={styles.subtitle}>
            Hemos enviado un código vía SMS a tu número telefónico para
            verificar que te pertenece
          </Text>
          <View style={styles.code_container}>
            <TextInput
              keyboardType="number-pad"
              placeholder=""
              style={styles.input}
            />
            <TextInput
              keyboardType="number-pad"
              placeholder=""
              style={styles.input}
            />
            <TextInput
              keyboardType="number-pad"
              placeholder=""
              style={styles.input}
            />
            <TextInput
              keyboardType="number-pad"
              placeholder=""
              style={styles.input}
            />
          </View>
          <TouchableOpacity onPressOut={() => navigation.navigate('Home')}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#3733EF', '#3733EF']}
              style={styles.btnContinuar}>
              <Text style={styles.btnContinuarText}> Finalizar </Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.time_count}>Generar nuevo codigo en 02:59</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  scroll_container: {
    flex: 1,
    width: '100%',
    marginTop: '20%',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 35,
    marginRight: 35,
    backgroundColor: '#FFFFFF',
  },

  step: {
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },

  title: {
    fontFamily: 'DMSans-Bold',
    fontSize: 21,
    fontWeight: '600',
    color: '#000000',
    marginTop: 40,
    textAlign: 'center',
  },

  subtitle: {
    fontFamily: 'DMSans-Regular',
    fontSize: 15,
    color: '#000000',
    marginTop: 30,
    textAlign: 'center',
  },

  code_container: {
    marginTop: 40,
    flexDirection: 'row',
  },

  input: {
    fontFamily: 'DMSans-Medium',
    flex: 0.25,
    textAlign: 'center',
    color: '#000000',
    fontSize: 22,
    borderWidth: 1,
    borderColor: '#000000',
    margin: 17,
    width: 200,
    borderRadius: 10,
  },
  
  btnContinuar: {
    backgroundColor: '#0500EB',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  btnContinuarText: {
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
  },

  time_count: {
    fontFamily: 'DMSans-Medium',
    marginTop: 35,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#939393',
  },
});

export default Telephone_Vrf;
