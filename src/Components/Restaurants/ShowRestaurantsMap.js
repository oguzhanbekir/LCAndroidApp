import React, {Fragment} from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import {httpClient} from '../../HttpClient/HttpClient';
import _ from 'lodash';
import {colors} from '../../config/colors';
import {Icon} from 'react-native-elements';

let {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class ShowRestaurantsMap extends React.Component {
  constructor() {
    super();
    this.state = {
      currentDay: new Date(),
      restaurants: [],
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }

  dateFormat(data) {
    data.map(date => {
      const dateStartSplit = date.startTime.split(' ')[1].split(':');
      date.startTime = dateStartSplit[0] + ':' + dateStartSplit[1];

      const dateEndSplit = date.endTime.split(' ')[1].split(':');
      date.endTime = dateEndSplit[0] + ':' + dateEndSplit[1];
    });
  }

  getLocation() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      error => console.log(error.message),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
  }

  componentDidMount() {
    const restaurants = [];

    httpClient.get('/web/Restaurants/GetRestaurants').then(res => {
      res.data.result.map(data => {
        this.dateFormat(data.storeWorkingTimes);
        restaurants.push(data);
      });
      this.setState({
        restaurants: restaurants,
      });
    });

    this.getLocation();
  }

  render() {
    const CURRENT_DAY = this.state.currentDay.getDay();
    return (
      <View style={styles.container}>
        {this.state.restaurants.length > 0 && (
          <Fragment>
            <MapView
              onMapReady={() => {
                PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                ).then(granted => {
                  // just to ensure that permissions were granted
                });
              }}
              style={styles.map}
              showsUserLocation={true}
              provider={PROVIDER_GOOGLE}
              region={{
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              {this.state.restaurants.map(marker => (
                <Marker
                  key={marker.id}
                  coordinate={{
                    latitude: parseFloat(marker.latitude),
                    longitude: parseFloat(marker.longitude),
                  }}
                  title={marker.name}
                  image={require('../../images/ic_marker.png')}
                  description={
                    _.find(marker.storeWorkingTimes, {dayOfWeek: CURRENT_DAY})
                      .startTime +
                    ' - ' +
                    _.find(marker.storeWorkingTimes, {dayOfWeek: CURRENT_DAY})
                      .endTime
                  }
                />
              ))}
            </MapView>
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.getLocationButton}
                onPress={() => this.getLocation()}>
                <Icon
                  size={20}
                  color={colors.showMyLocationIcon}
                  name="my-location"
                  type="MaterialIcons"
                />
              </TouchableOpacity>
            </View>
          </Fragment>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonView: {
    padding: 20,
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  getLocationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: colors.showMyLocationButton,
  },
});

export default ShowRestaurantsMap;
