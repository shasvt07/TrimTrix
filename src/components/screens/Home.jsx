import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SearchBar from '../reusables/SearchBar';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Carousel } from 'react-native-snap-carousel';
import { sliderData } from '../constants/data';
import BannerSlider from '../reusables/BannerSlider';
import { windowWidth } from '../../utils/Dimension';
import { fetchShop, fetchStores } from '../../actions/customers/stores';
import { useDispatch } from 'react-redux';

// import Carousel, { Pagination } from 'react-native-snap-carousel'
// const [index, setIndex] = React.useState(0)

const Home = ({navigation}) => { 
  const dispatch = useDispatch();
  const [allstores,setAllStores] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [bookingDone, setBookingDone] = useState(false);


  async function fetch(){
    // setRefreshing(true);
    const data = await fetchStores();
    setAllStores(data);
    setRefreshing(false);
  }

  const fetchShopDetails = async(shopId) => {
    dispatch(fetchShop(shopId));
}

  useEffect(() => {
    fetch();
  },[navigation])

  
const renderStores = ({item,index}) => {
  return(
    <Pressable style={{flexDirection:'row', alignItems:'center',padding:10,width:'100%'}}
    onPress={() => {fetchShopDetails(item._id);navigation.navigate('shopDetails', params={room:item._id})}} 
    >
      <View style={styles.pinicon}>
        <Entypo name='location-pin' size={27} color={'#000000'}/>
      </View>
      <View style={{width:'90%', paddingLeft:10}} >
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <View>
        <Text style={{fontSize:20, color:'#000000'}} >{item.name}</Text>
        <Text style={{fontSize:15}}>{item.location}</Text>
        </View>
        <Entypo name="chevron-small-right" size={24} color="black" />
        </View>
        <View style={{height:1, backgroundColor:'lightgrey', width:'100%', marginTop:20}}></View>
      </View>
    </Pressable>
  )
}

  const renderBanner = ({item,index}) => {
    return <BannerSlider data = {item}/>
  }

  return (
    // <ScrollView style={{backgroundColor:'#FFFFFF'}}>
      <View style={{flex:1 ,backgroundColor:'#FFFFFF'}}> 
        <RefreshControl refreshing={refreshing} onRefresh={fetch} />

        <SearchBar />
        <View style={{width:'100%'}}>
          <FlatList
            data={allstores}
            keyExtractor={(item) => item._id}
            renderItem={renderStores}
            refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetch} />
        }
          />
        </View>
        <View>
          <Text style={styles.subHeading}>Suggestions</Text>
          <View style={styles.items}>
            <TouchableOpacity
              style={styles.itemBtn}
              onPress={() => navigation.navigate('Login')}>
              <Entypo size={20} style={styles.icon} name="help-with-circle" />
              <Text style={styles.icontxt}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemBtn}>
              <Icon size={20} style={styles.icon} name="wallet" />
              <Text style={styles.icontxt}>Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemBtn}>
              <Icon
                size={20}
                style={styles.icon}
                color={'#000000'}
                name="clock"
              />
              <Text style={styles.icontxt}>Trips</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.subHeading}>Ways to save money</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}>
            {/* <Carousel
              // ref={c => {
              //   this._carousel = c;
              // }}
              data={sliderData}
              renderItem={renderBanner}
              sliderWidth={windowWidth-20}
              itemWidth={300}
              loop={true}
              
            /> */}
          </View>
        </View>
      </View> 
    // </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFFFFF'
  },
  pinicon:{
    backgroundColor:'#ecf0f1',
    alignItems:'center',
    justifyContent:'center',
    color:'#000000',
     height:40,
     width:40, 
     
      borderRadius:30
  },

  items: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    margin: (10, 10),
    justifyContent: 'space-evenly',
  },
  itemBtn: {
    height: 80,
    width: 100,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeading: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop:15
  },
  icon: {
    color: '#000000',
  },
});
