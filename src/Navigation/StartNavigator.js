import React from 'react';
import {StyleSheet, View} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {httpClient} from '../HttpClient/HttpClient';
import AppNavigator from './AppNavigator';
import {connect} from 'react-redux';
import FlashMessage from 'react-native-flash-message';

let getData = () => {
  try {
    const value = AsyncStorage.getItem('token');
    authService();
  } catch (e) {
    // error reading value
  }
};

let authService = () => {
  axios
    .post(
      'https://auth.api.lcpizza.com.tr/api/auth/AuthService',
      {
        Username: 'robuser@clockwork.com.tr',
        Password: '7656BAF3F15A6504BBF3CEE829092DFA',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then(function(response) {
      storeToken(response.data.access_token);
      defaultLogin();
    })
    .catch(function(error) {
      alert('Sunucu ile bağlantı kurulamadı');
    });
};

let defaultLogin = () => {
  httpClient.post('/web/Member/DefaultLogin').then(res => {
    storeToken(res.data.result.token.access_token);
  });
};

let storeToken = key => {
  try {
    AsyncStorage.setItem('token', key);
  } catch (e) {
    // saving error
  }
};



class StartNavigator extends React.Component {
  constructor(props) {
    super(props);
    if(!this.props.loggedIn)
      getData();
    if(!this.props.existingId)
      this.getBasket();
  }
  getBasket = () => {
    httpClient.get('/web/Basket/GetBasket').then(res => {
      this.props.storeExistingId(res.data.result.id)
      alert(res.data.result.id);
    });
  };
    _getCurrentRouteName(navState) {
      //console.log(navState)
        if (navState.hasOwnProperty('index')) {
            this._getCurrentRouteName(navState.routes[navState.index])
        } else {
           // console.log("Current Route Name:", navState.state)
        }
    }
  render() {
    return (
      <View style={styles.container}>
        <AppNavigator screenProps={this.props}
                      /*onNavigationStateChange={(prevState, newState) => {
                          this._getCurrentRouteName(newState)
                      }}*//>
        <FlashMessage autoHide={false} position="top" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    loggedIn: state.AuthReducer.loggedIn,
    existingId: state.GetBasketReducer.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeExistingId: (id) => (
        dispatch({type: 'EXISTING_ID', payload: id})
    ),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StartNavigator);
