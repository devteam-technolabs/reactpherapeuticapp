import { Dimensions, StyleSheet } from 'react-native';
import constants from '../../utils/constants';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  headerView: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  middleView: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 25,
    color: constants.colors.white,
    fontWeight: '500'
  },
  buttonText: {
    fontSize: 20,
    color: constants.colors.white,
    fontWeight: '500'
  },
  buttonTextSmall:{
    fontSize: 18,
    color: constants.colors.white,
    fontWeight: '500'
  },
  addressView: {
    height: height * 0.05,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    paddingHorizontal: width * 0.04,
    backgroundColor: 'white'
  },
  textInput: {
    height: height * 0.05,
    width: width * 0.77,
    color: 'rgb(51,51,51)',
    fontSize: 15

  },
  mapView: {
    height: height * 0.57,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: height * 0.02,
  },
  bottonView: {
    minHeight: height * 0.05,
    width: width * 0.9,
    paddingVertical: height * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: height * 0.02,
    // backgroundColor: constants.colors.darkGreen
  }
})