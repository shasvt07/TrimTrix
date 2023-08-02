import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Carousel} from 'react-native-snap-carousel';
import {sliderData} from '../constants/data';
import BannerSlider from '../reusables/BannerSlider';
import {windowWidth} from '../../utils/Dimension';
import {fetchShop, fetchStores} from '../../actions/customers/stores';
import {useDispatch, useSelector} from 'react-redux';
import StoreList from '../reusables/StoreLists';
import MapView from 'react-native-maps';
import Map from '../reusables/MapView';
import tw from 'tailwind-react-native-classnames';



// import Carousel, { Pagination } from 'react-native-snap-carousel'
// const [index, setIndex] = React.useState(0)

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {shopList,isLoading} = useSelector((state) => state.shopList);
  const [refreshing, setRefreshing] = useState(true);
  const [bookingDone, setBookingDone] = useState(false);

  async function fetch() {
    await dispatch(fetchStores());
    setRefreshing(false);
  }

  useEffect(() => {
    fetch();
  }, [dispatch]);

  


  const renderBanner = ({item, index}) => {
    return <BannerSlider data={item} />;
  };

  return (
    <ScrollView style={{backgroundColor:'#FFFFFF'}}>

    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <RefreshControl refreshing={refreshing} onRefresh={fetch} />
      <TouchableOpacity style={styles.searchcontainer} onPress={() => navigation.navigate('search')}>
        <Icon name="search" size={20} />
        <Text style={styles.searchtxtinput}>Shop Name?</Text>
        <TouchableOpacity style={styles.searchbtn} onPress={() => navigation.navigate('map', params={shopList:shopList})}>
          <Icon name="map-pin" size={20} />
          <Text style={styles.searchbtnTxt}>Near Me</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <View style={{width: '100%'}}>
        {isLoading ? <View
        // flex={1}
        backgroundColor='white'
        alignItems='center'
        justifyContent='center'
      >
        <ActivityIndicator size="small" />

      </View> :
      
        <FlatList
          data={shopList?.slice(0,2)}
          keyExtractor={item => item._id}
          renderItem={({item,index}) => <StoreList isLoading={isLoading} navigation={navigation} item={item} index={index}/>}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetch} />
          }
        />
      } 
      </View>
      {/* <View>
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
      </View> */}
      <View>
        <Text style={styles.subHeading}>What we Offer</Text>
        <ScrollView showsHorizontalScrollIndicator={false}  horizontal={true}  style={{overflow:'scroll', marginTop:10}}>
          <View style={[tw`w-64 m-2 ml-4 h-52 rounded-lg bg-white`,]}>
            <Image style={[tw`h-32 w-64 rounded-xl`,]} source={require('../../assets/homescreen/image1.jpeg')} />
            <View style={[tw`h-32 mt-4`]}>
              <Text style={tw`text-black font-bold text-xl`}> Book you seat! </Text>
              <Text style={tw`text-black text-sm`}> Now salons are online </Text>
            </View>
          </View>
          <View style={[tw`w-64 m-2 h-52 rounded-lg bg-white`]}>
            <Image style={[tw`h-32 w-64 rounded-xl`,]} source={require('../../assets/homescreen/image2.jpeg')} />
            <View style={[tw`h-32 mt-4`]}>
              <Text style={tw`text-black font-bold text-xl`}>Dont Waste Your time!</Text>
              <Text style={tw`text-black text-sm`}>No need to wait at store for your turn</Text>
            </View>
          </View>
          <View style={[tw`w-64 m-2 h-52 rounded-lg bg-white`]}>
            <Image style={[tw`h-32 w-64 rounded-xl`,]} source={require('../../assets/homescreen/image4.jpeg')} />
            <View style={[tw`h-32 mt-4`]}>
              <Text style={tw`text-black font-bold text-xl`}>Shop is Open or Close!</Text>
              <Text style={tw`text-black text-sm`}>We provide live status of shops</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <View>
        <Text style={styles.subHeading}>Ways to use Our app</Text>
        <ScrollView showsHorizontalScrollIndicator={false}  horizontal={true}  style={{overflow:'scroll', marginTop:10}}>
          <View style={[tw`w-64 m-2 h-52 bg-white`]}>
            <Image style={[tw`h-32 w-64 rounded-xl`,]} source={require('../../assets/homescreen/image6.jpeg')} />
            <View style={[tw`h-32 mt-4 ml-2`]}>
              <Text style={tw`text-black font-bold text-xl`}>Pay booking Amount</Text>
              <Text style={tw`text-black text-sm`}>30% of your total service charge</Text>
            </View>
          </View>
          <TouchableOpacity style={[tw`w-64 m-2 ml-4 h-52 bg-white rounded-lg`]} onPress={() => navigation.navigate('map', params={shopList:shopList})}>
            <Image style={[tw`h-32 w-64 rounded-xl`,]} source={require('../../assets/homescreen/image5.png')} />
            <View style={[tw`h-32 mt-4 ml-2`]} >
              <Text style={tw`text-black font-bold text-xl`}>Nearby Salon</Text>
              <Text style={tw`text-black text-sm`}>See Salons near you in one Click</Text>
            </View>
          </TouchableOpacity>
          <View style={[tw`w-64 m-2 h-52 bg-white`]}>
            <Image style={[tw`h-32 w-64 rounded-xl`,]} source={require('../../assets/homescreen/image3.jpeg')} />
            <View style={[tw`h-32 mt-4`]}>
              <Text style={tw`text-black font-bold text-xl`}>Check Lobby Deatils</Text>
              <Text style={tw`text-black text-sm`}>Get full details of your queue</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
    </ScrollView> 
  );
};

export default Home;

const styles = StyleSheet.create({
  searchcontainer: {
    marginTop: 30,
    height: 50,
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#ecf0f1',
    justifyContent: 'space-evenly', 
    borderRadius: 10,
  },
  searchtxtinput: {
    width: 200,
    fontSize: 18,
  },
  searchbtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    height: 35,
    width: 100,
  },
  searchbtnTxt: {
    color: '#000000',
    fontSize: 15,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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

  items: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    margin: 10,
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
    marginTop: 15,
  },
  icon: {
    color: '#000000',
  },
});
