/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
import CustomerSupport from './src/screens/CustomerSupport';
import CardRequest from './src/screens/CardRequest';

interface Props {
  navigation: NavigationProp<any, any>;
}

const App: React.FC<Props> = ({navigation}) => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={Sign_Up} />
        <Stack.Screen name="EmailV" component={Email_Vrf}/>
        <Stack.Screen name="TelephoneV" component={Telephone_Vrf}/>
        <Stack.Screen name="Home" component={Home} />
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
        <Stack.Screen name="Card_Request" component={CardRequest} />
        <Stack.Screen name="Support" component={CustomerSupport} />

        {/*Este apartado es para las vistas de administrador*/}

        <Stack.Screen name="Home_Admin" component={AdminHome} />
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
