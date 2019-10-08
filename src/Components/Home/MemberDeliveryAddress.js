import React from 'react';
import {View, StyleSheet, Picker,Text} from 'react-native';

import {httpClient} from '../../HttpClient/HttpClient';
import {Icon} from 'react-native-elements';

class MemberDeliveryAddress extends React.Component {
    state = {
        data: [],
        itemValue:''
    };
    componentDidMount() {
        httpClient.get('/web/Address/GetMemberDeliveryAddress').then(res => {
            this.setState({
                data: res.data.result,
            });
        });
    }

    _selectedItem(itemValue){
        this.setState({itemValue});
    }


    render() {
        return (
            <View style={styles.container}>
                {this.state.data.length > 0 && (
                    <Picker
                        selectedValue={this.state.itemValue}
                        onValueChange={itemValue => this._selectedItem(itemValue)}>
                        {
                            this.state.data.map( (i)=>{
                                return <Picker.Item key={i.id} label={i.address.name} value={i.id} />
                            })
                        }


                    </Picker>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
});

export default MemberDeliveryAddress;

