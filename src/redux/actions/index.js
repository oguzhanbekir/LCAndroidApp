import React from 'react';
import {connect} from 'react-redux';

class Login extends React.Component {
    render() {
        return null;
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.indicator.isLoading,
    };
};

const mapDispatchToprops = dispatch => {
    return {
        isLoggedIn: (username) => dispatch({type: 'LOGGED_IN', payload: username}),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToprops,
)(Login);
