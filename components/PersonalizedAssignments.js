import React from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableHighlight } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import NewSolution from './NewSolution'

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
            assignments: undefined
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

        if (this.props.PersonalizedAssignmentsQuery.loading) {
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

                        renderItem={({ item }) => <Text style={styles.title}>
                            {item.description} (rating :{item.rating})        

                            <TouchableHighlight style={styles.saveButton} 
                            onPress={
                                <NewSolution assignmentId={this.props.assignmentId} />
                            }
                            >
                            <Text style={styles.saveButtonText}>make new soulution</Text>
                            
                            </TouchableHighlight>

                       </Text>}


                    />

                </View>
            </View>
        )

    }

}
/* const RouteStack = StackNavigator({
    
    NewSolution: { screen: NewSolution },
  }); */

// -2,5 baraye chi ast
export default graphql(PersonalizedAssignmentsQuery, {
    name: 'PersonalizedAssignmentsQuery',
    // options: ({ rating }) => ({ variables: { rating } }),
    options: (props) => ({
        variables: {
            minRating: props.rating - 2.5,
            maxRating: props.rating + 2.5,
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
        height: 35,
        width: 50,
        borderRadius: 1,
        fontWeight: '300',
    },
    saveButtonText: {
        color: 'black',
    },
})
