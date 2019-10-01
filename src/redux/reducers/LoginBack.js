const initialState = {
    backHome: false,
};

const LoginBack = (state = initialState, action) => {
    switch (action.type) {
        case 'BACK_HOME': {
            return {
                // State
                ...state,
                backHome: true,
                // Redux Store
                // email: action.payload,
            }
        } break;
        case 'BACK_DIRECTION_PAGE' : {
            return {
                ...state,
                backHome:false,
            }
        } break
        default: {
            return state;
        }
    }
};

export default LoginBack;
