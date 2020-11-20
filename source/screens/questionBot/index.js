import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import QuestionItem from './questionItem';
import AwesomeAlert from 'react-native-awesome-alerts';
import constants from '../../utils/constants';
import Events from '../../utils/events';
import APICaller from '../../utils/APICaller';
import SubmitButton from '../../components/submitButton';
const { height, width } = Dimensions.get('window');

const QuestionBot = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('Thank You');
  const [questionsList, setQuestions] = useState([]);
  const [noOfAnswers, setNoOfAnswers] = useState(0);
  const scrollRef = useRef();

  const { navigation, dispatch, userData, userToken } = props;

  useEffect(() => {
    getQuestions()
  }, []);

  const getQuestions = () => {
    const endpoint = 'user/questions';
    const method = 'GET';
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${userToken}`,
      "Accept": "application/json"
    };
    APICaller(endpoint, method, null, headers)
      .then(response => {
        console.log('response getting questions => ', response['data']);
        const { status, statusCode, message, data } = response['data'];
        if (status === 'success') {
          setQuestions([...data]);
        }
      })
      .catch(error => {
        console.log("error getting questions => ", error['data'])
      })
  }

  const selectAnswer = (answerData) => {
    const endpoint = 'user/answers';
    const method = 'POST';
    const body = {
      user_id: userData.user_id,
      question_id: answerData.question_id,
      answer_id: answerData.id
    };
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${userToken}`,
      "Accept": "application/json"
    };
    console.log('body to send => ', body);
    APICaller(endpoint, method, body, headers)
      .then(response => {
        console.log('response after answering question => ', response['data']);
        const { status, statusCode, message, data } = response['data'];
        if (status === 'success') {
          setNoOfAnswers(prevNo => prevNo + 1);
        }
      })
      .catch(error => {
        console.log("error after answering question => ", error['data'])
      })
  }

  return (
    <View style={styles.outerView} >
      <Image source={constants.images.background} resizeMode={'stretch'} style={styles.containerBackground} />
      <ScrollView
        ref={scrollRef}
        // onContentSizeChange={() => scrollRef.scrollTo({x: 0, y: 0, animated: true})}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.backButtonView} >
          <TouchableOpacity
            // onPress={() => navigation.goBack()}
            style={styles.backButtonWrap}
          >
            <Image source={constants.images.backArrowWhite} style={{ height: 18, width: 10, margin: 10 }} />
          </TouchableOpacity>
          <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center' }} >
            <Text style={styles.headingText} >To get started, we just</Text>
            <Text style={styles.headingText} >need to learn a bit</Text>
            <Text style={styles.headingText} >more about you</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>
        {
          questionsList.length
            ?
            questionsList.map((question, index) => {
              if (index <= noOfAnswers)
                return <QuestionItem selectAnswer={selectAnswer} data={question} />
            })
            :
            <View />
        }
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: height * 0.05, marginTop: height * 0.08 }} >
          <SubmitButton
            title={(noOfAnswers == questionsList.length ) ? 'CONTINUE' : 'SKIP'}
            submitFunction={() => navigation.navigate('MyProfile')}
          />
        </View>
      </ScrollView>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        message={message}
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
}

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  userToken: state.user.userToken
});

export default connect(mapStateToProps)(QuestionBot);