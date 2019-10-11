import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import {httpClient} from '../../HttpClient/HttpClient';
import {Card} from 'react-native-elements';
import {colors} from '../../config/colors';
import {connect} from 'react-redux';

class MainPageForYou extends React.Component {
    state = {data: []};

    componentDidMount() {
        const dataMainPageForYou = [];
        httpClient.get('/web/Product/GetMainPageForYou').then(res => {
            res.data.result.map(data => {
                const value = data.price.price.toFixed(2);
                dataMainPageForYou.push({
                    id: data.id,
                    name: data.name,
                    imageUrl: data.image,
                    price: value,
                });
            });
            this.setState({
                data: dataMainPageForYou,
            });
            //    this.props.isLoading()
        });
    }

    render() {
        return (
            <View style={styles.subTopContainer}>
                <TouchableOpacity onPress={() => {
                    this.props.resetTabView();
                    this.props.isLoggedOut();
                    this.props.navigation.navigate('Check');
                }}><Text>Persist</Text></TouchableOpacity>
                <View style={styles.container}>
                    <Text style={styles.textLeft}>Senin İçin Seçtik</Text>
                    <Text style={styles.textRight}>TÜMÜNÜ GÖR</Text>
                </View>
                <View>
                    {this.state.data.length > 0 && (
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.state.data}
                            renderItem={({item: rowData}) => {
                                return (
                                    <Card
                                        title={null}
                                        image={{uri: rowData.imageUrl}}
                                        containerStyle={{padding: 0, width: 160, height: 230}}>
                                        <View
                                            style={{justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{fontSize: 16, fontWeight: '600'}}>
                                                {rowData.name}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: '800',
                                                    color: 'dimgray',
                                                }}>
                                                {'₺' + rowData.price}
                                            </Text>
                                        </View>
                                    </Card>
                                );
                            }}
                            keyExtractor={(item, index) => item.id}
                        />
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    subTopContainer: {
        flex: 1,
        marginTop: 10,
        backgroundColor: '#fff',
        paddingVertical: 10,
    },
    textLeft: {
        fontSize: 18,
        fontWeight: '600',
    },
    textRight: {
        color: colors.orange,
        fontWeight: '300',
        fontSize: 15,
    },
});

const mapStateToProps = state => {
    return {
        loggedIn: state.AuthReducer.loggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        isLoggedOut: () => dispatch({type: 'LOGGED_OUT'}, {type: 'RESET_TAB_VIEW'}),
        resetTabView: () => dispatch({type: 'RESET_TAB_VIEW'}),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainPageForYou);
