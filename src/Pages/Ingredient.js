import React from 'react';
import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {connect} from 'react-redux';

const _renderItem = ({id, name, quantity, defaultQuantity, changeQuantity}) => {
    return (
        <View style={styles.item}>
            <Text style={quantity === 0 && defaultQuantity !== 0 ? styles.titleDetailStrike :
                defaultQuantity !== 0 && quantity === 2 ? styles.titleDetailColor
                    : defaultQuantity === 0 && quantity > 0 ? styles.titleDetailColor : styles.titleDetail
            }>{defaultQuantity !== 0 && quantity === 0 ? name : defaultQuantity === 0 && quantity === 0 ? name : quantity + 'x ' + name}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 80}}>
                <TouchableOpacity
                    disabled={(defaultQuantity !== 0 && quantity === 0) || (defaultQuantity === 0 && quantity === 0)}
                    style={styles.itemButton}
                    onPress={() => changeQuantity(id, 'subtraction')}
                >
                    <Text style={{fontSize: 30, fontWeight: '500'}}>{'-'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={(defaultQuantity !== 0 && quantity === 2) || (defaultQuantity === 0 && quantity === 2)}
                    style={styles.itemButton}
                    onPress={() => changeQuantity(id, 'addition')}
                >
                    <Text style={{fontSize: 20, fontWeight: '500'}}>{'+'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const FlatListItemSeparator = () => {
    return (
        //Item Separator
        <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
    );
};
const RenderList = ({data, changeQuantity}) => {
    return (
        <View style={{
            flex: 1, justifyContent: 'center',
        }}>
            {data.length ?
                <FlatList
                    data={data}
                    renderItem={({item}) => <_renderItem id={item.id} name={item.name} quantity={item.quantity}
                                                         defaultQuantity={item.defaultQuantity}
                                                         changeQuantity={changeQuantity}/>}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    extraData={data}
                /> :
                <Text style={{fontSize: 20, alignSelf: 'center'}}>Bu pizza için hiç malzeme bulamadık</Text>
            }

        </View>);
};

class Ingredient extends React.Component {
    state = {
        index: 0,
        routes: [
            {key: 'mypizza', title: 'PİZZAMDAKİ MALZEMELER'},
            {key: 'extra', title: 'EKSTRA MALZEMELER'},
        ],
        items: this.props.productDetail,
        totalPrice: this.props.totalIngredient,
    };

    extraOrPizzaIngredient(index) {
        return this.state.items.options[1].items.filter(data => data.defaultQuantity !== index);
    };

    changeQuantity = (id, operation) => {
        const productDetail = this.state.items.options[1].items.find(data => data.id === id);
        if (operation === 'subtraction') {
            {
                productDetail.defaultQuantity !== 0 ?
                    this.setState(prevState => ({
                        totalPrice: Math.abs(this.state.totalPrice - (productDetail.price.price * (productDetail.quantity - 1))),
                        items: {
                            ...prevState.items,
                            options: [{...prevState.items.options[0]}, {
                                ...prevState.items.options[1],
                                items: prevState.items.options[1].items.map(
                                    data => data.id === productDetail.id ? {
                                        ...data,
                                        quantity: productDetail.quantity - 1,
                                    } : data,
                                ),
                            },
                            ],
                        },
                    }))
                    : productDetail.quantity > 0 &&
                    this.setState(prevState => ({
                        items: {
                            ...prevState.items,
                            options: [{...prevState.items.options[0]}, {
                                ...prevState.items.options[1],
                                items: prevState.items.options[1].items.map(
                                    data => data.id === productDetail.id ? {
                                        ...data,
                                        quantity: productDetail.quantity - 1,
                                    } : data,
                                ),
                            },
                            ],
                        },
                        totalPrice: Math.abs(this.state.totalPrice - productDetail.price.price),
                    }));
            }
        } else if (operation === 'addition') {
            {
                productDetail.defaultQuantity !== 0 && productDetail.quantity < 2 ?
                    this.setState(prevState => ({
                        items: {
                            ...prevState.items,
                            options: [{...prevState.items.options[0]}, {
                                ...prevState.items.options[1],
                                items: prevState.items.options[1].items.map(
                                    data => data.id === productDetail.id ? {
                                        ...data,
                                        quantity: productDetail.quantity + 1,
                                    } : data,
                                ),
                            },
                            ],
                        },
                        totalPrice: this.state.totalPrice + (productDetail.price.price * productDetail.quantity),
                    }))
                    :
                    productDetail.defaultQuantity === 0 &&
                    this.setState(prevState => ({
                        items: {
                            ...prevState.items,
                            options: [{...prevState.items.options[0]}, {
                                ...prevState.items.options[1],
                                items: prevState.items.options[1].items.map(
                                    data => data.id === productDetail.id ? {
                                        ...data,
                                        quantity: productDetail.quantity + 1,
                                    } : data,
                                ),
                            },
                            ],
                        },
                        totalPrice: this.state.totalPrice + productDetail.price.price,
                    }));
            }
        }
    };


    _renderTabView = ({route}) => {
        switch (route.key) {
            case 'mypizza':
                return <RenderList changeQuantity={this.changeQuantity} data={this.extraOrPizzaIngredient(0)}/>;
            case 'extra':
                return <RenderList changeQuantity={this.changeQuantity} data={this.extraOrPizzaIngredient(1)}/>;
            default:
                return null;
        }
    };

    _renderTabBar = props =>
        <TabBar
            {...props}
            indicatorStyle={{backgroundColor: 'white'}}
            onTabLongPress={(scene) => {
                const {route} = scene;
                props.jumpTo(route.key);
            }}
            style={{backgroundColor: 'black'}}
        />;

    apply() {
        this.props.navigation.state.params.updateData();
        this.props.productDetailUpdate(this.state.items, this.state.totalPrice);
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <TabView
                    lazy
                    swipeEnabled={true}
                    navigationState={this.state}
                    renderScene={this._renderTabView}
                    initialLayout={{width: Dimensions.get('window').width}}
                    onIndexChange={index => this.setState({index})}
                    renderTabBar={this._renderTabBar}
                />
                <View style={styles.containerButton}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.applyText}>{'+ ₺' + this.state.totalPrice.toFixed(2)}</Text>
                    </View>
                    <View style={{borderLeftWidth: 1, borderLeftColor: 'white'}}/>
                    <View style={styles.rightContainer}>
                        <TouchableOpacity style={{padding: 10}} onPress={() => this.apply()}>
                            <Text style={styles.applyText}>{'Uygula'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    containerButton: {
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    applyText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '400',
    },
    item: {
        flex: 1,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemButton: {
        width: 35,
        height: 30,
        backgroundColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        elevation: 2,
    },
    titleDetail: {
        fontSize: 15,
        fontWeight: '700',
    },
    titleDetailStrike: {
        fontSize: 15,
        fontWeight: '700',
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    titleDetailColor: {
        fontSize: 15,
        color: 'orange',
        fontWeight: '700',
    },
});

const mapStateToProps = state => {
    return {
        productDetail: state.ProductDetailDataReducer.data,
        totalIngredient: state.ProductDetailDataReducer.totalIngredient,
        counterPizza: state.ProductDetailDataReducer.counterPizza,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        productDetailUpdate: (data, totalPrice) => dispatch({
            type: 'PRODUCT_DETAIL_DATA',
            payload: data,
            totalIngredient: totalPrice,
        }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Ingredient);
