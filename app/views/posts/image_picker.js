// Dependencies
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, Button } from 'react-native';
//import { launchCamera ,launchImageLibrary } from 'react-native-image-picker';
//import { connectActionSheet ,ActionSheetProvider, useActionSheet } from "@expo/react-native-action-sheet";
//import * as ImagePicker from "react-native-image-picker";
//import ActionSheet from 'react-native-actionsheet'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import Crypto from 'crypto-js';



// Components
//import Button from '../../components/button';
import Modal_Example from '../../components/modal';
import { UploadFile } from '../../utils/uploadFile';

// Styles
import { styles2 } from './styles2';

import close from '../../assets/icons/close.png';

const Image_Picker = () => {
    const [image, setImage] = useState(null);
    // const [view, setView] = useState(false);
    // let actionsheet = useRef();
    // let optionArray = [
    //     'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Cancel'
    // ];

    // const showActionSheet = () => {
    //     actionsheet.current.show();
    // }
    //const { showActionSheetWithOptions } = useActionSheet();
    // const options = [
    //     "Scegli dalla libreria",
    //     "Scatta una foto",
    //     "Carica un file",
    //     "Annulla",
    //   ];
    //const destructiveButtonIndex = 0;
    //const cancelButtonIndex = 2;

    // const getPermission = async () => {

    // }    

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

        UploadFile(result);        
        
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        //<ActionSheetProvider>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {/* <TouchableOpacity style={styles2.touch_1} onPress={pickImage}              
                    
                <View>
                     <Text style={styles2.text_1}>Show</Text>
                 </View>
            </TouchableOpacity> */}
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}           
            {/* <Modal_Example
                visible={view}
                onClose={() => setView(false)}
            >
                <View style={{width: 30, height: 30, backgroundColor: 'red'}}></View>
            </Modal_Example> */}
        </View>        
    );
}

//const ConnectApp = connectActionSheet(Image_Picker)

export default Image_Picker;
//export default ConnectApp;