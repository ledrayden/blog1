// Dependencies
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'rgba(1,1,1, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',        
    },
    subcontainer: {
        height: '85%',
        width: '90%',
        // backgroundColor: 'rgba(134,135,118,0.5)', 
        backgroundColor: '#6685A4',
        paddingHorizontal: 10,
    },
    headercontainer: {
        height: 45,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // paddingHorizontal: 10,
    },
    btnClose: {
        width: 25,
        height: 25,
        tintColor: '#FFF',
    }
});