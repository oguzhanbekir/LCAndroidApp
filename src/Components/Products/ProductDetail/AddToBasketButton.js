import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {httpClient} from '../../../HttpClient/HttpClient';

class AddToBasketButton extends React.Component {
    state = {
        items: this.props.productDetail,
    };

    subtractionPress() {
        {
            this.props.counterPizza > 1 &&
            this.props.counterPizzaUpdate(this.props.counterPizza - 1);
        }
    }

    additionPress() {
        {
            this.props.counterPizza > 0 &&
            this.props.counterPizzaUpdate(this.props.counterPizza + 1);
        }
    }

    afterSetStateFinished() {
        httpClient
            .post('/web/Product/CalculatePrice', {
                BasketItem: this.state.items,
                IncludeItemPrice: true,
            })
            .then(res => {
                alert(res.data)
                showMessage({
                    message: 'Ürün Sepete Eklendi, ',
                    type: 'info',
                    position: 'bottom',
                    backgroundColor: 'gray',
                    icon: 'success',
                    onPress: () => {
                        /* THIS FUNC/CB WILL BE CALLED AFTER MESSAGE PRESS */
                    },
                });
            });
    }

    addBasket() {
        this.setState({
            items: this.props.productDetail,
        });
        {
            this.props.doughSelection ?
                this.setState(prevState => ({
                    items: {
                        ...prevState.items,
                        quantity: this.props.counterPizza,
                        options: [{
                            ...prevState.items.options[0],
                            items: prevState.items.options[0].items.map(
                                data => data.name.split(' ')[0] === this.props.doughSelection ? {
                                    ...data,
                                    quantity: 1,
                                } : data,
                            ),
                        }, {...prevState.items.options[1]},
                        ],
                    },
                }), () => {
                    this.afterSetStateFinished();

                }) : showMessage({
                    message: 'Hamur Seçimi Eksik',
                    type: 'info',
                    position: 'bottom',
                    backgroundColor: 'red',
                    icon: 'info',
                });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <TouchableOpacity style={{padding: 8}} onPress={() => this.subtractionPress()}>
                        <Text style={styles.subText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.counterText}>{this.props.counterPizza}</Text>
                    <TouchableOpacity style={{padding: 8}} onPress={() => this.additionPress()}>
                        <Text style={styles.addText}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={{borderLeftWidth: 1, borderLeftColor: 'white'}}/>
                <View style={styles.rightContainer}>
                    <TouchableOpacity style={{padding: 10}} onPress={() => this.addBasket()}>
                        <Text style={styles.counterText}>Sepete Ekle</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        backgroundColor: 'orange',
        height: 50,
        margin: 5,
        padding: 5,
        borderRadius: 5,
        flexDirection: 'row',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addText: {
        fontSize: 30,
        color: '#fff',
    },
    subText: {
        fontSize: 40,
        color: '#fff',
    },
    counterText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '400',
    },
});

const mapStateToProps = state => {
    return {
        counterPizza: state.ProductDetailDataReducer.counterPizza,
        doughSelection: state.ProductDetailDataReducer.doughSelection,
        productDetail: state.ProductDetailDataReducer.data,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        counterPizzaUpdate: (counterPizza) => dispatch({type: 'PRODUCT_DETAIL_DATA_COUNTER', payload: counterPizza}),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddToBasketButton);
