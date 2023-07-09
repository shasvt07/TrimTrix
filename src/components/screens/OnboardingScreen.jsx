import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'

const OnboardingScreen = ({navigation}) => {
  const {setisOwnerTrue,setIsOwnerFalse} = useContext(AuthContext);

  useEffect(() => {
    setIsOwnerFalse();
  },[])

  return (
    <View style={styles.container}>
      <TouchableOpacity 
      style={styles.continueButton}
      onPress={()=> {navigation.push('Register'); setisOwnerTrue()}}
      >
        <Text style={styles.btnTxt}>Continue as a Owner</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      style={styles.continueButton}
      onPress={()=> navigation.push('Register')}
      >
        <Text style={styles.btnTxt}>Continue as a Customer</Text>
      </TouchableOpacity>
    </View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container:{
    display:'flex',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },

  continueButton:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#000000',
    height:50,
    width:200,
    borderRadius:10,
    marginBottom:20
  },
  btnTxt:{
    color:'#FFFFFF',
    fontSize:20,
    fontWeight:'bold'
  },
})