import React, {Fragment} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import ProductInfo from '../Components/Products/ProductDetail/ProductInfo';
import DoughSelection from '../Components/Products/ProductDetail/DoughSelection';
import AddToBasketButton from '../Components/Products/ProductDetail/AddToBasketButton';
import {httpClient} from '../HttpClient/HttpClient';
import {connect} from 'react-redux';
import Indicator from '../../src/Components/Indicator';

class ProductDetail extends React.Component {
    state = {
        productDetail: [],
    };

    componentDidMount() {
        const url = (this.props.navigation.state.params.id).split('/');
        this.getData(url[3], url[4]);
    }

    getData = (size, name) => {
        httpClient
            .get('/web/Product/GetProductDetails?Name=' + name + '&Size=' + size + '&existingOrderId=' + this.props.existingOrderId)
            .then(res => {
                this.props.productDetailData(res.data.result);
                this.setState({
                    productDetail: res.data.result,
                });
            });
    };

    render() {

        return (
            <View style={styles.container}>
                {this.state.productDetail != '' ?
                    <Fragment>
                        <ScrollView>
                            <ProductInfo navigation={this.props.navigation}/>
                            <DoughSelection/>
                        </ScrollView>
                        <AddToBasketButton/>
                    </Fragment> : <Indicator/>}
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
        existingOrderId: state.GetBasketReducer.id,
        productDetail:state.ProductDetailDataReducer.data,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        productDetailData: (data) => dispatch({type: 'PRODUCT_DETAIL_DATA', payload: data}),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductDetail);
