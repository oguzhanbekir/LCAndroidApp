import React, {Fragment} from 'react';
import {View, StyleSheet, Image, Text, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

class ProductInfo extends React.Component {
    state = {
        detail: true,
    };
    detailIngredient = () => {
        return this.props.productDetail.options[1].items.filter(data => data.defaultQuantity === 0 && data.quantity > 0);
    };

    detailIngredientDefault = () => {
        return this.props.productDetail.options[1].items.filter(data => data.defaultQuantity != 0);
    };

    updateData = () => {
        this.setState({
            detail: false,
        });
    };

    render() {
        const detailIngredient = this.detailIngredient();
        const detailIngredientDefault = this.detailIngredientDefault();
        return (
            <Fragment>
                <Image source={{uri: this.props.productDetail.image}}
                       style={{height: 250}}
                />
                <View style={{padding: 15, backgroundColor: '#fff'}}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleName}>{this.props.productDetail.name}</Text>
                        <Text
                            style={styles.titlePrice}>{'₺' + ((this.props.productDetail.price.price + this.props.totalIngredient + (this.props.doughSelection === 'Parmesan' || this.props.doughSelection === 'Nefis' ? this.props.productDetail.options[0].items.find(data => data.name === 'Parmesan Kenar').price.price : 0)) * this.props.counterPizza).toFixed(2)}</Text>
                    </View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        {this.state.detail ? <Text
                            style={styles.titleDetail}>{this.props.productDetail.detail}</Text> : detailIngredientDefault.map(function (data, index) {
                            return <Text key={data.id} style={styles.titleDetail}><Text
                                style={data.quantity === 0 ? styles.titleDetailStrike : styles.titleDetail}>{data.quantity > 1 ? data.quantity + 'x ' + data.name + ' [+ ₺' + data.price.price.toFixed(2) + ']' : data.name}</Text>{detailIngredient.length === 0 ? (index < detailIngredientDefault.length - 1 ? ', ' : '') : ', '}
                            </Text>;
                        })}
                        {detailIngredient.map(function (data, index) {
                            return <Text key={data.id}
                                         style={styles.titleDetail}>{data.quantity + 'x ' + data.name + ' [+ ₺' + data.price.price.toFixed(2) + ']' + (index < detailIngredient.length - 1 ? ', ' : '')}</Text>;
                        })}
                    </View>
                    <View style={{paddingTop: 20}}>
                        <TouchableOpacity
                            style={{padding: 10}}
                            onPress={() => this.props.navigation.navigate('Ingredient', {
                                name: 'from parent',
                                updateData: this.updateData,
                            })}
                        >
                            <Text style={styles.titleMaterial}>{'MALZEME EKLE/ÇIKAR'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    titleDetailStrike: {
        fontSize: 14,
        fontWeight: '400',
        color: 'gray',
        textDecorationLine: 'line-through',
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
        productDetail: state.ProductDetailDataReducer.data,
        totalIngredient: state.ProductDetailDataReducer.totalIngredient,
        counterPizza: state.ProductDetailDataReducer.counterPizza,
        doughSelection: state.ProductDetailDataReducer.doughSelection,
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
