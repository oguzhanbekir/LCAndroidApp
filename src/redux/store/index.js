import {applyMiddleware, createStore} from 'redux';
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'
import  rootReducer  from '../reducers/index'
//,applyMiddleware(logger) for log
export default () => {
    let store = createStore(rootReducer)
    let persistor = persistStore(store)
    return { store, persistor }
}

