import React, {Fragment} from 'react';
import {View, StyleSheet, Image, Text, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

class CampaingsProductInfo extends React.Component {
    render() {

        return (
            <Fragment>
                <Text>{this.props.productDetail.name}</Text>
                <Image source={{uri: this.props.productDetail.image}}
                       style={{height: 250}}
                />
                <View style={{padding: 15, backgroundColor: '#fff'}}>
                    <View style={styles.titleContainer}>
                        <View style={{width:250}}>
                            <Text numberOfLines={1} style={styles.titleName}>{this.props.productDetail.name}</Text>
                        </View>
                        <Text
                            style={styles.titlePrice}>{'₺' + ((this.props.productDetail.price.price + this.props.totalIngredient + this.props.doughSelection) * this.props.counterPizza).toFixed(2)}</Text>
                    </View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        <Text style={styles.titleDetail}>{this.props.productDetail.detail}</Text>
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
        fontSize: 21,
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
)(CampaingsProductInfo);
