import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Switch,
    Alert,
    BackHandler,
} from 'react-native';

import {Icon} from 'react-native-elements';
import {colors} from '../config/colors';
import {httpClient} from '../HttpClient/HttpClient';
import CustomInputForm from '../Components/Register/CustomInputForm';
import {showMessage, hideMessage} from 'react-native-flash-message';

class Register extends React.Component {
    state = {
        refsArr: [],
        secureTextEntry: true,

        username: '',
        email: '',
        password: '',
        phone: '',

        errorMessageUserName: '',
        errorMessageEmail: '',
        errorMessagePassword: '',
        errorMessageGSM: '',

        switchValueAgreement: false,
        switchValueSMS: false,
        switchValueEmail: false,
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        const nextScreen = this.props.navigation.state.params || {};
        if (nextScreen.backLogin === 'Login') {
            return this.props.navigation.navigate('Login');
        }
    };

    controlRegisterForm = () => {
        const {username, email, password, phone} = this.state;
        if (username == '') {
            this.setState({errorMessageUserName: 'Lütfen bu alanı doldur'});
        } else if (email == '') {
            this.setState({errorMessageEmail: 'Lütfen bu alanı doldur'});
        } else {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(email) === false) {
                this.setState({
                    errorMessageEmail: 'Lütfen geçerli bir email adresi gir',
                });
                return false;
            } else {
                if (password == '') {
                    this.setState({errorMessagePassword: 'Lütfen bu alanı doldur'});
                } else if (phone == '') {
                    this.setState({errorMessageGSM: 'Lütfen bu alanı doldur'});
                } else if (phone != '') {
                    if (phone.length != 10) {
                        this.setState({errorMessageGSM: 'Lütfen geçerli bir numara giriniz'});
                    } else {
                        this.setState({
                            errorMessageUserName: '',
                            errorMessageEmail: '',
                            errorMessagePassword: '',
                            errorMessageGSM: '',
                        });
                        if (!this.state.switchValueAgreement) {
                            Alert.alert('', 'Lütfen üyelik sözleşmesini okudum kısmını onaylayın', [{text: 'OK'}], {
                                cancelable: false,
                            });
                        } else {
                            console.log(this.state.username + ' ' + this.state.email + ' ' + this.state.password + ' ' + this.state.phone + ' ' +
                                this.state.switchValueAgreement + ' ' + this.state.switchValueEmail + ' ' + this.state.switchValueSMS);
                            showMessage({
                                message: 'Simple message',
                                type: 'info',
                            });
                        }
                    }
                }
            }
        }
    };

    setRef = (ref, name) => {
        this.state.refsArr.push({
            name: name,
            ref: ref,
        });
    };

    toggleSwitchAgreement = value => {
        this.setState({switchValueAgreement: value});
    };
    toggleSwitchSMS = value => {
        this.setState({switchValueSMS: value});
    };
    toggleSwitchEmail = value => {
        this.setState({switchValueEmail: value});
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.body}>
                        <TouchableOpacity
                            style={styles.buttonFB}
                            onPress={() => console.log('Facebook Giriş Yap')}>
                            <Icon name="facebook" type="entypo" size={24} color="#fff"/>
                            <Text style={styles.buttonFBText}> Continue with Facebook</Text>
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
                        <CustomInputForm
                            name={'username'}
                            placeholder={'Ad Soyad'}
                            autoFocus={true}
                            returnKeyType={'next'}
                            errorMessage={this.state.errorMessageUserName}
                            setRef={this.setRef}
                            onSubmitEditing={() => this.state.refsArr.find(data => data.name === 'email').ref.focus()}
                            onChangeText={username => this.setState({username})}
                        />
                        <CustomInputForm
                            name={'email'}
                            placeholder={'E-Posta'}
                            returnKeyType={'next'}
                            keyboardType={'email-address'}
                            errorMessage={this.state.errorMessageEmail}
                            setRef={this.setRef}
                            onSubmitEditing={() => this.state.refsArr.find(data => data.name === 'password').ref.focus()}
                            onChangeText={email => this.setState({email})}
                        />
                        <CustomInputForm
                            name={'password'}
                            placeholder={'Şifre'}
                            returnKeyType={'next'}
                            errorMessage={this.state.errorMessagePassword}
                            setRef={this.setRef}
                            onSubmitEditing={() => this.state.refsArr.find(data => data.name === 'gsm').ref.focus()}
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
                        <CustomInputForm
                            name={'gsm'}
                            placeholder={'GSM'}
                            returnKeyType={'done'}
                            keyboardType={'phone-pad'}
                            maxLength={10}
                            errorMessage={this.state.errorMessageGSM}
                            setRef={this.setRef}
                            onChangeText={phone => this.setState({phone})}
                            onSubmitEditing={() => this.controlRegisterForm()}
                        />
                        <View style={styles.switchView}>
                            <View style={styles.switchItem}>
                                <Text>
                                    <Text style={{color: 'orange'}}>Üyelik Sözleşmesini </Text>
                                    okudum, onaylıyorum
                                </Text>
                                <Switch
                                    onValueChange={this.toggleSwitchAgreement}
                                    value={this.state.switchValueAgreement}
                                    trackColor={{true: colors.switchTrackColor}}
                                    thumbColor={
                                        this.state.switchValueAgreement
                                            ? colors.orange
                                            : colors.switchThumbColor
                                    }
                                />
                            </View>
                            <View style={styles.switchItem}>
                                <Text>Kampanyalardan SMS ile haberdar ol</Text>
                                <Switch
                                    onValueChange={this.toggleSwitchSMS}
                                    value={this.state.switchValueSMS}
                                    trackColor={{true: colors.switchTrackColor}}
                                    thumbColor={
                                        this.state.switchValueSMS
                                            ? colors.orange
                                            : colors.switchThumbColor
                                    }
                                />
                            </View>
                            <View style={styles.switchItem}>
                                <Text>Kampanyalardan E-Posta ile haberdar ol</Text>
                                <Switch
                                    onValueChange={this.toggleSwitchEmail}
                                    value={this.state.switchValueEmail}
                                    trackColor={{true: colors.switchTrackColor}}
                                    thumbColor={
                                        this.state.switchValueEmail
                                            ? colors.orange
                                            : colors.switchThumbColor
                                    }
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.buttonRegister}
                            onPress={() => {
                                this.controlRegisterForm();
                            }}>
                            <Text style={styles.buttonRegisterText}>Kayıt Ol</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
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
    switchView: {
        margin: 10,
        flex: 1,
    },
    switchItem: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonRegister: {
        alignItems: 'center',
        backgroundColor: colors.buttonRegister,
        paddingVertical: 10,
        margin: 10,
        borderRadius: 5,
        elevation: 2,
        borderColor: colors.buttonBorder,
    },
    buttonRegisterText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 18,
    },
});

export default Register;
