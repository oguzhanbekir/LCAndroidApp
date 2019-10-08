import React, {Component} from 'react';
import {Provider} from 'react-redux';

import StartNavigator from './src/Navigation/StartNavigator';
import {store, persistor} from './src/redux/store';
import { PersistGate } from 'redux-persist/es/integration/react'

class App extends Component {
    render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StartNavigator navigation={this.props.navigation} />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
