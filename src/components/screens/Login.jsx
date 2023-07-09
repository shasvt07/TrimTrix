import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { object, string, number, date, InferType } from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabNavigation from '../../Navigation/TabNavigation';
import { AuthContext } from '../../context/AuthContext';
import { customerLogin } from '../../actions/customers/auth';
import { useDispatch } from 'react-redux';
import { OwnerLogin } from '../../actions/owners/auth';


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
    <SafeAreaView>
      <View style={styles.logoContainer}>
        <Text style={[styles.logoText, tw`text-black`]}>TrimTrix</Text>
        <Image style ={styles.logoImg} source={require('../../assets/logo.png')}/>
      </View>

      <View style={styles.registerContainer}>
        <View style={styles.credentials}>
          <TextInput style={styles.input} onChangeText={e => setUserData({...userData , email:e})} placeholder='Enter Phone Number or email'/>
          <TextInput style={styles.input} onChangeText={e => setUserData({...userData , password:e})} placeholder='password' secureTextEntry/>
          <TouchableOpacity style={styles.continueButton}
          onPress={() => handleLogin()}
          >
            <Text style={styles.btnTxt}>Sign In</Text>
          </TouchableOpacity>
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