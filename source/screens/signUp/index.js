import React, { useEffect, useState, } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail } from '../../utils/validateStrings';
import AwesomeAlert from 'react-native-awesome-alerts';
import constants from '../../utils/constants';
import Events from '../../utils/events';
import APICaller from '../../utils/APICaller';
import SubmitButton from '../../components/submitButton';

const { height, width } = Dimensions.get('window');

const SignUp = (props) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [language, setLanguage] = useState('');
  const [language_id, setLanguage_id] = useState('');
  const [showRoles, setShowRoles] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showSpecialism, setShowSpecialism] = useState(false);
  const [selectedSpeciality, setSpeciality] = useState('');
  const [speciality_id, setSpeciality_id] = useState('');
  const [years, setYears] = useState('');
  const [languages, storeLanguages] = useState([]);
  const [specialities, storeSpecialities] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlert] = useState('Please Fill All Fields');
  const [readyToSubmit, setReadyToSibmit] = useState(true);

  const { navigation } = props;

  useEffect(() => {
    getLanguages();
    getSpecialities();
  }, [])

  const getLanguages = () => {
    APICaller('getLanguages', 'GET')
      .then(response => {
        console.log("response getting languages => ", response);
        const { data, message, status, statusCode } = response['data'];
        if (status === 'success') {
          storeLanguages([...data]);
        }
      })
      .catch(error => {
        console.log("error getting languages => ", error)
      })
  }

  const getSpecialities = () => {
    APICaller('getTherapistTypes', 'GET')
      .then(response => {
        console.log("response getting specialiites => ", response);
        const { data, message, status, statusCode } = response['data'];
        if (status === 'success') {
          storeSpecialities([...data]);
        }
      })
      .catch(error => {
        console.log("error getting specialiites => ", error)
      })
  }

  const registerUser = () => {
    Events.trigger("showModalLoader")
    const registerObj = {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      role: role == 'Client' ? "0" : "1",
      languages: [language_id],

      experience: years,
      specialism: [speciality_id],

      device_type: "1",
      fcm_token: "poiytr4677y7ttgtttg",
      qualification: "5",
      address: "ABC place",
      latitude: "56",
      longitude: "555"

    }
    console.log('register object => ', registerObj)
    APICaller('register', 'POST', registerObj)
      .then(response => {
        Events.trigger("hideModalLoader");
        console.warn('response after register => ', response);
        const { data, message, status, statusCode } = response['data']
        // const { message } = data;
        if (message === "Your account created successfully.") {
          navigation.navigate('VerifyEmail', { user_id: data['user_id'] })
        }
      })
      .catch(error => {
        console.warn('error after register => ', error);
        const { data } = error;
        Events.trigger("hideModalLoader")
        setAlert(data.message);
        setShowAlert(true)
      })
  }

  const signUpHandler = () => {
    if (first_name &&
      last_name &&
      email &&
      password &&
      confirm_password &&
      role &&
      language_id &&
      password === confirm_password
    ) {
      if (role == "Therapist") {
        if (!years) {
          setAlert('Please Enter Total Experience.')
          setShowAlert(true)
        } else if (!selectedSpeciality) {
          setAlert('Please Select Speciality')
          setShowAlert(true);
        } else {
          // call api
          registerUser();
        }
      } else {
        // call api
        registerUser();
      }
    } else {
      if (!first_name)
        setAlert('Please Enter First Name.')
      else if (!last_name)
        setAlert('Please Enter Last Name.')
      else if (!email)
        setAlert('Please Enter Email Address.')
      else if (emailError)
        setAlert('Please Enter Valid Email Address.')
      else if (!password)
        setAlert('Please Enter Password.')
      else if (!confirm_password)
        setAlert('Please Enter Confirm Password.')
      else if (confirm_password !== password)
        setAlert('Please Enter Same Password.')
      else if (!role)
        setAlert('Please Select Your Role.')
      else if (!language)
        setAlert('Please Select Your Language.')
      setShowAlert(true)
    }
  }

  const ListView = () => (
    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
      {
        languages.map(lang => {
          console.log("!!!!!!!!!!")
          return (
            <TouchableOpacity
              onPress={() => {
                setLanguage_id(lang['id']);
                setLanguage(lang['title'])
                setShowLanguages(false)
              }}
              style={{
                height: Dimensions.get('window').height * 0.05,
                width: Dimensions.get('window').width * 0.6,
                paddingHorizontal: 2,
                justifyContent: 'center',
                alignItems: 'flex-start'
              }}
            >
              <Text>{lang['title']}</Text>
            </TouchableOpacity>
          )
        }
        )
      }
    </View>
  )

  const SpecialitiesList = () => (
    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
      {
        specialities.map(speciality => {
          console.log("!!!!!!!!!!")
          return (
            <TouchableOpacity
              onPress={() => {
                setSpeciality_id(speciality['id']);
                setSpeciality(speciality['title'])
                setShowSpecialism(false)
              }}
              style={{
                height: Dimensions.get('window').height * 0.05,
                width: Dimensions.get('window').width * 0.6,
                paddingHorizontal: 2,
                justifyContent: 'center',
                alignItems: 'flex-start'
              }}
            >
              <Text>{speciality['title']}</Text>
            </TouchableOpacity>
          )
        }
        )
      }
    </View>
  )

  const Roles = () => (
    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
      <TouchableOpacity
        onPress={() => {
          setRole('Client');
          setShowRoles(false)
        }}
        style={{
          height: Dimensions.get('window').height * 0.05,
          width: Dimensions.get('window').width * 0.6,
          paddingHorizontal: 2,
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
      >
        <Text>Client</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setRole('Therapist');
          setShowRoles(false)
        }}
        style={{
          height: Dimensions.get('window').height * 0.05,
          width: Dimensions.get('window').width * 0.6,
          paddingHorizontal: 2,
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
      >
        <Text>Therapist</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ width: '100%', flex: 1 }}
      keyboardVerticalOffset={'60'}
      behavior={'padding'}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container} >
        <Image source={constants.images.background} resizeMode={'stretch'} style={styles.containerBackground} />
        <Image source={constants.images.formsBackground} resizeMode={'stretch'} style={styles.formsBackground} />
        <View style={styles.backButtonView} >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}
          >
            {/* <Image source={constants.images.backIcon} style={{ height: 18, width: 10, margin: 10 }} /> */}
          </TouchableOpacity>
          <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center', }} >
            <Image
              source={constants.images.logo}
              resizeMode={'contain'}
              style={{
                height: Dimensions.get('window').height * 0.09,
                width: Dimensions.get('window').width * 0.75
              }} />
          </View>
          <View style={{ flex: 1.5 }} />
        </View>
        <View style={styles.formView} >
          <View style={styles.formWrap} >

            <View style={styles.formField} >
              <Text style={styles.fieldName} >FIRST NAME</Text>
              <View style={styles.fieldInputWrap} >
                <TextInput
                  style={styles.fieldInput}
                  onChangeText={text => setFirstName(text)}
                  value={first_name}
                  autoCompleteType={'off'}
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.formField} >
              <Text style={styles.fieldName} >LAST NAME</Text>
              <View style={styles.fieldInputWrap} >
                <TextInput
                  style={styles.fieldInput}
                  onChangeText={text => setLastName(text)}
                  value={last_name}
                  autoCompleteType={'off'}
                  autoCorrect={false}
                />
              </View>
            </View>
            <View style={styles.formField} >
              <Text style={styles.fieldName} >EMAIL ADDRESS</Text>
              <View style={styles.fieldInputWrap} >
                <TextInput
                  style={styles.fieldInput}
                  onChangeText={text => setEmail(text)}
                  value={email}
                  autoCompleteType={'off'}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  onBlur={() => { if (email.length) setEmailError(validateEmail(email)) }}
                />
              </View>
            </View>

            <View style={styles.formField} >
              <Text style={styles.fieldName} >CREATE PASSWORD</Text>
              <View style={styles.fieldInputWrap} >
                <TextInput
                  style={styles.fieldInput}
                  secureTextEntry={true}
                  onChangeText={text => setPassword(text)}
                  value={password}
                  autoCompleteType={'off'}
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.formField} >
              <Text style={styles.fieldName} >CONFIRM PASSWORD</Text>
              <View style={styles.fieldInputWrap} >
                <TextInput
                  style={styles.fieldInput}
                  secureTextEntry={true}
                  onChangeText={text => setConfirmPassword(text)}
                  value={confirm_password}
                  autoCompleteType={'off'}
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.formField} >
              <Text style={styles.fieldName} >ARE YOU A THERAPIST OR A CLIENT?</Text>
              <View style={styles.fieldInputWrap} >
                <TextInput
                  style={[styles.fieldInput, { width: Dimensions.get("window").width * 0.7 }]}
                  onChangeText={text => setLanguage(text)}
                  value={role}
                  editable={false}
                  autoCompleteType={'off'}
                  autoCorrect={false}
                />
                <TouchableOpacity onPress={() => setShowRoles(true)} >
                  <Image style={{ height: 25, width: 25, margin: 3 }} source={constants.images.downArrow} />
                </TouchableOpacity>
              </View>
            </View>

            {
              role == "Therapist"
                ?
                <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                  <View style={styles.formField} >
                    <Text style={styles.fieldName} >SPECIALISM</Text>
                    <View style={styles.fieldInputWrap} >
                      <TextInput
                        style={[styles.fieldInput, { width: Dimensions.get("window").width * 0.7 }]}
                        // onChangeText={text => setLanguage(text)}
                        value={selectedSpeciality}
                        editable={false}
                        autoCompleteType={'off'}
                        autoCorrect={false}
                      />
                      <TouchableOpacity onPress={() => setShowSpecialism(true)} >
                        <Image style={{ height: 25, width: 25, margin: 3 }} source={constants.images.downArrow} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.formField} >
                    <Text style={styles.fieldName} >YEARS OF EXPERIENCE</Text>
                    <View style={styles.fieldInputWrap} >
                      <TextInput
                        style={styles.fieldInput}
                        onChangeText={text => setYears(text)}
                        value={years}
                        autoCompleteType={'off'}
                        autoCorrect={false}
                        keyboardType={'number-pad'}
                      />
                    </View>
                  </View>
                </View>
                :
                <View />
            }

            <View style={styles.formField} >
              <Text style={styles.fieldName} >LANGUAGE YOU SPEAK</Text>
              <View style={styles.fieldInputWrap} >
                <TextInput
                  style={[styles.fieldInput, { width: Dimensions.get("window").width * 0.7 }]}
                  onChangeText={text => setLanguage(text)}
                  value={language}
                  editable={false}
                />
                <TouchableOpacity onPress={() => setShowLanguages(true)} >
                  <Image style={{ height: 25, width: 25, margin: 3 }} source={constants.images.downArrow} />
                </TouchableOpacity>
              </View>
            </View>

            <SubmitButton
              title={'SIGN UP'}
              submitFunction={() => signUpHandler()}
            />
          </View>
        </View>
        <View style={styles.footerView} >
          <Text style={styles.footerText} >Already signed up? <Text
            onPress={() => navigation.navigate('Login')}
            style={styles.footerlinkText}
          >Login</Text></Text>
          <Text style={styles.footerLinkTextBottom} >By continuing, you agree to our <Text
            style={{ borderBottomColor: '#ffffff', borderBottomWidth: 1 }}
          >Terms & Conditions.</Text></Text>
        </View>
      </ScrollView>

      <AwesomeAlert
        show={showRoles}
        closeOnTouchOutside={true}
        onConfirmPressed={() => {
          setShowRoles(false)
        }}
        onDismiss={() => {
          setShowRoles(false)
        }}
        customView={<Roles />}
      />

      <AwesomeAlert
        show={showLanguages}
        closeOnTouchOutside={true}
        onConfirmPressed={() => {
          setShowLanguages(false)
        }}
        onDismiss={() => {
          setShowLanguages(false)
        }}
        customView={<ListView />}
      />
      <AwesomeAlert
        show={showSpecialism}
        closeOnTouchOutside={true}
        onConfirmPressed={() => {
          setShowSpecialism(false)
        }}
        onDismiss={() => {
          setShowSpecialism(false)
        }}
        customView={<SpecialitiesList />}
      />

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

    </KeyboardAwareScrollView>
  )
};

export default SignUp;