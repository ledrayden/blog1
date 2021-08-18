import React, { useLayoutEffect, useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList, DrawerItem
  } from '@react-navigation/drawer';
import * as SecureStore from 'expo-secure-store';

import logout from '../../assets/icons/logout.png';
import user from '../../assets/icons/usuario.png';

// import { _removeData, STORAGE_LOGIN_EMAIL, STORAGE_LOGIN_PASSWORD } from '../../utils/asyncStorage';

const STORAGE_LOGIN_EMAIL = 'MyStorageLoginEmailKey';
const STORAGE_LOGIN_PASSWORD = 'MyStorageLoginPasswordkey';

export default function CustomDrawerContent(props) {
    const [avatar, setAvatar] = useState('');

    const removeCredential = async (key) => {
        try {
          const credential = await SecureStore.deleteItemAsync(key);          
        } catch (error) {
          console.log('expo secure store couldn\'t be accessed!', error);
        }
    }  

    return (
        <View style={{ flex: 1, backgroundColor: '#283541' }}>
            <View style={{ height: 250, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={avatar ? { uri: avatar } : user} style={{ width: 150, height: 150, tintColor: 'yellow' }}/>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList 
                    {...props}
                    activeBackgroundColor='#6685A4'
                    labelStyle={{color: '#FFF'}}
                 />
            </DrawerContentScrollView>
            <DrawerItem
                label='Sign out'
                labelStyle={{color: '#FFF'}}
                style={{ marginBottom: 25 }}
                icon={() => (
                    <Image source={logout} style={{ width:20, height:20, tintColor:'#FFF' }}/>
                )}
                onPress={() => {
                    
                    removeCredential(STORAGE_LOGIN_EMAIL);
                    removeCredential(STORAGE_LOGIN_PASSWORD);
                    // props.navigation.navigate('Login', {sonido: 'maiu'});
                    props.navigation.navigate('Login');
                    
                }}
            />
        </View>
    
    );
}