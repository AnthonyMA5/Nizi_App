/* eslint-disable prettier/prettier */
import {DrawerNavigationProp} from '@react-navigation/drawer';
import React from 'react';
import {Text, View} from 'react-native';

interface Props {
  navigation: DrawerNavigationProp<any, any>;
}

const AdminMenu: React.FC<Props> = ({navigation}) => {
  return (
    <View>
      <Text>AdminMenu</Text>
    </View>
  );
};

export default AdminMenu;
