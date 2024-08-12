import React, { useState, useEffect } from 'react';
import { Button, ActivityIndicator } from 'react-native-paper';
import { Color } from '../helper/Color';
import { useIsFocused, useNavigation } from "@react-navigation/native";

const CustomButton = (props) => {
  const { onPress, backgroundColor,borderRadius, textColor, width,title, errors,loading, isDisabled,textAlign,fontSize, style } = props;
  const [isLoading, setIsLoading] = useState(false);

  const show = props.show !== undefined ? props.show : true;

  if (!show) {
    return null; // Return null to not render anything if show is false
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      setIsLoading(false);
    }
  }, [errors]);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, [isFocused]);

  const handlePress = async () => {
    setIsLoading(true);
    {loading && setIsLoading(false)}
    await onPress();
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  };

  return (
    <Button
      mode="contained"
      uppercase={false}
      style={{
        backgroundColor: backgroundColor ? backgroundColor : Color.BUTTON_BACKGROUND,
        opacity: isLoading ? 0.7 : 1,
        borderRadius : borderRadius,
        width : width,
        ...style
      }}
      labelStyle={{
        color: textColor ? textColor : Color.BUTTON_TEXT,
        fontSize: fontSize?fontSize:14,
        textAlign: textAlign?textAlign:"center",
      }}
      onPress={handlePress}
      disabled={isDisabled?isDisabled:isLoading}
      loading={isLoading}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
