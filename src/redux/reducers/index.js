import {combineReducers} from 'redux';
import Indicator from './Indicator';
import AuthReducer from './AuthReducer';
import FilterProductReducer from './FilterProductsReducer';
import FilterCampaignsIdReducer from './FilterCampaignsIdReducer';
import FilterCampaignsDataReducer from './FilterCampaignsDataReducer';
import FilterPizzasDataReducer from './FilterPizzasDataReducer';
import FilterPizzasIdReducer from './FilterPizzasIdReducer';
import GetBasketReducer from './GetBasketReducer';
import ProductDetailDataReducer from './ProductDetailDataReducer';


const rootReducer = combineReducers({
    Indicator,
    AuthReducer,
    FilterProductReducer,
    FilterCampaignsIdReducer,
    FilterCampaignsDataReducer,
    FilterPizzasDataReducer,
    FilterPizzasIdReducer,
    GetBasketReducer,
    ProductDetailDataReducer,
});

export default rootReducer;
