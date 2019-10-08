import React, {Fragment} from 'react';
import {View, StyleSheet, Image, Text, FlatList, TouchableOpacity} from 'react-native';
import {httpClient} from '../../../HttpClient/HttpClient';
import {connect} from 'react-redux';
import Indicator from '../../Indicator';

class ProductInfo extends React.Component {
    state = {
        productDetail: [],
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const data = [];
        httpClient
            .get('/web/Product/GetProductDetails?Name=' + this.props.name + '&Size=' + this.props.size + '&existingOrderId=' + this.props.existingOrderId)
            .then(res => {
                data.push(res.data.result);
                this.setState({
                    productDetail: data,
                });
            });


    };

    render() {
        console.log(this.state.productDetail)
        return (
            <Fragment>
                {this.state.productDetail.length ?
                    <Fragment>
                        <Image source={{uri: this.state.productDetail[0].image}}
                               style={{height: 250}}
                        />
                        <View style={{padding: 15, backgroundColor: '#fff'}}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.titleName}>{this.state.productDetail[0].name}</Text>
                                <Text
                                    style={styles.titlePrice}>{'₺' + this.state.productDetail[0].price.price.toFixed(2)}</Text>
                            </View>
                            <View>
                                <Text style={styles.titleDetail}>{this.state.productDetail[0].detail}</Text>
                            </View>

                            <View style={{paddingTop: 20}}>
                                <TouchableOpacity
                                    style={{padding:10}}
                                    onPress={()=>this.props.navigation.navigate("Ingredient",{productDetail:this.state.productDetail})}
                                >
                                    <Text  style={styles.titleMaterial}>{'MALZEME EKLE/ÇIKAR'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Fragment> : <Indicator/>}
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleName: {
        fontSize: 23,
        fontWeight: '700',
    },
    titlePrice: {
        fontSize: 20,
        fontWeight: '700',
        color: 'dimgray',
    },
    titleDetail: {
        fontSize: 14,
        fontWeight: '400',
        color: 'dimgray',
    },
    titleMaterial: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        color: 'orange',
    },
});

const mapStateToProps = state => {
    return {
        existingOrderId: state.GetBasketReducer.id,
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
)(ProductInfo);
