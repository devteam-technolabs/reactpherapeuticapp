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
import EditProfileScreen from '../screens/editProfile';
import VerifyOTPScreen from '../screens/verifyEmail';
import OnboardingScreens from '../screens/onboarding';
import AuthOtionsScreen from '../screens/authOptions';
import GetStartedScreen from '../screens/getStarted';
import ChangePasswordScreen from '../screens/changePassword';
import TherapistStatusScreen from '../screens/therapistStatus';
import QuestionBotScreen from '../screens/questionBot';
import HomeScreen from '../screens/home';
import ForgotPasswordScreen from '../screens/forgotPassword';


const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="AuthOptions" header={null} component={AuthOtionsScreen} />
      <Stack.Screen name="Login" header={null} component={LoginScreen} />
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreens} />
      <Stack.Screen name="SignUp" header={null} component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" header={null} component={ForgotPasswordScreen} />
      <Stack.Screen name="VerifyEmail" header={null} component={VerifyOTPScreen} />
    </Stack.Navigator>
  );
};


const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Home'} screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="QuestionBot" component={QuestionBotScreen} />
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      <Stack.Screen name="TherapistStatus" component={TherapistStatusScreen} />
      <Stack.Screen name="ViewProfile" component={ViewProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
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
          backgroundColor: 'transparent'
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