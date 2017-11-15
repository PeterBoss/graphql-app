import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {
  View,
  TextInput,
  Button,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

const createAssignmentMutation = gql`
  mutation ($description: String!, $url: String!){
    createAssignment(description: $description, url: $url) {
      id
    }
  }
`

class CreatePage extends React.Component {

  state = {
    description: '',
    url: '',
  }

  render() {

    return (
      <View style={styles.container}>

        <TextInput
          style={styles.descriptionInput}
          placeholder='Type a description...'
          onChangeText={(text) => this.setState({ description: text })}
          value={this.state.description}
        />

        <TextInput
          style={styles.urlInput}
          placeholder='Type an url...'
          onChangeText={(text) => this.setState({ url: text })}
          value={this.state.url}
        />

        <View style={styles.buttons}>
          <TouchableHighlight
            style={styles.cancelButton}
            onPress={() => this.props.onComplete()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.saveButton}
            onPress={() => this._createAssignment()}
          >
            <Text style={styles.saveButtonText}>Create Assignment</Text>
          </TouchableHighlight>
        </View>

      </View>
    )
  }

  _createAssignment = async () => {
    const { description, url } = this.state
    await this.props.createAssignmentMutation({
      variables: { description, url }
    })
    this.props.onComplete()
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: 'rgba(255,255,255,1)'
  },
  descriptionInput: {
    paddingHorizontal: 20,
    height: 100,
    fontSize: 20,
  },
  urlInput: {
    paddingHorizontal: 20,
    height: 100,
    fontSize: 20,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  saveButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(39,174,96,1)',
    height: 45,
    borderRadius: 2,
  },
  saveButtonText: {
    color: 'white',
  },
  cancelButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  cancelButtonText: {
    color: 'rgba(0,0,0,.5)',
  },
})

export default graphql(createAssignmentMutation, { name: 'createAssignmentMutation' })(CreatePage)