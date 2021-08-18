import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
//import { NavigationContainer } from '@react-navigation/native';


//Components
import DrawerComponent from '../components/drawer';

// Routes
import Routes from './drawerRoutes';

  
  const Drawer = createDrawerNavigator();
  
  export default function Drawer_start({route}) {
    // const { userId } = route.params;
    // console.log("####La id del User es:", userId);
    return (  
      // Para que nos agarre el header como tal y no el header del stack se utiliza headerMode="screen". No siempre ocurre pero puede ocurrir.
      // A veces no es necesario colocarlo.    
        <Drawer.Navigator 
          initialRouteName="Home" 
          headerMode="screen"
          drawerContent={(props) => <DrawerComponent {...props}/> }  
        >
          <Drawer.Screen name="Home" component={Routes.Dwr} options={{headerShown:true, headerTitleAlign:'center'}} />
          <Drawer.Screen name="My Posts" component={Routes.MyPosts} initialParams={{obj: route.params}}/>          
        </Drawer.Navigator>
    );
  }