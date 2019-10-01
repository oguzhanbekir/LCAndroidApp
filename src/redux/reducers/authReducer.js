const initialState = {
    loggedIn: false,
    name:'',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return {
                // State
                loggedIn: true,
                name:action.payload,
                // Redux Store
               // email: action.payload,
            }
        case 'LOGGED_OUT':
            return initialState
        default:
            return state;

    }
};

export default authReducer;
