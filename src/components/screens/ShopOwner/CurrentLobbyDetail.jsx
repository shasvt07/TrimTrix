import { FlatList, Image, Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomer } from '../../../actions/owners/store'
import { calculateTime } from '../../reusables/timeCalculation'
import { windowWidth } from '../../../utils/Dimension'

const CurrentLobbyDetail = () => {

    const {shop} = useSelector((state) => state.shop);
    // const dispatch = useDispatch();


  return (
    <View style={styles.conatiner}>
        {shop?.lobby?.map((item) => (
                item.status !== 'free' &&
                (
                <View key = {item._id}>
                <TouchableOpacity>
                <View style={styles.previous}>
                    <View style={{backgroundColor:'#dfe6e9', justifyContent:'cetner',alignItem:'center', borderRadius:10}}>
                    <Image source={require('../../../assets/logo.png')}/>
                    </View>
                    <View style={styles.preItems}>
                        <Text style={{marginBottom:2, fontSize:20,color:'#000000'}}>{item.personName}</Text>
                        <Text style={styles.bookingTime}>{calculateTime(item?.bookingTime)}</Text>
                        <Text style={styles.cost}>Rs.{item?.cost}</Text>
                    </View>
                    </View>
                    <View style={{height:1,backgroundColor:'lightgrey', marginLeft:85,marginBottom:10}}></View>
                </TouchableOpacity>
            </View>

            ))
            )}

    </View>
  )
}

export default CurrentLobbyDetail

const styles = StyleSheet.create({
    conatiner:{
        flex:1,
        backgroundColor:'#FFFFFF',
        width:windowWidth,
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