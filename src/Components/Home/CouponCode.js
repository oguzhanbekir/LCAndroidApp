import React from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

class CouponCode extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../Images/hm-coupon-code.png')}
                    style={styles.backgroundImage}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            width: 200,
                            paddingLeft: 10,
                        }}>
                        <Text style={{color: '#fff', fontSize: 20, fontWeight: '800'}}>
                            Kupon Kodu Kullan
                        </Text>
                        <Text style={{color: '#fff', fontSize: 13}}>
                            Kazandığın kupon koudunu buraya girerek avantajlı ürünlerden
                            yararlanabilirsin
                        </Text>
                        <View style={{flexDirection: 'row', marginVertical: 15}}>
                            <TextInput
                                style={styles.inputContainer}
                                underlineColorAndroid="transparent"
                                placeholder="Kupon Kodun"
                                placeholderTextColor="gray"
                                autoCapitalize="none"
                            />
                            <TouchableOpacity style={styles.buttonSubmit}>
                                <Text style={{color: 'white'}}> Gönder</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    inputContainer: {
        backgroundColor: '#fff',
        padding: 5,
        height: 50,
        width: 150,
        marginRight: 5,
    },
    buttonSubmit: {
        backgroundColor: '#000',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 50,
    },
});

export default CouponCode;
