import React from 'react'
import { View, ScrollView, Text, StyleSheet, FlatList, Modal, TouchableHighlight } from 'react-native'
import PersonalizedAssignments from './PersonalizedAssignments'
import UserSolutions from './UserSolutions'
import NewSolution from './NewSolution'

export default class User extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            assignmentModalVisible: false,
            solutionModalVisible: false,
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.title}>
                    Name: {this.props.user.name}
                </Text>
                <Text style={styles.title}>
                    Email: {this.props.user.email}
                </Text>
                <Text style={styles.title}>
                    Rating: {this.props.user.rating}
                </Text>
                
                <PersonalizedAssignments user={this.props.user} />

                <UserSolutions solutions={this.props.user.solutions} />




            </ScrollView>
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