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
  mutation ($description: String!, $url: String!, $rating: Float!){
    createAssignment(description: $description, url: $url, rating: $rating) {
      id
    }
  }
`

class CreatePage extends React.Component {

    state = {
        description: '',
        url: '',
        rating: 0.0
    }

    render() {

        return (
            <View >

                <TextInput

                    placeholder='Type a description...'
                    onChangeText={(text) => this.setState({ description: text })}
                    value={this.state.description}
                />

                <TextInput

                    placeholder='Type an url...'
                    onChangeText={(text) => this.setState({ url: text })}
                    value={this.state.url}
                />

                <TextInput

                    placeholder='Enter a rating...'
                    onChangeText={(text) => this.setState({ rating: Number(text) })}
                    value={this.state.rating}
                />

                <View>
                    <TouchableHighlight

                        onPress={() => this.props.onComplete()}
                    >
                        <Text>Cancel</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => this._createAssignment()}
                    >
                        <Text>Create Assignment</Text>
                    </TouchableHighlight>
                </View>

            </View>
        )
    }

    _createAssignment = async () => {
        const { description, url, rating } = this.state
        await this.props.createAssignmentMutation({
            variables: { description, url, rating }
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