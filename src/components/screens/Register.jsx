import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import tw from 'tailwind-react-native-classnames';
import {object, string, number, date, InferType} from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../../context/AuthContext';
import Entypo from 'react-native-vector-icons/Entypo';
import {customerRegister} from '../../actions/customers/auth';
import {useDispatch} from 'react-redux';
import {OwnerRegister} from '../../actions/owners/auth';
import { TouchableHighlight } from 'react-native';

const windowHeight = Dimensions.get('window').height;

const CustomerRegister = ({navigation}) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const {login, isOwner} = useContext(AuthContext);
  const [userData, setUserData] = useState({name: '', email: '', password: ''});
  const [isPressed, setIsPressed] = useState(false);


  const handlePress = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
  };


  const handleRegister = async () => {
    var data = null;
    {
      isOwner
        ? (data = await OwnerRegister(userData))
        : (data = await customerRegister(userData));
    }
    login(data);
  };

  useEffect(() => {
    setUserData({...userData, isOwner: isOwner});
  }, []);

  return (
    <SafeAreaView style={[tw`bg-white`, {alignItems: 'center', flex: 1}]}>
      <Image
        style={[tw`h-16 w-56 mt-8`]}
        source={require('../../assets/mainlogo.png')}
      />
      <Text style ={[tw`text-black text-lg`]}>Stop Wasting Your Time!</Text> 

      <View style={[styles.registerContainer, tw`w-full `]}>
        <View style={styles.credentials}>
          <View>
            <Text style={tw`text-black m-1.5`}>Enter you name</Text>
            <View style={[tw`border-gray-300 border-2 h-12 mb-2 rounded-full`,{width:360}]}>

            <TextInput
              style={[tw`rounded-full ml-2`]}
              name="name"
              onChangeText={e => setUserData({...userData, name: e})}
              placeholder="Full Name"
              place
            />
            </View>
          </View>
          <View>
            
            <Text style={tw`text-black m-1.5`}>Enter your eamil address</Text>
            <View style={[tw`border-gray-300 border-2 mb-2 h-12 rounded-full`,{width:360}]}>
            <TextInput
              style={[tw`rounded-full ml-2`]}
              name="email"
              onChangeText={e => setUserData({...userData, email: e})}
              placeholder="Enter Phone Number or email"
            />
            </View>
          </View>
          <View >
            <Text style={tw`text-black m-1.5`}>Enter your password</Text>
            <View style={[tw`border-gray-300 justify-between items-center mb-4 border-2 h-12  rounded-full`,{width:360, flexDirection:'row'}]}>
              <TextInput
                style={[tw`ml-2` ,{width:'90%'}]}
                
                placeholder="password"
                name="password"
                onChangeText={e => setUserData({...userData, password: e})}
                secureTextEntry={showPassword}
              />
              <Entypo
              style={[tw`mr-4`]}
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
            onPress={() => handleRegister()}
            underlayColor={isPressed ? 'transparent' : '#E5E7EB'}>
            <Text style={tw`text-black font-semibold`}>
              Continue 
            </Text>
          </TouchableHighlight>
        </View>
        
        <View style={[tw`w-full h-px mt-4 bg-gray-300`]}></View>
        <Text style={[tw`z-10 text-lg`, {marginTop:-16}]}>or</Text>
        <TouchableHighlight
            style={[
              tw`w-64 items-center justify-center my-6 rounded-full`,
              {height:50, borderWidth:1, borderColor:'gray'},
            ]}
            onPress={() => navigation.navigate('Login')}
            underlayColor={isPressed ? 'transparent' : '#E5E7EB'}>
              <View style={[tw`justify-evenly`, {flexDirection:'row',alignItems:'center'}]}>
                <Image
                style={[tw`h-6 w-6`]}
                source={require('../../assets/images/google.png')}
                />
                <Text style={tw`text-black ml-5`}>
                  Login with Google
                </Text>
              </View>
          </TouchableHighlight>
      </View>
      <TouchableHighlight
            style={[
              tw`w-64 items-center justify-center my-2.5 rounded-full`,
              {backgroundColor: '#ddffab', height:50},
            ]}
            onPress={() => navigation.navigate('Login')}
            underlayColor={isPressed ? 'transparent' : '#E5E7EB'}>
                <Text style={tw`text-black  font-semibold`}>
                  Already have an account? Login
                </Text>
          </TouchableHighlight>
    </SafeAreaView>
  );
};

export default CustomerRegister;

const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#0D0D0D',
    borderRadius: 10,
    width: 270,
    marginTop: 20,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  logoImg: {
    height: 100,
    width: 100,
    marginRight: 30,
  },
  registerContainer: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  credentials: {
    alignItems: 'center',
    width: '100%',
  },
  input: {
    borderWidth: 1,
    height: 50,
    width: 360,
    marginBottom: 10,
    borderColor: 'lightgray',
  },
  continueButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    height: 50,
    width: 200,
    borderRadius: 10,
  },
  btnTxt: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  social: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  icons: {
    borderRadius: 10,
    padding: 10,
  },
  signin: {
    alignItems: 'center',
    justifyContent: 'center',
    // position:'absolute',
    bottom: 2,
    width: '100%',
  },
  signinBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    height: 50,
    width: '100%',
  },
});
