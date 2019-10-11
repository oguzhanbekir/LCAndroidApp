const FilterCampaignsIdReducer = (state = {
    id: '102471991065',
}, action) => {
    if (action.type === 'FILTER_CAMPAIGNS') {
        return {
            id: action.payload,
        };
    } else {
        return state;
    }
};

export default FilterCampaignsIdReducer;
