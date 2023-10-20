import React from 'react';
import { Text } from 'react-native';
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuProvider,
    MenuTrigger,
} from 'react-native-popup-menu';

const DotMenu = () => {
  const handleEdit = () => {
    // Add your edit logic here
    console.log('Edit clicked');
  };

  const dotStyle = {
    fontSize: 20,
    marginLeft:100,
    lineHeight: 15,
  };

  return (
    <MenuProvider>
      <Menu style={{ flexDirection: '' }}>
        <MenuTrigger>
          <Text style={dotStyle}>•</Text>
          <Text style={dotStyle}>•</Text>
          <Text style={dotStyle}>•</Text>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={handleEdit} text='Edit' />
        </MenuOptions>
      </Menu>
    </MenuProvider>
  );
};

export default DotMenu;
