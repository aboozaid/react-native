import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
export default class ColorForm extends Component {
  constructor(props) {
    super(props);
    this.state = { txtColor : '', };
  }
  addColor() {
    this.props.newColor(this.state.txtColor.toLowerCase());
    this.setState({txtColor: ''});
  }
  render() {
    const uri = 'https://www.w3schools.com/colors/colors_names.asp';
    return(
      <View style = {styles.container}>
        <TextInput style = {styles.input} placeholder = "enter a color"
          onChangeText = {(txtColor) => this.setState({txtColor})}
          value = {this.state.txtColor} />
        <TouchableHighlight onPress = {this.addColor.bind(this)} style = {styles.btn}>
          <Text style = {styles.text}>Add</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress = {() => this.props.navigation.navigate('Web', {uri})} style = {styles.btn}>
          <Text style = {styles.text}>Info</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
ColorForm.propsTypes = {
  newColor: PropTypes.func
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F5F5F5'
  },
  input: {
    height: 50,
    flex: 1,
    padding: 10,
    fontSize: 20
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    padding: 10,
    margin: 10
  },
  text:  {
    fontSize: 20,
    color: 'black'
  }
});