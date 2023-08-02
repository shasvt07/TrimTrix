import {
  RefreshControl,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  BackHandler,
  TouchableHighlight,
  Image,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {AuthContext} from '../../../context/AuthContext';
import {useDispatch, useSelector} from 'react-redux';
import {createStore} from '../../../actions/owners/store';
import tw from 'tailwind-react-native-classnames';
import SetMapLocation from '../../reusables/SetMapLocation';


const ShopRegister = ({navigation}) => {
  const {myShop} = useSelector(state => state.myShop);
  const {seats} = useSelector(state => state.seats);
  const dispatch = useDispatch();
  const address = useRef('');
  const {currentUser} = useContext(AuthContext);
  const [isPressed, setIsPressed] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const initialStates = {
    name: '',
    phoneNumber: '',
    location: {longitude: 0, latitude: 0, address: '',image:''},
    ownerName: '',
    ownerId: currentUser?._id,
    hair: {cost: 0, time: 0},
    beard: {cost: 0, time: 0},
    lobby: [],
  };
  const shopData = useRef(initialStates);

  const addSeats = async () => {
    await dispatch({
      type: 'ADD_SEAT',
      payload: {
        seatId: `${seats.length + 1}`,
        status: 'free',
        personId: null,
        cost: 0,
        status: 'free',
        bookedServices: null,
        bookingTime: null,
      },
    });
    // shopData.current = ({...shopData.current, lobby:seats});
  };
  const removeSeats = () => {
    dispatch({type: 'REMOVE_SEAT'});
    shopData.current = {
      ...shopData.current,
      lobby: seats.filter((_, index) => index !== seats.length - 1),
    };
  };

  const handleSubmit = () => {
    shopData.current = {
      ...shopData.current,
      lobby: seats,
      ownerName: currentUser.name,
      location:{...shopData.current.location,address:address.current}

    };
    dispatch(createStore(currentUser._id, shopData.current));
  };

  
  return (
    <ScrollView style={[tw`bg-white`]}>
      <View style={styles.container}>
        <Text style={[styles.heading, {marginTop: 20, marginBottom: -10}]}>
          Register your Store
        </Text>
        <View style={styles.profile}>
          <View style={styles.smallconatiner}>
            <View style={tw`border-gray-300 border-2 w-full rounded-full`}>
              <TextInput
                style={tw`ml-4`}
                placeholder="Shop Name"
                onChangeText={e =>
                  (shopData.current = {...shopData.current, name: e})
                }
              />
            </View>
          </View>
          <View style={styles.smallconatiner}>
            {/* <Text style={styles.subheading}> Phone Number:</Text> */}
            <View style={tw`border-gray-300 border-2 w-full m-4 rounded-full`}>
              <TextInput
                placeholder="PhoneNumber"
                keyboardType="number-pad"
                style={tw`ml-4`}
                onChangeText={e =>
                  (shopData.current = {...shopData.current, phoneNumber: e})
                }
              />
            </View>
          </View>

          <View style={styles.smallconatiner}>
            <View
              style={[
                tw`border-gray-300 border-2 w-full rounded-full`,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <TextInput
                placeholder="Enter landmark,city,state etc"
                style={[tw`ml-4`, {width: 225}]}
                onChangeText={e =>
                  address.current = e
                }
              />
              <TouchableHighlight
                style={[
                  tw`p-4 items-center rounded-full`,
                  {backgroundColor: '#ddffab'},
                ]}
                onPress={() => setMapOpen(true)}
                underlayColor={!mapOpen ? 'transparent' : '#E5E7EB'}>
                <Text style={tw`text-black font-semibold`}>Set on map</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        {mapOpen && 
            <View style={[tw`m-4 absolute z-50 border-black border-2`, {height:'60%' ,width:'90%'}]}>
                <Ionicons size={24} style={{}} color={'#000000'} name="close-circle-sharp" onPress={()=>setMapOpen(false)} />  
                <SetMapLocation  shopData={shopData} setMapOpen={setMapOpen} />
            </View>
        }
        <View style={styles.services}>
          <Text style={[styles.heading, {marginTop: -10}]}>Services</Text>
          <View style={styles.servicesItems}>
            <View style={styles.haircutting}>
              <Text style={styles.subheading}>Hair Cutting</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 15, color: '#000000'}}>Cost:</Text>
                <View
                  style={tw`border-gray-300 border-2 w-28  m-2 rounded-3xl`}>
                  <TextInput
                    placeholder="₹ 0.0"
                    style={tw`ml-2`}
                    keyboardType="number-pad"
                    onChangeText={e =>
                      (shopData.current = {
                        ...shopData.current,
                        hair: {...shopData.current.hair, cost: e},
                      })
                    }
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 15, color: '#000000'}}>Time:</Text>
                <View style={tw`border-gray-300 border-2 w-28 rounded-3xl m-2`}>
                  <TextInput
                    placeholder="eg.10 (Min)"
                    style={tw`ml-2`}
                    keyboardType="number-pad"
                    onChangeText={e =>
                      (shopData.current = {
                        ...shopData.current,
                        hair: {...shopData.current.hair, time: e},
                      })
                    }
                  />
                </View>
              </View>
            </View>
            <View style={styles.verticleLine}></View>
            <View style={styles.beard}>
              <Text style={styles.subheading}>Beard Setting</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 15, color: '#000000'}}>Cost: </Text>
                <View style={tw`border-gray-300 border-2 w-28 rounded-3xl m-2`}>
                  <TextInput
                    placeholder="₹ 0.0"
                    style={tw`ml-2`}
                    keyboardType="number-pad"
                    onChangeText={e =>
                      (shopData.current = {
                        ...shopData.current,
                        beard: {...shopData.current.hair, cost: e},
                      })
                    }
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 15, color: '#000000'}}>Time: </Text>
                <View style={tw`border-gray-300 border-2 w-28 rounded-3xl m-2`}>
                  <TextInput
                    placeholder="eg.10 (Min)"
                    style={tw`ml-2`}
                    keyboardType="number-pad"
                    onChangeText={e =>
                      (shopData.current = {
                        ...shopData.current,
                        beard: {...shopData.current.beard, time: e},
                      })
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* <View style={styles.lobbySpace}> */}
        <Text style={styles.heading}> Lobby Space </Text>
        <Text style={styles.subheading}> Number of Seats {seats?.length} </Text>
        <View style={styles.lobby}>
          {/* <FlatList
                contentContainerStyle={{flexDirection:'row', flexWrap:'wrap'}}
                data={seats}
                keyExtractor={seats?.SeatId}
                renderItem={renderSeats}
                /> */}
          {seats
            ?.sort((a, b) => (a.seatId < b.seatId ? -1 : 1))
            .map(item => (
              <TouchableOpacity
                style={styles.addbtn}
                onPress={() => removeSeats()}
                key={item.seatId}>
                <Entypo name="circle-with-minus" size={24} color={'red'} />
              </TouchableOpacity>
            ))}
          <TouchableOpacity style={styles.addbtn} onPress={() => addSeats()}>
            <Ionicons name="add-circle" size={20} />
          </TouchableOpacity>
        </View>
        {/* </View> */}

        <TouchableHighlight
          style={[
            tw`p-4 w-52 items-center my-2.5 rounded-full`,
            {backgroundColor: '#ddffab'},
          ]}
          onPress={() => handleSubmit()}
          underlayColor={isPressed ? 'transparent' : '#E5E7EB'}>
          <Text style={tw`text-black font-semibold`}>Continue</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};

