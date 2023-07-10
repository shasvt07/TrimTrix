import React from 'react'
import {
    FlatList,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
import {useDispatch} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';


const StoreList = ({navigation, item, index}) => {
  const dispatch = useDispatch();

  return (
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft:20,
              paddingRight:20,
              paddingTop:10,
              width: '100%',
            }}
            onPress={() => {
              dispatch({type:"STORE_DETAILS", payload:item});
              navigation.navigate('shopDetails', (params = {room: item._id}));
            }}>
            <View style={styles.pinicon}>
              <Entypo name="location-pin" size={27} color={'#000000'} />
            </View>
            <View style={{width: '90%', paddingLeft: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{marginLeft:10}}>
                  <Text style={{fontSize: 20, color: '#000000'}}>{item.name}</Text>
                  <Text numberOfLines={1} style={{fontSize: 15, overflow:'hidden'}}>{item.location}</Text>
                </View>
                <Entypo name="chevron-small-right" size={24} color="black" />
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: 'lightgrey',
                  width: '100%',
                  marginTop: 20,
                  marginBottom:0,
                }}></View>
            </View>
          </Pressable>
        );
    };

export default StoreList

const styles = StyleSheet.create({
    pinicon: {
        backgroundColor: '#ecf0f1',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000000',
        height: 40,
        width: 40,
    
        borderRadius: 30,
      },
})