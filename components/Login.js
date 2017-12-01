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
    AsyncStorage
} from 'react-native'
//////???????? chera signinuser mail injorrie va mutation che mikone 
const signinUserMutation = gql`
  mutation ($email: String!, $password: String!){
    signinUser(email: {email: $email, password: $password}) {
      token
      user {
        role
        name
        rating
        email
        solutions {
          id
          rating
          url
          createdAt
          updatedAt 
          assignment {
            id
            description
            rating
            url
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`

class LoginPage extends React.Component {

    state = {
        email: '',
        password: '',
    }
    
    render() {

        return (
            <View style={styles.container}>
                <View>
                    <TextInput style={styles.textInput}
                        placeholder='Email'
                        placeholderTextColor='black'
                        onChangeText={(text) => this.setState({ email: text })}
                        value={this.state.email}
                    />

                    <TextInput style={styles.textInput}
                        placeholder='Password'
                        placeholderTextColor='black'
                        onChangeText={(text) => this.setState({ password: text })}
                        secureTextEntry={true}
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
                            onPress={() => this.signinUser()}
                        >
                            <Text style={styles.saveButtonText}>Login</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }
// hvor bruger man props?
// gaphcoolToken az koja aamade
    signinUser = async () => {
// email og password chera injoorian
// token tozih bedi
// await
// chetorr props inja nadari ama props.signinUserMutation
// response.data???
        const { email, password } = this.state
        const response = await this.props.signinUserMutation({ variables: { email, password } })
        AsyncStorage.setItem('graphcoolToken', response.data.signinUser.token)
        this.props.onComplete(response.data.signinUser.user)
        
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    textInput: {
        backgroundColor: 'goldenrod',
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
// export default ->graphql 
export default graphql(signinUserMutation, { name: 'signinUserMutation' })(LoginPage)