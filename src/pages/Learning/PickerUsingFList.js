import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Image,
  View, ImageBackground, Dimensions, TouchableOpacity, SafeAreaView, Text, Alert, FlatList
} from 'react-native';
import ImageView from "react-native-image-viewing";
import Application from '../biometrics/Application.container';
import ExpandAnim from './ExpandAnim';
import KeyStore from '../../Store/LocalKeyStore';
import * as Constant from '../../Constant/Constants';

 function CompFunc(props) {

  return {

    Comp: function (props) {
      const cities = [
        'City 1',
        'City 2',
        'City 3',
        // ... Add the remaining cities here
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
        'City 50',
      ];

      const [selectedCity, setSelectedCity] = useState('');
      const [middleIndex, setMiddleIndex] = useState(Math.floor(cities.length / 2));
      const flatListRef = useRef(null);

      const ITEM_HEIGHT = 50; // Adjust this value based on your item height

      const scrollListener = (event) => {
        const contentOffset = event.nativeEvent.contentOffset.y;
        const index = Math.round(contentOffset / ITEM_HEIGHT);
        setMiddleIndex(index);

        console.log('scrollListener', event.nativeEvent);
      };


      useEffect(() => {
        // const scrollListener = () => {
        //   const contentOffset = event.nativeEvent.contentOffset.y;
        //   const index = Math.round(contentOffset / ITEM_HEIGHT);
        //   setMiddleIndex(index);
        // };


        const scrollOffset = middleIndex * ITEM_HEIGHT;
        flatListRef.current.scrollToOffset({ offset: scrollOffset, animated: true });
        flatListRef.current.scrollToIndex({ animated: true, index: middleIndex });
        flatListRef.current.scrollToOffset({ animated: true, offset: scrollOffset });
        // flatListRef.current.scrollToIndex({ animated: true, index: middleIndex });
        // flatListRef.current.scrollToOffset({ animated: true, offset: scrollOffset });
        // flatListRef.current.scrollToIndex({ animated: true, index: middleIndex });
        // flatListRef.current.scrollToOffset({ animated: true, offset: scrollOffset });
        // flatListRef.current.scrollToIndex({ animated: true, index: middleIndex });
        // flatListRef.current.scrollToOffset({ animated: true, offset: scrollOffset });

        return () => {
          // Clean up the event listener when the component unmounts
          //   flatListRef.current?.removeListener('scroll', scrollListener);
          flatListRef.current.setNativeProps({ onScroll: null });
        };
      }, [middleIndex]);

      const renderItem = ({ item, index }) => {
        const isMiddleElement = index === middleIndex;

        if (isMiddleElement) {
          return (
            <TouchableOpacity
              style={styles.middleItem}
              onPress={() => setSelectedCity(item)}
            >
              <Text style={styles.middleText}>{item}</Text>
            </TouchableOpacity>
          );
        }

        return <Text style={styles.text}>{item}</Text>;
      };

      return (
        <View style={styles.container}>
          <Text style={styles.title}>City Picker</Text>

          <View style={{ width: '100%', height: 100 }}>

            <FlatList
              decelerationRate={0.5}
              ref={flatListRef}
              data={cities}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              onScrollToIndexFailed={info => {
                const wait = new Promise(resolve => setTimeout(resolve, 500));
                wait.then(() => {
                  flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
                });
                console.log(info);
              }}
              onScroll={scrollListener}
            />
          </View>
          <Text style={styles.selectedText}>Selected City: {selectedCity}</Text>
        </View>
      );
    }
  }
};










const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  middleItem: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    marginBottom: 10,
  },
  middleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

const PickerUsingFList =  CompFunc()

export default PickerUsingFList







