import React, {Fragment} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import ProductInfo from '../Components/Products/ProductDetail/ProductInfo';
import DoughSelection from '../Components/Products/ProductDetail/DoughSelection';
import AddToBasketButton from '../Components/Products/ProductDetail/AddToBasketButton';
import {httpClient} from '../HttpClient/HttpClient';
import {connect} from 'react-redux';
import Indicator from '../../src/Components/Indicator';
import CampaingsProductInfo from '../Components/Products/ProductDetail/CampaingsProductInfo';
import PizzaSelection2 from '../Components/Products/ProductDetail/PizzaSelection2';
import {showMessage} from 'react-native-flash-message';


class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productDetail: [],
            productDetailOptions: [],
        };
    }


    componentDidMount() {
        const url = (this.props.navigation.state.params.link).split('/');
        const productType = (this.props.navigation.state.params.productType);
        if (productType === 'Kampanyalar') {
            this.getDataCampaigns(url[3]);
        } else {
            this.getDataPizza(url[3], url[4]);
        }
    }

    getDataPizza = (size, name) => {
        httpClient
            .get('/web/Product/GetProductDetails?Name=' + name + '&Size=' + size + '&existingOrderId=' + this.props.existingOrderId)
            .then(res => {
                this.props.productDetailDelete();
                this.props.productDetailData(res.data.result);

                this.setState({
                    productDetail: res.data.result,
                });
            });

    };

    getDataCampaigns = (name) => {
        httpClient
            .get('/web/Product/GetProductDetails?Name=' + name + '&existingOrderId=' + this.props.existingOrderId)
            .then(res => {
                this.props.productDetailDelete();
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
                            {this.state.productDetail.productType === 'Kampanyalar' ?

                                <Fragment>
                                    <CampaingsProductInfo navigation={this.props.navigation}/>
                                    {this.props.productDetail.options.map((data) => (
                                            <View style={{flex: 1}} key={data.id}><PizzaSelection2
                                                productDetail2 = {this.state.productDetail}
                                                data={data}
                                                id={data.id}
                                                name={data.name}/></View>
                                        ),
                                    )}
                                </Fragment>
                                :
                                <Fragment>
                                    <ProductInfo navigation={this.props.navigation}/>
                                    <DoughSelection productDetail={this.state.productDetail}/>
                                </Fragment>
                            }
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
        productDetail: state.ProductDetailDataReducer.data,
        productCampaignDetail: state.ProductDetailDataReducer.campaignDetailData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        productDetailData: (data) => dispatch({type: 'PRODUCT_DETAIL_DATA', payload: data}),
        productDetailDelete: () => dispatch({type: 'PRODUCT_DETAIL_DATA_DELETE'}),
        productCampaignDetailData: (data) => dispatch({type: 'PRODUCT_CAMPAIGN_DATA', payload: data}),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductDetail);
