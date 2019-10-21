const ProductDetailDataReducer = (state = {
    data: [],
    campaignDetailData: [],
    totalIngredient: 0,
    counterPizza: 1,
    doughSelection: 0,
}, action) => {
    switch (action.type) {
        case 'PRODUCT_DETAIL_DATA':
            return {
                ...state,
                data: action.payload,
                totalIngredient: action.totalIngredient ? action.totalIngredient : 0,
            };
        case 'PRODUCT_CAMPAIGN_DATA':
            return {
                ...state,
                campaignDetailData: action.payload,
                totalIngredient: action.totalIngredient ? action.totalIngredient : 0,
            };
        case 'PRODUCT_DETAIL_DATA_COUNTER':
            return {
                ...state,
                counterPizza: action.payload,
            };
        case 'PRODUCT_DETAIL_DATA_DOUGH_SELECTION':
            return {
                ...state,
                id: action.id,
                doughSelection: action.payload,
                price: action.price,
            };
        case 'PRODUCT_DETAIL_DATA_DELETE':
            return {
                data: [],
                totalIngredient: 0,
                campaignDetailData: [],
                counterPizza: 1,
                doughSelection: '',
            };
        default:
            return state;
    }
};

export default ProductDetailDataReducer;
