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
import { validateEmail } from '../../utils/validateStrings';

const { height, width } = Dimensions.get('window');

const Login = (props) => {
  const [password, setPassword] = useState('');

  const { navigation, dispatch } = props;

  return (
    <View style={styles.container} >
      <Image source={constants.images.background} resizeMode={'stretch'} style={styles.containerBackground} />
      <Image source={constants.images.formsBackground} resizeMode={'stretch'} style={styles.formsBackground} />
      <View style={styles.backButtonView} >
        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
          <Image source={constants.images.backIconn} style={{ height: 18, width: 10, margin: 10 }} />
        </View>
      </View>
      <View style={styles.logoView} >
        <Image source={constants.images.logo} style={{}} />
      </View>
      <View style={styles.formView} >

        <View style={styles.formWrap} >
          <View style={styles.buttonsWrap} >
            <View style={{ height: height * 0.014 }} />
            <SubmitButton
              title={'Login'}
              submitFunction={() => navigation.navigate('Login')}
            />
          </View>

          <View style={styles.buttonsWrap} >
            <SubmitButton
              title={'Signup'}
              submitFunction={() => navigation.navigate('SignUp')}
              empty={true}
            />
            <View style={{ height: height * 0.014 }} />
          </View>
        </View>
        <View style={styles.continueTextWrap} >
          <Text style={styles.continueText} >or continue with</Text>
        </View>

        <TouchableOpacity
          onPress={() => true}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: Dimensions.get('window').height * 0.052,
            width: Dimensions.get('window').width * 0.6,
            borderRadius: 3,
            backgroundColor: constants.colors.white,
            marginVertical: height * 0.01
          }}
        >
          <View style={{ justifyContent: 'center',alignItems: 'center', flexDirection: 'row' }} >
            <Image source={constants.images.ic_fb} style={{ height: 13, width: 13,margin: 8 }} />
            <Text style={{ color: constants.colors.black, fontWeight: '500', fontSize: 16 }}>Facebook</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => true}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: Dimensions.get('window').height * 0.052,
            width: Dimensions.get('window').width * 0.6,
            borderRadius: 3,
            backgroundColor: constants.colors.white,
            marginVertical: height * 0.01
          }}
        >
          <View style={{ justifyContent: 'center',alignItems: 'center', flexDirection: 'row' }} >
            <Image source={constants.images.ic_google} style={{ height: 13, width: 13,margin: 8 }} />
            <Text style={{ color: constants.colors.black, fontWeight: '500', fontSize: 16 }}>Google</Text>
          </View>
        </TouchableOpacity>

      </View>
      <View style={styles.footerView} >
        <Text style={styles.footerText} ></Text>
      </View>
    </View>
  )
};


export default connect()(Login);