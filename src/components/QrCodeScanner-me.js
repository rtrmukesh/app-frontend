import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
 // Import the package
import { RNCamera } from 'react-native-camera';

const QRCodeScanner = ({ onQRCodeScanned }) => {
  const cameraRef = useRef(null);

  const handleQRCodeScanned = ({ data }) => {
    onQRCodeScanned(data);
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={handleQRCodeScanned}
      />
    </View>
  );
};

QRCodeScanner.propTypes = {
    onQRCodeScanned: PropTypes.func.isRequired,
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});

export default QRCodeScanner;
