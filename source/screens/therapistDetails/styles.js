import { Dimensions, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import constants from '../../utils/constants';
import colors from '../../utils/constants/colors';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  containerBackground: {
    height: '100%',
    width,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: -2
  },
  header: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: width * 0.05,
  },
  LocationInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  mapScreen: {
    flex: 7.5,
    width: width * 0.9,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mapView: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  mapWrap: {
    width: width * 0.9,
    height: height * 0.69,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsView: {
    minHeight: height * 0.3,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    bottom: height * 0.06,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'rgb(251,252,255)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  locationInputBox: {
    flexDirection: 'row',
    borderRadius: 5,
    height: height * 0.05,
    width: width * 0.9,
    alignItems: 'center',

    backgroundColor: constants.colors.white,
  },
  headingText: {
    fontSize: 20,
    color: constants.colors.white,
    fontWeight: '500'
  },
  swipeAction: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  swipeTextProps: {
    color: '#18adbd',
    fontSize: 16,
    marginLeft: 10,
    width: 242,
    height: 23,
  },
  name: {
    flexDirection: "row",
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: 14
  },
  price: {
    height: 16,
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 21,
    color: "#01d8fb"
  },

  callButton: {
    flex: 2,
  },
  textStylesOne: {
    textDecorationLine: 'underline',
    color: '#18adbd',
    fontSize: 16
  },
  textStylesTwo: {
    textDecorationLine: 'underline',
    color: '#18adbd',
    fontSize: 16
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  info: {
    height: height * 0.13,
    width: width * 0.9,
    paddingHorizontal: width * 0.05,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  misc: {
    height: height * 0.04,
    width: width * 0.9,
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  therapistInfo: {
    height: height * 0.13,
    width: width * 0.9,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  therapistDetails: {
    height: height * 0.1,
    width: width * 0.5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  imageWrap: {
    height: height * 0.1,
    width: height * 0.1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userImage: {
    height: height * 0.1,
    width: height * 0.1,
    borderRadius: 5,
  },
  costView: {
    height: height * 0.03,
    width: width * 0.9,
    paddingLeft: width * 0.05,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  infoDetails: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  infoHeading: {
    fontWeight: "600",
    fontSize: 16,
    color: 'rgb(42,42,42)',
    lineHeight: 30,
  },
  infoDesc: {
    fontWeight: '500',
    fontSize: 13,
    color: 'rgb(112,112,112)',
    lineHeight: 30,
  },
  costText: {
    fontWeight: '500',
    fontSize: 15,
    color: 'rgb(24,173,189)',
  }
})