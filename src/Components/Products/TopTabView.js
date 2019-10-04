import * as React from 'react';
import {View, StyleSheet, Dimensions, Text, Button} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import Campaigns from './TabView/Campaigns';
import Pizzas from './TabView/Pizzas';
import ByProducts from './TabView/ByProducts';
import {connect} from 'react-redux';


class TopTabView extends React.Component {

     componentDidMount() {
         this.props.navigation.setParams({
             swipeIndex: this.props.swipeIndex.index
         })
     }

    changeIndex=(index)=>{
        this.props.changeIndex(index)
        this.props.navigation.setParams({
            swipeIndex: index
        })
    };
     _renderTabView = ({route}) => {
            switch (route.key) {
             case 'campaigns':
                 return <Campaigns />;
             case 'pizzas':
                 return <Pizzas />;
             case 'byproducts':
                 return <ByProducts />;
             default:
                 return null;
         }
     };


    _renderTabBar = props =>
        <TabBar
            {...props}
            indicatorStyle={{backgroundColor: 'white'}}
            style={{backgroundColor: 'black'}}
    />;

  render() {
    return (
            <TabView
                lazy
                swipeEnabled={true}
                navigationState={this.props.swipeIndex}
                renderScene = {this._renderTabView}
                onIndexChange={index => (
                    this.changeIndex(index)
                )}
                initialLayout={{width: Dimensions.get('window').width}}
                renderTabBar={this._renderTabBar}
            />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
  scene: {
    flex: 1,
  },
});

const mapStateToProps = state => {
    return {
        swipeIndex: state.FilterProductReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeIndex: (swipeIndex) => (
            dispatch({type: 'SWIPE_TVIEW', payload: swipeIndex})
        ),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TopTabView);
