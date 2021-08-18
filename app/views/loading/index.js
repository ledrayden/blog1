import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/loading';
import { Button, View } from 'react-native';

import { _storeData, _retrieveData, STORAGE_LOGIN_EMAIL_PASSWORD, _storeData2, _retrieveData2, _removeData} from '../../utils/asyncStorage';

const apiUrl = 'http://192.168.1.115:8000';

export default function Start_Screen({ navigation }) {
	const [ em1, setEm1 ] = useState('');
	const [ pass1, setPass1 ] = useState('');
	const obj = { email: 'evygt33', password: '333ev546' };
    

    const screenHome = () => {
    	navigation.navigate('Home');
    }

    const screenLogin = () => {
    	navigation.navigate('Login');
    }   

    const login = (em ,pass) => {
		axios({
			method: 'post',
			url: `${apiUrl}/api/login`,			
			data: {
				email: em,
				password: pass,
			}      
		}).then(res => {
			console.log(res.data);
			console.log('LA respuesta es:', res.data);
			//console.log('EM1:', em1._W);
			//console.log('PASS1:', pass1._W);

			if(res.data === 'success'){              
			  screenHome();            
			  console.log('Go screenHome');
			}else if(res.data === 'fail') {
			  screenLogin();
			  console.log('Go screenLogin');
			}
		}).catch(err => {
			console.log('error in request', err);        
		});
    }

    useEffect(() => {      
		_retrieveData2(STORAGE_LOGIN_EMAIL_PASSWORD).then((res) => {
		if(res === null) {
			console.log('Key no existe en el dispositivo');
			screenLogin();
			console.log('Go screenLogin');
		}
		else{
			console.log('tututu:', res);
			const datos = JSON.parse(res);
			setEm1(datos.email);
			setPass1(datos.password);
		}		
		
		}).catch(err => {
		console.log(err);
		});
    },[])      

    
    if(em1 !== '' && pass1 !== '') {

		console.log('Valor email final:', em1);
		console.log('Valor pass final:', pass1);
		
		login(em1, pass1);
      
      
    }

	// login(em1, pass1);

    //_storeData2(STORAGE_LOGIN_EMAIL_PASSWORD, obj);
    // _retrieveData2(STORAGE_LOGIN_EMAIL_PASSWORD);
    //_removeData(STORAGE_LOGIN_EMAIL_PASSWORD);


    

    return(
        <Loading loading={true}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
				onPress={() => {
				//datos();
				console.log('Valor de em1', em1);
				console.log('Valor de pass1', pass1);
				//screenLogin();
				// login(em1, pass1);
				}}
				title="Presioname"
				color= '#841584'
            ></Button>
          </View>
        </Loading>
    )
}