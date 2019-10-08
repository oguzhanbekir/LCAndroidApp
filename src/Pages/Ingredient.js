import React from 'react';
import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

const _renderItem = ({id, name , quantity}) => {
    return (
        <View style={styles.item}>
            <Text style={styles.titleDetail}>{name}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 80}}>
                <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() => alert(name)}
                >
                    <Text style={{fontSize: 30, fontWeight: '500'}}>{'-'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() => alert(id)}
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
//({item}) => <_renderItem id={item.id} quantity={2} changeQuantity/>
const RenderList = ({data}) => {
    return (
        <View style={{flex: 1}}>
            <FlatList
                data={data}
                renderItem={({item}) => <_renderItem id={item.id} name={item.name} quantity={item.defaultQuantity} />}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={FlatListItemSeparator}
                //extraData={this.props.data}
            />
        </View>);
};

class Ingredient extends React.Component {
    state = {
        index: 0,
        routes: [
            {key: 'mypizza', title: 'PİZZAMDAKİ MALZEMELER'},
            {key: 'extra', title: 'EKSTRA MALZEMELER'},
        ],
        items: this.props.navigation.getParam('productDetail')[0].options[1].items,
    };

    extraOrPizzaIngredient(index) {
        return this.state.items.filter(t => t.defaultQuantity === index);
    };


    changeQuantity = (id, quantity) => {
        alert("olduuu"+ id)
    };


    _renderTabView = ({route}) => {
        switch (route.key) {
            case 'mypizza':
                return <RenderList data={this.extraOrPizzaIngredient(1)}/>;
            case 'extra':
                return <RenderList data={this.extraOrPizzaIngredient(0)}/>;
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
        alert('apply');
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
                        <Text style={styles.applyText}>{'+ ₺0,00'}</Text>
                    </View>
                    <View style={{borderLeftWidth: 1, borderLeftColor: 'white'}}/>
                    <View style={styles.rightContainer}>
                        <TouchableOpacity onPress={() => this.apply()}>
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
});

export default Ingredient;
