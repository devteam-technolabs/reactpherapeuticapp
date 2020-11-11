import React, { useEffect, useState, } from 'react';
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
import LogoutAlert from '../../components/logoutAlert';
import { connect } from 'react-redux';
import APICaller from '../../utils/APICaller';
import { saveUserProfile } from '../../redux/actions/user';
import SubmitButton from '../../components/submitButton';

const { height, width } = Dimensions.get('window');

// {
//   "first_name":"First",
//   "last_name":"Lasst",
//   "email":"qazwsx@gmail.com",
//   "password":"qwerty4321",
//   "confirm_password":"qwerty4321",
//   "role":"Client",
//   "language_id":"1"
// }

const ViewProfile = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [language, setLanguage] = useState('English');

  const { navigation, userData, dispatch, userProfile } = props;
  const {
    email,
    first_name,
    image,
    is_email_verified,
    language_id,
    last_name,

  } = userData;

  useEffect(() => {
    getUserProfile()
  }, []);

  const getUserProfile = () => {
    const { user_id, auth_token } = userData;
    const endpoint = 'user/profile';
    const method = 'GET';
    const contentType = 'application/json';
    const body = { user_id: `${user_id}` };
    console.log("auth => ",auth_token)
    APICaller(endpoint, method, body, contentType, auth_token)
      .then(response => {
        console.log('response getting user profile => ', response);
        dispatch(saveUserProfile())
      })
      .catch(error => {
        console.log("error getting user profile => ", error)
      })
  }

  return (
    <View style={styles.container} >
      <Image source={constants.images.background} resizeMode={'stretch'} style={styles.containerBackground} />
      <Image source={constants.images.formsBackground} resizeMode={'stretch'} style={styles.formsBackground} />
      <View style={styles.backButtonView} >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <Image source={constants.images.backIcon} style={{ height: 18, width: 10, margin: 10 }} />
          </TouchableOpacity>
          <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }} >
            <Text style={styles.headingText} >View Profile</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>


      <View style={styles.formView} >
        <View style={styles.formWrap} >
          <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', margin: 10, borderRadius: 10 }} >
            <Image source={constants.images.defaultUserImage} style={styles.profileImage} />
          </View>

          <View style={styles.formField} >
            <Text style={styles.fieldName} >NAME</Text>
            <View style={styles.fieldInputWrap} >
              <TextInput
                style={styles.fieldInput}
                onChangeText={text => setFirstName(text)}
                value={`${first_name} ${last_name}`}
                autoCompleteType={'off'}
                autoCorrect={'off'}
                editable={false}
              />
            </View>
          </View>

          <View style={styles.formField} >
            <Text style={styles.fieldName} >EMAIL</Text>
            <View style={styles.fieldInputWrap} >
              <TextInput
                style={styles.fieldInput}
                onChangeText={text => setLastName(text)}
                value={email}
                autoCompleteType={'off'}
                autoCorrect={'off'}
                editable={false}
              />
            </View>
          </View>

          <View style={styles.formField} >
            <Text style={styles.fieldName} >LANGUAGE YOU SPEAK</Text>
            <View style={styles.fieldInputWrap} >
              <TextInput
                style={styles.fieldInput}
                onChangeText={text => setEmail(text)}
                value={language}
                autoCompleteType={'off'}
                autoCorrect={'off'}
                editable={false}
              />
            </View>
          </View>

          <View style={styles.formField} >
            <Text style={styles.fieldName} >YOUR QUALIFICATION</Text>
            <View style={styles.fieldInputWrap} >
              <TextInput
                style={styles.fieldInput}
                onChangeText={text => setPassword(text)}
                value={'null'}
                autoCompleteType={'off'}
                autoCorrect={'off'}
                editable={false}
              />
            </View>
          </View>

          <View style={styles.formField} >
            <Text style={styles.fieldName} >YEARS OF EXPERIENCE</Text>
            <View style={styles.fieldInputWrap} >
              <TextInput
                style={styles.fieldInput}
                onChangeText={text => setConfirmPassword(text)}
                value={'null'}
                autoCompleteType={'off'}
                autoCorrect={'off'}
                editable={false}
              />
            </View>
          </View>

          <View style={styles.formField} >
            <Text style={styles.fieldName} >SPECIALISM</Text>
            <View style={styles.fieldInputWrap} >
              <TextInput
                style={styles.fieldInput}
                onChangeText={text => setRole(text)}
                value={'null'}
                editable={false}
                autoCompleteType={'off'}
                autoCorrect={'off'}
                editable={false}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  userProfile: state.user.userProfile
});

export default connect(mapStateToProps)(ViewProfile);