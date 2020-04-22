import React from 'react';
import { View, StyleSheet, Text, StatusBar, ActivityIndicator} from 'react-native';

export default function preLoadedData(props) {
  return (
    <>
        <StatusBar backgroundColor='#FFF' />
        <View style={styles.container}>
            <Text style={styles.loadingText}>Carregando dados...</Text>
            <ActivityIndicator size='large' color='#0066ff'/>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    loadingText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})