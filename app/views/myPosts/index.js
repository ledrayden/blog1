// Dependencies
import React, { useLayoutEffect, useEffect, useState} from 'react';
import { TouchableOpacity, Image, View, FlatList, Text, Alert } from 'react-native';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import * as ImagePicker from 'expo-image-picker';

// API
import postsAPI from '../../api/post';
import postStoreAPI from '../../api/postStore';
import postDeleteAPI from '../../api/postDelete';

// Components
import Button from '../../components/button';
import Modal from '../../components/modal';
import Input from '../../components/input';

// Assets
import drawer from '../../assets/icons/menu.png';
import add from '../../assets/icons/add.png';
import userImg from '../../assets/icons/usuario.png';

import { UploadFile } from '../../utils/uploadFile';

// Styles
import { customStyles, styles } from './styles'
import axios from 'axios';

const apiUrl = 'http://192.168.1.115:8000';


const Posts = ({ route, navigation }) => {
    const { obj } = route.params;
    
    const [ view, setView ] = useState(false);
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const [ image, setImage ] = useState('');
    const [ posts, setPosts ] = useState([]);
    const isOpen = useIsDrawerOpen();
    const [ id, setId ] = useState(0);
    const [ errors, setErrors ] = useState({
       title: '',
       content: '',
       image: '',
    });
    

    

    useEffect(() => {
        console.log('Valor del Id user:', obj.userId);        
        setId(obj.userId);

        postsAPI.get()
            // .then(({ data = [] }) => {
            //     setPosts(data);
            //     console.log('Valor data:', data);            
            .then((data) => {                
                setPosts(data);
                // console.log('Mi data:', data);
            }).catch(err => {
                console.log('error in response', err);
            })
        
    },[]);

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

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "My Posts",
            headerStyle: {
                backgroundColor: 'blue',
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerShown: true,
            headerTitleAlign:'center',
            headerRight: () => (
                <TouchableOpacity 
                    style={{ flexDirection: 'row' }}
                    onPress={() => setView(true)}
                >
                    <Image source={add} style={styles.addBtn}></Image>                    
                </TouchableOpacity>
            ),
            headerLeft: () => null
        })
    }, [navigation])

    const cleanStates = () => {
        setContent('');
        setTitle('');
        setImage('');
        setView(false);
        setErrors({
            title: '',
            content: '',
            image: '',
        });        
    }
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
                setImage(file.secure_url);
                setErrors(_errors => ({ ..._errors, image: '' }));
            });
        }
    };

    const renderItem = ({item, index}) => (
        <View style={styles.itemContainer} >
            <Image source={{ uri: item.image }} style={styles.itemImage}/>

            <View style={styles.textContainerRow}>
                <Text style={styles.itemTitle}>{item.title}</Text>                

                <Text style={styles.itemContent}>{item.content}</Text>
            </View>

            <View style={styles.buttonContainerRow}>
                <TouchableOpacity 
                    onPress={() => {
                        alert("Edit presionado");
                    }}
                >
                    <Text style={styles.buttonTxtRow}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            'Alert',
                            'Do you want to delete this post?',
                            [
                                {
                                    'text': 'Yes',
                                    onPress: () => {
                                        postDeleteAPI.delete(item.id)
                                            .then((res) => {
                                                console.log(res);
                                                setPosts((_posts) => {                                    
                                                    _posts.splice(index, 1);
                                                    return [..._posts];
                                                });
                                            }).catch(err => {
                                                console.log('error in request', err);
                                            });    
                                    }
                                },
                                {
                                    'text': 'No',
                                    'style': 'cancel',
                                }
                            ]
                        );
                                            
                    }}
                >
                    <Text style={styles.buttonTxtRow}>Delete</Text>
                </TouchableOpacity>
            </View>
                        
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item, index) => item + index.toString()}
                // keyExtractor={(item) => item.id}
            >                
            </FlatList>

            <Modal
                visible={view}
                onClose={() => setView(false)}
            >
                <Input 
                    title="Title"
                    custom={{
                        value:title,
                        onChangeText: (ttl) => {
                            setTitle(ttl);
                            setErrors(_errors => ({ ..._errors, title: '' }));
                        },
                    }}
                />
                {errors.title ? <Text style={styles.errorLabel}>{errors.title}</Text> : null}

                <Input 
                    title="Content"
                    custom={{
                        value:content,
                        onChangeText: (ctn) => {
                            setContent(ctn);
                            setErrors((_errors) => ({ ..._errors, content: '' }));
                        },
                        multiline:true,
                        style: customStyles
                    }}
                />
                {errors.content ? <Text style={styles.errorLabel}>{errors.content}</Text> : null}

                <Button action={pickImage} title='Load Image'/>
                {errors.image ? <Text style={styles.errorLabel}>{errors.image}</Text> : null}
                {image ? (<Text style={styles.imageLoaded}>Image Loaded</Text>): null}

                <Button title='Save' 
                    action={() => {
                        let err  = {};
                        
                        const pst = {
                            user_id : id,
                            title : title,
                            content : content,
                            image : image,
                        }
                        console.log('Datos post a subir:', pst);
                        if(!title) err = {...err, title: 'Please fill in the title field'};
                        if(!content) err = {...err, content: 'Please fill in the content field'};
                        if(!image) err = {...err, image: 'Please select a image'};

                        if(err.title || err.content || err.image){
                            setErrors(_errors => ({..._errors, ...err}));
                        }else{
                            postStoreAPI.post(pst)
                            .then((data) => {
                                // console.log('The response is:', res.message);
                                console.log('The response is:', data);
                                // Esta función recibe el estado actual de post y trabaja con el,
                                // devolviendo una lista
                                setPosts((_posts) => {                                    
                                    return [..._posts, data]
                                    
                                });
                                cleanStates();
                            }).catch(err => {
                                console.log('error in request', err);
                            });
                        }
                        
                }} 
                />
            </Modal>
        </View>
    );
}

export default Posts;