import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default function mainPage({navigation}) {
  return (
    <View style={styles.container}>
        <Text>Main page</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LocationPage')}>
            <Text>CLima na sua localização</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})