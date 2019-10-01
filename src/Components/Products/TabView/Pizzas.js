import React, {Fragment} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';

import {httpClient} from '../../../HttpClient/HttpClient';
import {Icon} from 'react-native-elements';

class Pizzas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: [], selectedButton: 'MEDIUM'};
    this.selectionOnPress = this.selectionOnPress.bind(this);
  }

  selectionOnPress(buttonType) {
    this.setState({selectedButton: buttonType});
    if (buttonType == 'SMALL') {
      httpClient
        .post('/web/Product/GetProducts', {
          CategoryId: '107270280018',
          Size: '101745413708',
        })
        .then(res => {
          this.setState({
            data: res.data.result,
          });
        });
    } else if (buttonType == 'MEDIUM') {
      httpClient
        .post('/web/Product/GetProducts', {
          CategoryId: '107270280018',
          Size: '100049097560',
        })
        .then(res => {
          this.setState({
            data: res.data.result,
          });
        });
    } else if (buttonType == 'LARGE') {
      httpClient
        .post('/web/Product/GetProducts', {
          CategoryId: '107270280018',
          Size: '107174060862',
        })
        .then(res => {
          this.setState({
            data: res.data.result,
          });
        });
    }
  }

  componentDidMount() {
    //TabView Pizzalar
    httpClient
      .post('/web/Product/GetProducts', {
        CategoryId: '107270280018',
        Size: '100049097560',
      })
      .then(res => {
        this.setState({
          data: res.data.result,
        });
      });
  }

  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}} />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          {this.state.data.length > 0 && (
            <Fragment>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 5,
                }}>
                <TouchableOpacity
                  style={
                    this.state.selectedButton === 'SMALL'
                      ? styles.buttonPress
                      : styles.button
                  }
                  onPress={() => this.selectionOnPress('SMALL')}>
                  <Icon
                    size={17}
                    color={
                      this.state.selectedButton === 'SMALL' ? '#fff' : 'gray'
                    }
                    name="pie-chart"
                    type="feather"
                  />
                  <Text
                    style={
                      this.state.selectedButton === 'SMALL'
                        ? styles.buttonPressText
                        : styles.buttonText
                    }>
                    {' '}
                    Küçük
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    this.state.selectedButton === 'MEDIUM'
                      ? styles.buttonPress
                      : styles.button
                  }
                  onPress={() => this.selectionOnPress('MEDIUM')}>
                  <Icon
                    size={17}
                    color={
                      this.state.selectedButton === 'MEDIUM' ? '#fff' : 'gray'
                    }
                    name="pie-chart"
                    type="feather"
                  />
                  <Text
                    style={
                      this.state.selectedButton === 'MEDIUM'
                        ? styles.buttonPressText
                        : styles.buttonText
                    }>
                    {' '}
                    Orta
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    this.state.selectedButton === 'LARGE'
                      ? styles.buttonPress
                      : styles.button
                  }
                  onPress={() => this.selectionOnPress('LARGE')}>
                  <Icon
                    size={17}
                    color={
                      this.state.selectedButton === 'LARGE' ? '#fff' : 'gray'
                    }
                    name="pie-chart"
                    type="feather"
                  />
                  <Text
                    style={
                      this.state.selectedButton === 'LARGE'
                        ? styles.buttonPressText
                        : styles.buttonText
                    }>
                    {' '}
                    Büyük
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={this.state.data}
                renderItem={({item}) => (
                  <View style={styles.item}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{height: 70, width: 120}}
                        source={{uri: item.image}}
                      />
                      <View style={{paddingLeft: 10, width: 230}}>
                        <Text style={styles.titleName}>{item.name}</Text>
                        <Text style={styles.titlePrice}>
                          {'₺' + item.price.price}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.titleDetail}>{item.detail}</Text>
                  </View>
                )}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={this.FlatListItemSeparator}
              />
            </Fragment>
          )}
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    paddingLeft: 15,
  },
  titleName: {
    fontSize: 16,
    fontWeight: '600',
  },
  titlePrice: {
    fontSize: 14,
    fontWeight: '800',
    color: 'dimgray',
  },
  titleDetail: {
    paddingTop: 5,
    fontSize: 10,
    fontWeight: '600',
    color: 'dimgray',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
    width: 125,
  },
  buttonText: {
    color: 'gray',
    fontSize: 15,
    fontWeight: '800',
  },
  buttonPress: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    width: 125,
  },
  buttonPressText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
});

export default Pizzas;
