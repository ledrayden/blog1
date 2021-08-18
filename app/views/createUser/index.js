import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
//import axios from 'axios';
//import test from '../../api/test';
import createUser from '../../api/user';

import printHOC from '../../hoc/print';

import { UploadFile } from '../../utils/uploadFile';
import userImg from '../../assets/icons/usuario.png';

const apiUrl = 'http://192.168.1.115:8000';



export default function Create_User({navigation}) {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ url_image, setUrlImage ] = useState(null);
    const [ uri, setUri ] = useState('');

    const screenHome = () => {
        navigation.navigate('Home');
    } 

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
    }, []);
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);        
        
        if (!result.cancelled) {
            //setUri(result.uri);
            UploadFile(result)
            .then((file) => {
                console.log({file});
                setUri(file.secure_url);
            });
        }
    };
    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1}}
        >
            <View style={styles.container} >
                <TouchableOpacity
                    style={{
                        height: 100, 
                        width: 100,
                        borderRadius: 50,
                        borderColor: '#FFF',
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={pickImage}
                >

                    <Image
                        source={uri ? {uri} : userImg}
                        style={{
                            height: 60,
                            width: 60,
                        }}
                        >
                        

                    </Image> 

                </TouchableOpacity>
                <Text style={styles.title}>Name:</Text>
                <TextInput 
                    style={styles.text} 
                    value={name}
                    onChangeText={setName}
                    //onChangeText={val => setEmail(val)}
                />
                <Text style={styles.title}>Email:</Text>
                <TextInput
                    style={styles.text}
                    value={email}
                    onChangeText={setEmail}
                    //onChangeText={val => setPassword(val)}
                />
                <Text style={styles.title}>Password:</Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.text} 
                    value={password} 
                    onChangeText={setPassword}                
                />

                <TouchableOpacity
                    style={styles.btn} 
                    onPress={() => {                    
                        const usr = {
                            name: name,
                            email: email,
                            password: password,
                            image_url: uri,
                        }
                        //console.log({name, email, password, uri});
                        console.log({usr});
                        createUser.post(usr)
                            .then((rows) => {
                                console.log('Rows ID', rows.data.id);
                                axios({
                                    method: 'post',
                                    url: `${apiUrl}/api/login`,
                                    data: {
                                        email: email,
                                        password: password,
                                    }
                                }).then(res => {
                                    console.log('Valor res:', res.data);
                                    screenHome();
                                }).catch(err => {
                                    console.log('error in request', err);
                                })
                            });
                    }}
                >
                    <Text style={styles.title}>Save</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );   
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34495e',
        paddingVertical: 20,
        paddingHorizontal: 30,
        justifyContent: 'flex-end',
    },
    title: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    text: {
        color: '#FFF',
        borderWidth: 1,
        borderColor: '#FFF',
        height: 45,
        width: '100%',
        paddingHorizontal: 10,
    },
    btn: {        
        borderWidth: 1,
        borderColor: '#FFF',
        height: 45,
        width: '100%',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',       
    },
});

//export default printHOC(CreateUser);
//export default CreateUser;