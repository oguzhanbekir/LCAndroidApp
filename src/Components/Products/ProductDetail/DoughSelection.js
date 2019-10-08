import React, {Fragment} from 'react';
import {View, StyleSheet, Image, Text, FlatList, TouchableOpacity} from 'react-native';
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
        if (buttonType == 'Normal') {
            alert('normal');
        } else if (buttonType == 'Thin') {
            alert('ince');
        }
    }

    selectionOnPressRadio(buttonType) {
        this.setState({selectedRadioButton: buttonType});
        if (buttonType == 'exquisite') {
            alert('exquisite');
        } else if (buttonType == 'parmesan') {
            alert('parmesan');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>HAMUR SEÇİMİ</Text>
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
                </TouchableOpacity>
                {this.state.selectedButton === 'Normal' &&
                <Fragment>
                    <TouchableOpacity
                        style={styles.buttonDoughSelectRadio}
                        onPress={() => this.selectionOnPressRadio('exquisite')}>

                        <Icon
                            size={17}
                            color={this.state.selectedRadioButton === 'exquisite' ?
                                'orange' : null
                            }
                            name={this.state.selectedRadioButton === 'exquisite' ?
                                'radio-button-checked' : 'radio-button-unchecked'
                            }
                            type="MaterialIcons"
                        />

                        <Text
                            style={
                                this.state.selectedRadioButton === 'exquisite'
                                    ? styles.buttonDoughSelectedText
                                    : styles.buttonDoughSelectText
                            }>
                            {' Nefis Kenar Ekle [+ ₺5,00]'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonDoughSelectRadio}
                        onPress={() => this.selectionOnPressRadio('parmesan')}>

                        <Icon
                            size={17}
                            color={this.state.selectedRadioButton === 'parmesan' ?
                                'orange' : null
                            }
                            name={this.state.selectedRadioButton === 'parmesan' ?
                                'radio-button-checked' : 'radio-button-unchecked'
                            }
                            type="MaterialIcons"
                        />

                        <Text
                            style={
                                this.state.selectedRadioButton === 'parmesan'
                                    ? styles.buttonDoughSelectedText
                                    : styles.buttonDoughSelectText
                            }>
                            {' Parmesan Kenar Ekle [+ ₺5,00]'}
                        </Text>
                    </TouchableOpacity>
                </Fragment>
                }
                <TouchableOpacity
                    style={
                        this.state.selectedButton === 'Thin'
                            ? styles.buttonDoughSelected
                            : styles.buttonDoughSelect
                    }
                    onPress={() => this.selectionOnPress('Thin')}>
                    <Text
                        style={
                            this.state.selectedButton === 'Thin'
                                ? styles.buttonDoughSelectedText
                                : styles.buttonDoughSelectText
                        }>
                        {'İnce Klasik Hamur'}
                    </Text>
                    {this.state.selectedButton === 'Thin' &&
                    <Icon
                        size={17}
                        color={'orange'}
                        name="check"
                        type="feather"
                    />
                    }
                </TouchableOpacity>
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
)(DoughSelection);
