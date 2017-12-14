import React from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const allAssignmentsQuery = gql`
query {
    allAssignments {
        id
        rating
        url
        description
    }
}
`
class AllAssignments extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            assignments: undefined
        }
    }
// chera nesxt props inja ezafe shode
    componentWillReceiveProps(nextProps) {
        if (!nextProps.allAssignmentsQuery.loading && !nextProps.allAssignmentsQuery.error) {

            this.setState({
                assignments: nextProps.allAssignmentsQuery.allAssignments
            })
        }
    }

    render() {

        if (this.props.allAssignmentsQuery.loading || this.state.assignments === undefined) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            //flatlist data chi mige inja ba renderitem
            <View >
                <View>
                    <Text >All assignments:</Text>
                    
                    <FlatList data={
                        this.state.assignments.map((item) => {
                            return { key: item.id, description : item.description, url: item.url, rating: item.rating }
                        })
                    }
                        renderItem={({ item }) => <Text >{item.description} (rating :{item.rating})</Text>}
                    />
                </View>
            </View>
        )
    }

}

export default graphql(allAssignmentsQuery, { name: 'allAssignmentsQuery', })(AllAssignments)

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
})
