import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import MapView, { AnimatedRegion, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './styles';
import constants from '../../utils/constants';
import APICaller from '../../utils/APICaller';
import { saveUserProfile } from '../../redux/actions/user';

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dadada',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c9c9c9',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
];

const TherapistStatus = (props) => {

  const { userToken, userData, navigation, dispatch } = props;
  const { online_status } = userData;

  useEffect(() => {
    console.log('online status => ', online_status)
  }, [online_status])

  const changeOnlineStatus = () => {
    const endpoint = 'user/changeOnlineStatus';
    const method = 'GET';
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${userToken}`,
      "Accept": "application/json"
    };
    APICaller(endpoint, method, null, headers)
      .then(response => {
        console.log('=====> ', response['data']['data']['online_status']);
        const { status, statusCode, message, data } = response['data'];
        if (status === 'success') {
          dispatch(saveUserProfile(data));
          // setAlert('Profile Update Successfully')
          // setShowAlert(true)
        }
      })
      .catch(error => {
        console.log('error changing online status => ', error['data'])
      })
  }

  return (
    <View style={styles.container} >
      <Image source={constants.images.background} resizeMode={'stretch'} style={styles.containerBackground} />
      <View style={styles.headerView} >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
          <Image source={constants.images.ic_menu} style={{ height: 14.1, width: 18.3, margin: 10 }} />
        </TouchableOpacity>
        <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }} >
          <Text style={styles.headingText} >Reaching out</Text>
        </View>
        <View style={{ flex: 1 }} />
      </View>
      <View style={styles.middleView} >
        <View style={styles.addressView} >
          <TextInput
            style={styles.textInput}
            placeholder={'ABC location'}
          />
        </View>
        <View style={styles.mapView} >
          <MapView
            style={{ height: '100%', width: '100%', borderRadius: 10 }}
            customMapStyle={mapStyle}
            // provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
              latitude: 51.46841320,
              longitude: -0.17070400,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => changeOnlineStatus()}
          style={styles.bottonView} >
          {
            online_status == 1
              ?
              <Text style={styles.buttonText} >YOU'RE ONLINE NOW</Text>
              :
              <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                <Text style={styles.buttonTextSmall} >You're offline. Go online to</Text>
                <Text style={styles.buttonTextSmall} >find new clients</Text>
              </View>
          }
        </TouchableOpacity>
      </View>
      <View style={styles.headerView} />
    </View>
  )
}

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  userToken: state.user.userToken
});

export default connect(mapStateToProps)(TherapistStatus);