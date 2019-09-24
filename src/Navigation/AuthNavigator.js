import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';

import DirectionMain from '../Pages/DirectionMain'
import Login from '../Pages/Login'
import Register from '../Pages/Register'


const headerStyleRegister = 'Kayıt Ol'
const headerStyleLogin = 'Giriş Yap'
const headerStyleSkip = 'ŞİMDİLİK GEÇ'


const headerSkip = <Text style={{paddingRight:10}}>{headerStyleSkip}</Text>
  

const AuthNavigator = createStackNavigator({
    DirectionMain: {
    screen: DirectionMain,
    navigationOptions : ({ navigation }) => {
      return {
        header:null,
      }
    }, 
  },
  Login: {
    screen:Login,
    navigationOptions : ({ navigation }) => {
      return {
        headerTitle:headerStyleLogin,
        headerRight: (
            headerSkip
          ),
      }
    }, 
  },
  Register: {
    screen:Register,
    navigationOptions : ({ navigation }) => {
      return {
        headerTitle:headerStyleRegister,
        headerRight: (
            headerSkip
          ),
      }
    }, 
  },


}, {
  initialRouteName: 'DirectionMain',
  transitionConfig: () => fromRight(),
});

AuthNavigator.navigationOptions =({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
}
  


const Main = createAppContainer(AuthNavigator);
export default Main;