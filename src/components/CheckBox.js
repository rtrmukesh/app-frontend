import React from 'react';
import { View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Color } from '../helper/Color';

const CheckBox = ({ color, isChecked, toggleCheckbox, disabled,label }) => {
    const [checked, setChecked] = React.useState(isChecked);
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <Checkbox
             status={checked ? 'checked' : 'unchecked'}
             onPress={() => {
                setChecked(!checked);
                toggleCheckbox && toggleCheckbox(label ? label : !checked); 
              }}
              disabled = {disabled}
              color={color ? color : Color.GREY}
              uncheckedColor={Color.GREY}
        />
            {label && <Text>{label}</Text>}
        </View>
    );
};

export default CheckBox;
