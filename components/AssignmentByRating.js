import React from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';

const Query = gql`
query ($rating: Float!){
    allAssignments(filter: {rating : $rating}) {
        id
        description
        rating
      }
   
}
`
class AssignmentByRating extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            assignments: undefined
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.Query.loading && !nextProps.Query.error) {

            this.setState({
                
                assignments: nextProps.Query.allAssignments
            })
        }
    }


    render() {
        if (this.props.Query.loading || this.state.assignments === undefined) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View>
                <View>
                    <Text>Assignments:</Text>
                    <FlatList data={
                        this.state.assignments.map((item) => {
                            return { key: item.id, description: item.description, rating: item.rating }
                        })
                    }
                        renderItem={({ item }) => <Text>{item.description} (rating :{item.rating})</Text>}
                    />
                </View>
                
            </View>
        )
    }

}

export default graphql(Query, {
    name: 'Query',
    
})(AssignmentByRating)

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
