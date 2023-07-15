import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { useDispatch } from 'react-redux';
import { fetchShop } from '../../actions/customers/stores';

const Card = ({navigation, shop, currentRef}) => {
  const dispatch = useDispatch();

  const getShopDetails = async (shopId) => {
    await dispatch(fetchShop(shopId));
  }

  return (
    <View style={styles.last}>
      <Image
        style={styles.lastImage}
        source={require('../../assets/last.png')}
      />
      <View style={{marginLeft: 20, justifyContent: 'space-between'}}>
        <Text style={styles.cardHeading}>{shop?.name}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 2}}>
            <Text style={styles.timeDate}>Costs of services: </Text>
            <View style={{marginTop: 10}}>
              <Text style={styles.cost}>
                Hair Cutting: Rs.{Number(shop?.hair?.cost)}
              </Text>
              <Text style={styles.cost}>
                Bread Triming: Rs.{Number(shop?.beard?.cost)}
              </Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            {shop?.isOpen ? (
              <Pressable
                style={[styles.rebookbtn, {backgroundColor: '#38CC77'}]}>
                <Text style={styles.btntxt}>Open</Text>
              </Pressable>
            ) : (
              <Pressable
                style={[styles.rebookbtn, {backgroundColor: '#FF6263'}]}>
                <Text style={styles.btntxt}>Closed</Text>
              </Pressable>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={[
            tw`p-3 w-32 my-2 items-center rounded-full`,
            {backgroundColor: '#ddffab'},
          ]}
          onPress={() => {
              getShopDetails(shop._id);
              currentRef();
              navigation.navigate('shopDetails', (params = {room: shop._id}));
              
          }}
          >
          <Text style={tw`text-black font-semibold`}>Check Deatails</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    color: '#000000',
    fontWeight: 'bold',
    margin: 20,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  last: {
    height: '85%',
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
  cost: {
    fontSize: 15,
    marginBottom: 10,
    marginRight: 10,
    color: '#000000',
  },
  timeDate: {
    fontSize: 15,
    marginBottom: 10,
    marginRight: 10,
    color: '#000000',
  },
  rebookbtn: {
    backgroundColor: '#dfe6e9',
    height: 40,
    borderRadius: 50,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
