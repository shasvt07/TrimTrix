import {
  ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    Pressable,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    Text,
    Touchable,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, { useContext, useState } from 'react';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import { FlashList } from "@shopify/flash-list";
//   import useFetchCustBookings from '../hooks/useFetchCustBookings';
//   import { AuthContext } from '../../context/AuthContext';
import OwnerBooking from '../../reusables/OwnerBooking';
import useFetchOwnBookings from '../../hooks/useFetchOwnBookings';
import { AuthContext } from '../../../context/AuthContext';
  
  const {height} = Dimensions.get('window');
  const OwnerActivity = () => {
      const {currentUser} = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState(false);
  
  //   
    const { data, isLoading, isError,hasNextPage,fetchNextPage, isFetchingNextPage } = useFetchOwnBookings(currentUser._id);
    // if (isLoading) return <Text>Loading...</Text>;
    // if (isError) return <Text>An error occurred while fetching data</Text>
    const flattenData = data?.pages.flatMap((page) => page.data)
  
    const loadMore = () => {

      if(hasNextPage){
        fetchNextPage();
      }
      setRefreshing(false);
    }
  
  
    return (
      <View style={styles.conatiner}>
        <Text style={styles.headingtxt}>Activity</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text style={styles.pastTxt}>Past</Text>
          <TouchableOpacity style={styles.filterbtn}>
            <Icon size={20} name="filter" />
          </TouchableOpacity>
        </View>
      {isLoading ? (
      <View
        flex={1}
        backgroundColor='white'
        alignItems='center'
        justifyContent='center'
      >
        <ActivityIndicator size='large' />
      </View>
      ):(
        <View style={{flex: 1 ,height:height}}>
          <FlatList
            data={flattenData}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadMore}/>}
            keyExtractor={(item,index) => index.toString()}
            renderItem={({item,index}) => <OwnerBooking item={item} index={index}/>}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isFetchingNextPage ? <ActivityIndicator/> : null}
  
          />
         </View>
      )}
      
      </View>
    );
  };
  
  export default OwnerActivity;
  
  const styles = StyleSheet.create({
    conatiner: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    headingtxt: {
      fontSize: 45,
      fontWeight: 'bold',
      marginTop: 20,
      marginLeft: 5,
      color: '#000000',
    },
    pastTxt: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000000',
    },
    filterbtn: {
      height: 40,
      width: 40,
      borderRadius: 10,
      backgroundColor: '#dfe6e9',
      alignItems: 'center',
      justifyContent: 'center',
    },
    last: {
      height: 340,
      margin: 14,
      borderWidth: 2,
      borderRadius: 10,
      borderColor: 'lightgrey',
    },
    lastImage: {
      height: 150,
      margin: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      maxWidth: '95%',
    },
    cardHeading: {
      fontSize: 25,
      color: '#000000',
      marginBottom: 10,
    },
    previous: {
      padding: 10,
      height: 100,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    preItems: {
      marginLeft: 20,
      flex: 2,
    },
    rebookbtn: {
      backgroundColor: '#dfe6e9',
      height: 40,
      borderRadius: 50,
      width: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    timeDate: {
      fontSize: 15,
      marginBottom: 10,
    },
    cost: {
      fontSize: 15,
      marginBottom: 10,
    },
  });
  