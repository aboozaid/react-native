import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import LoginAuth from './components/LoginAuth';
import Home from './components/Home';

export default class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      LoggedIn: false,
      checkingAuth: true
    }
  }
  componentDidMount() {
    LoginAuth.getAuthInfo((err, authInfo) => {
      this.setState({
        LoggedIn : authInfo != null,
        checkingAuth : false
      })
    })
  }
  render() {
    if(this.state.checkingAuth) {
      return(
        <View>
          <Text>Logged In Before</Text>
        </View>
      );
    }
    if(this.state.LoggedIn) {
      return(
          <Home />
      );
    } else {
      return (
        <Login onLogin = {this.isLogin.bind(this)}/>
      );
    } 
  }
  isLogin() {
    this.setState({LoggedIn : true});
  }
}
