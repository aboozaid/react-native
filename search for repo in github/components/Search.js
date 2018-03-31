import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import SearchResult from './SearchResult';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
  render() {
    return (
        <View style = {styles.container}>
            <TextInput style = {styles.input} placeholder = "Search" onChangeText = {(text) => this.setState({searchQuery : text})}/>
            <TouchableHighlight style = {styles.button} onPress = {this.onSearchPress.bind(this)} >
                <Text style = {styles.loginText}>
                    Search
                </Text>
            </TouchableHighlight>
        </View>
    );
  }
  onSearchPress() {
        this.props.navigator.push({
            title : 'Search Result',
            component: SearchResult,
            passProps : {
                pushEvent: this.state.searchQuery
            }
        })
    }
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        paddingTop: 100,
        padding: 20
    },
    input: {
        alignSelf : 'stretch',
        height: 40,
        fontSize: 18,
        marginTop: 30,
        padding: 4,
        borderWidth: .3,
        borderColor: '#bed6e0'
    },
    button: {
        alignSelf : 'stretch',
        backgroundColor: '#48BBEC',
        height : 50,
        marginTop: 30,
        justifyContent: 'center',
        borderRadius: 5
    },
    loginText: {
        alignSelf: 'center',
        fontSize: 30,
        color: '#fff'
    }
})
  