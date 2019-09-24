import React from 'react'
import { 
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';

import {colors} from '../config/colors'



class DirectionMain extends React.Component {
    state = { images: [1,2,3] };
    render() {
        return (
            <View style={styles.container}>
                <Image
                    resizeMode='contain'
                    style={{ height: 150, width: '100%' }}
                    source={require('../images/lc_directionPage.png')}
                />
                <TouchableOpacity
                    style= {styles.buttonLogin}
                    onPress= {() => this.props.navigation.navigate('Login')}
                >
                    <Text>Kayıt Ol</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style= {styles.buttonRegister}
                    onPress= {() => this.props.navigation.navigate('Register')}
                >
                    <Text>Giriş Yap</Text>
                </TouchableOpacity>
                <Text>ŞİMDİLİK GEÇ</Text>
            </View>
        )
    }
}
export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 50,
        backgroundColor: colors.directionMainBackground
      },
      buttonLogin: {
        alignItems: 'center',
        backgroundColor: colors.directionMainButtonLogin,
        paddingVertical:10,
        marginVertical: 5,
        borderRadius: 5,
        elevation: 2,
        borderColor: colors.directionMainButtonBorder,
        color:'#fff'
      },
      buttonRegister: {
        alignItems: 'center',
        backgroundColor: colors.directionMainButtonRegister,
        paddingVertical:10,
        marginVertical: 5,
        borderRadius: 5,
        elevation: 2,
        borderColor: colors.directionMainButtonBorder
      },
      swiperText: {
      //  fontSize: width * 0.5,
        textAlign: 'center'
      },
      child: {
     //   height: height * 0.5,
        width,
        justifyContent: 'center'
      },
})

export default DirectionMain;