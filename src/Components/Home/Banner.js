import React from 'react'
import { View, StyleSheet } from 'react-native';

import { httpClient } from '../../HttpClient/HttpClient'
import { SliderBox } from 'react-native-image-slider-box';

class Banner extends React.Component {
    state = { images: [] };
      componentDidMount(){
          //Uygulamanın ana sayfasındaki banner
        const imageUrl =[]
        httpClient
        .get('/web/Cms/Banner?Name=Promo')
        .then(res => {
            res.data.result.map((data)=>{
                imageUrl.push(data.imageMobile)
             });
             this.setState({
                images: imageUrl
                 });
            }); 
    }
    
render() {
   
        return (
            <View style={styles.container}>
                {this.state.images.length > 0 &&
                <SliderBox 
                    images={this.state.images}
                    sliderBoxHeight={350} />
                }
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1
    }
});

export default Banner;