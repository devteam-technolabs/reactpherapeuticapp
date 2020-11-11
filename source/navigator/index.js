import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Dimensions } from 'react-native';
import { SkypeIndicator, } from 'react-native-indicators';
import constants from '../utils/constants';
import { connect } from 'react-redux';
import { saveUser } from '../redux/actions/user';
import Events from '../utils/events';

import LoginScreen from '../screens/login';
import SignUpScreen from '../screens/signUp';
import MyProfileScreen from '../screens/myProfile';
import ViewProfileScreen from '../screens/viewProfile';
import VerifyOTPScreen from '../screens/verifyEmail';


const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="SignUp" header={null} component={SignUpScreen} />
      <Stack.Screen name="Login" header={null} component={LoginScreen} />
      <Stack.Screen name="VerifyEmail" header={null} component={VerifyOTPScreen} />
    </Stack.Navigator>
  );
};


const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      <Stack.Screen name="ViewProfile" component={ViewProfileScreen} />
    </Stack.Navigator>
  )
};

const RootNavigator = (props) => {
  const [user, setUser] = useState(null);
  const [userStatus, setUserStatus] = useState(null);

  Events.on('logoutUser', 'lu#1', () => {
    console.log("loging out!!!")
    setUserStatus(false)
  });

  useEffect(() => {
    const { dispatch } = props;
    AsyncStorage.getItem('userData').then((user) => {
      if (user) {
        const userData = JSON.parse(user);
        console.log("user data is => ", userData);
        dispatch(saveUser(userData));
        setUserStatus(true)

      } else {
        setUserStatus(false)
      }
    });

    console.log("Welcome To Pherapeutic !!!", userStatus)
  }, [userStatus])

  if (userStatus === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
          backgroundColor: '#ffffff'
        }}
      >
        <SkypeIndicator color={constants.colors.pink} />
      </View>
    )
  } else if (userStatus === false) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name="auth" component={AuthStack} />
          <Stack.Screen name="app" component={AppStack} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else if (userStatus === true) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name="app" component={AppStack} />
          <Stack.Screen name="auth" component={AuthStack} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default connect()(RootNavigator);