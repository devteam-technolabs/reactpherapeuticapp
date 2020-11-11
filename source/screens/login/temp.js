import React, { useState, } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  TextInput
} from 'react-native';
import constants from '../../utils/constants';
import styles from './styles';
import SubmitButton from '../../components/submitButton';
import APICaller from '../../utils/APICaller';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Events from '../../utils/events';
import { connect } from 'react-redux';
import { saveUser } from '../../redux/actions/user';
import AwesomeAlert from 'react-native-awesome-alerts';

const { height, width } = Dimensions.get('window');

const Login = (props) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlert] = useState('Please Fill email and password.');

  const { navigation, dispatch } = props;

  const loginHandler = () => {
    if (email && password.length) {
      Events.trigger('showModalLoader');
      const loginObj = {
        email,
        password
      };
      //  const loginObj =  {
      //     "email":"qazwsxa@gmail.com",
      //     "password":"qwerty4321"
      //   }
      APICaller('login', 'POST', loginObj)
        .then(response => {
          console.log('response => ', response);
          const { data, message, status, statusCode } = response['data'];
          if (message == 'User loggedin successfully') {
            AsyncStorage.setItem('userData', JSON.stringify(data));
            dispatch(saveUser(data))
            Events.trigger('hideModalLoader');
            navigation.navigate('app');
          }
        })
        .catch(error => {
          Events.trigger('hideModalLoader');
          console.log('error => ', error)
        })
    } else {
      console.log("fill details");
      setShowAlert(true)
    }
  }

  return (
    <View style={styles.container} >
      <Image source={constants.images.background} style={styles.containerBackground} />
      <Image source={constants.images.formsBackground} style={styles.formsBackground} />
      <View style={styles.backButtonView} >
        <Image source={constants.images.backIcon} style={{ height: 18, width: 10 }} />
      </View>
      <View style={styles.logoView} >
        <Image source={constants.images.logo} style={{}} />
      </View>
      <View style={styles.formView} >

        <View style={styles.formWrap} >
          <View style={styles.formField} >
            <Text style={styles.fieldName} >EMAIL</Text>
            <View style={styles.fieldInputWrap} >
              <TextInput
                style={styles.fieldInput}
                placeholder={'john@gmail.com'}
                placeholderTextColor={constants.colors.placeholder}
                onChangeText={text => setEmail(text)}
                value={email}
                autoCapitalize={'none'}
              />
              <View style={styles.ticWrap} >
                {
                  !email
                    ?
                    <Image source={constants.images.inputCheck} style={styles.tic} />
                    :
                    <View />
                }
              </View>
            </View>
          </View>

          <View style={styles.formField} >
            <Text style={styles.fieldName} >PASSWORD</Text>
            <View style={styles.fieldInputWrap} >
              <TextInput
                style={styles.fieldInput}
                placeholder={'password'}
                placeholderTextColor={constants.colors.placeholder}
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
              />
              <View style={styles.ticWrap} >
                {
                  !email
                    ?
                    <Image source={constants.images.inputCheck} style={styles.tic} />
                    :
                    <View />
                }
              </View>
            </View>
          </View>

          <View style={[styles.formField, { flexDirection: 'row', justifyContent: 'flex-start', height: Dimensions.get('window'). height * 0.03 }]} >
            <Image source={constants.images.radioButton} style={{ height: 20, width: 20, marginRight: 10 }} />
            <Text style={{ fontSize: 13, fontWeight: '500' }} >Remember Me</Text>
          </View>

          <View style={styles.rememberMeView} >
            <SubmitButton
              title={'LOGIN'}
              colors={['rgb(62, 218, 243)', 'rgb(191, 53, 160)']}
              submitFunction={() => loginHandler()}
            />
          </View>
          <View style={styles.forgotPasswordView} >
            <Text style={styles.forgotPasswordText} >Forgot Password?</Text>
          </View>
        </View>
      </View>
      <View style={styles.footerView} >
        <Text style={styles.footerText} >Don't have an account yet? <Text
          onPress={() => navigation.navigate('SignUp')}
          style={styles.footerlinkText}
        >Sign Up</Text></Text>
      </View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        message={alertMessage}
        closeOnTouchOutside={true}
        showConfirmButton={true}
        confirmText="Confirm"
        confirmButtonColor={constants.colors.pink}
        onCancelPressed={() => {
          setShowAlert(false);
        }}
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
        onDismiss={() => {
          setShowAlert(false);
        }}
      />
    </View>
  )
};


export default connect()(Login);