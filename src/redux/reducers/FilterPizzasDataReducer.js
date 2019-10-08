const FilterCampaignsDataReducer = (state = {
    data: [],
    size: '100049097560',
}, action) => {
    switch (action.type) {
        case 'FILTER_PIZZAS_DATA':
            return {
                data: action.payload,
                size: action.pizzaSize,
                id: action.categoryId,
            };
        case 'FILTER_PIZZAS_DATA_DELETE':
            return {
                data: [],
                size: '100049097560',
            };
        default:
            return state;
    }
};

export default FilterCampaignsDataReducer;
