import React from 'react'
import {View, StyleSheet,} from 'react-native';

import NearestRestaurants from '../Components/Restaurants/NearestRestaurants'
import ShowRestaurantsMap from '../Components/Restaurants/ShowRestaurantsMap'

class Restaurants extends React.Component {
    render() {
        return (
          <View style={styles.container}>
            <ShowRestaurantsMap />
            <NearestRestaurants />
          </View>
        )
    }
}
const styles= StyleSheet.create({
    container: {
        flex:1
    },
});

export default Restaurants;