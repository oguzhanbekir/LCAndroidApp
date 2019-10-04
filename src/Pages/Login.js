import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';

import {colors} from '../config/colors';
import {Icon} from 'react-native-elements';
import {httpClient} from '../HttpClient/HttpClient';
import Indicator from '../Components/Indicator';
import CustomInputForm from '../Components/Register/CustomInputForm';
import {connect} from 'react-redux';
import { HeaderBackButton } from 'react-navigation-stack';
import { showMessage, hideMessage } from "react-native-flash-message";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      backHome: false,
      indicator:true,
      refsArr : [],

      secureTextEntry: true,

      email: '',
      password: '',

      errorMessageEmail: '',
      errorMessagePassword: '',
    };
  }

  login = () => {

    const {email, password} = this.state;
    if (email == '') {
      this.setState({errorMessageEmail: 'Lütfen bu alanı doldur'});
    } else if (password == '') {
      this.setState({errorMessagePassword: 'Lütfen bu alanı doldur'});
    } else {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
        this.setState({
          errorMessageEmail: 'Lütfen geçerli bir email adresi gir',
        });
        return false;
      } else {
        this.setState({
          errorMessageEmail: '',
          errorMessagePassword: '',
          indicator:false
        });

         httpClient
          .post('/web/Member/Login', {
            Username: this.state.email,
            Password: this.state.password,
          })
          .then(res => {
            if (!res.data.message) {
              //kişinin bilgileri tutulacak
              this.props.isLoggedIn(res.data.result.name);
             // alert(res.data.result.name)

              this.props.navigation.navigate('Check')
            } else {
              Alert.alert('', res.data.message, [{text: 'OK'}], {
                cancelable: false,
              });
              this.setState({
                indicator:true
              });
            }
          });
      }
    }
  };

  setRef = (ref, name) => {
    this.state.refsArr.push({
      name:name,
      ref:ref
    })
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    const nextScreen = this.props.navigation.state.params || {};
    if(nextScreen.backHome === 'Home'){
      return this.props.navigation.navigate("Home")
    }
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return{
      headerLeft:(<HeaderBackButton
          onPress={()=>{ params.backHome === 'Home' ? navigation.navigate('Home'): navigation.navigate('DirectionMain')}}
      />)
    }
  }

  render() {
   if(this.state.indicator) {
     return (
         <View style={styles.container}>
           {this.state.indicator ? null : <Indicator/>}
           <ScrollView showsVerticalScrollIndicator={false}>
             <View style={styles.body}>
               <CustomInputForm
                   name={'email'}
                   placeholder={'E-Posta'}
                   returnKeyType={'next'}
                   autoFocus={true}
                   keyboardType={'email-address'}
                   errorMessage={this.state.errorMessageEmail}
                   setRef={this.setRef}
                   onSubmitEditing={() => this.state.refsArr.find(data => data.name === 'password').ref.focus()}
                   onChangeText={email => this.setState({email})}
               />
               <CustomInputForm
                   name={'password'}
                   placeholder={'Şifre'}
                   returnKeyType={'done'}
                   errorMessage={this.state.errorMessagePassword}
                   setRef={this.setRef}
                   onSubmitEditing={() => this.login()}
                   onChangeText={password => this.setState({password})}
                   secureTextEntry={this.state.secureTextEntry}
                   rightIcon={
                     <Icon
                         name={this.state.secureTextEntry ? 'eye-with-line' : 'eye'}
                         type="entypo"
                         size={24}
                         color="gray"
                         onPress={() =>
                             this.setState({
                               secureTextEntry: !this.state.secureTextEntry,
                             })
                         }
                     />
                   }
               />
               <TouchableOpacity
                   style={styles.buttonLogin}
                   onPress={() => this.login()}>
                 <Text style={styles.buttonLoginText}>Giriş Yap</Text>
               </TouchableOpacity>
               <View
                   style={{
                     flexDirection: 'row',
                     justifyContent: 'center',
                     alignItems: 'center',
                     marginHorizontal: 10,
                   }}>
                 <View style={styles.line}/>
                 <Text style={{margin: 15, color: colors.text_color}}>veya</Text>
                 <View style={styles.line}/>
               </View>
               <TouchableOpacity
                   style={styles.buttonFB}
                   onPress={() => console.log('Facebook Giriş Yap')}>
                 <Icon name="facebook" type="entypo" size={24} color="#fff"/>
                 <Text style={styles.buttonFBText}> Continue with Facebook</Text>
               </TouchableOpacity>
               <TouchableOpacity
                   style={styles.buttonForgotPassword}
                   onPress={() => console.log('Şifremi Unuttum')}>
                 <Text style={styles.buttonForgotPasswordText}>
                   Şifremi Unuttum
                 </Text>
               </TouchableOpacity>
             </View>
           </ScrollView>
           <View style={styles.footer}>
             <Text style={styles.footerText}>Hesabın yok mu? </Text>
             <TouchableOpacity
                 onPress={() => {
                   this.props.navigation.navigate('Register', { backLogin: 'Login' } )
                 }}>
               <Text style={styles.footerTextLink}>HEMEN KAYIT OL</Text>
             </TouchableOpacity>
           </View>
         </View>
     )
   } else {
     return(
         <View style={styles.container}>
           <Indicator />
         </View>
     )
   }
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: 20,
  },
  footer: {
    height: 50,
    backgroundColor: colors.gray,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: 'gray',
  },
  footerTextLink: {
    fontSize: 16,
    color: colors.orange,
  },
  buttonLogin: {
    alignItems: 'center',
    backgroundColor: colors.buttonRegister,
    paddingVertical: 7,
    borderRadius: 5,
    elevation: 2,
    borderColor: colors.buttonBorder,
    marginTop: 20,
    marginHorizontal: 10,
  },
  buttonLoginText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  line: {
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderColor: colors.text_color,
  },
  buttonFB: {
    alignItems: 'center',
    backgroundColor: colors.buttonFB,
    paddingVertical: 7,
    borderRadius: 5,
    elevation: 2,
    borderColor: colors.buttonBorder,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  buttonFBText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
  },
  buttonForgotPassword: {
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonForgotPasswordText: {
    color: colors.text_color,
    fontWeight: '700',
    fontSize: 15,
  },
});

const mapStateToProps = state => {
  return {
      //  isLoading: state.indicator.isLoading,
      //  backToLogin: state.LoginBack.backHome,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isLoggedIn: (username) => dispatch({type: 'LOGGED_IN', payload:username}),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
