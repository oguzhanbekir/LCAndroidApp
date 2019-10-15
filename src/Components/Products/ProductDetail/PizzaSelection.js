import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {Input, Icon} from 'react-native-elements';
import {TouchableOpacity, Text, View, StyleSheet, FlatList, Image} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

class PizzaSelection extends React.Component {
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
                    onPress={() => this.selectionPizza()}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <Image
                            style={{height: 70, width: 120}}
                            source={{uri: item.image}}
                        />
                        <View style={{paddingLeft: 10, width: 230}}>
                            <Text style={styles.titleName}>{item.name}</Text>
                        </View>
                    </View>
                    <Text style={styles.titleDetail}>{item.detail}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    selectionPizza() {
        alert('asd');
    }

    render() {
        const {
            name,
            data,
        } = this.props;

        return (
            <View style={{flex: 1}}>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={400}
                    duration={250}
                    customStyles={{
                        container: {
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                    }}
                >
                    <Fragment>
                        <Text style={styles.title}>{data.name}</Text>
                        <FlatList
                            data={data.items}
                            renderItem={this._renderItem}
                            keyExtractor={data => data.id}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                        />
                    </Fragment>

                </RBSheet>
                <TouchableOpacity style={{padding: 20, flex: 1, backgroundColor: '#fff', marginTop: 10}}
                                  onPress={() => this.RBSheet.open()}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Text>{name}</Text>
                        <Icon
                            size={17}
                            name="plus-circle"
                            type="feather"
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

PizzaSelection.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    data: PropTypes.object,
};

PizzaSelection.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    item: {
        padding: 10,
        paddingLeft: 15,
    },
    titleName: {
        fontSize: 16,
        fontWeight: '600',
    },
    titleDetail: {
        paddingTop: 5,
        fontSize: 10,
        fontWeight: '600',
        color: 'dimgray',
    },
    title:{
        padding:10,
        fontSize: 20,
        fontWeight: '600',
    }

});
export default PizzaSelection;
