import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu';

const DotMenu = () => {
  const navigation = useNavigation(); 

  const handleEdit = () => {
    navigation.navigate('userDetailPage');
  };


  const dotStyle = {
    fontSize: 20,
    marginLeft:50,
    lineHeight: 15,
  };

  return (
    <MenuProvider>
      <Menu>
        <MenuTrigger>
        <FontAwesome name="ellipsis-h" size={30} color="black" style={{ transform: [{ rotate: '90deg' }],...dotStyle }} />
        </MenuTrigger>
        <MenuOptions style={{}}>
          <MenuOption onSelect={handleEdit} text='Edit' />
        </MenuOptions>
      </Menu>
    </MenuProvider>
  );
};

export default DotMenu;
