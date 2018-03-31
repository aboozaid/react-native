import React from 'react';
import { StyleSheet, Text, View, TabBarIOS, ListView, ActivityIndicator, Image, TouchableHighlight, NavigatorIOS } from 'react-native';
import LoginAuth from './LoginAuth';
import Teams from './Teams';
import Search from './Search';



export default class Home extends React.Component {
  constructor() {
    super(); 
    this.state = {
      selectedTab: 'feed'
    }
  }
  render() {
    return(
        <TabBarIOS style = {styles.container}>
            <TabBarIOS.Item title="Feed" selected={this.state.selectedTab == 'feed'} icon={require('./images/user_32.png')}
                onPress = {() => this.setState({selectedTab: 'feed'})} >
               <NavigatorIOS style = {{ flex:1 }} initialRoute = {{
                   component : Teams,
                   title : 'Teams'
               }} />
            </TabBarIOS.Item>
            <TabBarIOS.Item title="Search" selected={this.state.selectedTab == 'search'} icon={require('./images/user_32.png')}
                onPress = {() => this.setState({selectedTab: 'search'})} >
                <NavigatorIOS style = {{ flex:1 }} initialRoute = {{
                   component : Search,
                   title : 'Search'
               }} />
            </TabBarIOS.Item>
        </TabBarIOS>
    );
 }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome : {
        fontSize: 35,
        color: 'green',
    }
});