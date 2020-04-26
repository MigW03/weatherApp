import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Feather'

export default function shortcutItem(props) {
  return (
    <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.container} onPress={props.mainAction}>
            <Text style={styles.cityName}>{props.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconView} onPress={props.deleteAction}>
          <Icon name='trash-2' size={24} color='red'/>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    itemContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    container: {
        width: '70%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffffdd',
        padding: 8,
        marginRight: 0,
        margin: 10,
        borderRadius: 16
    },
    cityName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#585858'
    },
    iconView: {
      width: '15%',
      alignItems: 'center',
      justifyContent: 'center'
    }
})
