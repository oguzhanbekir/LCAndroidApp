import * as React from 'react';
import {View, StyleSheet, Dimensions, Text, Button} from 'react-native';
import {TabView , TabBar} from 'react-native-tab-view';

import Campaigns from './TabView/Campaigns';
import Pizzas from './TabView/Pizzas';
import ByProducts from './TabView/ByProducts';
import Favourites from './TabView/Favourites';
import {connect} from 'react-redux';


class TopTabView extends React.Component {
    state = {
        index: 0,
        routes: [
            {key: 'campaigns', title: 'KAMPANYALAR'},
            {key: 'pizzas', title: 'PIZZALAR'},
            {key: 'byproducts', title: 'YAN ÜRÜNLER'},
            {key: 'favourites', title: 'FAVORİLER'},
        ],
    };

    componentDidMount() {
        this.props.navigation.setParams({
            swipeIndex: this.props.swipeIndex.index,
        });
    }

    changeIndex = (index) => {
        if (this.props.loggedIn) {
            this.setState({
                index: index,
            });
        }
        this.props.changeIndex(index);
        this.props.navigation.setParams({
            swipeIndex: index,
        });
    };
    _renderTabView = ({route}) => {
        switch (route.key) {
            case 'campaigns':
                return <Campaigns/>;
            case 'pizzas':
                return <Pizzas navigation={this.props.navigation} />;
            case 'byproducts':
                return <ByProducts/>;
            case 'favourites':
                return <Favourites/>;
            default:
                return null;
        }
    };


    _renderTabBar = props =>
        <TabBar
            {...props}
            scrollEnabled={true}
            indicatorStyle={{backgroundColor: 'white'}}
            tabStyle={{width: 'auto'}}
            style={{backgroundColor: 'black'}}
            onTabLongPress={(scene) => {
                const { route } = scene
                props.jumpTo(route.key)
            }}
        />;

    render() {
        return (
            <TabView
                lazy
                swipeEnabled={true}
                navigationState={this.props.loggedIn ? this.state : this.props.swipeIndex}
                renderScene={this._renderTabView}
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
        swipeIndex: state.FilterProductReducer,
        loggedIn: state.AuthReducer.loggedIn,
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
