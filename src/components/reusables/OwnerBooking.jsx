import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import { calculateTime } from './timeCalculation';

const OwnerBooking = ({item,index}) => {
  return (
    <>
    <TouchableOpacity>
      <View style={styles.previous}>
        <View
          style={{
            backgroundColor: '#dfe6e9',
            justifyContent: 'cetner',
            alignItem: 'center',
            borderRadius: 10,
          }}>
          <Image source={require('../../assets/logo.png')} />
        </View>
        <View style={styles.preItems}>
          <Text style={{marginBottom: 2, fontSize: 20, color: '#000000'}}>
            {item.shopName}
          </Text>
          <View style={{flexDirection:'row'}}>
          <Text style={styles.timeDate}>{calculateTime(item.bookingTime)} - </Text>
          <Text style={styles.timeDate}>{calculateTime(item.completionTime)}</Text>
          </View>
          <Text style={styles.cost}>Rs.{item.cost}</Text>
        </View>
        <TouchableOpacity style={styles.rebookbtn}>
          <Text style={{fontSize: 15}}>Details</Text>
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

      </>
  );
};

export default OwnerBooking;

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
    height: 340,
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
    backgroundColor: '#dfe6e9',
    height: 40,
    borderRadius: 50,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
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
