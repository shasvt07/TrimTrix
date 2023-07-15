import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useDebugValue, useEffect, useRef, useState} from 'react';
import CheckBox from 'react-native-check-box';
import Feather from 'react-native-vector-icons/Feather';
import {io} from 'socket.io-client';
import {AuthContext} from '../../../context/AuthContext';
import ShopRegister from './ShopRegister';
import {fetchCustomer, fetchStore, openClose} from '../../../actions/owners/store';
import {useDispatch, useSelector} from 'react-redux';
import {calculateTime, getFinishTime} from '../../reusables/timeCalculation';
import {fetchShop} from '../../../actions/customers/stores';
import CurrentLobbyDetail from './CurrentLobbyDetail';
import {Pressable} from 'react-native';
import { windowWidth } from '../../../utils/Dimension';


const MyStore = ({navigation}) => {
  const {currentUser,socket} = useContext(AuthContext);
  const {myShop} = useSelector(state => state.myShop);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(true);
  const {shop} = useSelector(state => state.shop);
  const isOpen = useRef(false);

  const fetchShopDetails = async shopId => {
    dispatch(fetchShop(shopId));
  };

  const fetch = () => {
    dispatch(fetchStore(currentUser._id));
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (myShop !== null) {
      fetchShopDetails(myShop._id);
    }
  }, [myShop]);

  useEffect(() => {
    socket.emit('join:room', myShop?._id);
  }, [myShop]);

  useEffect(() => {
    socket.on('seat:ProcessDetails', seatInfo => {
      dispatch({type: 'SEAT_PROCESS', payload: seatInfo});
    });
    socket.on('seat:BookingDetails', seatInfo => {
      dispatch({type: 'SEAT_BOOKED', payload: seatInfo});
    });
    socket.on('seat:EmptyDetail', seatId => {
      dispatch({type: 'EMPTY_SEAT', payload: seatId});
    });
  }, [socket]);

  const getUserInfo = customerId => {
    dispatch(fetchCustomer(customerId));
  };

  const hanldeCloseShop = async() => {
    isOpen.current = false;
    socket.emit('store:Status', {storeId:myShop._id,status:isOpen.current});
    dispatch(openClose(myShop._id,isOpen.current));
  }
  
  const hanldeOpenShop = async() => {
    isOpen.current = true;
    socket.emit('store:Status', {storeId:myShop._id,status:isOpen.current});
    dispatch(openClose(myShop._id,isOpen.current));
  }

  return (
    <View style={{flex:1,backgroundColor:'#FFFFFF'}}>
      {myShop === null || myShop === undefined ? (
        <ShopRegister />
      ) : (
        <ScrollView >
          <View style={styles.container}>
            <View
              style={{
                justifyContent: 'space-around',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.heading}> My Store</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#ecf0f1',
                  borderRadius: 20,
                  width: 45,
                  height: 45,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() =>
                  navigation.navigate(
                    'updateStore',
                  )
                }>
                <Feather name="edit" size={24} />
              </TouchableOpacity>
            </View>
            <View style={styles.partition}></View>
            <TouchableOpacity style={styles.last}>
              <Image
                style={styles.lastImage}
                source={require('../../../assets/last.png')}
              />
              <View style={{marginLeft: 20}}>
                <Text style={styles.cardHeading}>{shop?.name}</Text>

                <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
                  <View style={{flex: 2}}>
                    <Text style={styles.timeDate}>Costs of services: </Text>
                    <View style={{marginTop: 10}}>
                      <Text style={styles.cost}>
                        Hair Cutting: Rs.{Number(shop?.hair?.cost)}
                      </Text>
                      <Text style={styles.cost}>
                        Bread Triming: Rs.{Number(shop?.beard?.cost)}
                      </Text>
                    </View>
                  </View>
                  <View style={{flex: 1}}>
                    {shop?.isOpen ? (
                      <Pressable
                        onPress={()=>hanldeCloseShop()}
                        style={[
                          styles.rebookbtn,
                          {backgroundColor: '#38CC77'},
                        ]}>
                        <Text style={styles.btntxt}>Close Shop</Text>
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={()=>hanldeOpenShop()}
                        style={[
                          styles.rebookbtn,
                          {backgroundColor: '#FF6263'},
                        ]}>
                        <Text style={styles.btntxt}>Open Shop</Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View></View>
            <Text style={styles.heading}> My Lobby</Text>
            <View style={styles.lobby}>
              {shop?.lobby
                ?.sort((a, b) => {
                  if (a.bookingTime === null && b.bookingTime === null) {
                    return 0;
                  } else if (a.bookingTime === null && b.bookingTime !== null) {
                    return 1;
                  } else if (b.bookingTime === null && a.bookingTime !== null) {
                    return -1;
                  }
                  return a.bookingTime > b.bookingTime ? 1 : -1;
                })
                .map((seat, index) => (
                  <View style={{alignItems: 'center'}} key={seat._id}>
                    <Text style={{fontSize: 15}}>
                      {seat.bookingTime !== null &&
                        calculateTime(seat.bookingTime)}
                    </Text>
                    <TouchableOpacity
                      key={seat?._id}
                      style={[
                        styles.addbtn,
                        seat.status === 'processing'
                          ? {backgroundColor: '#E8BD0D'}
                          : seat.status === 'booked' &&
                            (seat.personId === currentUser._id
                              ? {backgroundColor: '#23C4ED'}
                              : {backgroundColor: '#E21717'}),
                      ]}></TouchableOpacity>
                    <Text style={{fontSize: 15}}>
                      {seat.bookingTime !== null &&
                        calculateTime(
                          getFinishTime(
                            seat.bookingTime,
                            shop?.hair?.time,
                            shop?.beard?.time,
                            seat?.bookedServices,
                          ),
                        )}
                    </Text>
                  </View>
                ))
                }
            </View>
          </View>
          <CurrentLobbyDetail />
        </ScrollView>
      )}
    </View>
  );
};

export default MyStore;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  partition: {
    backgroundColor: 'lightgrey',
    height: 1,
    width: '100%',
  },
  heading: {
    fontSize: 25,
    color: '#000000',
    fontWeight: 'bold',
    margin: 20,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  lobby: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: windowWidth-20,
    flexWrap: 'wrap',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'lightgray',
  },
  occupied: {
    width: 50,
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E21717',
    margin: 12,
  },

  addbtn: {
    width: 50,
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#38CC77',
    margin: 13,
    marginTop: 5,
    marginBottom: 5,
  },
  services: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paybtn: {
    backgroundColor: '#000000',
    height: 50,
    width: 170,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 30,
  },
  btntxt: {
    color: '#FFFFFF',
    fontSize: 15,
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
  cost: {
    fontSize: 15,
    marginBottom: 10,
    marginRight: 10,
    color: '#000000',
  },
  rebookbtn: {
    backgroundColor: '#dfe6e9',
    height: 40,
    borderRadius: 50,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
