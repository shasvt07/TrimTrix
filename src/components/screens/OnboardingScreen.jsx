import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import tw from 'tailwind-react-native-classnames';
import { TouchableHighlight } from 'react-native';
import { Image } from 'react-native';

const OnboardingScreen = ({navigation}) => {
  const {setisOwnerTrue, setIsOwnerFalse,isLoading} = useContext(AuthContext);
  const [isPressed, setIsPressed] = useState(false);


  useEffect(() => {
    setIsOwnerFalse();
  }, []);

  const handlePress = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
  };

  const renderSpinner = () => {
    return <Spinner color='emerald.500' size='lg' />;
  };
  return (
    <>
    {isLoading ?
    <View
    style={{width:'100%'}}
      flex={1}
      backgroundColor='white'
      alignItems='center'
      justifyContent='center'
    > 
      <ActivityIndicator size="large" />
    </View>
  : 
    <View style={tw`flex-1 bg-white`}>
      <StatusBar style={[ {backgroundColor:'#03203C'}]}/>
      <View style={[tw` h-2/5 overflow-hidden`, {borderBottomEndRadius:150,borderBottomStartRadius:150,backgroundColor:'#03203C'}]}>
      </View>
      <View style={tw`flex-1 items-center`}>
      <View style={[tw`h-32 z-10 w-32 bg-gray-200 items-center justify-center rounded-full`, {marginTop:-70}]}>
        <Image style={[tw`h-20 w-20`]} source={require('../../assets/logo.png')}/>
      </View>
      <View style={[tw`items-center justify-center flex-1`,]}>
      <Image style={[tw`h-16 w-56`]} source={require('../../assets/brand.png')}/>
      <Text style ={[tw`text-black text-lg mb-12`]}>Stop Wasting Your Time!</Text>
      <TouchableHighlight
        style={[tw`p-4 w-64 items-center my-2.5 rounded-full`, {backgroundColor: '#ddffab'}]}
        onPress={() => {
          navigation.push('Register');
          setisOwnerTrue();
          handlePress();
        }}
        underlayColor={isPressed ? 'transparent' : '#E5E7EB'}
      >
        <Text style={tw`text-black font-semibold`}>
          Continue as a Shop Owner
        </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={[tw`p-4 w-64 items-center my-2.5 rounded-full` ,{backgroundColor: '#ddffab'}]}
        onPress={() => {
          navigation.push('Register')
          handlePress();
        }}
        underlayColor={isPressed ? 'transparent' : '#E5E7EB'}
      >
        <Text style={tw`text-black font-semibold`}>
        Continue as a Customer
        </Text>
      </TouchableHighlight>
          
        </View>
      </View>

    </View>
  

    // <View></View>
  }
    </>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  continueButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    height: 50,
    width: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  btnTxt: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
