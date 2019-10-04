const FilterCampaignsDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'FILTER_CAMPAIGNS_DATA':
            return action.payload;
        case 'FILTER_CAMPAIGNS_DATA_DELETE':
            return [];
        default:
            return state;
    }
};

export default FilterCampaignsDataReducer;
