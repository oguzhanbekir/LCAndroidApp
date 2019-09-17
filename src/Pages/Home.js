import React, { Fragment } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';

import Banner from '../Components/Home/Banner'
import MainPageForYou from '../Components/Home/MainPageForYou'
import MainPageCampaigns from '../Components/Home/MainPageCampaigns'
import CouponCode from '../Components/Home/CouponCode'
import NearestRestaurantButton from '../Components/Home/NearestRestaurant'
import Indicator from '../Components/Indicator'

import { connect } from 'react-redux'

class Home extends React.Component {
          render(){
            return (
              <ScrollView>
                <View style={styles.container}>
                  <Banner />
                  <MainPageCampaigns navigation={this.props.navigation}/>
                  <CouponCode />
                  <MainPageForYou />
                  <NearestRestaurantButton navigation={this.props.navigation} />
                </View>
              </ScrollView> 
            )
          }
}

const styles= StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:'#F0F0F0'
  }
});

const mapStateToProps = (state) => {
  return {
      durum: state.durum
  }
}

export default connect(mapStateToProps,null)(Home);