import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';

import {colors} from '../config/colors';
import Swiper from 'react-native-swiper';

const firstSwiperTitle = 'Hoş Geldin';
const firstSwiperText =
  "Türkiye'nin ilk nefis kenar pizzasının mucidi Little Caesars'ın Android uygulaması";
const secondSwiperTitle = 'Hızlı Üyelik';
const secondSwiperText =
  'Kolayca profilini oluşturup, dilediğin Sezar lezzetine ulaşabilirsin';
const thirdSwiperTitle = 'Kolay Sipariş';
const thirdSwiperText =
  'İster son siparişini ister önceki siparişlerini tekrar ederek kolayca sipariş verebilirsin';

class DirectionMain extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={{height: 150, width: '100%'}}
          source={require('../images/lc_directionPage.png')}
        />
        <View style={styles.wrapper}>
          <Swiper
            activeDot={
              <View
                style={{
                  backgroundColor: 'gray',
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            }>
            <View style={styles.slide}>
              <Text style={styles.swiperTitle}>{firstSwiperTitle}</Text>
              <Text style={styles.swiperText}>{firstSwiperText}</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.swiperTitle}>{secondSwiperTitle}</Text>
              <Text style={styles.swiperText}>{secondSwiperText}</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.swiperTitle}>{thirdSwiperTitle}</Text>
              <Text style={styles.swiperText}>{thirdSwiperText}</Text>
            </View>
          </Swiper>
        </View>
        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.buttonRegisterText}>Kayıt Ol</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.buttonLoginText}>Giriş Yap</Text>
        </TouchableOpacity>
        <View style={styles.skipText}>
          <TouchableOpacity
            style={styles.buttonSkip}
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text>ŞİMDİLİK GEÇ</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: colors.background,
  },
  buttonLogin: {
    alignItems: 'center',
    backgroundColor: colors.buttonLogin,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 2,
    borderColor: colors.buttonBorder,
  },
  buttonRegister: {
    alignItems: 'center',
    backgroundColor: colors.buttonRegister,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 2,
    borderColor: colors.buttonBorder,
  },
  buttonSkip: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
  },
  buttonRegisterText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  buttonLoginText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 18,
  },
  skipText: {
    marginTop: 20,
    alignItems: 'center',
  },
  wrapper: {
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperText: {
    color: '#000',
    fontSize: 17,

    textAlign: 'center',
  },
  swiperTitle: {
    color: '#000',
    fontSize: 20,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
});

export default DirectionMain;
