import { useEffect, useRef, useState } from 'react';
import {Image, PermissionsAndroid, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';
import tw from 'tailwind-react-native-classnames';
import { ref } from 'yup';
import ViewShot from 'react-native-view-shot';


const SetMapLocation = ({shopData,setMapOpen}) => {
  const [locaiton,setLocation] = useState({locaiton:26.7778153, longitude:80.956942});
  const [mapShot, setMapShot] = useState('');
  const [snapshotUri, setSnapshotUri] = useState('');


  const [region, setRegion] = useState({
    latitudeDelta:0.0112,
    longitudeDelta:0.0022,
    latitude: 26.7778153,
    longitude:80.956942

  })
  const [locationChosen,setLocationChosen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
    useEffect(() => {
        // getLocation();
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

  // const getLocation =async() => {
  //   // requestLocationPermission();
  //   await Geolocation.getCurrentPosition(
  //       (position) => {
  //         // shopData.current = {...shopData.current, latitude: position.coords.latitude, longitude: position.coords.longitude}
  //       },
  //       (error) => {
  //         // See error code charts below.
  //         console.log(error.code, error.message);
  //       },
  //       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
  //   );
  // };

  useEffect(() => {
    handleMarkerLocation();
  }, []);
  
  const handleMarkerLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        map.animateToRegion({
          ...region,
          latitude:latitude,
          longitude:longitude,
        })
        setRegion({
          ...region,
          latitude:latitude,
          longitude:longitude,
        });
        setLocationChosen(true);
        
      }
    )
  }

  // const getAddress = async (lat, lng) => {
  //   // console.log(lat, lng);
  //   Geocoder.fallbackToGoogle("AIzaSyCmEcJsr0MuiVyHhC9Jr5wVPPwOGMQl7aE");
  //   try{
  //     let ret = await Geocoder.geocodePosition({lat, lng})
  //     const address = (ret[0].formattedAddress);
  //     setCurrentAddress(address);
  //     console.log(address);
  //   }catch(error){
  //     console.log(error);
  //   }
  // }

  const onChangeValue = (region) => {
    setRegion(region);
    // getAddress(region.latitude, region.longitude);
  }

  const handleSaveLocation = () => {
    shopData.current = {...shopData.current, location:{...shopData.current.locaiton, latitude:region.latitude.toString(), longitude:region.longitude.toString()}}
    setMapOpen(false);
  }



  return (
    <View style={styles.container}>
      <ViewShot ref={mapViewRef} style={{ height:'100%', width:'100%', flex:1}}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={region}
        onRegionChangeComplete={onChangeValue}
        ref={ref => map = ref}
        >
          <Marker coordinate={{latitude:region.latitude, longitude:region.longitude}}>
        <Image style={{height:30, width:30, backgroundColor:'transparent'}} source={require('../../assets/marker.png')} />

          </Marker>
        </MapView>
          
        <Marker 
        style={{top:'50%', left:'50%', marginLeft:-15, marginTop:-28, position:'absolute'}}
        >
        <Image style={{height:30, width:30, backgroundColor:'transparent'}} source={require('../../assets/marker.png')} />
        </Marker>
        </ViewShot>
        <TouchableHighlight
            style={[
            tw`p-4 items-center rounded-full absolute bottom-10`,
            {backgroundColor: '#000'},
            ]}
            onPress={() => {handleSaveLocation()}}
            underlayColor={false? 'transparent' : '#E5E7EB'}>
            <Text style={tw`text-white font-semibold`}>
            Continue
            </Text>
        </TouchableHighlight>
        
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //   ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    flex:1,
    //   justifyContent: 'flex-end',
    alignItems: 'center',
  },
    map: {
    //   ...StyleSheet.absoluteFillObject,
    height: '95%',
    width: '100%',
    flex:1
  },
});

export default SetMapLocation;
