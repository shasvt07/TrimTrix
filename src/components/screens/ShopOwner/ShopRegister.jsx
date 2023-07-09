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
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { AuthContext } from '../../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { createStore} from '../../../actions/owners/store';


const ShopRegister = () => {
    const {myShop}= useSelector((state) => state.myShop);
    const {seats} = useSelector((state) => state.seats);
    const dispatch = useDispatch();
    const {currentUser} = useContext(AuthContext);
    const initialStates = {
        name:"",
        phoneNumber:"",
        location:"",
        ownerName:"",
        ownerId:currentUser?._id , 
        hair:{cost:0, time:0},
        beard:{cost:0, time:0},
        lobby:[],
    }
    const shopData = useRef(initialStates);
    // console.log(seats);


    // useEffect(() => {
    //     const backAction = () => {
            
    //     }
    //     const backHandler = BackHandler.addEventListener(
    //         'hardwareBackPress',
    //         backAction,
    //     );
    //     return () => backHandler.remove();
    // }, []);

    // useEffect(() => {
    //     shopData.current = myShop;
    // },[myShop])


    const addSeats = async() =>{
        await dispatch({type:'ADD_SEAT', payload:{
        seatId:`${seats.length+1}`,status:'free',
        personId:null,
        cost: 0,
        status: 'free',
        bookedServices: null,
        bookingTime: null,}});
        // shopData.current = ({...shopData.current, lobby:seats});
    }
    const removeSeats = () => {
        dispatch({type:'REMOVE_SEAT'});
        shopData.current = ({...shopData.current, lobby:seats.filter((_, index) => index !== seats.length - 1)})
    }
    

    

    const handleSubmit = () => {
        // console.log(seats);
        shopData.current = ({...shopData.current, lobby:seats,ownerName:currentUser.name});
        dispatch(createStore(currentUser._id,shopData.current));
        // console.log(shopData.current);
        // console.log(data);
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                    <Text style={styles.heading}>REGISTER YOUR STORE</Text>
            <View style={styles.profile}>
                <View style={styles.smallconatiner}>
                    {/* <Text style={styles.subheading}> Shop Name:</Text> */}
                    <TextInput placeholder="Shop Name" style={styles.input} value={myShop?.name} onChangeText={e => shopData.current = ({...shopData.current, name:e})} />
                </View>
                <View style={styles.smallconatiner}>
                    {/* <Text style={styles.subheading}> Phone Number:</Text> */}
                    <TextInput
                        placeholder="PhoneNumber"
                        keyboardType="number-pad"
                        style={styles.input}
                        value={myShop?.phoneNumber}
                        onChangeText={e => shopData.current = ({...shopData.current, phoneNumber:e})}
                    />
                </View>

                <View style={styles.location}>
                <TextInput
                        placeholder="Enter location"
                        style={styles.input}
                        value={myShop?.location}
                        onChangeText={e => shopData.current = ({...shopData.current, location:e})}
                    />
                </View>
            </View>
            <View style={styles.services}>
                <Text style={[styles.heading]}>Services</Text>
                <View style={styles.servicesItems}>
                    <View style={styles.haircutting}>
                        <Text style={styles.subheading}>Hair Cutting</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize:15,color:'#000000'}}>Cost:</Text>
                            <TextInput value={myShop?.hair?.cost.toString()} placeholder='₹ 0.0' style={styles.smallinput} keyboardType="number-pad" onChangeText={e => shopData.current = ({...shopData.current, hair:{...shopData.current.hair, cost:e}})} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{fontSize:15,color:'#000000'}}>Time:</Text>
                            <TextInput placeholder='eg.10 (Min)' style={styles.smallinput} keyboardType="number-pad"
                            tex
                            value={myShop?.hair?.time.toString()}
                            onChangeText={e => shopData.current = ({...shopData.current, hair:{...shopData.current.hair, time:e}})}
                            />
                        </View>
                    </View>
                    <View style={styles.verticleLine}></View>
                    <View style={styles.beard}>
                        <Text style={styles.subheading}>Beard Setting</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{fontSize:15,color:'#000000'}}>Cost: </Text>
                            <TextInput value={myShop?.beard?.cost.toString()} placeholder='₹ 0.0' style={styles.smallinput} keyboardType="number-pad"
                            onChangeText={e => shopData.current = ({...shopData.current, beard:{...shopData.current.hair, cost:e}})}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{fontSize:15,color:'#000000'}}>Time: </Text>
                            <TextInput placeholder='eg.10 (Min)' style={styles.smallinput} keyboardType="number-pad"
                            value={myShop?.beard?.time.toString()}
                            onChangeText={e => shopData.current = ({...shopData.current, beard:{...shopData.current.beard, time:e}})}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.lobbySpace}>
                <Text style={styles.heading}> Lobby Space </Text>
                <Text style={styles.subheading}> Number of Seats {seats?.length} </Text>
                <View style={styles.lobby}>
                    {/* <FlatList
                    contentContainerStyle={{flexDirection:'row', flexWrap:'wrap'}}
                    data={seats}
                    keyExtractor={seats?.SeatId}
                    renderItem={renderSeats}
                    /> */}
                    {seats?.map((item) => (
                    <TouchableOpacity style={styles.addbtn} onPress={() => removeSeats()} key = {item?.seatId} >
                        <Entypo name='circle-with-minus' size={24} color={"red"} />
                    </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.addbtn} onPress={() => addSeats()}>
                        <Ionicons name="add-circle" size={20} />
                    </TouchableOpacity>
                </View>
            </View>

                <View style={styles.register}>
                    <TouchableOpacity onPress={() => handleSubmit()}>
                        <Text style={styles.regbtn}>Register My Store</Text>
                    </TouchableOpacity>
                </View>
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
    },
    subheading: {
        fontSize: 18,
        color: '#000000',
        fontWeight: 'bold',
    },
    profile:{
        flex:1,
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        margin:10,
        // width:350,
        alignItems:'center',
        height:280,
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

    location: {

    },
    services:{
        flex:1,
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        margin:20,
        alignItems:'center',
        marginTop:0


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
        backgroundColor: '#909090',
    },
    beard: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    lobbySpace:{
        // flex:1,
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        alignItems:'center',
        backgroundColor:'#FFFFFF',
        // margin:20,
        width:350,
        marginTop:0,
        marginBottom:20
    },
    lobby: {
        display: 'flex',
        justifyContent:'flex-start',
        flexDirection:'row',
        width:'95%',
        flexWrap:'wrap',
        marginBottom:20,
        borderWidth:1,
        borderRadius:20,
        borderColor:'grey',
        margin:10

    },
    addbtn: {
        width: 55,
        height: 70,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dfe6e9',
        margin:12
    },
    register: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        height: 50,
        width: 200,
        borderRadius: 10,
        marginBottom:30

    },
    regbtn: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
