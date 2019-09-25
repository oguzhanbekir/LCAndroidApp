import React, { Component } from 'react';
import { Provider } from 'react-redux'

import StartNavigator from './src/Navigation/StartNavigator'
import store from './src/redux/store'

class App extends Component {
  render() {
      return (
        <Provider store={store}>
          <StartNavigator navigation={this.props.navigation} />
        </Provider>
      )
  }
}


export default App;