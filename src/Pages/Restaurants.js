import React from 'react'
import { Text, View, StyleSheet, PermissionsAndroid, Alert } from 'react-native';
//import MapView from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE }from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';



class Restaurants extends React.Component {
    state = {
        location: null
      };
    
      findCoordinates = () => {
        Geolocation.getCurrentPosition(
          position => {
            const location = JSON.stringify(position);
            alert(location)
            this.setState({ location });
          },
          error => Alert.alert(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      };
    
    render() {
        this.findCoordinates()
        return (
            <View style={styles.container}>
                        <MapView
                         onMapReady={() => {
                            PermissionsAndroid.request(
                              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                            ).then(granted => {
                                
                              // just to ensure that permissions were granted
                            });
                          }}
                        style={styles.map}
                        showsUserLocation={true}
                        provider={PROVIDER_GOOGLE}
                        showsMyLocationButton={true}
                        showsCompass={true}
                        toolbarEnabled={true}
                        zoomEnabled={true}
                        rotateEnabled={true}
                        followsUserLocation={true}
                        >
     </MapView>
   </View>
        )
    }
}
const styles= StyleSheet.create({
    container: {
        flex:1
      },
      map:{
          flex:1
      }
});

export default Restaurants;