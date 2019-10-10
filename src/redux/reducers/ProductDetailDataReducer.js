const ProductDetailDataReducer = (state = {
    data:[],
    totalIngredient:0,
    counterPizza:1,
}, action) => {
    switch (action.type) {
        case 'PRODUCT_DETAIL_DATA':
            return {
                data: action.payload,
                totalIngredient: action.totalIngredient ? action.totalIngredient : 0,
                counterPizza:1,
            };
        case 'PRODUCT_DETAIL_DATA_COUNTER':
            return {
                ...state,
                counterPizza: action.payload,
            };
        default:
            return state;
    }
};

export default ProductDetailDataReducer;
