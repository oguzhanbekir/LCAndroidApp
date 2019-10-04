const AuthReducer = (state = {
    loggedIn: false,
    name: '',
}, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return {
                loggedIn: true,
                name: action.payload,
            };
        case 'LOGGED_OUT':
            return {
                loggedIn: false,
                name: '',
            };
        default:
            return state;
    }
};

export default AuthReducer;
