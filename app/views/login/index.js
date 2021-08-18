// Dependencies
import React, { useState, useEffect } from 'react';
import {
	View, TextInput, Text, Image, TouchableOpacity, CheckBox, KeyboardAvoidingView, TouchableWithoutFeedback,
    Platform, Keyboard,
} from 'react-native';
// import * as Keychain from 'react-native-keychain';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
//import auth from '@react-native-firebase/auth';

// Components
// import Loading from '../../components/loading';
import Button from '../../components/button';
import Input from '../../components/input';
import printHOC from '../../hoc/print';
import Loading from '../../components/loading';

// Styles
import { styles } from './styles';


import userImg from '../../assets/icons/usuario.png';
import axios from 'axios';
//import { and } from 'react-native-reanimated';

// import { _storeData, _storeData2, _retrieveData, STORAGE_LOGIN_EMAIL, STORAGE_LOGIN_PASSWORD, STORAGE_LOGIN_EMAIL_PASSWORD} from '../../utils/asyncStorage';

//const apiUrl = 'http://192.168.1.88:8000';
const apiUrl = 'http://192.168.1.115:8000';

const STORAGE_LOGIN_EMAIL = 'MyStorageLoginEmailKey';
const STORAGE_LOGIN_PASSWORD = 'MyStorageLoginPasswordkey';

export default function Login({ navigation }) {
    // const { asd } = route.params;
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');    
    const [ isSelected, setSelection ] = useState(false);    
    const [ preLogTest, setPreLogTest ] = useState(false);    
    const [ loading, setLoading ] = useState(true);    
    
    // const mex = (route.params.sonido) ? '#sonido existe#': '#sonido no existe#';    

    const screenCreateUser = () => {
        navigation.navigate('CreateUser');
    }

    const screenHome = (id) => {
        navigation.navigate('Home', {
            userId: id,                       
        });
    }

    useFocusEffect(
        React.useCallback(() => {
            setEmail('');
            setPassword('');
            return () => {
                console.log('quitando focus');
            };
        },[])
    )

    useEffect(() => {
        console.log('Primer useEffect');
        checkCredentialStatus();                
        // removeCredential(STORAGE_LOGIN_EMAIL);
        // removeCredential(STORAGE_LOGIN_PASSWORD);
    },[]);
    
    useEffect(() => {
        if (preLogTest ) {            
            login();
        }
    }, [password, email]);    

    
    const checkCredentialStatus = async () => {
        try{
            let [ emailResult, passwordResult ] = await Promise.all([checkEmailStatus(STORAGE_LOGIN_EMAIL), checkPasswordStatus(STORAGE_LOGIN_PASSWORD)]);        
            if (emailResult && passwordResult){                
                setPreLogTest(true);
                setEmail(emailResult);
                setPassword(passwordResult);
                
            }else{
                setLoading(false);
                console.log('else: loading a false');
            }
            
        }catch(error){
            console.log('expo secure store couldn\'t be accessed!', error);
            setLoading(false);
            console.log('catch: loading a false');
        }
        
    }

    const checkEmailStatus = async (key) => {                 
        const result = await SecureStore.getItemAsync(key);
        return result;        
    }

    const checkPasswordStatus = async (key) => {                 
        const result = await SecureStore.getItemAsync(key);            
        return result;        
    }

    const removeCredential = async (key) => {
        try {
          const credential = await SecureStore.deleteItemAsync(key);          
        } catch (error) {
          console.log('expo secure store couldn\'t be accessed!', error);
        }
    }    

    const login =  async () => {
		try {
            const response = await axios({
                method: 'post',
                url: `${apiUrl}/api/login`,			
                data: {
                    email: email,
                    password: password,
                } 
            });
            if(response.data.message === 'success'){
                console.log('LA respuesta es:', response.data);
                console.log('Email =', email, 'Password =', password);
                var id = response.data.id;
                await SecureStore.setItemAsync(STORAGE_LOGIN_EMAIL, email);
                await SecureStore.setItemAsync(STORAGE_LOGIN_PASSWORD, password);
                setPreLogTest(false);
                setLoading(false);
                screenHome(id);
            }else{
                console.log('Datos de login incorrectos');
            }
        }catch(err) {
            console.log('error in request', err);
        }
    }
    
    // useEffect(() => {
    //     // if (message === 'success') {
    //     if (_userId > 0) {
    //         console.log('Message valor:', message);
    //         screenHome();
    //     }
    // },[_userId]);

    return(                    
        // <Loading loading={loading}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1}}
            >
                <View style={styles.container}>					
                    {/* <View style={styles.subcontainer}>
                        <Image
                            source={userImg}
                            style={styles.img}
                        />
                    </View> */}

                    <View style={styles.subcontainer}>	                            
                        <Image
                            source={userImg}
                            style={styles.img}
                        />                          		
                        <Input 
                            title="Email"
                            custom={{
                                value:email,
                                onChangeText: setEmail,								
                            }}
                        />		

                        <Input 
                            title="Password"
                            custom={{
                                value:password,
                                onChangeText: setPassword,
                                secureTextEntry: true,
                            }}
                        />					

                        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateUser')}> */}
                        {/* navigate recibe dos parametros: primeramente la ruta o la etiqueta hacia que pantalla va y como segundo parametro es un objeto que queramos mandar, 
                            por ejemplo parametros que va a recibir nuestro otro componente */}
                        {/* <TouchableOpacity style={styles.btn} onPress={ () => this.props.navigation.navigate('CreateUser', { ID: 1 })}>
                            <Text style={{ color: '#FFF', fontWeight: 'bold', marginTop: 10 }}>Create An Account</Text>
                        </TouchableOpacity> */}
                        {/* <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={isSelected}
                                onValueChange={setSelection}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>Remember me</Text>
                        </View> */}
                        <Button 
                            title="Login"
                            action={ () => {                            
                                console.log("presionando boton login...");
                                login();
                            }}                        
                        >							
                        </Button>                    
                        <TouchableOpacity
                            onPress={screenCreateUser}
                        >
                            <Text style={{ color: '#FFF', fontWeight: 'bold', marginTop: 30 }}>Create An Account</Text>
                        </TouchableOpacity>                    
                    </View>					
                </View>  
            </KeyboardAvoidingView>                  
        // </Loading>        
    )
}
