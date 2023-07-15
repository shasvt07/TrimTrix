import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {FlatList, PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE,Polyline} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';
import Card from './card';
import RBSheet from "react-native-raw-bottom-sheet";
import { windowHeight } from '../../utils/Dimension';
import { useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import { Button, Linking } from 'react-native';

const GetDirection = ({navigation, route}) => {
    const {shop} = route.params;
    const GOOGLE_MAPS_APIKEY = 'AIzaSyCmEcJsr0MuiVyHhC9Jr5wVPPwOGMQl7aE';
    

    const [destinationLocation, setDestinationLocation] = useState({
        latitudeDelta:0.02,
        longitudeDelta:0.0022,
        latitude:Number(shop.location.latitude),
        longitude:Number(shop.location.longitude)
    });

    const [currentLocation, setCurrentLocation] = useState({
        latitudeDelta:0.02,
        longitudeDelta:0.0022,
        latitude: 26.7778153,
        longitude: 80.956942
    });


    useEffect(() => {
        getLocation()
        requestLocationPermission();
    },[])

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  

  const getLocation = () => {
    Geolocation.getCurrentPosition(
        (position) => {
        setCurrentLocation({
            ...currentLocation,latitude:position.coords.latitude,longitude:position.coords.longitude
        })
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };    

  useEffect(() => {handleOpenGoogleMaps()},[destinationLocation]);

  const handleOpenGoogleMaps = () => {
    const latitude = destinationLocation.latitude;
    const longitude = destinationLocation.longitude;
    const destination = `${latitude},${longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

    Linking.openURL(url);
  };

  
  return (
    <View style={styles.container}>
      {/* <View style={styles.bottomContainer}> */}
      {/* </View> */}
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.GetDirection}
        initialRegion={destinationLocation}
        showsUserLocation={true}
        >
          <Marker key={shop._id}
            pinColor={shop.isOpen ?  'green' : 'red'}
            coordinate={{latitude:Number(shop.location.latitude), longitude:Number(shop.location.longitude)}}
            title={shop.isOpen ? 'Open' : 'Closed'}
          >
          </Marker>
          <Polyline
          coordinates={[currentLocation, destinationLocation]}
          strokeWidth={6}
          strokeColor="#000000"
        />
          </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    // alignItems: 'center',
  },
  GetDirection: {
    height: '100%',
    width: '100%',
  },
  bottomContainer:{
    flex:1,
    padding:25,
    backgroundColor:'white',
  },
  contentContainer:{
    flex:1,
    alignItems:'center',
  },


});

export default GetDirection;
