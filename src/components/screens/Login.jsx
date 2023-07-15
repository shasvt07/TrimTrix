import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { object, string, number, date, InferType } from 'yup';
import Entypo from 'react-native-vector-icons/Entypo';

import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabNavigation from '../../Navigation/TabNavigation';
import { AuthContext } from '../../context/AuthContext';
import { customerLogin } from '../../actions/customers/auth';
import { useDispatch } from 'react-redux';
import { OwnerLogin } from '../../actions/owners/auth';
import { TouchableHighlight } from 'react-native';


// let userSchema = object({
//   name: string().required(),
//   email: string().email(),
//   password:string().
//   // phone:number().required("Phone is Required").positive().integer().min(10,"Enter a valid number").max(10,"Enter a valid number"),
//   createdOn: date().default(() => new Date()),
// });

const windowHeight = Dimensions.get('window').height;


const Login = ({navigation}) => {
    const dispatch = useDispatch();
    const {login,isOwner} = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(true);
    const [userData,setUserData] = useState({email:"",password:""});
    const [isPressed, setIsPressed] = useState(false);

    const handleLogin = async() => {
      var data = null;
        {isOwner ?  data = await OwnerLogin(userData) : 
        data = await customerLogin(userData);
        }
        if(data != null || undefined){
          login(data);
        }
    }
    

  return (
    <SafeAreaView style={tw` items-center flex-1 bg-white`}>
      <Image
        style={[tw`h-16 w-56 mt-8`]}
        source={require('../../assets/mainlogo.png')}
      />
      <Text style ={[tw`text-black text-lg`]}>Stop Wasting Your Time!</Text> 
      
      <View style={styles.registerContainer}>
        <View style={styles.credentials}>
        <View>
            <Text style={tw`text-black m-1.5`}>Enter your eamil address</Text>
            <View style={[tw`border-gray-300 border-2 mb-2 h-12 rounded-full`,{width:360}]}>
            <TextInput
              style={[tw`ml-2`]}
              name="email"
              onChangeText={e => setUserData({...userData, email: e})}
              placeholder=" Phone Number or email"
            />
            </View>
          </View>
          <View>
            <Text style={tw`text-black m-1.5`}>Enter your password</Text>
            
            <View style={[tw`border-gray-300 justify-between items-center border-2  mb-2 h-12 rounded-full`,{width:360,flexDirection:'row'}]}>
              <TextInput
              style={[tw`ml-2` ,{width:'90%'}]}
                placeholder="password"
                name="password"
                onChangeText={e => setUserData({...userData, password: e})}
                secureTextEntry={showPassword}
              />
              <Entypo
                style={tw`mr-4`}
                name="eye"
                size={20}
                color="black"
                onPress={() => setShowPassword(!showPassword)}
              />
              </View>
          </View>
          <TouchableHighlight
            style={[
              tw`p-4 w-52 items-center my-2.5 rounded-full`,
              {backgroundColor: '#ddffab'},
            ]}
            onPress={() => handleLogin()}
            underlayColor={isPressed ? 'transparent' : '#E5E7EB'}>
            <Text style={tw`text-black font-semibold`}>
              Continue
            </Text>
          </TouchableHighlight>
        </View>
      
      </View>

      

    </SafeAreaView>
  )
}

export default Login

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
    width:360,
    marginBottom:20,
    borderColor:'lightgray'
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
    marginTop:windowHeight-(700)
  },
  signinBtn:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#000000',
    height:50,
    width:'100%'
  }


})