import React from 'react';
import { Checkbox } from 'react-native-paper';

const checkBox = ({ color, isChecked, toggleCheckbox }) => {
    const [checked, setChecked] = React.useState(isChecked);

    return (
        <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
                setChecked(!checked);
                toggleCheckbox && toggleCheckbox(!checked)
              }}
            color={color ? color : "#3498db"}
        />
    );
};

export default checkBox;