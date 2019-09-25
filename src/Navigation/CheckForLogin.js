import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const CheckForLogin = ({navigation}) => {
    const  token = AsyncStorage.getItem('token');
    return navigation.navigate(token ? 'Auth' : 'Home');
}


