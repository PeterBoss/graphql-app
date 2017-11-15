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
  Text
} from 'react-native'
import CreateAssignment from './CreateAssignment'

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
      return (<Text>Loading</Text>)
    }

    return (
      <View style={styles.container}>

        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => { alert("Modal has been closed.") }}

        >
          <CreateAssignment
            onComplete={() => {
              this.props.allAssignmentsQuery.refetch()
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
          style={styles.createAssignmentButtonContainer}
          onPress={this._createAssignment}
        >
          <Text style={styles.createAssignmentButton}>Create Assignment</Text>
        </TouchableHighlight>
      </View>
    )
  }

  _createAssignment = () => {
    // this.props.router.push('/create');
    this.setState({ modalVisible: true })

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  createAssignmentButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAssignmentButton: {
    backgroundColor: 'rgba(39,174,96,1)',
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
    height: 60,
    width: 480,
    paddingTop: 18,
  }
})

export default graphql(allAssignmentsQuery, { name: 'allAssignmentsQuery' })(ListPage)

