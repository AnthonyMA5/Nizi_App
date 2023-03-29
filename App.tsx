/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator, DrawerNavigationProp} from '@react-navigation/drawer';
import {StyleSheet, Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationProp} from '@react-navigation/native';
import CustomDrawer from './src/components/CustomDrawer';
import AdminCustomDrawer from './src/components/AdminCustomDrawer';
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
import Sign_Up from './src/screens/SignUp';
import Telephone_Vrf from './src/screens/TelephoneVrf';
import Email_Vrf from './src/screens/EmailVrf';
import Profile_Info from './src/screens/ProfileInfo';
import Profile_Address from './src/screens/ProfileAddress';
import Profile_Password from './src/screens/ProfilePassword';
import Profile_Fingerprint from './src/screens/ProfileFingerprint';
import ProductDetails from './src/screens/ProductDetails';
import Cart from './src/screens/Cart';
import Ticket from './src/screens/Ticket';
import AdminHome from './src/screens/AdminHome';
import AdminRevenue from './src/screens/AdminRevenue';
import AdminOrders from './src/screens/AdminOrders';
import AdminRequests from './src/screens/AdminRequests';
import AdminMenu from './src/screens/AdminMenu';
import Orders from './src/screens/Orders';

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
          name="Pedidos"
          component={Orders}
          options={{
            drawerIcon: ({color}) => (
              <Image
                source={require('./src/img/pedidos_icon.png')}
                style={styles.icon}
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


  const AdminAppStack = () => {
    return (
      <Drawer.Navigator
        initialRouteName="Inicio"
        drawerContent={props => <AdminCustomDrawer {...props} />}
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
          component={AdminHome}
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
          name="Ganancias"
          component={AdminRevenue}
          options={{
            drawerIcon: ({color}) => (
              <Image
                source={require('./src/img/ganancias_icon.png')}
                style={styles.card}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Pedidos"
          component={AdminOrders}
          options={{
            drawerIcon: ({color}) => (
              <Image
                source={require('./src/img/pedidos_icon.png')}
                style={styles.icon}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Solicitudes"
          component={AdminRequests}
          options={{
            drawerIcon: ({color}) => (
              <Image
                source={require('./src/img/soli_icon.png')}
                style={styles.card}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Menú Digital"
          component={AdminMenu}
          options={{
            drawerIcon: ({color}) => (
              <Image
                source={require('./src/img/menu_icon.png')}
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
        <Stack.Screen name="Profile_Address" component={Profile_Address} />
        <Stack.Screen name="Profile_Password" component={Profile_Password} />
        <Stack.Screen name="Profile_Fingerprint" component={Profile_Fingerprint} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Ticket" component={Ticket} />

        {/*Este apartado es para las vistas de administrador*/}

        <Stack.Screen name="Home_Admin" component={AdminAppStack} />
        <Stack.Screen name="Revenues_Admin" component={AdminRevenue} />
        <Stack.Screen name="Orders_Admin" component={AdminOrders} />
        <Stack.Screen name="Requests_Admin" component={AdminRequests} />
        <Stack.Screen name="Menu_Admin" component={AdminMenu} />

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
