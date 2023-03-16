/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createDrawerNavigator, DrawerNavigationProp} from '@react-navigation/drawer';
import {StyleSheet, Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationProp} from '@react-navigation/native';
import CustomDrawer from './src/components/Custom_Drawer';
import Home from './src/screens/Home';
import Recharge from './src/screens/Recharge';
import Moves from './src/screens/Moves';
import Card from './src/screens/Card';
import Menu from './src/screens/Menu';
import Messagges from './src/screens/Messagges';
import Comerce from './src/screens/Comerce';
import Profile from './src/screens/Profile';
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import Sign_Up from './src/screens/Sign_Up';
import Telephone_Vrf from './src/screens/Telephone_Vrf';
import Email_Vrf from './src/screens/Email_Vrf';
import Profile_Info from './src/screens/Profile_Info';

interface Props {
  navigation: DrawerNavigationProp<any, any>;
}

const App: React.FC<Props> = ({navigation}) => {

  const Drawer = createDrawerNavigator();

  const AppStack = () => {
    return (
      <Drawer.Navigator
        initialRouteName="Inicio"
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: 'slide',
          drawerActiveBackgroundColor: '#F0F4FE',
          drawerActiveTintColor: '#000000',
          drawerInactiveBackgroundColor: '#FFFFFF',
          drawerInactiveTintColor: '#2F2F2F',
          drawerLabelStyle: {
            marginLeft: -20,
            fontFamily: 'DMSans-Medium',
            fontSize: 16,
          },
        }}>
        <Drawer.Screen
          name="Inicio"
          component={Home}
          options={{
            drawerIcon: ({color}) => (
              <Image
                source={require('./src/img/Inicio.png')}
                style={styles.icon}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Recargar Tarjeta"
          component={Recharge}
          options={{
            drawerIcon: ({color}) => (
              <Image
                source={require('./src/img/Dinero.png')}
                style={styles.card}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Mi Actividad"
          component={Moves}
          options={{
            drawerIcon: ({color}) => (
              <Image
                source={require('./src/img/Movimientos.png')}
                style={styles.icon}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Mi Tarjeta"
          component={Card}
          options={{
            drawerIcon: ({color}) => (
              <Image
                source={require('./src/img/Tarjeta.png')}
                style={styles.card}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Menú Digital"
          component={Menu}
          options={{
            drawerIcon: ({color}) => (
              <Image
                source={require('./src/img/Menú.png')}
                style={styles.icon}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Mensajes"
          component={Messagges}
          options={{
            drawerIcon: ({color}) => (
              <Image
                source={require('./src/img/Notificaciones.png')}
                style={styles.icon}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Comercios"
          component={Comerce}
          options={{
            drawerIcon: ({color}) => (
              <Image
                source={require('./src/img/Comercios.png')}
                style={styles.icon}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Perfil"
          component={Profile}
          options={{
            drawerIcon: ({color}) => (
              <Image
                source={require('./src/img/Perfil.png')}
                style={styles.icon}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  };

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={Sign_Up} />
        <Stack.Screen name="EmailV" component={Email_Vrf} />
        <Stack.Screen name="TelephoneV" component={Telephone_Vrf} />
        <Stack.Screen name="Home" component={AppStack} />
        <Stack.Screen name="Recharge" component={Recharge} />
        <Stack.Screen name="Movement" component={Moves} />
        <Stack.Screen name="Card" component={Card} />
        <Stack.Screen name="Messagges" component={Messagges} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Commerce" component={Comerce} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Profile_Info" component={Profile_Info} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 28,
    width: 28,
  },

  card: {
    height: 29,
    width: 30,
  },
});

export default App;
