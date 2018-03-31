import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

const ColorButton = ({backgroundColor, onSelect=(f)=>f}) => (
        <TouchableHighlight onPress = {() => onSelect(backgroundColor)} underlayColor = '#D7D7D7' style = {styles.btn}>
            <View style = {styles.row}>
                <View style = {[styles.sample, {backgroundColor}]}></View>
                <Text style = {styles.text}>{backgroundColor}</Text>
            </View>        
        </TouchableHighlight>
)

const styles = StyleSheet.create({
    text: {
      fontSize: 20,
      color: '#fff',
    },
    btn: {
      backgroundColor: '#D1D1D1',
      padding: 15,
      marginBottom: 20,
      margin: 10,
      alignItems: 'center',
      alignSelf: 'stretch',
      borderWidth: 2,
      borderRadius: 5,
      borderColor: '#eee'
    },
    row: {
      flexDirection: 'row',
    },
    sample: {
      height: 20,
      width: 20,
      padding: 5,
      borderRadius: 50,
      margin: 5
    }
});

export default ColorButton;