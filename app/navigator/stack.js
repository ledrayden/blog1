import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Por lo general stack navigator necesita un container para manejar los estados de la pantalla o 
// manejar los estados de nuestra navegacion. Es por eso que necesitamos un NavigationContainer.
import { NavigationContainer } from '@react-navigation/native';

// Screen 
import Routes from './stackRoutes';
import { TouchableOpacity, View, Text, Image } from 'react-native';
//import { color } from 'react-native-reanimated';
import Home from './drawer';

// Assets
import back from '../assets/icons/back.png';

const Stack = createStackNavigator();

const Header = () => (
    <View style={{ width: '100%', height: 45, backgroundColor: 'red' }}></View>
);

const getButton = ({ navigation }) => (
    //<TouchableOpacity style={{ width:20, height: 20, backgroundColor: '#000' }}>
    <TouchableOpacity 
        style={{ flexDirection: 'row' }}
        onPress={() => navigation.goBack()}
    >
        <Image source={back} style={{ width: 15, height: 15, tintColor: '#FFF', marginLeft: 5, marginRight: 5, marginTop: 3 }}></Image>
        <Text style={{color: '#FFF'}}>Back</Text>
    </TouchableOpacity>);



function AppStack() {
    return (        
        <NavigationContainer>            
            <Stack.Navigator>
                {/* <Stack.Screen 
                    name="Loading" 
                    component={Routes.Start_Screen} 
                    options={{ 
                        //title: 'Lang', 
                        headerShown:false,
                        //headerTitleAlign: 'center',

                        // header, headerRight, headerLeft: reciben una funcion que retorna un componente de react native
                        // header: Header,
                        // headerRight: getButton,
                        // headerLeft: getButton,
                    }}
                /> */}
                <Stack.Screen 
                    name="Login" 
                    component={Routes.Login} 
                    options={{ 
                        title: 'Lang', 
                        headerShown:false,
                        headerTitleAlign: 'center',

                        // header, headerRight, headerLeft: reciben una funcion que retorna un componente de react native
                        // header: Header,
                        // headerRight: getButton,
                        // headerLeft: getButton,
                    }}
                />
                <Stack.Screen 
                    name="CreateUser" 
                    component={Routes.CreateUser}
                    // Recordar que la funcion en options recibe como parametro props de la navegacion con los cuales puedo acceder a 
                    // propiedades como navigate o goBack(para retroceder pagina)
                    options={(nav) => ({
                        title: 'Create User',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#6685A4'
                        },
                        headerTintColor: '#FFF',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        headerLeft: () => getButton(nav),
                    })}
                />
                <Stack.Screen
                    name= "Home"
                    component={Home}
                    options={{
                        title: 'Modal',
                        headerShown: false,
                        headerTitleAlign: 'center',
                    }}
                />                
                <Stack.Screen
                    name= "IPicker"
                    component={Routes.Image_Picker}
                    options={{
                        title: 'Image Picker',
                        headerShown: false,
                        headerTitleAlign: 'center',
                    }}
                />
                
                {/* <Stack.Screen
                    name= "Post"
                    component={Routes.Posts}
                    options={{
                        title: 'Los post',
                        headerShown: false,
                        headerTitleAlign: 'center',
                    }}
                /> */}

                {/* el props llamado options puede recibir dos cosas: un objeto o una funcion que retorna un objeto.
                El objeto puede recibir distintos atributos */}
                
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default AppStack;