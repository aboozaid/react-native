/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { NetworkInfo } from 'react-native-network-info';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      localIP: '',
      IP4v: ''
    };
  }
  getLocaip() {
    NetworkInfo.getIPAddress(ip => {
      this.setState({localIP: ip});
    });
  }
  getIP4() {
    NetworkInfo.getIPV4Address(ipv4 => {
      this.setState({IP4v: ipv4});
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Button title = 'get local ip' onPress = {() => this.getLocaip()} />
        <Button title = 'get ip4' onPress = {() => this.getIP4()} />
        <Text>{this.state.localIP}</Text>
        <Text>{this.state.IP4v}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
