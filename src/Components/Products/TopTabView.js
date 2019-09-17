import * as React from 'react';
import { View, StyleSheet, Dimensions, Fragment  } from 'react-native';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';

import TabViewCampaigns from './TabView/Campaigns'
import TabViewPizzas from './TabView/Pizzas'
import ByProducts from './TabView/ByProducts'

const FirstRoute = () => (
  <TabViewCampaigns />
);
 
const SecondRoute = () => (
  <TabViewPizzas />
);
const ThirdRoute = () => (
  <ByProducts />
);

 class TopTabView extends React.Component {
    state = {
      index: 0,
      routes: [
        { key: 'campaigns', title: 'KAMPANYALAR' },
        { key: 'pizzas', title: 'PIZZALAR' },
        { key: 'byproducts', title: 'YAN ÜRÜNLER' },
      ],
    };
    
   
    render() {
      return (
        <TabView
          swipeEnabled={true}      
          navigationState={this.state}
          renderScene={SceneMap({
            campaigns: FirstRoute,
            pizzas: SecondRoute,
            byproducts: ThirdRoute,
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={(props) =>
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: 'white' }}
              style={{backgroundColor: "black"}}
            />
          }
        />
      );
    }
  }
   
  const styles = StyleSheet.create({
    container: {
      backgroundColor:'red'
    },
    scene: {
      flex: 1,
    },
  });

  export default TopTabView;