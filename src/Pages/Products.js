import React from 'react'
import { Text, View, StyleSheet } from 'react-native';

import TopTabView from '../Components/Products/TopTabView'

class Products extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <TopTabView />
            </View>
        )
    }
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F0F0F0'
    }
  });

export default Products;