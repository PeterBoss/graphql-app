import React from 'react'
import { View, Text, StyleSheet, FlatList, } from 'react-native'

export default class UserSolutions extends React.Component {

    render() {
        return (
            <View style={styles.container}>

                <View>
                    <Text style={styles.title}>Solutions: </Text>
                    <FlatList data={
                        this.props.solutions.map((item) => {
                            return { key: item.id, description: item.assignment.description, rating: item.rating }
                        })
                    }
                        renderItem={({ item }) => <Text style={styles.title}>{item.description} (Rating: {item.rating})</Text>}
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