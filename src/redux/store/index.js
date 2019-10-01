import {applyMiddleware, createStore} from 'redux';
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'
import  reducer  from '../reducers'

export default () => {
    let store = createStore(reducer, {},applyMiddleware(logger))
    let persistor = persistStore(store)
    return { store, persistor }
}

