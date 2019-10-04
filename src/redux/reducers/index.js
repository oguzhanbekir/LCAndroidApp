import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
import Indicator from './Indicator';
import AuthReducer from './AuthReducer';
import FilterProductReducer from './FilterProductsReducer';
import FilterCampaignsIdReducer from './FilterCampaignsIdReducer';
import FilterCampaignsDataReducer from './FilterCampaignsDataReducer';

const config = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['AuthReducer'],
};

const rootReducer = combineReducers({
    Indicator,
    AuthReducer,
    FilterProductReducer,
    FilterCampaignsIdReducer,
    FilterCampaignsDataReducer,
});

export default persistReducer(config, rootReducer);
