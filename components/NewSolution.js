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

const createSolutionMutation = gql`
  mutation ( $url: String!, $userId: ID!, $assignmentId: ID! ){
    createSolution( url: $url, userId: $userId, assignmentId: $assignmentId ) {
      id
    }
  }
`

class CreatePage extends React.Component {

    state = {

        url: '',
        userId: undefined,
        assignmentId: undefined
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            userId: nextProps.userId,
            assignmentId: nextProps.assignmentId
        })

    }

    render() {

        return (
            <View style={styles.container}>

                <TextInput
                    style={styles.textInput}
                    placeholderTextColor='black'
                    placeholder='Type an url...'
                    onChangeText={(text) => this.setState({ url: text })}
                    value={this.state.url}
                />


                <View>
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
                        <Text style={styles.saveButtonText}>Submit Solution</Text>
                    </TouchableHighlight>
                </View>

            </View>
        )
    }

    _submitSolution = async () => {
        const { url, userId, assignmentId } = this.state
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
})



export default graphql(createSolutionMutation, { name: 'createSolutionMutation' })(CreatePage)