import { combineReducers} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist'
import indicator from './indicator';
import authReducer from './authReducer';
import LoginBack from './LoginBack';

const indicatorPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['indicator']
}

const authPersistConfig = {
    key: 'auth',
    storage: AsyncStorage,
    blacklist: ['authReducer']
}

const backLoginConfig = {
    key: 'backLogin',
    storage: AsyncStorage,
    whitelist: ['backLoginConfig']
}

const rootReducer = (combineReducers)({
    indicator : persistReducer(indicatorPersistConfig, indicator),
    authReducer : persistReducer(authPersistConfig, authReducer),
    LoginBack : persistReducer(backLoginConfig, LoginBack),
});

export default rootReducer;
