import React from 'react'
import { 
    Text, 
    View,
    StyleSheet, 
    TouchableOpacity,
    ScrollView,
    Alert,
    KeyboardAvoidingView
} from 'react-native';

import { Input } from 'react-native-elements';
import { colors } from '../config/colors'
import { Icon } from 'react-native-elements';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

import { httpClient } from '../HttpClient/HttpClient'

class Login extends React.Component {
    state = {
        secureTextEntry:true,
        email:'',
        password:'',
        errorMessageEmail:'',
        errorMessagePassword:'',
    }

    login = () => {
        const{ email, password } = this.state;
        if(email==""){
            this.setState({errorMessageEmail:'Lütfen bu alanı doldur'});
        } else if(password==""){
            this.setState({errorMessagePassword:'Lütfen bu alanı doldur'});
        }else{
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            if(reg.test(email) === false)
            {
                this.setState({errorMessageEmail:"Lütfen geçerli bir email adresi gir"});
                return false;
            } else {
                this.setState({
                    errorMessageEmail:'',
                    errorMessagePassword:'',
                })

                httpClient
                .post('/web/Member/Login',{
                    Username: this.state.email, 
                    Password: this.state.password
                })
                .then(res => {
                    if(!res.data.message){
                        //kişinin bilgileri tutulacak
                        console.log(res.data.result.name)
                    }else{
                        Alert.alert(
                            '',
                            res.data.message,
                            [
                                {text: 'OK'},
                            ],
                            {cancelable: false},
                        ) 
                    }
                })
            }
        }
      }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.body}>
                        <Input
                            autoCapitalize='none'
                            errorMessage ={this.state.errorMessageEmail}
                            placeholder='E-Posta'
                            keyboardType='email-address'
                            returnKeyType='next'
                            blurOnSubmit={false}
                            autoFocus={true}
                            onSubmitEditing={()=>this.password.focus()}
                            onChangeText={email=> this.setState({email})}
                            />
                        <Input 
                            errorMessage ={this.state.errorMessagePassword}
                            onSubmitEditing={()=>this.login()}
                            ref={(input)=>this.password = input}
                            placeholder="Şifre" secureTextEntry={this.state.secureTextEntry}
                            onChangeText={password=> this.setState({password})}
                            rightIcon={
                            <Icon
                            name={this.state.secureTextEntry ? 'eye-with-line' : 'eye'}
                            type='entypo'
                            size={24}
                            color='gray'
                            onPress={() => 
                                this.setState({
                                    secureTextEntry:!this.state.secureTextEntry
                                })
                            }
                            />
                            }
                        />
                        <TouchableOpacity
                            style= {styles.buttonLogin}
                            onPress= {() => this.login()}
                            >
                                <Text style={styles.buttonLoginText}>Giriş Yap</Text>     
                        </TouchableOpacity>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginHorizontal:10}}>
                            <View style={styles.line} />
                            <Text style={{margin:15,color:colors.text_color}}>veya</Text>
                            <View style={styles.line} />
                        </View>
                        <TouchableOpacity
                            style= {styles.buttonFB}
                            onPress= {() => console.log("Facebook Giriş Yap")}
                            >
                            <Icon
                            name='facebook'
                            type='entypo'
                            size={24}
                            color='#fff'
                            />
                            <Text style={styles.buttonFBText}>  Continue with Facebook</Text>     
                        </TouchableOpacity>
                        <TouchableOpacity
                            style= {styles.buttonForgotPassword}
                            onPress= {() => console.log("Şifremi Unuttum")}
                            >
                                <Text style={styles.buttonForgotPasswordText}>Şifremi Unuttum</Text>     
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Hesabın yok mu? </Text>
                        <TouchableOpacity
                            onPress= {() => this.props.navigation.navigate('Register')}
                            >
                            <Text style={styles.footerTextLink}>HEMEN KAYIT OL</Text>
                        </TouchableOpacity>
                    </View> 
                        
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    body: {
        flex:1,
        padding:20,
    },
    footer: {
        height:50,
        backgroundColor:colors.gray,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    footerText: {
        color:'gray'
    },
    footerTextLink: {
        fontSize:16,
        color:colors.orange,
    },
    buttonLogin: {
        alignItems: 'center',
        backgroundColor: colors.buttonRegister,
        paddingVertical:7,
        borderRadius: 5,
        elevation: 2,
        borderColor: colors.buttonBorder,
        marginTop: 20,
        marginHorizontal:10
    },
    buttonLoginText: {
        color:'#fff',
        fontWeight:'700',
        fontSize:18
    }, 
    line: {
        flex:1,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderColor:colors.text_color
    },
    buttonFB: {
        alignItems: 'center',
        backgroundColor: colors.buttonFB,
        paddingVertical:7,
        borderRadius: 5,
        elevation: 2,
        borderColor: colors.buttonBorder,
        flexDirection:'row',
        justifyContent:'center',
        marginHorizontal:10
    },
    buttonFBText: {
        color:'#fff',
        fontWeight:'600',
        fontSize:17
    }, 
    buttonForgotPassword: {
        alignItems: 'center',
        paddingVertical:10,
        marginTop: 20,
    },
    buttonForgotPasswordText: {
        color:colors.text_color,
        fontWeight:'700',
        fontSize:15
    }, 
})
export default Login;