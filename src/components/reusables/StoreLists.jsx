import React from 'react';
import {
  ActivityIndicator,
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
import {fetchShop} from '../../actions/customers/stores';

const StoreList = ({navigation, item, index, isLoading}) => {
  const dispatch = useDispatch();

  const getShopDetails = async shopId => {
    await dispatch(fetchShop(shopId));
  };

  return (
    <View>
     {isLoading ? <View
        // flex={1}
        backgroundColor='white'
        alignItems='center'
        justifyContent='center'
      >
        <ActivityIndicator size="small" />
      </View> : 
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        width: '100%',
      }}
      onPress={() => {
        getShopDetails(item._id);
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
          <View style={{marginLeft: 10}}>
            <Text style={{fontSize: 20, color: '#000000'}}>{item.name}</Text>
            <Text numberOfLines={1} style={{fontSize: 15, overflow: 'hidden'}}>
              {item.location.address}
            </Text>
          </View>
          <Entypo name="chevron-small-right" size={24} color="black" />
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: 'lightgrey',
            width: '100%',
            marginTop: 20,
            marginBottom: 0,
          }}></View>
      </View>
    </Pressable>
        }
        </View>
  );
};

export default StoreList;

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
});
