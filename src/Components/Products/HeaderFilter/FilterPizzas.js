import React, {Fragment} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';

import {httpClient} from '../../../HttpClient/HttpClient';
import Indicator from '../../Indicator';
import {colors} from '../../../config/colors';

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
                        })
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
         alert(id)
      /*  this.props.changeFilterId(id)
        this.getData(id)
        this.props.navigation.close();*/
    }
    render() {
        console.log(this.state.pizzasData)
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

export default PizzasFilter;
