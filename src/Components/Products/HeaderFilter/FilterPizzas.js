import React, {Fragment} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';

import {httpClient} from '../../../HttpClient/HttpClient';
import Indicator from '../../Indicator';
import {colors} from '../../../config/colors';
import {connect} from 'react-redux';

class PizzasFilter extends React.Component {
    state = {pizzasData: []};

    componentDidMount() {
        httpClient.get('/web/Product/GetDepartments').then(res => {
            res.data.result.map(data => {
                if (data.name === 'Pizzalar') {
                    this.setState({
                        pizzasData: [...data.subCategories, {
                            id: '107270280018',
                            name: 'Hepsi',
                            orderIndex: -1,
                        }].sort(function (a, b) {
                            return parseInt(a.orderIndex) - parseInt(b.orderIndex);
                        }),
                    });
                }
            });
        });
    }

    FlatListItemSeparator = () => {
        return (
            //Item Separator
            <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
        );
    };
    _renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <TouchableOpacity
                    disabled={this.props.filterId === item.id}
                    onPress={() => this.selectionOnPressFilter(item.id)}
                >
                    <Text style={
                        this.props.filterId === item.id
                            ? styles.itemSelectedDetail
                            : styles.itemDetail
                    }>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    selectionOnPressFilter(id) {
        this.props.changeFilterId(id);
        this.getData(id, this.props.sizeId);
        this.props.navigation.close();
    }

    getData = (categoryId, sizeId) => {
        console.log(categoryId+"  "+sizeId)
        this.props.changeDataDelete();
        httpClient
            .post('/web/Product/GetProducts', {
                CategoryId: categoryId,
                Size: sizeId,
            })
            .then(res => {
                this.props.changeData(res.data.result, sizeId);
            });
    };

    render() {
        return (
            <Fragment>
                {this.state.pizzasData.length > 0 ?
                    <Fragment>
                        <Text style={styles.title}>Filtrele</Text>
                        <FlatList
                            data={this.state.pizzasData}
                            renderItem={this._renderItem}
                            keyExtractor={item => item.id}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            extraData={this.props.filterId}
                        />
                    </Fragment>
                    : <Indicator/>}
            </Fragment>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 10,
        paddingLeft: 15,
    },
    itemDetail: {
        paddingTop: 5,
        fontSize: 15,
        fontWeight: '600',
        color: 'dimgray',
    },
    itemSelectedDetail: {
        paddingTop: 5,
        fontSize: 15,
        fontWeight: '600',
        color: colors.orange,
    },
    title: {
        padding: 10,
        paddingLeft: 15,
        fontSize: 20,
        fontWeight: '800',
    },
});

const mapStateToProps = state => {
    return {
        filterId: state.FilterPizzasIdReducer.id,
        sizeId: state.FilterPizzasDataReducer.size,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeFilterId: (id) => (
            dispatch({type: 'FILTER_PIZZAS', payload: id})
        ),
        changeData: (data, sizeId) => (
            dispatch({type: 'FILTER_PIZZAS_DATA', payload: data, pizzaSize:sizeId})
        ),
        changeDataDelete: () => (
            dispatch({type: 'FILTER_PIZZAS_DATA_DELETE'})
        ),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PizzasFilter);
