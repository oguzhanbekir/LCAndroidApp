import React from 'react'
import { Text, View, StyleSheet, FlatList, SafeAreaView, Image } from 'react-native';

import { httpClient } from '../../../HttpClient/HttpClient'  

class ByProducts extends React.Component {

    state = { data: [] };

    componentDidMount(){
          //TabView Kampanyalar
        httpClient
        .post('/web/Product/GetProducts',{
            CategoryId: "108860172578"
        })
        .then(res => {
             this.setState({
                data: res.data.result
                });  
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
            <View style={styles.container}>
               <SafeAreaView style={styles.container}>
               {this.state.data.length > 0 &&
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => 
                    <View style={styles.item}>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                            <Image
                                style={{height: 70, width:120}}
                                source={{uri: item.image}}
                            />
                            <View style={{paddingLeft:10,width:230}}>
                                <Text style={styles.titleName}>{item.name}</Text>
                                <Text style={styles.titlePrice}>{'₺'+item.price.price}</Text>
                            </View>
                        </View>
                        <Text style={styles.titleDetail}>{item.detail}</Text>
                    </View>
                    }
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                />}
                </SafeAreaView>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1
    },
    item: {
        padding: 10,
        paddingLeft:15
    },
    titleName: {
        fontSize:16, 
        fontWeight:"600"
    },
    titlePrice: {
        fontSize:14, 
        fontWeight:"800", 
        color:'dimgray'
    },  
    titleDetail: {
        paddingTop:5,
        fontSize:10, 
        fontWeight:"600", 
        color:'dimgray'
    }
});

export default ByProducts;