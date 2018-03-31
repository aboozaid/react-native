import React from 'react';
import {
    WebView,
    StyleSheet
} from 'react-native';

const Web = ({navigation}) => (
    <WebView style = {styles.container} 
        source = { navigation.state.params }
        contentInset = {{top: -650}}
    />
)
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Web;