import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Button, Alert } from 'react-native';
import constants from '../../utils/constants';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Rating } from 'react-native-ratings';
import CustomButton from '../../components/CustomButton';
import styles from './styles.js';
import { connect } from 'react-redux';
import APICaller from '../../utils/APICaller';
import { mapStyle } from '../therapistStatus';
import { Marker } from 'react-native-maps';

const TherapistDetails = (props) => {
  const [therapistsList, setTherapistsList] = useState([]);
  const [therapist, setTherapist] = useState({
    image: null,
    first_name: null,
    last_name: null,
    experience: null,
    qualification: null
  });
  const [therapistNumber, setTherapistNumber] = useState(0)
  const { userToken, navigation } = props;

  useEffect(() => {
    // if (!therapist)
    getTherapistsList()
  }, [therapist]);

  // console.log("therapist data ===> ", therapist)
  const getTherapistsList = () => {
    const endpoint = 'user/search/therapist';
    const method = 'POST';
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${userToken}`,
      "Accept": "application/json"
    };
    let body = new FormData();
    body.append('latitude', '30.7333');
    body.append('longitude', '76.7794');
    APICaller(endpoint, method, body, headers)
      .then(response => {
        console.log('response getting therapist list => ', response['data'], '------');
        const { status, statusCode, message, data } = response['data'];
        if (message == "Therapist List.") {
          setTherapistsList([...data]);
          setTherapist(data[0])
        }
      })
      .catch(error => {
        console.log("response getting therapist listtt => ", error['data'])
      })
  }

  return (
    <View style={styles.container}>
      <Image source={constants.images.background} resizeMode={'stretch'} style={styles.containerBackground} />

      {/* Header */}
      <View style={styles.header}>
        <View style={{ flex: 2, justifyContent: 'flex-start' }}>
          <TouchableOpacity onPress={() => navigation.navigate('MyProfile')} >
            <Image source={constants.images.ic_menu} style={{ height: 18, width: 18, margin: 10 }} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 3 }}>
          <Text style={[styles.headingText]}>Find a verified</Text>
          <Text style={[styles.headingText]}>therapist now</Text>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>

      {/* Address Input */}
      <View style={styles.LocationInput}>
        <View style={styles.locationInputBox}>
          <Image source={constants.images.ic_location} style={{ margin: 10 }} />
          <TextInput
            // style={styles.addressInput}
            value={'London NW8 8QN, United Kingdom'}
            autoCapitalize={'none'}
          />
        </View>
      </View>

      <View style={styles.mapScreen}>
        <View style={styles.mapWrap}>
          <MapView
            style={styles.mapView}
            customMapStyle={mapStyle}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0,
              longitudeDelta: 0.0121,
            }}

          >
            <Marker
              coordinate={{
                latitude: 37.78825,
                longitude: -122.4324
              }}
            />
          </MapView>

        </View>
        <View style={styles.detailsView} >

          <View style={styles.therapistInfo}>
            <View style={styles.imageWrap}>
              <Image
                source={therapist && therapist['image'] !== null ? { uri: therapist['image'] } : constants.images.defaultUserImage}
                style={styles.userImage} />
            </View>

            {/* <View style={styles.therapistDetails}>
              <View style={styles.name}>
                <Text style={{ fontSize: 16 }}>{`Dr. ${therapist['first_name']} ${therapist['last_name']}`}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: "center", backgroundColor: '#01d8fb', borderRadius: 5, height: 22, }}>
                </View>
              </View>
              <Text style={{ fontSize: 14 }}>{`${therapist['experience']} years experience`}</Text>
              <Text style={{ fontSize: 14 }}>{`${therapist['experience']} consultations done`}</Text>
            </View> */}
          </View>
          <View style={styles.costView} >
            <Text style={styles.costText} >Cost 50$</Text>
          </View>
          <View style={styles.info}>
            <View style={styles.infoDetails}>
              <Text style={styles.infoHeading}>Qualification:  </Text>
              {/* <Text style={styles.infoDesc}>{therapist['qualification']}</Text> */}
            </View>
            <View style={styles.infoDetails}>
              <Text style={styles.infoHeading}>Languages:  </Text>
              <Text style={styles.infoDesc}>English, Italian, Spanish </Text>
            </View>
            <View style={styles.infoDetails}>
              <Text style={styles.infoHeading}>Specialism:  </Text>
              <Text style={styles.infoDesc}>Psychotherapy, Cognitive</Text>
            </View>
          </View>
          <CustomButton
            title={'Call Now'}
            submitFunction={() => Alert.alert('clicked')}
          />
          <View style={styles.misc}>
            <TouchableOpacity
              onPress={() => {
                setTherapist(therapistsList[therapistNumber + 1]);
                setTherapistNumber(prevNo => ++prevNo)
              }}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Text style={styles.textStylesOne}>Search Again</Text>
            </TouchableOpacity>
            <Text style={styles.textStylesTwo}>Cancel</Text>
          </View>
        </View>

      </View>
    </View>

  )
};

const mapStateToProps = (state) => ({
  userToken: state.user.userToken
})

export default connect(mapStateToProps)(TherapistDetails);
