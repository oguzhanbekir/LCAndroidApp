import React, {Fragment} from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';

import {httpClient} from '../../HttpClient/HttpClient';
import Carousel from 'react-native-snap-carousel';
import {colors} from '../../config/colors';

import {connect} from 'react-redux';

//const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const horizontalMargin = 5;
const slideWidth = 350;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth - horizontalMargin * 2;
const itemHeight = 200;
const arr = [];

class MainPageForYou extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      currentIndex: 0,
    };
  }

  changeIndex = currentIndex => {
    this.setState({currentIndex});
    console.log(this.state.currentIndex);
  };

  getIndex(currentIndex) {
    return arr.findIndex(obj => obj.currentIndex === currentIndex);
  }

  _renderItem({item, index}) {
    return (
      <View style={{width: itemWidth, height: itemHeight}}>
        <Image style={styles.image} source={{uri: item.imageUrl}} />
      </View>
    );
  }

  componentDidMount() {
    const dataMainPageCampaigns = [];
    httpClient.get('/web/Product/GetMainPageCampaigns').then(res => {
      res.data.result.map(data => {
        const value = data.price.price.toFixed(2);
        dataMainPageCampaigns.push({
          id: data.id,
          name: data.name,
          imageUrl: data.image,
          price: value,
        });
      });
      this.setState({
        data: dataMainPageCampaigns,
      });
    });
  }

  render() {
    return (
      <View style={styles.subTopContainer}>
        <View style={styles.container}>
          <Text style={styles.textLeft}>Kampanyalar</Text>
          <Text
            style={styles.textRight}
            onPress={() => this.props.navigation.navigate('Products')}>
            TÜMÜNÜ GÖR
          </Text>
        </View>
        <View style={{flex: 1}}>
          {this.state.data.length > 0 && (
            <Fragment>
              <Carousel
                ref={carousel => {
                  this.carousel = carousel;
                }}
                onSnapToItem={slideIndex => {
                  this.setState({
                    currentIndex: slideIndex,
                  });
                }}
                data={this.state.data}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                enableMomentum={true}
                itemWidth={itemWidth}
              />
              <Text style={{paddingLeft: 10, fontSize: 16, fontWeight: '600'}}>
                {this.state.data[this.state.currentIndex].name}
              </Text>
              <Text
                style={{
                  paddingLeft: 10,
                  fontSize: 14,
                  fontWeight: '800',
                  color: 'dimgray',
                }}>
                {'₺' + this.state.data[this.state.currentIndex].price}
              </Text>
            </Fragment>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  subTopContainer: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  textLeft: {
    fontSize: 18,
    fontWeight: '600',
  },
  textRight: {
    color: colors.orange,
    fontWeight: '300',
    fontSize: 15,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    durum: state.AuthReducer.loggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //degistir: () => dispatch({type: 'LOAD_HOME', payload: 'false'}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainPageForYou);
