import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { object, string, number, date, InferType } from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';
import  Entypo  from 'react-native-vector-icons/Entypo';
import { customerRegister } from '../../actions/customers/auth';
import { useDispatch } from 'react-redux';
import { OwnerRegister } from '../../actions/owners/auth';


const windowHeight = Dimensions.get('window').height;


const CustomerRegister = ({navigation}) => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(true);
    const {login,isOwner} = useContext(AuthContext);
    const [userData,setUserData] = useState({name:"",email:"",password:""});

    const handleRegister = async() => {
        var data = null;
        {isOwner ? data = await OwnerRegister(userData): 
          data = await customerRegister(userData);
        }
        login(data);
    }
    
    useEffect(()=>{
      setUserData({...userData,isOwner:isOwner});
    },[])

  return (
    <ScrollView>
    <SafeAreaView style={{alignItems:'center', flex:1}}>
      <View style={styles.logoContainer}>
        <Text style={[styles.logoText, tw`text-black`]}> TrimTrix</Text>
        <Image style ={styles.logoImg} source={require('../../assets/logo.png')}/>
      </View>

      <View style={styles.registerContainer}>
        <View style={styles.credentials}>
          <TextInput style={styles.input} name="name" onChangeText={ e =>setUserData({...userData, name:e})} placeholder='Full Name'/>
          <TextInput style={styles.input} name="email" onChangeText={ e =>setUserData({...userData, email:e})} placeholder='Enter Phone Number or email'/>
          <View style={{marginBottom:20,flexDirection:'row', justifyContent:'space-evnely',alignItems:'center', borderWidth:1, height:50, width:300}}>
          <TextInput style={[styles.input , {borderWidth:0, width:270,marginBottom:0}]} placeholder='password' name="password" onChangeText={e =>setUserData({...userData, password:e})} secureTextEntry={showPassword}/>
          <Entypo name="eye" size={20} color="black" onPress={() => setShowPassword(!showPassword)} />
          </View>
          <Pressable style={styles.continueButton} onPress={() => handleRegister()}>
            <Text style={styles.btnTxt}>Continue</Text>
          </Pressable>
        </View>
        
          <Text style={{fontSize:20,fontWeight:'bold', marginTop:50}}>Signin with Social Accounts</Text>
        <View style={styles.social}>
          <Pressable><Icon name='google' size={30} style={[styles.icons,{color:'#6A1B4D'} ]} /></Pressable>
          <Pressable><Icon name='facebook' size={30} style={[styles.icons, {color:'#12B0E8'}]} /></Pressable>
          <Pressable><Icon name='apple' size={30} style={[styles.icons, {color:'#000000'}]} /></Pressable>

        </View>
      </View>

      <View style={styles.signin}>
        <Text style={{fontSize:20 ,marginBottom:10}}>Already have an account?</Text>
        <Pressable style={[styles.signinBtn]}
        onPress={()=> navigation.push("Login")}
        > 
          <Text style={styles.btnTxt}>Sign In</Text> 
        </Pressable>
      </View>

    </SafeAreaView>
    </ScrollView>
  )
}

export default CustomerRegister

const styles = StyleSheet.create({

  logoContainer:{
    alignSelf:'center',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    borderWidth:3,
    borderColor:'#0D0D0D',
    borderRadius:10,
    width:270,
    marginTop:20

  },
  logoText:{
    fontSize:40,
    fontWeight:'bold'
  },
  logoImg:{
    height: 100,
    width: 100,
    marginRight:30,
  },
  registerContainer:{
    marginTop:100,
    alignItems:'center',
    justifyContent:'center',
  },
  credentials:{
    alignItems:'center',
  },
  input:{
    borderWidth:1,
    height:50,
    width:300,
    marginBottom:20
  },
  continueButton:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#000000',
    height:50,
    width:200,
    borderRadius:10
  },
  btnTxt:{
    color:'#FFFFFF',
    fontSize:20,
    fontWeight:'bold'
  },
  social:{
    display:'flex',
    flexDirection:'row',
    padding:10
  },
  icons:{
    borderRadius:10,
    padding:10
  },
  signin:{
    alignItems:'center',
    justifyContent:'center',
    // position:'absolute',
    bottom:2,
    width:'100%'
    
  },
  signinBtn:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#000000',
    height:50,
    width:'100%',
    
  }


})