
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Pressable } from 'react-native';
import { API} from '../../api';
import Entypo from 'react-native-vector-icons/Entypo';
import { fetchShop } from '../../actions/customers/stores';
import { useDispatch } from 'react-redux';
import StoreList from './StoreLists';


const SearchRecommendations = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (query.trim() !== '') {
      fetchRecommendations();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const fetchRecommendations = async () => {
    try {
      const response = await API.get(`/customer/stores/searchrecomendation?query=${query}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching search recommendations:', error);
    }
  };

  const handleInputChange = (text) => {
    setQuery(text);
  };



  return (
    <View style={styles.container}>
      <TextInput
        autoFocus
        style={styles.input}
        value={query}
        onChangeText={handleInputChange}
        placeholder="Shop Name or Location"
      />
      <View style={{width: '100%'}}>
        <FlatList
          data={suggestions}
          keyExtractor={item => item._id}
          renderItem={({item,index}) => <StoreList navigation={navigation} item={item} index={index}/>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFFFFF'
  },
  input: {
    marginTop:20,
      height:50,
      margin:10,
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#ecf0f1',
      justifyContent:'space-evenly',
      borderRadius:10,
      fontSize:18
  },
  pinicon: {
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000000',
    height: 40,
    width: 40,

    borderRadius: 30,
  },

});


export default SearchRecommendations;
