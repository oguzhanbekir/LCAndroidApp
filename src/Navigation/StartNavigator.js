import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

import { httpClient } from '../HttpClient/HttpClient'
import AppNavigator from './AppNavigator'

getData = () => {
    try {
        const value = AsyncStorage.getItem('token')
        authService()
    } catch(e) {
    // error reading value
    }
}

authService  = () => {
    axios.post('https://auth.api.lcpizza.com.tr/api/auth/AuthService', {
    Username: 'robuser@clockwork.com.tr',
    Password: '7656BAF3F15A6504BBF3CEE829092DFA'
    } , {
    headers: {
        'Content-Type': 'application/json',
    }
    })
    .then(function (response) {
        defaultLogin()
    })
    .catch(function (error) {
        alert("Sunucu ile bağlantı kurulamadı");
    });
}
  
defaultLogin = () => {
    httpClient
    .post('/web/Member/DefaultLogin')
    .then(res => {
        storeToken(res.data.result.token.access_token)
    }); 
}

storeToken = (key) => {
    try {
        AsyncStorage.setItem('token', key)
    } catch (e) {
    // saving error
    }
}
 
class StartNavigator extends React.Component {
    constructor(props) {
        super(props);
        getData()
    }
    render(){
        return(
            <View style={styles.container}>
                <AppNavigator  />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container :{
      backgroundColor:'#fff',
      flex:1,
      justifyContent:'center',
    }  
});
  
export default StartNavigator;