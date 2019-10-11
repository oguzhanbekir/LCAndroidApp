import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {colors} from '../../config/colors';
import {Icon} from 'react-native-elements';

class LoginButton extends React.Component {
    state = {images: []};

    render() {
        const {state, navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={() => navigate('Login', {backHome: 'Home'})
                    }>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={styles.buttonLoginText}>Lütfen Giriş Yap veya Kayıt Ol</Text>
                        <Icon
                            size={25}
                            color={'gray'}
                            name="keyboard-arrow-right"
                            type="MaterialIcons"
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    buttonLogin: {
        backgroundColor: '#fff',
        padding: 10,
        elevation: 2,
    },
    buttonLoginText: {
        color: '#000',
        fontSize: 15,
    },
});

export default LoginButton;
