import { Alert, BackHandler, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import CheckBox from 'react-native-check-box'
import { io } from 'socket.io-client';
import { calculateTime, addMinutesToTime, getFinishTime } from '../reusables/timeCalculation'
var cron = require('node-cron');

import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import { bookSeat, emptySeat, fetchShop, processSeat } from '../../actions/customers/stores.js'
import { AuthContext } from '../../context/AuthContext.js';
import { createBooking } from '../../actions/bookings/bookings';


const socket = io.connect('http://192.168.1.35:8000');
const ShopDetails = ({ navigation, route }) => {

    const { currentUser } = useContext(AuthContext)
    const dispatch = useDispatch();
    const { shop } = useSelector((state) => state.shop);
    // const {serviceCost} = useSelector((state) => state.serviceCost);
    const { room } = route.params
    const hairoption = useRef(false);
    const beardoption = useRef(false);
    const bookingDetail = useRef({seatId:null, shopId: room,cost:0, customerId: currentUser._id, services: "", status:"free",bookingTime:null});
    const selectedService = useRef(null);
    const serviceCost = useRef(0);
    const lastFinishTime = useRef(null);
    const firstFinishTime = useRef(null);
    const seatToDelete = useRef(null);
    const [currentTime, setCurrentTime] = useState('');
    const bookingData = useRef({
        shopName:"",
        ownerName:"",
        ownerId:"",
        customerName:"",
        customerId:"",
        location:"",
        services:'',
        bookingTime:null,
        completionTime:null,
        cost:0
    })

    useEffect(() => {
        const intervalId = setInterval(() => {
            const date = new Date();
            const isoString = date.toISOString();
            setCurrentTime(isoString);
            // hanldeEmptySeat(seatToDelete.current,firstFinishTime.current);
            // console.log(firstFinishTime.current);
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
        socket.on('seat:emptyEmptyDetail', (seatId) => {
            dispatch({ type: "EMPTY_SEAT", payload: seatId });
        })
        socket.on('store:UpdatedDetails', (storeInfo) => {
            dispatch({type:"STORE_DETAILS", payload:storeInfo});
        })

    }, [socket])

    const hanldeEmptySeat = async (seatId,finishTime) => {
        if (currentTime >= finishTime) {
            // console.log(finishTime)
            await dispatch(emptySeat(seatId,room));
            socket.emit('seat:Empty', room, seatId);
        }
    }

    const handleSelectOptions = () => {
        if (beardoption.current && hairoption.current) {
            serviceCost.current = (shop.hair.cost + shop.beard.cost);
        }
        else if (beardoption.current && !hairoption.current) {
            serviceCost.current = (shop.beard.cost);
        }
        else if (hairoption.current && !beardoption.current) {
            serviceCost.current = (shop.hair.cost);
        }
        else {
            serviceCost.current = 0;
        }
        bookingData.current={...bookingData, cost:serviceCost.current}

    }

    const handleSelectService = () => {

        if (beardoption.current && hairoption.current) {
            selectedService.current = "2";
            bookingData.current={...bookingData, services:"hair Cutting, Beard Setting"}
        }
        else if (beardoption.current && !hairoption.current) {
            selectedService.current = "1";
            bookingData.current={...bookingData, services:"Beard Setting"}

        }
        else if (hairoption.current && !beardoption.current) {
            selectedService.current = "0";
            bookingData.current={...bookingData, services:"hair Cutting"}
        }
        else {
            serviceCost.current = null
            bookingData.current={...bookingData, services:''}

        }
        bookingDetail.current = { ...bookingDetail.current, services: selectedService.current }

    }


    const handlebookSeat = async (seatId) => {
        bookingDetail.current = ({ seatId: seatId, shopId: room, customerId: currentUser._id, services: selectedService.current, status: 'processing'})
        socket.emit('seat:underProcess', bookingDetail.current);
        // dispatch({type:"SEAT_PROCESS", payload:bookingDetail.current})
        const details = bookingDetail.current;
        await dispatch(processSeat(details));
        
    }

    const handleCompleteBooking = async() => {
        bookingDetail.current = {...bookingDetail.current,cost:serviceCost.current,bookedServices:selectedService.current, bookingTime: (currentTime <= lastFinishTime.current ? lastFinishTime.current : currentTime),status: 'booked'};
        socket.emit('seat:Booked', {seatId: bookingDetail.current.seatId, cost:serviceCost.current,room :room,personId: currentUser._id, services: selectedService.current, status: 'booked',bookingTime:bookingDetail.current.bookingTime});
        bookingData.current = {...bookingData,
            bookingTime:bookingDetail.current.bookingTime,
            completionTime:await getFinishTime(bookingDetail.current.bookingTime, shop?.hair?.time, shop?.beard?.time, bookingDetail.current.bookedServices),
            shopName:shop.name,
            ownerName:shop.ownerName,
            ownerId:shop.ownerId,
            customerName:currentUser.name,
            customerId:currentUser._id,
            location:shop.location,
            cost:serviceCost.current
        }
        dispatch(bookSeat(bookingDetail.current));

        const data = await createBooking(bookingData.current);
        console.log("booking reciept", data);
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.heading}> Shop Deatils</Text>
                <View style={styles.partition}></View>
                <TouchableOpacity style={styles.last}>
                    <Image style={styles.lastImage} source={require('../../assets/last.png')} />
                    <View style={{ marginLeft: 20, justifyContent: 'space-between' }}>
                        <Text style={styles.cardHeading}>{shop?.name}</Text>

                        <Text style={styles.timeDate}>Costs of services: </Text>
                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.cost}>Hair Cutting: Rs.{shop?.hair?.cost}</Text>
                            <Text style={styles.cost}>Bread Triming: Rs.{shop?.beard?.cost}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View>

                </View>
                <Text style={styles.heading}> Select available seat?</Text>
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
                        <TouchableOpacity key={seat?._id} style={[styles.addbtn, (seat?.status === 'processing' ? {backgroundColor:'#E8BD0D'} : (seat?.status === 'booked' && ( seat?.personId === currentUser._id ? {backgroundColor:'#23C4ED'} : {backgroundColor:'#E21717'})))]}
                            onPress={() => {seat?.status == "free" && handlebookSeat(seat?._id)}}
                        >
                        </TouchableOpacity>
                        <Text style={{fontSize:15}}>{seat?.status==='booked' && calculateTime(getFinishTime(seat?.bookingTime, shop?.hair?.time, shop?.beard?.time, seat?.bookedServices))}</Text>
                    </View>
                    ))}
                </View>
                <Text style={styles.heading}> Select your services </Text>
                <View style={styles.services}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CheckBox
                            style={{ padding: 10 }}
                            onClick={() => {
                                hairoption.current = (!hairoption.current);
                                handleSelectOptions();
                                handleSelectService();
                            }}
                            isChecked={hairoption.current}
                        />
                        <Text>Hair cutting</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CheckBox
                            style={{ padding: 10 }}
                            onClick={() => {
                                beardoption.current = (!beardoption.current);
                                handleSelectOptions();
                                handleSelectService();
                            }}
                            isChecked={beardoption.current}
                        />
                        <Text>Beard Triming</Text>
                    </View>
                </View>
                <Text style={[styles.subheading, { marginTop: 20 }]}>Your waiting time: 40 mins</Text>
                <Text style={styles.subheading}>Pay your booking amount: Rs.{serviceCost.current}</Text>
                <TouchableOpacity style={styles.paybtn} onPress={()=>handleCompleteBooking()}>
                    <Text style={styles.btntxt}>Click Here To Pay</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}


export default ShopDetails

const styles = StyleSheet.create({
    container: {
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
        width: '95%',
        flexWrap: 'wrap',
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'grey'

    },
    // occupied: {
    //     width: 50,
    //     height: 70,
    //     borderRadius: 10,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: '#E21717',
    //     margin: 12,
    //     marginTop:5,
    //     marginBottom:5
    // },

    addbtn: {
        width: 50,
        height: 70,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#38CC77',
        margin: 12,
        marginTop:5,
        marginBottom:5
    },
    services: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
        margin: 14,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'lightgrey'
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
        color: '#000000'

    }

})