import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

export default class User extends React.Component {


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Name: {this.props.user.name}
                </Text>
                <Text style={styles.title}>
                    Email: {this.props.user.email}
                </Text>
                <Text style={styles.title}>
                    Rating: {this.props.user.rating}
                </Text>
                <View>
                    <Text style={styles.title}>Solutions: </Text>
                    <FlatList data={
                        this.props.user.solutions.map((item) => {
                            return { key: item.id, description: item.assignment.description, rating: item.rating }
                        })
                    }
                        renderItem={({ item }) => <Text style={styles.title}>{item.description} ({item.rating} points)</Text>}
                    />
                </View>
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
})