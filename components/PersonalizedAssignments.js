import React from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableHighlight, Modal } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import NewSolution from './NewSolution'
import RootComponent from './RootComponent'

const PersonalizedAssignmentsQuery = gql`
query ($minRating: Float!, $maxRating: Float!){
    allAssignments(filter: {AND: [{rating_gte: $minRating}, {rating_lte: $maxRating}]}) {
        id
        description
        url
        rating
    }
}
`
class PersonalizedAssignments extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            assignments: undefined,
            assignmentId: undefined,
            modalVisible: false

        }
    }
    // manzoor az in ghesmat chi ast
    componentWillReceiveProps(nextProps) {
        if (!nextProps.PersonalizedAssignmentsQuery.loading && !nextProps.PersonalizedAssignmentsQuery.error) {

            this.setState({
                assignments: nextProps.PersonalizedAssignmentsQuery.allAssignments
            })
        }
    }

    render() {

        if (this.props.PersonalizedAssignmentsQuery.loading || this.state.assignments === undefined) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Suggested Assignments:</Text>
                    <FlatList data={
                        this.state.assignments.map((item) => {
                            return { key: item.id, description: item.description, rating: item.rating }

                        })

                    }

                        renderItem={({ item }) =>

                            <TouchableHighlight style={styles.saveButton}
                                onPress={
                                    () => {
                                        this.setState({ assignmentId: item.key, modalVisible: true })
                                    }
                                }
                            >
                                <Text style={styles.saveButtonText}>{item.description} ({item.rating}) -></Text>

                            </TouchableHighlight>

                        }


                    />

                </View>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { this.setState({ modalVisible: false }) }}

                >
                    <NewSolution userId={this.props.user.id} assignmentId={this.state.assignmentId}
                        onComplete={() => {
                            this.setState({ modalVisible: false })
                        }} />

                </Modal>

            </View>
        )

    }

}

/* _sendAssignmentID = async (assId) => {
    await this.setState({ assingmentId: assId })
} */


// -2,5 baraye chi ast
export default graphql(PersonalizedAssignmentsQuery, {
    name: 'PersonalizedAssignmentsQuery',
    // options: ({ rating }) => ({ variables: { rating } }),
    options: (props) => ({
        variables: {
            minRating: props.user.rating - 2.5,
            maxRating: props.user.rating + 2.5,
        }
    })
})(PersonalizedAssignments)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    title: {
        padding: 22,
        color: 'white',
        fontWeight: '300',
        fontSize: 16,
    },
    saveButton: {

        backgroundColor: 'goldenrod',
        borderRadius: 1,
        padding: 5

    },
    saveButtonText: {
        color: 'black',
    },
})
