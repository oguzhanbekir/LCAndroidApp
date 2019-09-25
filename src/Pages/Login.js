import React from 'react'
import { 
    Text, 
    View,
    StyleSheet, 
} from 'react-native';

import { Input } from 'react-native-elements';
import { colors } from '../config/colors'

class Login extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <Input
                        placeholder='E-Posta'
                    />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Hesabın yok mu? </Text>
                    <Text style={styles.footerTextLink}>HEMEN KAYIT OL</Text>
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
        fontSize:17,
        color:colors.orange,
    }
})
export default Login;