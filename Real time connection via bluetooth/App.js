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
  TouchableHighlight,
  ListView,
  Button,
  NativeAppEventEmitter,
  NativeModules,
  NativeEventEmitter
} from 'react-native';
import BluetoothCP from 'react-native-bluetooth-cross-platform';
const BluetoothCPModule = NativeModules.BluetoothCP;
const BluetoothCPEmitter = new NativeEventEmitter(BluetoothCPModule);

export default class App extends Component {
  constructor() {
    super();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const peers = [];
    this.state = {
      peers,
      dataSource: this.ds.cloneWithRows(peers),
    }
    this.addPeerDetectedListener = this.addPeerDetectedListener.bind(this);
    this.addPeerLostListener = this.addPeerLostListener.bind(this);
  }
  componentDidMount() {
    Promise.all([
      BluetoothCP.getNearbyPeers()
    ]).then((peers) => {
      this.setState({peers, dataSource: this.ds.cloneWithRows(peers)});
    })
    this.listener1 = BluetoothCPEmitter.addListener('detectedUser', this.addPeerDetectedListener);
    this.listener2 = BluetoothCPEmitter.addListener('lostUser', this.addPeerLostListener);
  }
  componentWillUnmount() {
    this.listener1.remove();
    this.listener2.remove();
  }
  addPeerDetectedListener = (peer) => {
    alert(peer.id + ' ' + peer.type);
  }
  addPeerLostListener = (peer) => {
    alert(peer.id);
  }
  render() {
    return (
      <View style={styles.container}>
        <Button 
          onPress = {() => BluetoothCP.advertise()} 
          title = 'Advertise peers'
        />
        <Button 
          onPress = {() => BluetoothCP.browse()} 
          title = 'Browse peers'
        />
        <ListView 
          dataSource = {this.state.dataSource}
          enableEmptySections={true}
          renderRow = {(data) => {
            return(
              <View>
                <Text>data.id</Text>
              </View>
            );
          }}
        />
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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
