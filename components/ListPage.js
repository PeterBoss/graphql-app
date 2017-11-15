import React from 'react'
import Assignment from './Assignment'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {
  View,
  TouchableHighlight,
  ListView,
  Modal,
  StyleSheet,
  Text,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'
import CreateAssignment from './CreateAssignment'
import Login from './Login'

const allAssignmentsQuery = gql`
  query {
    allAssignments(orderBy: createdAt_DESC) {
      id
      description
      url
      solutions
    }
  }`

class ListPage extends React.Component {

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows([]),
      modalVisible: false,
      user: undefined,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.allAssignmentsQuery.loading && !nextProps.allAssignmentsQuery.error) {
      const { dataSource } = this.state
      this.setState({
        dataSource: dataSource.cloneWithRows(nextProps.allAssignmentsQuery.allAssignments),
      })
    }
  }

  render() {
    if (this.props.allAssignmentsQuery.loading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (


      <View style={styles.container}>

        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => { alert("Modal has been closed.") }}

        >
          <Login
            onComplete={() => {
              this.setState({ modalVisible: false })
            }} />
        </Modal>




        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(Assignment) => (
            <Assignment
              description={Assignment.description}
              url={Assignment.url}
            />
          )}
        />
        <TouchableHighlight
          style={styles.loginButtonContainer}
          onPress={this.alertToken}
        >
          <Text style={styles.loginButton}>check token</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.loginButtonContainer}
          onPress={this.deleteToken}
        >
          <Text style={styles.loginButton}>delete token</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.loginButtonContainer}
          onPress={this._login}
        >
          <Text style={styles.loginButton}>Login</Text>
        </TouchableHighlight>
      </View>
    )
  }

  _login = () => {
    // this.props.router.push('/create');
    this.setState({ modalVisible: true })

  }

  alertToken = async () => {
    await AsyncStorage.getItem('graphcoolToken').then((value) => { alert(value) })
  }
  deleteToken = async () => {
    await AsyncStorage.removeItem('graphcoolToken').then(() => alert('succes')).then(() => alert('fail'))
  }

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    paddingTop: 22
  },
  loginButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'goldenrod',
    color: 'black',
    textAlign: 'center',
    fontSize: 22,
    height: 60,
    width: 480,
    paddingTop: 18,
  }
})

export default graphql(allAssignmentsQuery, { name: 'allAssignmentsQuery' })(ListPage)

