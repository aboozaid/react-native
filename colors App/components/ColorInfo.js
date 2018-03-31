import React from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import ColorTools from 'color';

export default class ColorInfo extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.color
    });
    render() {
        const color = ColorTools(this.props.navigation.state.params.color);
        return(
            <View style= {[styles.container, {backgroundColor: color}]}>
                <Text style = {{color: color.negate()}}>{color.hex()}</Text>
                <Text style = {{color: color.negate()}}>{color.rgb().string()}</Text>
                <Text style = {{color: color.negate()}}>{color.hsl().string()}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})