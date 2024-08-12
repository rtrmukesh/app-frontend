import React, { useState } from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";
import { Color } from "../helper/Color";
import { Label } from "../helper/Label";

const CustomAlertModal = ({ visible, message, title, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay} />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title || "Error"}</Text>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.buttonContainer}>
            <Button title={Label.TEXT_NO} onPress={() => onClose(Label.TEXT_NO)} />
            <Button title={Label.TEXT_YES} onPress={() => onClose(Label.TEXT_YES)} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    margin: 20,
    backgroundColor: Color.WHITE,
    borderRadius: 5,
    padding: 35,
    alignItems: "flex-start",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: Color.RED,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "80%",
    gap: 2,
  },
});

export default CustomAlertModal;
