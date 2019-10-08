const FilterCampaignsIdReducer = (state = {
    id:'107270280018',
}, action) => {
    if (action.type === 'FILTER_PIZZAS') {
        return {
            id: action.payload,
        }
    } else {
        return state;
    }
};

export default FilterCampaignsIdReducer;
