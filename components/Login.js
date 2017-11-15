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

const loginMutation = gql`
  mutation ($email: String!, $password: String!){
    signinUser(email: $email, password: $password) {
      id
      token
    }
  }
`

class LoginPage extends React.Component {

    state = {
        id: '',
        token: '',
    }

    render() {

        return (
            <View style={styles.container}>

                <TextInput
                    placeholder='Email'
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                />

                <TextInput
                    placeholder='Password'
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
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
                        onPress={() => this._login()}
                    >
                        <Text style={styles.saveButtonText}>Login</Text>
                    </TouchableHighlight>
                </View>

            </View>
        )
    }

    _login = async () => {
        const { email, password } = this.state
        await this.props.loginMutation({
            variables: { email, password }
        })
        this.props.onComplete()
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 50,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: 'rgba(255,255,255,1)'
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

export default graphql(loginMutation, { name: 'loginMutation' })(LoginPage)