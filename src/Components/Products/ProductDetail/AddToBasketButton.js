import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

class AddToBasketButton extends React.Component {
    state = {
        counter: 1,
    };

    subtractionPress() {
        {
            this.state.counter > 1 &&
            this.setState({

                counter: this.state.counter - 1,
            });
        }
    }

    additionPress() {
        {
            this.state.counter > 0 &&
            this.setState({
                counter: this.state.counter + 1,
            });
        }
    }

    addBasket(){
        alert("add basket")
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <TouchableOpacity onPress={() => this.subtractionPress()}>
                        <Text style={styles.subText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.counterText}>{this.state.counter}</Text>
                    <TouchableOpacity onPress={() => this.additionPress()}>
                        <Text style={styles.addText}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={{borderLeftWidth: 1, borderLeftColor: 'white'}}/>
                <View style={styles.rightContainer}>
                    <TouchableOpacity onPress={() => this.addBasket()}>
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
        justifyContent:'center',
        alignItems:'center',
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
        fontWeight: '400'
    },
});

export default AddToBasketButton;
