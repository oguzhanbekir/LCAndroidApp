import React from 'react';
import {StyleSheet, View} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {httpClient} from '../HttpClient/HttpClient';
import AppNavigator from './AppNavigator';
import {connect} from 'react-redux';


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
    getData();
  }
  render() {
    return (
      <View style={styles.container}>
        <AppNavigator screenProps={this.props}/>
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
    isBackHomeState: state.LoginBack.backHome,
    loggedIn: state.authReducer.loggedIn,
  };
};

const mapDispatchToprops = dispatch => {
  return {
    isBackHome: () => dispatch({type: 'BACK_HOME'}),
    isBackDirectionMain : () => dispatch({type:'BACK_DIRECTION_PAGE'})
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToprops,
)(StartNavigator);
