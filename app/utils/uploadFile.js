import Crypto from 'crypto-js';
import { View, Text, TouchableOpacity, Image, Platform, Button } from 'react-native';

export function UploadFile(file) {
    const uri = file.uri;
    //const type = file.type;        
    const type = 'image/jpeg';

    const arr = file.uri.split('.');
    const ext = arr[arr.length - 1];

    const ts = Math.round((new Date()).getTime() / 1000);
    const name = `${ts}.${ext}`;
    //const name = result.name || 'image.jpg';

    console.log({ name });


    const photo = { uri, type, name };

    const apiKey = '863415214199843';
    const apiSecret = 'tsWN9BsIJWlK8psRYQi35AspBcQ';
    const hash = `timestamp=${ts}${apiSecret}`;
    const signature = Crypto.SHA1(hash).toString();
    const url = 'https://api.cloudinary.com/v1_1/spacecity35/image/upload';

    const formData = new FormData();
    formData.append('file', photo);
    formData.append('timestamp', ts);
    formData.append('api_key', apiKey);
    formData.append('signature', signature);

    //console.log({ name })

    // fetch(): nos permite hacer consultas a APIS
    return fetch(url, {
        method: 'POST',
        body: formData,
    })
    .then(res => res.json())
    // .then(res => console.log({ res }))
    .catch(err => console.log({ err }))
}