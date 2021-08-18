// Dependencies
import React, { useLayoutEffect} from 'react';
import { TouchableOpacity, Image, View, Button, Text } from 'react-native';
import { useIsDrawerOpen } from '@react-navigation/drawer';

// Assets
import drawer from '../../assets/icons/menu.png';

// Styles
import { styles } from './styles'

const Drawer_test = ({ navigation }) => {
    const isOpen = useIsDrawerOpen();   

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Drawer",
            headerStyle: {
                backgroundColor: 'blue',
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerShown: true,
            headerRight: () => (
                <TouchableOpacity 
                    style={{ flexDirection: 'row' }}
                    onPress={() => {
                        if(isOpen) navigation.closeDrawer();
                        else navigation.openDrawer();
                    }}
                >
                    <Image source={drawer} style={{ width: 20, height: 20, tintColor: '#FFF', marginLeft: 10, marginRight: 5, marginTop: 3 }}></Image>                    
                </TouchableOpacity>
            ),
            headerLeft: () => null
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            
        </View>
    );
    
}

export default Drawer_test;

