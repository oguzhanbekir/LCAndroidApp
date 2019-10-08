import React, {Fragment} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import Banner from '../Components/Home/Banner';
import MainPageForYou from '../Components/Home/MainPageForYou';
import MainPageCampaigns from '../Components/Home/MainPageCampaigns';
import CouponCode from '../Components/Home/CouponCode';
import LoginButton from '../Components/Home/LoginButton';
import NearestRestaurantButton from '../Components/Home/NearestRestaurant';
import MemberDeliveryAddress from '../Components/Home/MemberDeliveryAddress';

import Indicator from '../Components/Indicator';

import {connect} from 'react-redux';

class Home extends React.Component {
  render() {
    return (
        <Fragment>
            { this.props.loggedIn ? <MemberDeliveryAddress />  : <LoginButton navigation={this.props.navigation} /> }
          <ScrollView style={{flex:1}}>
            <View style={styles.container}>
              <Banner />
              <MainPageCampaigns navigation={this.props.navigation} />
              <CouponCode />
              <MainPageForYou navigation={this.props.navigation}/>
              <NearestRestaurantButton navigation={this.props.navigation} />
            </View>
          </ScrollView>

        </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
});

const mapStateToProps = state => {
  return {
    loggedIn: state.AuthReducer.loggedIn,
  };
};

export default connect(
  mapStateToProps,
  null,
)(Home);
