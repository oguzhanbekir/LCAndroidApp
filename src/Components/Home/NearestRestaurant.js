import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-elements';

class CouponCode extends React.Component {
    
render() {
   
        return (
            <View style={styles.container}>
                <TouchableOpacity style={ styles.buttonSubmit } onPress={()=> this.props.navigation.navigate('Restaurants')}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Icon size={25} color={"#90ee90"} name="shop" type="entypo"/>
                    <Text style={{color:'black', fontWeight:'800',fontSize:18 }} >  En Yakın Restoranları Göster</Text>
                </View>
                <Icon size={25} color={'gray'} name="keyboard-arrow-right" type="MaterialIcons"/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        marginTop:10,
    },
    buttonSubmit:{
        flexDirection:'row',
        backgroundColor: '#fff',
        padding: 20,
        alignItems:'center',
        justifyContent: 'space-between',
        height:50
    }
});

export default CouponCode;