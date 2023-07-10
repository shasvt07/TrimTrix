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
import React, {useEffect, useState} from 'react';
import SearchBar from '../reusables/SearchBar';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Carousel} from 'react-native-snap-carousel';
import {sliderData} from '../constants/data';
import BannerSlider from '../reusables/BannerSlider';
import {windowWidth} from '../../utils/Dimension';
import {fetchShop, fetchStores} from '../../actions/customers/stores';
import {useDispatch} from 'react-redux';
import StoreList from '../reusables/StoreLists';

// import Carousel, { Pagination } from 'react-native-snap-carousel'
// const [index, setIndex] = React.useState(0)

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [allstores, setAllStores] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [bookingDone, setBookingDone] = useState(false);

  async function fetch() {
    const data = await fetchStores();
    setAllStores(data);
    setRefreshing(false);
  }

  useEffect(() => {
    fetch();
  }, [navigation]);


  const renderBanner = ({item, index}) => {
    return <BannerSlider data={item} />;
  };

  return (
    // <ScrollView style={{backgroundColor:'#FFFFFF'}}>
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <TouchableOpacity style={styles.searchcontainer} onPress={() => navigation.navigate('search')}>
        <Icon name="search" size={20} />
        <Text style={styles.searchtxtinput}>Shop Name?</Text>
        <TouchableOpacity style={styles.searchbtn}>
          <Icon name="map-pin" size={20} />
          <Text style={styles.searchbtnTxt}>Near Me</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <View style={{width: '100%'}}>
        <FlatList
          data={allstores.slice(0,2)}
          keyExtractor={item => item._id}
          renderItem={({item,index}) => <StoreList navigation={navigation} item={item} index={index}/>}
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
    marginTop: 15,
  },
  icon: {
    color: '#000000',
  },
});
