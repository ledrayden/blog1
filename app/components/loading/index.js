// Dependencies
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

function Loading({ loading, children }) {
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color='black'/>
            </View>
        );
    }

    return children;
}

export default Loading;


/**
 * Component
 * prop loading
 */