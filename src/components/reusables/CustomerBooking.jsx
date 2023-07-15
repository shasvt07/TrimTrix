import {Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import React from 'react';

import { calculateTime } from './timeCalculation';
import tw from 'tailwind-react-native-classnames';
import { fetchShop } from '../../actions/customers/stores';
import { useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CustomerBooking = ({item,index,navigation}) => {
  const dispatch = useDispatch();

  const getShopDetails = async (shopId) => {
    await dispatch(fetchShop(shopId));
  }
  return (
    <>
    {index == 0 ?
      <TouchableOpacity style={styles.last}>
      <Image style={styles.lastImage} source={require('../../assets/last.png')}/>
      <View style={{marginLeft:20, justifyContent:'space-between'}}>
          <Text style={styles.cardHeading}>{item.shopName}</Text>
          {/* <Text style={styles.cardHeading}>{item.phoneNumber}</Text> */}
          <View style={{flexDirection:'row'}}>
            <Text style={styles.timeDate}>{calculateTime(item.bookingTime)} - </Text>
            <Text style={{}}>{calculateTime(item.completionTime)}</Text>
          </View>
          <Text style={styles.cost}>{item.services}</Text>
          <Text style={styles.cost}>Rs.{item.cost}</Text>
          <TouchableOpacity style={styles.rebookbtn} onPress = {()=> {
              getShopDetails(item.shopId);
              navigation.push('shopDetails', (params = {room: item.shopId}));}}>
                <FontAwesome name="repeat" size={15} color="#000000" />
              <Text style={{fontSize:15}}>Rebook</Text>
          </TouchableOpacity>
      </View>
      </TouchableOpacity>
      :
    <TouchableOpacity>
      <View style={styles.previous}>
        <View
          style={{
            backgroundColor: '#dfe6e9',
            justifyContent: 'cetner',
            alignItem: 'center',
            borderRadius: 10,
          }}>
          <Image style={tw`h-12 w-12`} source={require('../../assets/person.png')}/>

        </View>
        <View style={styles.preItems}>
          <Text style={{marginBottom: 2, fontSize: 20, color: '#000000'}}>
            {item.shopName}
          </Text>
          <View style={{flexDirection:'row'}}>
          <Text style={styles.timeDate}>{calculateTime(item.bookingTime)} - </Text>
          <Text style={{}}>{calculateTime(item.completionTime)}</Text>
          </View>
          <Text style={styles.cost}>Rs.{item.cost}</Text>
        </View>
        <TouchableOpacity style={styles.rebookbtn} onPress = {()=> {
              getShopDetails(item.shopId);
              navigation.push('shopDetails', (params = {room: item.shopId}));}}>
              <FontAwesome name="repeat" size={15} color="#000000" />
            <Text style={{fontSize: 15}}>Rebook</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: 'lightgrey',
          marginLeft: 85,
          marginBottom: 10,
        }}></View>
    </TouchableOpacity>
      }
      </>
  );
};

export default CustomerBooking;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headingtxt: {
    fontSize: 45,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 5,
    color: '#000000',
  },
  pastTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  filterbtn: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: '#dfe6e9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  last: {
    height: 360,
    margin: 14,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'lightgrey',
  },
  lastImage: {
    height: 150,
    margin: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxWidth: '95%',
  },
  cardHeading: {
    fontSize: 25,
    color: '#000000',
    marginBottom: 10,
  },
  previous: {
    padding: 10,
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  preItems: {
    marginLeft: 20,
    flex: 2,
  },
  rebookbtn: {
    flexDirection: 'row',
    backgroundColor: '#dfe6e9',
    height: 40,
    borderRadius: 50,
    width: 100,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  timeDate: {
    fontSize: 15,
    // marginBottom: 10,
  },
  cost: {
    fontSize: 15,
    marginBottom: 10,
  },
});
