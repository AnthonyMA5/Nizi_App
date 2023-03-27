/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {DrawerNavigationProp} from '@react-navigation/drawer';
import React, { useState } from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  navigation: DrawerNavigationProp<any, any>;
}

const AdminRevenue: React.FC<Props> = ({navigation}) => {

  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');

  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period);
  };

  const handleFormatSelect = (format: string) => {
    setSelectedFormat(format);
  };

  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView style={styles.scroll_container}>
        <View style={styles.container}>

          <View style={styles.head}>

            <View style={styles.menu_container}>
              <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                <Image style={styles.iconMenu} source={require('../img/menu_barra.png')}/>
              </TouchableOpacity>
            </View>

            <View style={styles.title_container}>
              <Text style={styles.section_title}>Ganancias</Text>
            </View>

          </View>

          <View style={styles.sectionContainer}>
              <View style={styles.second_container}>
                <Text style={styles.chart_title}>Ganancias del día</Text>
                <Text style={styles.chart_cant}>$ 2000.00</Text>
              </View>
          </View>

          <Text style={styles.title_text}>Reporte de ganancias</Text>
          <Text style={styles.content_text}>
            Para generar un reporte de las ganancias de tu negocio es importante que
            completes todos los datos que se solicitan.
          </Text>

          <Text style={styles.subtitle_text}>Periodo</Text>
          <Text style={styles.content_text}>
            Por defecto se tomará el día, semana o mes en curso.
          </Text>

          <View style={styles.sectionContainer2}>
            <ScrollView horizontal={true} style={{flex: 1}} showsHorizontalScrollIndicator={false}>

                <TouchableOpacity style={[
                  styles.categories_container,
                  selectedPeriod === 'Día' &&
                  styles.selected_category_container]}
                  onPress={() => handlePeriodSelect('Día')}>

                    <Text style={[styles.catg_text,
                      selectedPeriod === 'Día' &&
                      styles.selected_category_text]}>Diario
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity style={[
                  styles.categories_container,
                  selectedPeriod === 'Semana' &&
                  styles.selected_category_container]}
                  onPress={() => handlePeriodSelect('Semana')}>

                    <Text style={[styles.catg_text,
                      selectedPeriod === 'Semana' &&
                      styles.selected_category_text]}>Semanal
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity style={[
                  styles.categories_container,
                  selectedPeriod === 'Mes' &&
                  styles.selected_category_container]}
                  onPress={() => handlePeriodSelect('Mes')}>

                    <Text style={[styles.catg_text,
                      selectedPeriod === 'Mes' &&
                      styles.selected_category_text]}>Mensual
                    </Text>

                </TouchableOpacity>

            </ScrollView>
          </View>

          <Text style={styles.subtitle_text}>Formato</Text>
          <Text style={styles.content_text}>
            Selecciona un formato para generar tu reporte.
          </Text>

          <View style={styles.sectionContainer2}>
            <ScrollView horizontal={true} style={{flex: 1}} showsHorizontalScrollIndicator={false}>

                <TouchableOpacity style={[
                  styles.categories_container,
                  selectedFormat === 'Excel' &&
                  styles.selected_category_container]}
                  onPress={() => handleFormatSelect('Excel')}>

                    <Text style={[styles.catg_text,
                      selectedFormat === 'Excel' &&
                      styles.selected_category_text]}>Excel
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity style={[
                  styles.categories_container,
                  selectedFormat === 'PDF' &&
                  styles.selected_category_container]}
                  onPress={() => handleFormatSelect('PDF')}>

                    <Text style={[styles.catg_text,
                      selectedFormat === 'PDF' &&
                      styles.selected_category_text]}>PDF
                    </Text>

                </TouchableOpacity>

            </ScrollView>
          </View>

          <View style={styles.button_container}>
            <Pressable style={styles.button}
                       android_ripple={{ color: 'lightgray' }}>
              <Text style={styles.text_button}>Generar reporte</Text>
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

  sectionContainer:{
    marginTop: 30,
  },

  textTitleSection:{
      fontFamily: 'DMSans-Bold',
      fontSize: 20,
      color: '#000000',
      marginTop: 15,
  },

  second_container:{
    width: '100%',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CCCCCC',
    padding: 15,
  },

  chart_title:{
    fontFamily: 'DMSans-Bold',
    fontSize: 16,
    color: '#000000',
  },

  chart_cant:{
      fontFamily: 'DMSans-Bold',
      fontSize: 16,
      color: '#3FBFA0',
      marginTop: 5,
  },

  title_text:{
      fontFamily: 'DMSans-Bold',
      fontSize: 18,
      color: '#000000',
      marginTop: 25,
  },

  subtitle_text:{
    fontFamily: 'DMSans-Bold',
    fontSize: 16,
    color: '#000000',
    marginTop: 30,
},

  content_text:{
      fontFamily: 'DMSans-Regular',
      fontSize: 14.5,
      color: '#000000',
      marginTop: 10,
      textAlign: 'justify',
  },

  sectionContainer2:{
    flex: 1,
    marginTop: 18,
    width: '100%',
  },

  categories_container:{
    flexDirection: 'row',
    height: 37,
    width: 100,
    backgroundColor: '#EDEDED',
    borderRadius: 8,
    marginEnd: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selected_category_container:{
    backgroundColor: '#282828',
  },

  catg_text:{
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
  },

  selected_category_text:{
    color: '#FFF',
  },

  button_container:{
    flex: 1,
    marginTop: 10,
  },

  button:{
    width: 200,
    backgroundColor:'#0500EB',
    padding: 10,
    marginTop: 20,
    borderRadius: 8,
  },

  text_button:{
    fontFamily: 'DMSans-Bold',
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
  },

});

export default AdminRevenue;
