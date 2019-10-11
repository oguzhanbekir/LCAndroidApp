const GetBasketReducer = (state = {
    id: '',
}, action) => {
    if (action.type === 'EXISTING_ID') {
        return {
            id: action.payload,
        };
    } else {
        return state;
    }
};

export default GetBasketReducer;
