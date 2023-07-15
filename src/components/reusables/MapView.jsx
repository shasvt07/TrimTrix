import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {FlatList, PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';
import Card from './card';
import RBSheet from "react-native-raw-bottom-sheet";
import { windowHeight } from '../../utils/Dimension';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../context/AuthContext';

const Map = ({navigation}) => {
    const {shopList,isLoading} = useSelector((state) => state.shopList);
    const {socket} = useContext(AuthContext);
    const dispatch = useDispatch();

    const [region, setRegion] = useState({
      latitudeDelta:0.02,
      longitudeDelta:0.0022,
      latitude:26.7778153,
      longitude:80.956942
  
    })

    useEffect(() => {
        getLoaction();
        requestLocationPermission();
        socket.on('store:StatusDetail', (storeId,status) => {
          dispatch({type:"SHOP_STATUS", payload:{shopId:storeId,openClose:status}});
        })
      
    },[socket])

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


  const getLoaction = () => {
    Geolocation.getCurrentPosition(
        (position) => {
          // console.log(position);
          setRegion({
            ...region,
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
          })
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  
  return (
    <View style={styles.container}>
      {/* <View style={styles.bottomContainer}> */}
      {/* </View> */}
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
        >
        {shopList.map((item,index) => (
          <Marker key={item._id}
            pinColor={item.isOpen ?  'green' : 'red'}
            coordinate={{latitude:Number(item.location.latitude), longitude:Number(item.location.longitude)}}
            onPress={() => this[RBSheet + index].open()}
            title={item.isOpen ? 'Open' : 'Closed'}
          >
          <Callout>
            <RBSheet
            ref={ref => {
              this[RBSheet + index] = ref;
            }}
      
            closeOnDragDown={true}
            closeOnPressBack={true}
            height={windowHeight/1.8}
            customStyles={{
              container: {
                // justifyContent: "center",
                // alignItems: "center"
              }
            }}
          >
            <Card currentRef={() => this[RBSheet + index].close()} shop={item} navigation={navigation}/>
          </RBSheet>
          </Callout>
          </Marker>
         ))}
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
  map: {
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

export default Map;
