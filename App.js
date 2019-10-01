import React, {Component} from 'react';
import {Provider} from 'react-redux';

import StartNavigator from './src/Navigation/StartNavigator';
import store from './src/redux/store';
import { PersistGate } from 'redux-persist/es/integration/react'
const persistStore = store();

class App extends Component {
  render() {
    return (
      <Provider store={persistStore.store}>
        <PersistGate loading={null} persistor={persistStore.persistor}>
          <StartNavigator navigation={this.props.navigation} />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
