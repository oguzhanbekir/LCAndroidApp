import React from 'react'
import { 
    Text, 
    View,
    StyleSheet, 
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';

import { Input } from 'react-native-elements';
import { colors } from '../config/colors'
import { Icon } from 'react-native-elements';

class Register extends React.Component {
    state = {
        secureTextEntry:true,

        username:'',
        email:'',
        password:'',
        phone:'',

        errorMessageUserNAme:'',
        errorMessageEmail:'',
        errorMessagePassword:'',
        errorMessageGSM:'',
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.body}>
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
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginHorizontal:10}}>
                            <View style={styles.line} />
                            <Text style={{margin:15,color:colors.text_color}}>veya</Text>
                            <View style={styles.line} />
                        </View>
                        <Input
                            autoCapitalize='none'
                            errorMessage ={this.state.errorMessageUserName}
                            placeholder='Ad Soyad'
                            returnKeyType='next'
                            blurOnSubmit={false}
                            autoFocus={true}
                            onSubmitEditing={()=>this.email.focus()}
                            onChangeText={username=> this.setState({username})}
                            />
                        <Input
                            autoCapitalize='none'
                            errorMessage ={this.state.errorMessageEmail}
                            placeholder='E-Posta'
                            keyboardType='email-address'
                            returnKeyType='next'
                            blurOnSubmit={false}
                            onSubmitEditing={()=>this.password.focus()}
                            onChangeText={email=> this.setState({email})}
                            ref={(input)=>this.email = input}
                            />
                        <Input 
                            errorMessage ={this.state.errorMessagePassword}
                            onSubmitEditing={()=>this.gsm.focus()}
                            ref={(input)=>this.password = input}
                            placeholder="Şifre" 
                            secureTextEntry={this.state.secureTextEntry}
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
                        <Input
                            autoCapitalize='none'
                            errorMessage ={this.state.errorMessageGSM}
                            placeholder='GSM'
                            returnKeyType='done'
                            keyboardType='phone-pad'
                            blurOnSubmit={false}
                            ref={(input)=>this.gsm = input}
                            onSubmitEditing={()=>console.log("asdasdasdasd")}
                            onChangeText={phone=> this.setState({phone})}
                            />
                    </View>
                </ScrollView>
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
})

export default Register;