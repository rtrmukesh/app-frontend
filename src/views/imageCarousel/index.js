import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Color from '../../lib/Color';
import LinearGradient from "react-native-linear-gradient";

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

const RenderImageCarousel = ({carouselData,backgroundColor}) => {
  console.log('backgroundColor >>>----------------------------->',backgroundColor);
  const [activeSlide1, setActiveSlide1] = React.useState(0);
  const [activeSlide2, setActiveSlide2] = React.useState(0);

  return (
    <LinearGradient colors={[backgroundColor]} style={{borderRadius:8,height:400}}>
    <View style={[styles.container]}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth * 0.80}
        layout={'default'}
        onSnapToItem={(index) => index === 0 ? setActiveSlide1(index) : setActiveSlide2(index)}
        layoutCardOffset={`18`}
      />
    </View>
    </LinearGradient>
  );
};

const ImageCarousel = () => {

console.log('Color.getRandomGradientColor().backgroundColor >>>----------------------------->',Color.getRandomGradientColor().backgroundColor);
  const loopData = [{ data: data,backgroundColor:"blue",backgroundColor:Color.getRandomGradientColor().backgroundColor }, { data: data,backgroundColor:Color.getRandomGradientColor().backgroundColor }];


  return (
<ScrollView>
    <View style={styles.mainContainer}>
      {loopData.map((_, index) => (
        
        <RenderImageCarousel backgroundColor={_?.backgroundColor} />
      ))}
    </View>
    </ScrollView>

  )

}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight:500
  },
  slide: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 400,
  },
  image: {
    width: '100%',
    height: '70%',
    borderRadius: 8,
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
  paginationContainer: {
    paddingVertical: 8,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  inactiveDot: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default ImageCarousel;
