import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// import { Container } from './styles';

export default function shortcutItem(props) {
  return (
    <View>
        <TouchableOpacity style={styles.container}>
            <Text>{props.name}</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '70%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffffdd',
        padding: 8,
        margin: 10,
        borderRadius: 16
    }
})
