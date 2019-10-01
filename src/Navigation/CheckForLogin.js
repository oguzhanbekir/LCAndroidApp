import React from 'react';
import {connect} from 'react-redux';
class CheckForLogin extends React.Component {
  componentDidMount(){
    const authloggedIn = this.props.loggedIn;
    const name = this.props.name;

   this.props.navigation.navigate(authloggedIn ? 'Home' : 'Auth');
   if(authloggedIn){
     this.props.navigation.navigate('Home',{
       title: "Hoşgeldin " + name.split(" ")[0],
     })
   }
  }

  render() {
    return null
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.authReducer.loggedIn,
    name: state.authReducer.name,

  };
};

export default connect(
    mapStateToProps
)(CheckForLogin);
