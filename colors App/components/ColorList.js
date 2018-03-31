import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ListView,
  AsyncStorage
} from 'react-native';
import ColorButton from './ColorButton';
import ColorForm from './ColorForm';



export default class ColorList extends Component {
    static navigationOptions = {
        title: 'Home',
      };
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    const colors = []
    this.state = {
      colors,
      dataSource : this.ds.cloneWithRows(colors)
    }
  }
  componentDidMount() {
    AsyncStorage.getItem(
      '@ColorListStorage:Colors',
      (err, data) => {
        if(err) {
          console.error("something wrong", err);
        } else {
          const colors = JSON.parse(data);
          this.setState({
            colors,
            dataSource: this.ds.cloneWithRows(colors)
          })
        }
      }
    )
  }
  saveData(colors) {
    AsyncStorage.setItem(
      '@ColorListStorage:Colors',
      JSON.stringify(colors)
    );
  }
  addColor(color) {
    const colors = [
      ...this.state.colors,
      color
    ]
    this.setState({
      colors,
      dataSource : this.ds.cloneWithRows(colors)
    })
    this.saveData(colors);
  }
  render() {
    const { navigate } = this.props.navigation;
    const { dataSource } = this.state;
    return (
      <ListView style={styles.container}
        dataSource = {dataSource} renderRow = {(color) => (
          <ColorButton backgroundColor = {color} onSelect = {() => navigate('Details', {color})} />
        )}
        renderHeader = {() => (
          <ColorForm newColor = {this.addColor.bind(this)} navigation = {this.props.navigation}/>
        )}
      >
      </ListView>
    );
  }
}

ColorList.propTypes = {
    onColorSelected: PropTypes.func
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      fontSize: 20,
      padding: 10,
      backgroundColor: '#D7D7D7',
      marginBottom: 15,
      textAlign: 'center'
    }
});
