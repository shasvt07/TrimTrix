import { Alert, BackHandler, Image, Pressable, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';
import { calculateTime, addMinutesToTime, getFinishTime, getMinuteDifference } from '../reusables/timeCalculation'
var cron = require('node-cron');
import Snackbar from 'react-native-snackbar';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux'
import { bookSeat, emptySeat, fetchShop, processSeat } from '../../actions/customers/stores.js'
import { AuthContext } from '../../context/AuthContext.js';
import { createBooking, getCurrentLobby } from '../../actions/bookings/bookings';
import CurrentLobbyDetail from './ShopOwner/CurrentLobbyDetail';
import { fetchCustomer } from '../../actions/owners/store';
import tw from 'tailwind-react-native-classnames';
import RazorpayCheckout from 'react-native-razorpay';
import MapView,{Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { windowWidth } from '../../utils/Dimension';



const ShopDetails = ({ navigation, route }) => {

    const { currentUser,bookingDone,updateBookingDone ,socket} = useContext(AuthContext)
    const dispatch = useDispatch();
    const { shop } = useSelector((state) => state.shop);
    // const {serviceCost} = useSelector((state) => state.serviceCost);
    const { room } = route.params;
    const {currentlobby} = useSelector((state) => state.currentlobby);
    const hairoption = useRef(false);
    const beardoption = useRef(false);
    const selectedService = useRef(null);
    const serviceCost = useRef(0);
    const lastFinishTime = useRef(null);
    const firstFinishTime = useRef(null);
    const seatToDelete = useRef(null);
    const myBookingTime = useRef(currentTime);
    const myCompletionTime = useRef(currentTime);
    const [isPressed, setIsPressed] = useState(false);
    const paymentDetails = useRef({
        paymentId:"",
        // orderId: "",
        // signature: ""
    })

    const [currentTime, setCurrentTime] = useState('');
    // const [region, setRegion] = useState({
    //     latitudeDelta:0.0012,
    //     longitudeDelta:0.0022,
    //     latitude:shop?.location?.latitude || 26.7778153,
    //     longitude:shop?.location?.longitude || 80.956942
    
    //   })

      
    const bookingDetail = useRef({
        seatId:null, 
        shopId: room,
        cost:0, 
        personId: currentUser._id, 
        services: null, 
        status:"free",
        bookingTime:null,
        personName:"",
        personNumber:"",
    });

    const bookingData = useRef({
        shopName:"",
        ownerName:"",
        ownerId:"",
        customerName:"",
        customerId:"",
        location:"",
        services:null,
        bookingTime:null,
        completionTime:null,
        cost:0
    })

    useEffect(() => {
        const intervalId = setInterval(() => {
            const date = new Date();
            const isoString = date.toISOString();
            setCurrentTime(isoString);
            // hanldeEmptySeat(seatToDelete.current,firstFinishTime.current)
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        const backAction = () => {
            if(bookingDetail.current.status === 'processing'){
                dispatch(emptySeat(bookingDetail.current.seatId,room));
                socket.emit('seat:Empty', room, bookingDetail.current.seatId);
            }
            socket.emit('leave:room', room)
        }
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, []);

    // useEffect(()=>{
    //     if(currentlobby.length==0){
    //         lastFinishTime.current = currentTime;
    //     }
    // },[currentlobby])

    useEffect(() => {
        socket.emit('join:room', room);

    }, [shop])

    useEffect(() => {
        socket.on('seat:ProcessDetails', (seatInfo) => {
            dispatch({ type: "SEAT_PROCESS", payload: seatInfo})
        });
        socket.on('seat:BookingDetails', (seatInfo) => {
            dispatch({ type:"SEAT_BOOKED", payload: seatInfo })
        });
        socket.on('seat:EmptyDetail', (seatId) => {
            dispatch({ type: "EMPTY_SEAT", payload: seatId });
            dispatch({type:"JOB_DONE", payload:seatId})
        })
        socket.on('store:StatusDetail', (storeId,shopData) => {
            if(room === storeId){
                dispatch({ type: "OPEN_CLOSE", payload:shopData.isOpen});
            }
            dispatch({type:"SHOP_STATUS", payload:shopData});
        })
        socket.on('store:UpdatedDetails', (storeInfo) => {
            dispatch({type:"STORE_DETAILS", payload:storeInfo});
        })

    }, [socket])

    const hanldeEmptySeat = async (seatId,finishTime) => {
        if (currentTime > finishTime) {
            // console.log(finishTime)
            await dispatch(emptySeat(seatId,room));
            socket.emit('seat:Empty', room, seatId);
            updateBookingDone(false);
        }
    }

    const cancelBooking = async(seatId) => {
        await dispatch(emptySeat(seatId,room));
        socket.emit('seat:Empty', room, seatId);
        updateBookingDone(false);
        lastFinishTime.current = currentTime;

    }

    const handleSelectOptions = () => {
        if (beardoption.current && hairoption.current) {
            serviceCost.current = Math.ceil((shop.hair.cost + shop.beard.cost)*(30/100));
        }
        else if (beardoption.current && !hairoption.current) {
            serviceCost.current = Math.ceil((shop.beard.cost) *(30/100));
        }
        else if (hairoption.current && !beardoption.current) {
            serviceCost.current =  Math.ceil((shop.hair.cost) *(30/100));
        }
        else {
            serviceCost.current = 0;
        }
        bookingData.current={...bookingData.current, cost:serviceCost.current}

    }

    const handleSelectService = () => {

        if (beardoption.current && hairoption.current) {
            selectedService.current = "2";
            bookingData.current={...bookingData.current, services:"hair Cutting, Beard Setting"}
        }
        else if (beardoption.current && !hairoption.current) {
            selectedService.current = "1";
            bookingData.current={...bookingData.current, services:"Beard Setting"}

        }
        else if (hairoption.current && !beardoption.current) {
            selectedService.current = "0";
            bookingData.current={...bookingData.current, services:"hair Cutting"}
        }
        else {
            selectedService.current = null
            bookingData.current={...bookingData.current, services:null}
        }
        bookingDetail.current = { ...bookingDetail.current, services: selectedService.current }

    }

    const handlebookSeat = async (seatId) => {
        if(!bookingDone){
            bookingDetail.current = ({ 
                seatId: seatId, 
                shopId: room, 
                personId: currentUser._id, 
                services: selectedService.current, 
                status: 'processing',
                personName:currentUser.name,
                personNumber:currentUser.phoneNumber,
            })
            socket.emit('seat:underProcess', bookingDetail.current);
            // dispatch({type:"SEAT_PROCESS", payload:bookingDetail.current})
            const details = bookingDetail.current;
            await dispatch(processSeat(details));
        }
    }

    const completePayment = async() => {
        if(selectedService.current===null || bookingData.current.seatId===null){
            Alert.alert("Please select atleast one service and seat to book");
            return;
        }
        var options = {
            description: 'Credits for booking seat',
            image: {uri: require('../../assets/logo.png')},
            currency: 'INR',
            key: 'rzp_test_sETUxVcrt2L1p7',
            amount: serviceCost.current*100,
            name: 'TrimTrix',
            order_id: '',//Replace this with an order_id created using Orders API.
            prefill: {
              email:currentUser.email,
              contact:currentUser.phoneNumber,
              name: currentUser.name,
            },
            theme: {color: '#528FF0'}
          }
          RazorpayCheckout.open(options).then((data) => {
            // handle success
            paymentDetails.current = {paymentId:data.razorpay_payment_id}
            handleCompleteBooking(paymentDetails.current);
            Alert.alert(`Your seat has been booked successfully`);

          }).catch((error) => {
            // handle failure
            Alert.alert(`Error: ${error.code} | ${error.description}`);
          });
    }

    const handleCompleteBooking = async(paymentInfo) => {
        
        bookingDetail.current = {...bookingDetail.current,
            cost:serviceCost.current,
            bookedServices:selectedService.current, 
            bookingTime: (currentTime <= lastFinishTime.current ? lastFinishTime.current : currentTime),
            status: 'booked',
            personId: currentUser._id, 
            personName:currentUser.name,
            personNumber:currentUser.phoneNumber
        };
        socket.emit('seat:Booked', bookingDetail.current);
        bookingData.current = {...bookingData,
            bookingTime:bookingDetail.current.bookingTime,
            completionTime:await getFinishTime(bookingDetail.current.bookingTime, shop?.hair?.time, shop?.beard?.time, bookingDetail.current.bookedServices),
            shopName:shop.name,
            shopId:room,
            ownerName:shop.ownerName,
            ownerId:shop.ownerId,
            customerName:currentUser.name,
            customerId:currentUser._id,
            location:shop.location,
            cost:serviceCost.current,
            services:selectedService.current == '2'?"Hair Cutting, Beard Setting" :selectedService.current == '1'? "Beard Setting" : selectedService.current == '0' ? "Hair Cutting" : null,
            paymentId:paymentInfo.paymentId,
            // orderId:paymentInfo.orderId,
        }
        dispatch(bookSeat(bookingDetail.current));
        myBookingTime.current = bookingDetail.current.bookingTime;
        myCompletionTime.current = bookingData.current.completionTime;
        console.log(myBookingTime);
        
        const data = await createBooking(bookingData.current);
        if(data!== null || data!==undefined){
            updateBookingDone(true);
        }
        else{
            hanldeEmptySeat(bookingDetail.current.seatId);
        }

    }


    const createAlert = (seatId) => {
        Alert.alert('Alert Title', 'Are you sure to cancel Booking!', [
            {
                text:'Cancel Booking',
                onPress: () => cancelBooking(seatId),
                style:'cancel'
            },
            {
                text:'cancel',
                style:'cancel'
            },
        ])
    }
    

    return (
        <ScrollView style={{flex:1,backgroundColor:'#FFFFFF'}}>
            <View style={styles.container}>
                <Text style={styles.heading}> Shop Details</Text>
                <View style={styles.partition}></View>
                <View style={styles.last}>
                    <Pressable
                        style={{width:'100%',height:150, marginBottom:10}}
                         onPress={()=>{navigation.navigate('getDirection', params={shop})}}>
                        <Image 
                        style={styles.lastImage} 
                        source={require('../../assets/last.png')}
                        />

                    </Pressable>
                    <View style={{ marginLeft: 20, justifyContent: 'space-between' }}>
                        <Text style={styles.cardHeading}>{shop?.name}</Text>
                        <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
                  <View style={{flex: 2}}>
                    <Text style={[styles.timeDate]}>Costs of services: </Text>
                    <View >
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
                        style={[
                          styles.rebookbtn,
                          {backgroundColor: '#38CC77'},
                        ]}>
                        <Text style={styles.btntxt}>Open</Text>
                      </Pressable>
                    ) : (
                      <Pressable
                        style={[
                          styles.rebookbtn,
                          {backgroundColor: '#FF6263'},
                        ]}>
                        <Text style={styles.btntxt}>Closed</Text>
                      </Pressable>
                    )}
                  </View>
                </View>
                    </View>
                </View>
                {shop?.isOpen && 
                <View style={{alignItems:'center'}}>
                    <Text style={styles.heading}> Select available seat </Text>
                    <View style={styles.lobby}>
                        {shop?.lobby?.sort((a, b) => {
                            if (a.bookingTime === null && b.bookingTime === null) {
                                return 0;
                            } else if (a.bookingTime === null && b.bookingTime !== null) {
                                return 1;
                            } else if (b.bookingTime === null && a.bookingTime !==null) {
                                return -1;
                            }
                            return (a.bookingTime > b.bookingTime) ? 1 : -1;
                        }).map((seat, index) => ((seat?.status === 'booked' && (
                            lastFinishTime.current = getFinishTime(seat?.bookingTime, shop?.hair?.time, shop?.beard?.time, seat?.bookedServices),
                            (index == 0 && (firstFinishTime.current = getFinishTime(seat?.bookingTime, shop?.hair?.time, shop?.beard?.time, seat?.bookedServices),
                                seatToDelete.current = seat?._id
                            ))
                        )),
                        <View style={{alignItems:'center'}} key = {seat?.seatId}>
                            <Text style={{fontSize:15}}>{seat?.status==='booked' && calculateTime(seat?.bookingTime)}</Text>
                            <TouchableOpacity key={seat?._id} style={[styles.addbtn, (seat?.status === 'processing' ? {backgroundColor:'#E8BD0D'} : (seat?.status === 'booked' && (seat?.personId === currentUser._id ? {backgroundColor:'#23C4ED'} : {backgroundColor:'#E21717'})))]}
                                onPress={() => {seat?.status == "free" && handlebookSeat(seat?._id)}}
                            >
                            {(seat?.status === 'processing' || seat?.status === 'booked') && seat.personId === currentUser._id &&
                            <Entypo onPress={()=> createAlert(seat._id)} name='circle-with-minus' size={24} color={'#0D0D0D'} />
                            }
                            </TouchableOpacity>
                            <Text style={{fontSize:15}}>{seat?.status==='booked' && calculateTime(getFinishTime(seat?.bookingTime, shop?.hair?.time, shop?.beard?.time, seat?.bookedServices))}</Text>
                        </View>
                        ))}
                    </View>
                    {!bookingDone && 
                    <View>
                        <Text style={styles.heading}> Select your services </Text>
                        <View style={styles.services}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableHighlight
                                style={[
                                tw`p-4 mr-4 w-20 items-center my-2 rounded-full`,
                                {backgroundColor: hairoption.current ? '#E07C24' : '#dfe6e9'},
                                ]}
                                onPress={() => {hairoption.current = (!hairoption.current), handleSelectOptions();
                                    handleSelectService();}}
                                underlayColor={hairoption.current ? '#E07C24' : '#E5E7EB'}>
                                <Text style={tw`text-black font-semibold`}>
                                Hair
                                </Text>
                            </TouchableHighlight>
                                {/* <CheckBox
                                    style={{ padding: 10 }}
                                    onClick={() => {
                                        hairoption.current = (!hairoption.current);
                                        handleSelectOptions();
                                        handleSelectService();
                                    }}
                                    isChecked={hairoption.current}
                                /> */}
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <TouchableHighlight
                                    style={[
                                    tw`p-4 w-20 items-center my-2 rounded-full`,
                                    {backgroundColor:beardoption.current ? '#E07C24' : '#dfe6e9'},
                                    ]}
                                    onPress={() => {beardoption.current = (!beardoption.current),handleSelectOptions();
                                        handleSelectService();}}
                                    underlayColor={beardoption.current ? '#E07C24' : '#E5E7EB'}>
                                    <Text style={tw`text-black font-semibold`}>
                                    Beard
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                    }
                    <View>
                        {(bookingDone && getMinuteDifference(currentTime,myBookingTime.current) > 0) ?
                        <Text style={[styles.subheading, { margin:20 }]}> Waiting time:{getMinuteDifference(currentTime,myBookingTime.current)} mins</Text>
                        : (bookingDone && getMinuteDifference(currentTime,myBookingTime.current) <= 0 && getMinuteDifference(currentTime,myCompletionTime.current) > 0) ?
                        <Text style={[styles.subheading, { margin:20 }]}> ITS YOUR TURN!!</Text>
                        : (bookingDone && getMinuteDifference(currentTime,myCompletionTime.current) <= 0) &&
                        <Text style={[styles.subheading, { margin:20 }]}>YOU MISSED</Text>
                        }
                    </View>
                    {bookingDone ? 
                        <CurrentLobbyDetail />
                    :
                    <View style={{alignItems:'center'}}>
                        <Text style={[styles.subheading, tw`mt-4 text-black`]}>Your booking amount: Rs.{serviceCost.current}</Text>
                        <TouchableHighlight
                            style={[
                            tw`p-4 w-52 items-center my-8 rounded-full`,
                            {backgroundColor: '#ddffab'},
                            ]}
                            onPress={() => completePayment()}
                            underlayColor={isPressed ? 'transparent' : '#E5E7EB'}>
                            <Text style={tw`text-black font-semibold`}>
                            Continue
                            </Text>
                        </TouchableHighlight>
                    </View>
                    }
                </View>
                }
            </View>
                
        </ScrollView>
    )
}


export default ShopDetails

const styles = StyleSheet.create({
    mapcontainer: {
        height: 150,
        width: 300,
        flex:1,
        // alignItems: 'center',
      },
      map: {

        height: '100%',
        width: '100%',
      },
    container: {
        flex:1,
        // margin:'auto',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    partition: {
        backgroundColor: 'lightgrey',
        height: 1,
        width: '100%'
    },
    // uppercontainer:{
    //     alignItems: 'center',
    //     backgroundColor: '#FFFFFF',
    //     transform : [ { scaleX : 2 } ],
    //     borderBottomStartRadius : 200,
    //     borderBottomEndRadius : 200,
    //     overflow : 'hidden',
    // },
    // lowercontainer:{
    //     backgroundColor:'#0000000',
    //     flex : 1,
    //     transform : [ { scaleX : 0.5 } ],
    //     backgroundColor : 'yellow',
    //     alignItems : 'center',
    //     justifyContent : 'center'
    // },
    heading: {
        fontSize: 25,
        color: '#000000',
        fontWeight: 'bold',
        margin: 20,
    },
    subheading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10
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

    addbtn: {
        width: 50,
        height: 70,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#38CC77',
        margin: 13,
        marginTop:5,
        marginBottom:5
    },
    services: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'#dfe6e9'
    },
    paybtn: {
        backgroundColor: '#000000',
        height: 50,
        width: 170,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 30
    },
    btntxt: {
        color: '#FFFFFF',
        fontSize: 18
    },
    last: {
        height: 340,
        width:'95%',
        margin: 14,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'lightgray',
    },
    lastImage: {
        height: 150,
        width: '100%',
        // margin: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // maxWidth: '95%',
        // width:'100%'
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
        color: '#000000'
    },
    timeDate:{
        fontSize: 15,
        marginBottom: 10,
        marginRight: 10,
        color: '#000000'
    },
    rebookbtn: {
        backgroundColor: '#dfe6e9',
        height: 40,
        borderRadius: 50,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
      },

})