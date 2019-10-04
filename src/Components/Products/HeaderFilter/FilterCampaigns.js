import React, {Fragment} from 'react';
import {View, StyleSheet, Text, SafeAreaView, FlatList, Image, TouchableOpacity} from 'react-native';

import {httpClient} from '../../../HttpClient/HttpClient';
import Indicator from '../../Indicator';
import {colors} from '../../../config/colors';
import {connect} from 'react-redux';


class FilterCampaigns extends React.Component {
    state = {
        campaignData: [],
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

    componentDidMount() {
        httpClient.get('/web/Product/GetDepartments').then(res => {
            res.data.result.map(data => {
                if (data.name === 'Kampanyalar') {
                    this.setState({
                        campaignData: [...data.subCategories, {
                            id: '102471991065',
                            name: 'Hepsi',
                            orderIndex: -1,
                        }].sort(function (a, b) {
                            return parseInt(a.orderIndex) - parseInt(b.orderIndex);
                        })
                    });
                }
            });

        })
    }

    selectionOnPressFilter(id) {
        // alert(filterButtonType)
        this.props.changeFilterId(id)
        this.getData(id)
        this.props.navigation.close();
    }

    getData = (updateState) => {
        this.props.changeDataDelete()
        httpClient
            .post('/web/Product/GetProducts', {
                CategoryId: updateState,
            })
            .then(res => {
                this.props.changeData(res.data.result)
            })
    }

    FlatListItemSeparator = () => {
        return (
            //Item Separator
            <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
        );
    };

    render() {
        return (
            <Fragment>
                {this.state.campaignData.length > 0 ?
                    <Fragment>
                        <Text style={styles.title}>Filtrele</Text>
                        <FlatList
                            data={this.state.campaignData}
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
        filterId: state.FilterCampaignsIdReducer.id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeFilterId: (id) => (
            dispatch({type: 'FILTER_CAMPAIGNS', payload: id})
        ),
        changeData: (data) => (
            dispatch({type: 'FILTER_CAMPAIGNS_DATA', payload: data})
        ),
        changeDataDelete: () => (
            dispatch({type: 'FILTER_CAMPAIGNS_DATA_DELETE'})
        ),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FilterCampaigns);
