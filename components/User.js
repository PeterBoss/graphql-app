import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class User extends React.Component {


    render() {
        return (
            <View>
                <Text style={styles.title}>
                    Name: {this.props.user.name}
                </Text>
                <Text style={styles.title}>
                    Email: {this.props.user.email}
                </Text>
                <Text style={styles.title}>
                    Rating: {this.props.user.rating}
                </Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        padding: 22,
        color: 'white',
        fontWeight: '300',
        fontSize: 16,
    },
})