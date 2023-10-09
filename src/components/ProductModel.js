import React from "react";
import { View, Modal, Text, TouchableOpacity, Image } from "react-native";
import Currency from "../lib/Currency";
import Order from "../helper/Order";
import { Color } from "../helper/Color";
import styles from "../helper/Styles";
export const ProductModel = (props) => {
  const { selectedProduct, closeModal, image } = props;

  return (
    <>
      <Modal
        visible={selectedProduct !== null}
        animationType="slide"
        transparent={true}
      >
        <>
          {selectedProduct && (
            <View style={styles.productModalContainer}>
              <View>
                <Image
                  source={{ uri: image }}
                  style={{ width: "90%", aspectRatio: 1 }}
                />
              </View>
              <View>
                {selectedProduct?.brand_name ? (
                  <Text style={{ fontWeight: "700" }}>
                    {selectedProduct?.brand_name}
                  </Text>
                ) : (
                  ""
                )}
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.cartText]}>
                    {selectedProduct?.product_name}
                    {selectedProduct?.size ? ", " + selectedProduct?.size : ""}
                    {selectedProduct?.unit}
                    {selectedProduct?.pack_size
                      ? `(Pack Size: ${
                          selectedProduct?.pack_size
                            ? selectedProduct?.pack_size
                            : " "
                        })`
                      : ""}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  {selectedProduct?.sale_price ? (
                    selectedProduct?.mrp != selectedProduct?.sale_price &&
                    selectedProduct?.mrp > 0 ? (
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ textDecorationLine: "line-through" }}>
                          {Currency.IndianFormat(selectedProduct?.mrp)}
                        </Text>
                        {selectedProduct?.mrp > 0 &&
                        selectedProduct?.mrp != selectedProduct?.sale_price ? (
                          <Text style={{ paddingLeft: 10, fontWeight: "bold" }}>
                            {Currency.IndianFormat(selectedProduct?.sale_price)}
                          </Text>
                        ) : (
                          ""
                        )}
                      </View>
                    ) : (
                      <Text>
                        {Currency.IndianFormat(selectedProduct?.sale_price)}
                      </Text>
                    )
                  ) : (
                    <Text>{Currency.IndianFormat(selectedProduct?.mrp)}</Text>
                  )}
                  {selectedProduct?.status && (
                    <Text
                      style={{
                        color:
                          selectedProduct?.status === Order.STATUS_CANCEL
                            ? Color.RED
                            : Color.SECONDARY
                      }}
                    >{` (${selectedProduct?.status})`}</Text>
                  )}
                </View>
              </View>
            </View>
          )}
          <TouchableOpacity
            style={styles.productModalCloseButton}
            onPress={closeModal}
          >
            <Text style={styles.ProductModelCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </>
      </Modal>
    </>
  );
};
