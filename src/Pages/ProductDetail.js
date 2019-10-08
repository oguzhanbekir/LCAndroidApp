import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import ProductInfo from '../Components/Products/ProductDetail/ProductInfo';
import DoughSelection from '../Components/Products/ProductDetail/DoughSelection';
import AddToBasketButton from '../Components/Products/ProductDetail/AddToBasketButton';

class ProductDetail extends React.Component {

    render() {
        const url = (this.props.navigation.state.params.id).split('/')

        return (
            <View style={styles.container}>
                <ScrollView>
                    <ProductInfo size={url[3]} name={url[4]} navigation={this.props.navigation}/>
                    <DoughSelection />
                </ScrollView>
                <AddToBasketButton />
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

export default ProductDetail;
