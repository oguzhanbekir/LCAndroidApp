import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
})
