import React, {Fragment} from 'react';
import {Text, View, StyleSheet, TouchableOpacity,Button} from 'react-native';

import TopTabView from '../Components/Products/TopTabView';
import FilterCampaigns from '../Components/Products/HeaderFilter/FilterCampaigns';
import FilterPizzas from '../Components/Products/HeaderFilter/FilterPizzas';

import {connect} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';

const headerFilter='FİLTRELE';

class Products extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          filterId: '102471991065'
      };
  }

    componentDidMount(){
        this.props.navigation.setParams({bottomSheet: this.RBSheet});
    }

  static navigationOptions = ({ navigation }) => {
    if(navigation.getParam('swipeIndex') < 2){
      return{
        headerRight: (
            <TouchableOpacity
                onPress={() => {
                    navigation.getParam('bottomSheet').open();
                }}>
              <Text style={{paddingRight: 10}}>{headerFilter}</Text>
            </TouchableOpacity>
        ),
      }
    }
  };

  updateState = (id) => {
        this.setState({
            filterId: id
        });
    }
  render() {
    return (
      <View style={styles.container}>
        <TopTabView updateState={this.state.filterId} navigation={this.props.navigation}/>
        <RBSheet
            closeOnDragDown={true}
            animationType={'fade'}
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={400}
            duration={250}
            customStyles={{
              container: {
                justifyContent: "center",
              }
            }}
        >
          {this.props.swipeIndex == "0" ?
              <FilterCampaigns navigation={this.RBSheet} /> : <FilterPizzas navigation={this.RBSheet}/>
          }
        </RBSheet>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
});

const mapStateToProps = state => {
  return {
    swipeIndex: state.FilterProductReducer.index
  };
};


export default connect(
    mapStateToProps,
)(Products);
