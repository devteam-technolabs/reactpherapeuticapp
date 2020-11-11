import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens();
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import AppNavigator from './source/navigator';
import ModalLoader from './source/components/modalLoader';
import Events from './source/utils/events';
import { Provider } from "react-redux";
import store from "./source/redux/index";

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
      <SafeAreaView style={styles.safeAreaView}>
        <AppNavigator />
        <ModalLoader
          data={loaderData}
          show={showModal}
        />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});