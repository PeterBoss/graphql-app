import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Assignment extends React.Component {


  render() {
    return (

      <Text style={styles.title}>
        {this.props.description}
      </Text>

    )
  }
}

const styles = StyleSheet.create({
  title: {
    padding: 22,
    color: 'rgba(0,0,0,.8)',
    fontWeight: '300',
    fontSize: 16,
  },
})