import React from 'react';
import { Color } from '../helper/Color';
import Button from './Button';
const AddButton = (props) => {
    const { onPress, data, label, color, style } = props
    return(
        <Button title = {label ? label :data ? "UPDATE":"ADD"} backgroundColor={color ? color :Color.PRIMARY} onPress = {onPress} style={style}/>
    )
}

export default AddButton