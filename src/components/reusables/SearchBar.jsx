import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'

const SearchBar = () => {
  return (
    <TouchableOpacity style={styles.container}>
        <Icon name="search" size={20} />
        <TextInput style={styles.txtinput} 
        placeholder='Shop Name?'
        />
        <TouchableOpacity style={styles.btn}>
            <Icon name="map-pin" size={20} />
            <Text style={styles.btnTxt}>Near Me</Text>
        </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container:{
        marginTop:30,
        height:50,
        margin:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#dfe6e9',
        justifyContent:'space-evenly',
        borderRadius:10
    },
    txtinput:{
        width:200,
        fontSize:18
    },
    btn:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#FFFFFF",
        borderRadius:30,
        height:35,
        width:100
    },
    btnTxt:{
        color:'#000000',
        fontSize:15,
        marginLeft:10
    },

    
})