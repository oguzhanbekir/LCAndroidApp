import React, {Fragment} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';

class DoughSelection extends React.Component {
    state = {
        selectedButton: '',
        selectedRadioButton: '',
    };

    selectionOnPress(buttonType) {
        this.setState({
            selectedButton: buttonType,
            selectedRadioButton: '',
        });
        this.props.doughSelection(buttonType);
    }

    selectionOnPressRadio(buttonType) {
        this.setState({selectedRadioButton: buttonType});
       // this.props.doughSelection(buttonType);
    }

    render() {
        const parmesanPrice = this.props.productDetail.options[0].items.find(data => data.name === 'Parmesan Kenar');
        const nefisPrice = this.props.productDetail.options[0].items.find(data => data.name === 'Nefis Kenar');
        return (
            <View style={styles.container}>
                <Text style={styles.title}>HAMUR SEÇİMİ</Text>
                {this.props.productDetail.options[0].items.length === 0 ? null :

                    <TouchableOpacity
                        style={
                            this.state.selectedButton === 'Normal'
                                ? styles.buttonDoughSelected
                                : styles.buttonDoughSelect
                        }
                        onPress={() => this.selectionOnPress('Normal')}>
                        <Text
                            style={
                                this.state.selectedButton === 'Normal'
                                    ? styles.buttonDoughSelectedText
                                    : styles.buttonDoughSelectText
                            }>
                            {'Normal Hamur'}
                        </Text>
                        {this.state.selectedButton === 'Normal' &&
                        <Icon
                            size={17}
                            color={'orange'}
                            name="check"
                            type="feather"
                        />
                        }
                    </TouchableOpacity>}
                {this.state.selectedButton === 'Normal' &&
                <Fragment>
                    <TouchableOpacity
                        style={styles.buttonDoughSelectRadio}
                        onPress={() => this.selectionOnPressRadio('Nefis')}>

                        <Icon
                            size={17}
                            color={this.state.selectedRadioButton === 'Nefis' ?
                                'orange' : null
                            }
                            name={this.state.selectedRadioButton === 'Nefis' ?
                                'radio-button-checked' : 'radio-button-unchecked'
                            }
                            type="MaterialIcons"
                        />

                        <Text
                            style={
                                this.state.selectedRadioButton === 'Nefis'
                                    ? styles.buttonDoughSelectedText
                                    : styles.buttonDoughSelectText
                            }>
                            {' Nefis Kenar Ekle [+ ₺'+nefisPrice.price.price.toFixed(2)+']'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonDoughSelectRadio}
                        onPress={() => this.selectionOnPressRadio('Parmesan')}>

                        <Icon
                            size={17}
                            color={this.state.selectedRadioButton === 'Parmesan' ?
                                'orange' : null
                            }
                            name={this.state.selectedRadioButton === 'Parmesan' ?
                                'radio-button-checked' : 'radio-button-unchecked'
                            }
                            type="MaterialIcons"
                        />

                        <Text
                            style={
                                this.state.selectedRadioButton === 'Parmesan'
                                    ? styles.buttonDoughSelectedText
                                    : styles.buttonDoughSelectText
                            }>
                            {' Nefis Kenar Ekle [+ ₺'+parmesanPrice.price.price.toFixed(2)+']'}
                        </Text>
                    </TouchableOpacity>
                </Fragment>
                }
                {this.props.productDetail.options[0].items.length === 4 ?
                    <TouchableOpacity
                        style={
                            this.state.selectedButton === 'İnce'
                                ? styles.buttonDoughSelected
                                : styles.buttonDoughSelect
                        }
                        onPress={() => this.selectionOnPress('İnce')}>
                        <Text
                            style={
                                this.state.selectedButton === 'İnce'
                                    ? styles.buttonDoughSelectedText
                                    : styles.buttonDoughSelectText
                            }>
                            {'İnce Klasik Hamur'}
                        </Text>
                        {this.state.selectedButton === 'İnce' &&
                        <Icon
                            size={17}
                            color={'orange'}
                            name="check"
                            type="feather"
                        />
                        }
                    </TouchableOpacity> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    title: {
        margin: 10,
        fontSize: 15,
        fontWeight: '700',
        color: 'dimgray',
    },
    buttonDoughSelect: {
        backgroundColor: '#fff',
        padding: 12,
        borderTopWidth: 1,
        borderColor: '#D3D3D3',
    },
    buttonDoughSelected: {
        backgroundColor: '#fff',
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#D3D3D3',
    },
    buttonDoughSelectRadio: {
        backgroundColor: '#fff',
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#D3D3D3',
    },
    buttonDoughSelectText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '700',
    },
    buttonDoughSelectedText: {
        color: 'orange',
        fontSize: 14,
        fontWeight: '700',
    },
});

const mapStateToProps = state => {
    return {
        existingOrderId: state.GetBasketReducer.id,
        productDetail: state.ProductDetailDataReducer.campaignDetailData,

       // productCampaignDetail: state.ProductDetailDataReducer.campaignData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        doughSelection: (data) => dispatch({type: 'PRODUCT_DETAIL_DATA_DOUGH_SELECTION', payload: data}),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DoughSelection);