export default ShopRegister;

const styles = StyleSheet.create({
  
  container: {
    // flex: 1,
    alignItems: 'center',
    // backgroundColor: '#FFFFFF'
  },
  heading: {
    fontSize: 25,
    color: '#000000',
    fontWeight: 'bold',
    margin: 10,
  },
  smallconatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 360,
  },
  subheading: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profile: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 10,
    // width:350,
    alignItems: 'center',
    height: 280,
    justifyContent: 'center',
  },
  profileItem: {
    // marginTop: 10,
    alignItems: 'center',
    // padding:10
  },

  input: {
    borderWidth: 1,
    height: 50,
    width: 330,
    margin: 10,
  },

  location: {},
  services: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    // margin:20,
    alignItems: 'center',
    marginTop: 0,
  },
  servicesItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  smallinput: {
    borderWidth: 1,
    height: 40,
    width: 100,
    margin: 10,
  },
  haircutting: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  verticleLine: {
    height: '80%',
    width: 1,
    marginRight: 10,
    backgroundColor: '#909090',
  },
  beard: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  lobbySpace: {
    // flex:1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 10,
    // width:360,
    marginTop: 0,
    marginBottom: 20,
  },
  lobby: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '95%',
    flexWrap: 'wrap',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'grey',
  },

  addbtn: {
    width: 50,
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    margin: 12,
    marginTop: 5,
    marginBottom: 8,
  },
  register: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    height: 50,
    width: 200,
    borderRadius: 10,
    marginBottom: 30,
  },
  regbtn: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
