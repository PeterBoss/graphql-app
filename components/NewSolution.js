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
    TouchableHighlight, 
    TouchableOpacity
} from 'react-native'

const createSolutionMutation = gql`
  mutation ( $url: String!, $userId: ID!, $assignmentId: ID! ){
    createSolution( url: $url, userId: $userId, assignmentId: $assignmentId ) {
      id
    }
  }
`
/* const Touchable = (props) => (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>) */

class CreatePage extends React.Component {

    state = {

        url: ''
    }


    render() {
       
        return (
            <View style={styles.container}>

                <TextInput
                    style={styles.textInput}
                    placeholderTextColor='white'
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
                    onPress={() => this._submitSolution()}
                >
                    <Text style={styles.saveButtonText}>Submit</Text>
                </TouchableHighlight>
            </View>

            </View>
        )
    }

    _submitSolution = async () => {
        const url = this.state.url
        const userId = this.props.userId
        const assignmentId = this.props.assignmentId
        await this.props.createSolutionMutation({
            variables: { url, userId, assignmentId }
        })
        this.props.onComplete()
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        paddingTop: 22
    },
    textInput: {
        backgroundColor: 'goldenrod',
    },
    title: {
        padding: 22,
        color: 'white',
        fontWeight: '300',
        fontSize: 16,
    },
    saveButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'goldenrod',
        height: 45,
        borderRadius: 2,
    },
    saveButtonText: {
        color: 'black',
    },
    cancelButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
    },
    cancelButtonText: {
        color: 'white',
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
})



export default graphql(createSolutionMutation, { name: 'createSolutionMutation' })(CreatePage)