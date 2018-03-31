import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, ListView } from 'react-native';

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      selectedTab: 'feed',
      dataSource : ds.cloneWithRows(['A', 'B', 'C']),
      showProgress: true,
      searchQuery : props.pushEvent
    }
  }
  componentDidMount() {
    this.doSearch();
  }
  doSearch() {
   var url = 'https://api.github.com/search/repositories?q=' + encodeURIComponent(this.state.searchQuery);
   fetch(url)
    .then((response) => response.json())
    .then((result) => {
        this.setState({
            repositories : result.repositories,
            dataSource : this.state.dataSource.cloneWithRows(result.items)
        })
    })
    .finally(() => {
        this.setState({showProgress: false})
    })
  }
  renderRow(rowData) {
    return (
            <View style = {{
                padding: 20,
                borderColor: '#D7D7D7',
                borderBottomWidth: 1,
                backgroundColor: '#fff'
            }}>
               <Text style = {{fontSize: 20, fontWeight: '600'}}> {rowData.full_name}</Text>
                <View style = {{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 30,
                    marginBottom: 30
                }}>
                    <View>
                        <Image source = {require('./images/user_32.png')} style = {styles.repoCellIcon} />
                        <Text style = {styles.repoLabel}>
                            {rowData.stargazers_count}
                        </Text>
                    </View>
                    <View>
                        <Image source = {require('./images/user_32.png')} style = {styles.repoCellIcon} />
                        <Text style = {styles.repoLabel}>
                            {rowData.forks}
                        </Text>
                    </View>
                    <View>
                        <Image source = {require('./images/user_32.png')} style = {styles.repoCellIcon} />
                        <Text style = {styles.repoLabel}>
                            {rowData.open_issues}
                        </Text>
                    </View>
                </View>
            </View>
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

const styles = StyleSheet.create({
    repoCell: {
        alignItem: 'center',
        width: 50
    },
    repoCellIcon: {
        width: 30,
        height: 30
    },
    repoLabel: {
        textAlign: 'center'
    }
})