import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Color from '../../lib/Color';
import BgGradientColor from "../../MyComponents/BgGradientColor";
import { LinearGradient } from "expo-linear-gradient";

const { width: screenWidth } = Dimensions.get('window');

const data = [
  {
    title: 'Generate Lorem',
    description: 'Generate Lorem Ipsum placeholder text. Select the number of characters, words1',
    image_url: 'https://images.unsplash.com/photo-1631943406801-ba6ccfa4f682?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fHww',
  },
  {
    title: 'Generate Lorem',
    description: 'Generate Lorem Ipsum placeholder text. Select the number of characters, words2',
    image_url: 'https://images.unsplash.com/photo-1616731948638-b0d0befef759?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    title: 'Generate Lorem',
    description: 'Generate Lorem Ipsum placeholder text. Select the number of characters, words3',
    image_url: 'https://images.unsplash.com/photo-1621146027714-e8921770f8d0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  // Add more items here
];

const renderItem = ({ item, index }) => {
  const { backgroundColor: bgColor, textColor } = Color.getRandomColor(index);
  return (
    <View style={[styles.slide, { backgroundColor: bgColor }]}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={{ padding: 10 }}>
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
        <Text style={[styles.subtitle, { color: textColor }]}>{item.description}</Text>
      </View>
    </View>
  );
};

const RenderImageCarousel = ({ carouselData }) => {

  const layoutList = ['slider', 'stack', 'tinder', 'default'];

  const getRandomLayout = () => {
    const randomIndex = Math.floor(Math.random() * layoutList.length);
    return layoutList[randomIndex];
  };

  // Selected layout
  const selectedLayout = getRandomLayout();
  return (
    <View style={[styles.container]}>
      <View style={{
        minWidth: "100%",
        marginBottom: 10,
      }}>
        <LinearGradient
          colors={['#8e9eab', '#eef2f3', '#eef2f3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 0 }}
        >
          <View style={[styles.titleContainer]}>
            <Text style={styles.titleText}>Mukeshssssssssssss</Text>
          </View>
        </LinearGradient>
      </View>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth * 0.80}
        layout={selectedLayout}
        layoutCardOffset={`18`}
      // loop={true}
      />
    </View>
  );
};

const ImageCarousel = () => {

  const loopData = [{ data: data, backgroundColor: "blue" }, { data: data }];


  return (
    <ScrollView>
      <BgGradientColor numOfColors={loopData.length}>
        <View style={styles.mainContainer}>
          {loopData.map((_, index) => (

            <RenderImageCarousel backgroundColor={_?.backgroundColor} />
          ))}
        </View>
      </BgGradientColor>
    </ScrollView>

  )

}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50
  },
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 450,
    paddingBottom: 0
  },
  slide: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 400,
  },
  image: {
    width: '100%',
    height: '70%',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'left',
    color: 'gray',
  },
  titleContainer: {
    backgroundColor: 'linear-gradient(to right, #8e9eab 0%, #eef2f3 51%, #8e9eab 100%)',
    shadowColor: '#eee',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
    marginLeft: 40
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
  },
});

export default ImageCarousel;
