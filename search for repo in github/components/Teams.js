import React from 'react';
import { StyleSheet, Text, View, TabBarIOS, ListView, ActivityIndicator, Image, TouchableHighlight, NavigationIOS } from 'react-native';
import TeamDetails from './TeamDetails';

export default class Teams extends React.Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      selectedTab: 'feed',
      dataSource : ds.cloneWithRows(['A', 'B', 'C']),
      showProgress: true
    }
  }
  componentDidMount() {
    this.getRequest();
  }
  getRequest() {
    var details = [
        {
            name: 'Assem Abozaid',
            Title: 'Softewar Engineer',
            WorkFlow: 'At Microsoft',
            skills: 'C/C++, Java, C#, Ruby, PHP and MSSQL',
            quotes: 'You won\'t learn really unless you try something more than once and enjoy what you are doing because that is the thing which make me better than old me'
        }, {
            name: 'Sameh Abozaid',
            Title: 'IT Engineer',
            WorkFlow: 'At IBM',
            skills: 'C/C++, Java, C#, Ruby, PHP and MSSQL',
            quotes: 'You won\'t learn really unless you try something more than once and enjoy what you are doing because that is the thing which make me better than old me'
        }
]
    this.setState({dataSource : this.state.dataSource.cloneWithRows(details), showProgress: false})
  }
  pressRow(rowData) {
    this.props.navigator.push({
        title : 'Push Event',
        component : TeamDetails,
        passProps: {
            pushEvent: rowData
        }
    })
  }
  renderRow(rowData) {
    return (
          <TouchableHighlight onPress= {() => this.pressRow(rowData)}>
            <View style = {{
                flex:1,
                flexDirection: 'row',
                padding: 20,
                alignItems: 'center',
                borderColor: '#D7D7D7',
                borderBottomWidth: 1
            }}>
                <Image source = {require('./images/avatar1.png')} style = {{height: 60, width: 60}} />
                <View style = {{paddingLeft: 30}}>
                    <Text style = {{backgroundColor: '#fff', fontSize: 25}}>{rowData.name}</Text>
                    <Text style = {{backgroundColor: '#fff', fontSize: 20}}>{rowData.Title}</Text>
                    <Text style = {{backgroundColor: '#fff', fontSize: 15}}>{rowData.WorkFlow}</Text>
                </View>
            </View>
          </TouchableHighlight>
      );
  }
  render() {
      if(this.state.showProgress) {
          return(
              <View style= {{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator animating = {this.state.showProgress} size = 'large' />
              </View>
          );
      }
    return(
        <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} />
    );
  }
}