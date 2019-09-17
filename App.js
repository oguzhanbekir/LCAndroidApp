import React from 'react';
import axios from 'axios'

import Main from './src/Navigation/AppNavigator'
import AsyncStorage from '@react-native-community/async-storage';

import store from './src/redux/store'
import { Provider } from 'react-redux'

getData = async () => {
  try {
    const value = await AsyncStorage.getItem('token')
    //   İlk token kontrolü token yok ise token üretilip localstorage a yazılır.
    if(value !== null) {
      axios.post('https://auth.api.lcpizza.com.tr/api/auth/AuthService', {
              Username: 'robuser@clockwork.com.tr',
              Password: '7656BAF3F15A6504BBF3CEE829092DFA'
            } , {
              headers: {
                  'Content-Type': 'application/json',
              }
            })
            .then(function (response) {
              storeData(response.data.access_token)
            })
            .catch(function (error) {
              alert("Sunucu ile bağlantı kurulamadı");
            });
   }
  } catch(e) {
    // error reading value
  }
}

storeData = async (key) => {
  try {
    await AsyncStorage.setItem('token', key)
  } catch (e) {
    // saving error
  }
}


class App extends React.Component {
  constructor(props) {
      super(props);
  
      getData()
    
  }

  render() {
      return (
        <Provider store={store}>
          <Main />
        </Provider>
      )
  }
}

export default App;