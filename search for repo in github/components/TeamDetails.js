import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class TeamDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        pushEvent : props.pushEvent,
    }
  }
  render() {
      
    return(
        <View style = {{
            flex:1,
            paddingTop: 150,
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <Image source = {require('./images/avatar1.png')} style = {{height: 120, width: 120}} />
            <Text style = {{fontSize: 25, paddingTop: 10}}>{this.state.pushEvent.name}</Text>
            <Text style = {{fontSize: 15, paddingTop: 5}}>{this.state.pushEvent.Title}</Text>
            <Text style = {{fontSize: 15, paddingTop: 10}}>{this.state.pushEvent.WorkFlow}</Text>
            <Text style = {{fontSize: 20, paddingTop: 20}}>{this.state.pushEvent.skills}</Text>
            <Text style = {{fontSize: 20, paddingTop: 20}}>{this.state.pushEvent.quotes}</Text>

        </View>
    );
  }
}
