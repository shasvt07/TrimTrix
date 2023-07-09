import { FlatList, Image, Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomer } from '../../../actions/owners/store'
import { calculateTime } from '../../reusables/timeCalculation'


const CurrentLobbyDetail = ({lobby}) => {
    const data = [
        {
            id:1,
            dest:'IIITL',
            date:'6 Jun. 10:13',
            charge:'Rs.174'
        },
        {
            id:2,
            dest:'IIITL',
            date:'6 Jun. 10:13',
            charge:'Rs.174'
        },{
            id:3,
            dest:'IIITL',
            date:'6 Jun. 10:13',
            charge:'Rs.174'
        },{
            id:4,
            dest:'IIITL',
            date:'6 Jun. 10:13',
            charge:'Rs.174'
        },{
            id:5,
            dest:'IIITL',
            date:'6 Jun. 10:13',
            charge:'Rs.174'
        },{
            id:6,
            dest:'IIITL',
            date:'6 Jun. 10:13',
            charge:'Rs.174'
        },{
            id:7,
            dest:'IIITL',
            date:'6 Jun. 10:13',
            charge:'Rs.174'
        }
    ]
    const {currentlobby} = useSelector((state) => state.currentlobby);
    const dispatch = useDispatch();

    useEffect(()=> {
        
    },[])

    const searchCustomer = (customerId) => {
        for (const obj of currentlobby) {
            if(obj._id === customerId){
                // console.log("searchCustomer", obj)
                return obj;
            }
        }
        return null;
        
    }

  return (
    <View style={styles.conatiner}>
        {lobby?.map((item) => (
                item.status !== 'free' && 
                (
                <View key = {item._id}>
                {/* {index == 0 ? 
                    <TouchableOpacity style={styles.last}>
                    <Image style={styles.lastImage} source={require('../../../assets//images/last.png')}/>
                    <View style={{marginLeft:20, justifyContent:'space-between'}}>
                        <Text style={styles.cardHeading}>{searchCustomer(item?._id)}</Text>
                        <Text style={styles.cardHeading}>{searchCustomer(item?._id)?.phoneNumber}</Text>
                        <Text style={styles.timeDate}>{calculateTime(item?.bookingTime)}</Text>
                        <Text style={styles.cost}>Rs. {item?.cost}</Text>
                        <TouchableOpacity style={styles.rebookbtn}>
                            <Text style={{fontSize:15}}>Rebook</Text>
                        </TouchableOpacity>
                    </View>
                    </TouchableOpacity>
                 */}
                <TouchableOpacity>
                <View style={styles.previous}>
                    <View style={{backgroundColor:'#dfe6e9', justifyContent:'cetner',alignItem:'center', borderRadius:10}}>
                    <Image source={require('../../../assets/logo.png')}/>
                    </View>
                    <View style={styles.preItems}>
                        <Text style={{marginBottom:2, fontSize:20,color:'#000000'}}>{searchCustomer(item.personId)?.name}</Text>
                        <Text style={styles.bookingTime}>{calculateTime(item?.bookingTime)}</Text>


                        <Text style={styles.cost}>Rs.{item?.cost}</Text>
                    </View>
                    {/* <TouchableOpacity style={styles.rebookbtn}>
                        <Text style={{fontSize:15}}>Rebook</Text>
                    </TouchableOpacity> */}
                    </View>
                    <View style={{height:1,backgroundColor:'lightgrey', marginLeft:85,marginBottom:10}}></View>
                </TouchableOpacity>
                {/* )} */}
            </View>
            )
        
                )
            )
            }

        

    </View>
  )
}

export default CurrentLobbyDetail

const styles = StyleSheet.create({
    conatiner:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    headingtxt:{
        fontSize:45,
        fontWeight:'bold',
        marginTop:20,
        marginLeft:5,
        color:'#000000'
    },
    pastTxt:{
        fontSize:20,
        fontWeight:'bold',
        color:'#000000'
    },
    filterbtn:{
        height:40,
        width:40,
        borderRadius:10,
        backgroundColor:'#dfe6e9',
        alignItems:'center',
        justifyContent:'center'
    },
    last:{
        height:340,
        margin:14,
        borderWidth:2,
        borderRadius:10,
        borderColor:'lightgrey'
    },
    lastImage:{
        height:150,
        margin:10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        maxWidth:'95%',
    },
    cardHeading:{
        fontSize:25,
        color:'#000000',
        marginBottom: 10,
    },
    previous:{
        padding:10,
        height:100,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    preItems:{
        marginLeft:20,
        flex:2
    
    },
    rebookbtn:{
        backgroundColor:'#dfe6e9',
        height:40,
        borderRadius:50,
        width:100,
        alignItems:'center',
        justifyContent:'center'
    },
    
    timeDate:{
        fontSize:15,
        marginBottom: 10,
    },
    cost:{
        fontSize:15,
        marginBottom: 10,

    }

})