import React from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const allUsersQuery = gql`
query {
    allUsers(filter: {role: USER}, orderBy: rating_DESC) {
        id
        name
        email
        rating
    }
}
`
class UserOverview extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            users: undefined
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.allUsersQuery.loading && !nextProps.allUsersQuery.error) {

            this.setState({
                users: nextProps.allUsersQuery.allUsers
            })
        }
    }

    render() {

        if (this.props.allUsersQuery.loading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>All Users:</Text>
                    <FlatList data={
                        this.state.users.map((item) => {
                            return { key: item.id, name: item.name, email: item.email, rating: item.rating }
                        })
                    }
                        renderItem={({ item }) => <Text style={styles.title}>{item.name} (rating :{item.rating})</Text>}
                    />
                </View>
            </View>
        )
    }

}

export default graphql(allUsersQuery, { name: 'allUsersQuery', })(UserOverview)

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
