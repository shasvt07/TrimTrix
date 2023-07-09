import { Image, Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import Icon  from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../../context/AuthContext'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Account = () => {

    const {logout,currentUser} = useContext(AuthContext);

  return (
    <View style={styles.container}>
        <View style={styles.upperContainer}>
            <View style ={styles.profile}>
                <View style={{flex:1}}>
                    <Text style={styles.accName}>{currentUser?.name}</Text>
                    <View style={styles.rating}>
                        <Icon style={{color:'#000000'}} name='star'/>
                        <Text style={{color:'#000000'}}>4.67</Text>
                    </View>
                </View>
                <Image style={styles.accImg} source={require('../../assets/logo.png')}/>
            </View>

            <View style={styles.items}>
                <TouchableOpacity style={styles.itemBtn}>
                    <Entypo  size={20} style={styles.icon} name="help-with-circle"/>
                    <Text style={styles.icontxt}>Help</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemBtn}>
                    <Icon size={20} style={styles.icon} name="wallet"/>
                    <Text style={styles.icontxt}>Wallet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemBtn}>
                    <Icon size={20} style={styles.icon} color={'#000000'} name="clock"/>
                    <Text style={styles.icontxt}>Trips</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.lowerContainer}>
            <Pressable style={[styles.optionitem]}>
                <Feather style={styles.icon} size={15} name="settings"/>
                <Text style={styles.optiontxt}>Settings</Text>
            </Pressable>
            <Pressable style={styles.optionitem}>
                <MaterialCommunityIcons name="message-processing-outline" style={styles.icon} size={15}/>
                <Text style={styles.optiontxt}>Message</Text>
            </Pressable>
            <Pressable style={styles.optionitem}>
                <Icon name="shopping-bag" style={styles.icon} size={15}/>
                <Text style={styles.optiontxt}>Business hub</Text>
            </Pressable>
            <Pressable style={styles.optionitem}>
                <Icon  name="info-circle" style={styles.icon} size={15}/>
                <Text style={styles.optiontxt}>Legal</Text>
            </Pressable>
            <Pressable style={styles.optionitem} onPress={logout}>
                <Icon  name="info-circle" style={styles.icon} size={15}/>
                <Text style={styles.optiontxt}>SignOut</Text>
            </Pressable>

        </View>

    </View>
  )
}

export default Account

const styles = StyleSheet.create({
    container:{
        display:'flex',
        backgroundColor:'#ecf0f1',
        flex:1
    },

    upperContainer:{
        // height:'30%',
        flex:2,
        backgroundColor:'#FFFFFF'
    },

    profile:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        margin:20,
    },
    accName:{
        fontSize:40,
        color:'#000000',
        fontWeight:'bold',
        flexWrap:'wrap'
        
    },
    accImg:{
        // flex:1,
        // height:100,
        // width:100,
    },
    rating:{
         flexDirection:'row',
         alignItems:'center', 
         backgroundColor:'#ecf0f1',
         width:60,
         height:40,
         borderRadius:10,
         justifyContent:'center'
    },

    items:{
        display:'flex',
        flexDirection:'row',
        // padding:5,
        // margin:10,
        justifyContent:'space-evenly',
        bottom:-50
    },
    itemBtn:{
        height:80,
        width:100,
        backgroundColor:'#ecf0f1',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },

    lowerContainer:{
        flex:3,
        marginTop:10,
        height:'70%',
        backgroundColor:'#FFFFFF'
    },
    icon:{
        color:'#000000',
    },
    icontxt:{
        fontSize:18,
        color:'#000000'
    },
    options:{
        display:'flex',
        
    },
    optionitem:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        padding:20,
        
    },
    optiontxt:{
        fontSize:18,
        color:'#000000',
        marginLeft:10
    },



})