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

//   const getAddress = async (lat, lng) => {
//     // console.log(lat, lng);
//     try{
//       await Geocoder.from(lat,lng).then(data => {
//         var addressComponent = data.results[0].address_components[0];
//         console.log(addressComponent);
//         setCurrentAddress(addressComponent)
// })
// .catch(error => console.warn(error));
//     }catch(error){
//       console.log(error);
//     }
//   }

  const onChangeValue = (region) => {
    setRegion(region);
    // getAddress(region.latitude, region.longitude);
  }

  const handleSaveLocation = () => {
    shopData.current = {...shopData.current, location:{...shopData.current.location, latitude:region.latitude.toString(), longitude:region.longitude.toString()}}
    setMapOpen(false);
  }

  const mapViewRef = useRef(null);

  const handleTakeSnapshot = async () => {
    if (mapViewRef.current) {
      try {
        const uri = await mapViewRef.current.capture();
        setSnapshotUri(uri);
        shopData.current = {...shopData.current, location:{...shopData.current.location,image:uri}}
        console.log(uri);
      } catch (error) {
        console.error('Error capturing snapshot:', error);
      }
    }
    else{
      console.log('Taking snapshot')

    }
  };



  return (
    <View style={styles.container}>
      <ViewShot ref={mapViewRef} style={{width:'100%', height:'100%', flex:1}}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        // showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={region}
        onRegionChangeComplete={onChangeValue}
        ref={ref => map = ref}
        >
          <Marker coordinate={{latitude:region.latitude, longitude:region.longitude}}>
            <Image style={{height:20,width:20, backgroundColor:'transparent'}} source={require('../../assets/locpin.png')} />
          </Marker>
        </MapView>
        </ViewShot>

          
        <Marker 
        style={{top:'50%', left:'50%', marginLeft:-15, marginTop:-28, position:'absolute'}}
        >
        <Image style={{height:30, width:30, backgroundColor:'transparent'}} source={require('../../assets/marker.png')} />
        </Marker>
        <TouchableHighlight
            style={[
            tw`p-4 items-center rounded-full absolute bottom-10`,
            {backgroundColor: '#000'},
            ]}
            onPress={async() => { await handleTakeSnapshot(), handleSaveLocation()}}
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
