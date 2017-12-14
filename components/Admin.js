import React from 'react'
import { View, ScrollView, Text, StyleSheet, FlatList, Modal, TouchableHighlight, TextInput } from 'react-native'
import AssignmentByRating from './AssignmentByRating'
import AllAssignment from './AllAssignments'
import NewAssignment from './NewAssignment'

export default class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: undefined
        };
    }
    render() {

        if (this.state.text === undefined) {
            return (
                <View>
                    <TextInput
                        style={{ height: 70, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                    />

                    <AllAssignment />

                    <NewAssignment onComplete = {() => alert("You tried to create a new assignment, maybe it even worked.")}/>
                </View>
            )
        }
        
        return (
            <View>


                <TextInput
                    style={{ height: 70, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />

                <AssignmentByRating rating={Number(this.state.text)} />


            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        paddingTop: 22
    },
    title: {
        padding: 22,
        color: 'white',
        fontWeight: '300',
        fontSize: 16,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    okButton: {
        backgroundColor: 'goldenrod',
        color: 'black',
        textAlign: 'center',
        fontSize: 22,
        height: 60,
        width: 480,
        paddingTop: 18,
    },
})