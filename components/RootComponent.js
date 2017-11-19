import React from 'react'
//import Assignment from './Assignment'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {
  View,
  TouchableHighlight,
 // ListView,
  Modal,
  StyleSheet,
  Text,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'
//import CreateAssignment from './CreateAssignment'
import Login from './Login'
import User from './User'

/*
const allAssignmentsQuery = gql`
  query {
    allAssignments(orderBy: createdAt_DESC) {
      id
      description
      url
      solutions
    }
  }`
*/
export default class RootComponent extends React.Component {

  constructor(props) {
    super(props)
    //const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      //dataSource: ds.cloneWithRows([]),
      modalVisible: false,
      user: undefined,
    }
  }
  /*
  componentWillReceiveProps(nextProps) {
    if (!nextProps.allAssignmentsQuery.loading && !nextProps.allAssignmentsQuery.error) {
      const { dataSource } = this.state
      this.setState({
        dataSource: dataSource.cloneWithRows(nextProps.allAssignmentsQuery.allAssignments),
      })
    }
  }
  */

  render() {
    /*
    if (this.props.allAssignmentsQuery.loading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    */

    if (this.state.user !== undefined) { //store user with AsyncStorage instead?
      return (
        <View style={styles.container}>
          <User user={this.state.user} />
          <TouchableHighlight
            style={styles.loginButtonContainer}
            onPress={this._logout}
          >
            <Text style={styles.loginButton}>Logout</Text>
          </TouchableHighlight>
        </View>

      )
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
            onComplete={(loggedInUser) => {
              this.setState({ modalVisible: false, user: loggedInUser })
            }} />
        </Modal>



        {/*
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
        */}

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


  _logout = async () => {
    await AsyncStorage.removeItem('graphcoolToken').then(this.setState({ user: undefined }))
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

//export default graphql(allAssignmentsQuery, { name: 'allAssignmentsQuery' })(ListPage)

