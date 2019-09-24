import React from 'react'
import { View, 
        StyleSheet, 
        FlatList, 
        SafeAreaView, 
        Text } 
    from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import _ from 'lodash'
import { httpClient } from '../../HttpClient/HttpClient'
import {colors} from '../../config/colors'

const LATITUDE = 0;
const LONGITUDE = 0;

class NearestRestaurants extends React.Component {
    constructor() {
        super();
        this.state = {
            currentDay: new Date(),
            data:[],
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
          }
        };
      }

    getLocation(){
        Geolocation.getCurrentPosition(
          position => {
            this.setState({
              region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }
            });
            this.getNearestRestaurantsData()
          },
        (error) => console.log(error.message),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        );

    }

    getNearestRestaurantsData(){
        const NearestRestaurants = []
        httpClient
        .post('/web/Restaurants/Nearests',{
            UserPosition: {
                "Longitude": this.state.region.longitude,
                "Latitude": this.state.region.latitude
            },
            PageSize : "100"
        })
        .then(res => {
            res.data.result.map((data)=>{
                this.dateFormat(data.storeWorkingTimes)
                NearestRestaurants.push(data)
            });
            this.setState({
                data: NearestRestaurants
            }); 
        })
 
           
    }

    componentDidMount(){
        this.getLocation()
    }

    FlatListItemSeparator = () => {
        return (
          //Item Separator
          <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
        );
    };

    dateFormat(data){
        data.map((date)=>{
            const dateStartSplit = date.startTime.split(" ")[1].split(":")
            date.startTime = dateStartSplit[0]+":"+dateStartSplit[1]
    
            const dateEndSplit = date.endTime.split(" ")[1].split(":")
            date.endTime = dateEndSplit[0]+":"+dateEndSplit[1]
        })
      }
    
render() {
    const CURRENT_DAY = this.state.currentDay.getDay();
        return (
            <View style={styles.container}>
               <SafeAreaView style={styles.container}>
               {this.state.data.length > 0 &&
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => 
                    <View style={styles.item}>
                        <View style={{flex:1, justifyContent:'center'}}>
                                <View style={{flexDirection:'row', justifyContent:'space-between' }}>
                                    <Text style={styles.titleName}>{item.name}</Text>
                                    <Text style={styles.titleNameHours}>{_.find(item.storeWorkingTimes, { 'dayOfWeek': CURRENT_DAY}).startTime+" - "+_.find(item.storeWorkingTimes, { 'dayOfWeek': CURRENT_DAY}).endTime}</Text>
                                </View>
                                <Text style={styles.titleDistance}>{(item.distance*0.001).toFixed(2)+" km"}</Text>
                                <Text style={styles.titleDetail}>{item.address}</Text>
                        </View>
                        
                    </View>
                    }
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                />}
                </SafeAreaView>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    item: {
        padding: 15,
    },
    titleName: {
        fontSize:16, 
        fontWeight:"600"
    },
    titleNameHours: {
        fontSize:16, 
        fontWeight:"600",
        color: colors.text_color
    },
    titleDistance: {
        fontSize:14, 
        fontWeight:"800", 
        color:colors.orange
    },  
    titleDetail: {
        paddingTop:10,
        fontSize:10, 
        fontWeight:"600", 
        color:'dimgray'
    }
});

export default NearestRestaurants;