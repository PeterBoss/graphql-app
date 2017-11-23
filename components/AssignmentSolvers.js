import React from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const solutionQuery = gql`
query ($id: ID!){
    allSolutions(filter: {assignment: {id: $id}}) {
        user {
          name
        }
    }
}  
`
class AssignmentSolvers extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            solutions: undefined
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.solutionQuery.loading && !nextProps.solutionQuery.error) {
            console.log("TEST")
            this.setState({
                
                solutions: nextProps.solutionQuery.allSolutions
            })
        }
    }

    render() {

        if (this.props.solutionQuery.loading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Users that solved the assignment:</Text>
                    <FlatList data={
                        this.state.solutions.map((item) => {
                            return { key: item.id, name: item.user.name }
                        })
                    }
                        renderItem={({ item }) => <Text style={styles.title}>{item.name}</Text>}
                    />
                </View>
            </View>
        )
    }

}

export default graphql(solutionQuery, {
    name: 'solutionQuery',
    options: (props) => ({
        variables: {
            id: this.props
        }
    })
})(AssignmentSolvers)

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
