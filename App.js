import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens();
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Dimensions, Text, View, Image, StatusBar } from 'react-native';
import AppNavigator from './source/navigator';
import ModalLoader from './source/components/modalLoader';
import Events from './source/utils/events';
import { Provider } from "react-redux";
import store from "./source/redux/index";
import constants from './source/utils/constants';

const { height, width } = Dimensions.get('window');

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [loaderData, setLoaderData] = useState({ label: "", backgroundColor: "black" })

  Events.on("showModalLoader", "sml", (data) => {
    setShowModal(true);
    setLoaderData(data);
    console.log("triggered!!!")
  });

  Events.on("hideModalLoader", "hml", () => {
    setShowModal(false)
    // setLoaderData({ label: "", backgroundColor: "" });
  });
  return (
    <Provider store={store} style={{ flex: 1 }}>
      <View style={styles.safeAreaView}>
        {/* <SafeAreaView style={{ backgroundColor: 'transparent' }} /> */}
        <StatusBar barStyle='light-content' hidden={false} translucent={false} />
        {/* <Image source={constants.images.background} resizeMode={'stretch'} style={styles.containerBackground} /> */}
        {/* <SafeAreaView /> */}
        <AppNavigator />
        <ModalLoader
          data={loaderData}
          show={showModal}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  containerBackground: {
    height: '100%',
    width,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -2
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});