import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/loading';
import { Button, View } from 'react-native';

import { _storeData, _retrieveData, STORAGE_LOGIN_EMAIL_PASSWORD, STORAGE_LOGIN_EMAIL, STORAGE_LOGIN_PASSWORD, _storeData2, _retrieveData2, _removeData} from '../../utils/asyncStorage';

const apiUrl = 'http://192.168.1.88:8000';

export default function Start_Screen({ navigation }) {
    const [ em1, setEm1 ] = useState('');
    const [ pass1, setPass1 ] = useState('');
    const obj = { email: 'n5@.com', password: 'n5' };
    
    
    // const em = _retrieveData(STORAGE_LOGIN_EMAIL);
    // const pass = _retrieveData(STORAGE_LOGIN_PASSWORD);

    const screenHome = () => {
      navigation.navigate('Home');
    }

    const screenLogin = () => {
      navigation.navigate('Login');
    }

    const login = (em, pass) => {
      axios({
        method: 'post',
        url: `${apiUrl}/api/login`,
        data: {
          email: em1,
          password: pass1,
        }
      //})
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

    // const datos = () => {
    //   da = JSON.parse(_retrieveData2('user'));
    //   em1 = da.name;
    //   pass1 = da.password;

    // }
    

    //JSON.parse(_retrieveData2('user'));
    //console.log('tututut:', _retrieveData2('user'));
    


    useEffect(() => {
      // const em1 = _retrieveData(STORAGE_LOGIN_EMAIL);
      // const pass1 = _retrieveData(STORAGE_LOGIN_PASSWORD);
      // const em = 'n5@.com';
      // const pass = 'n5';      
      
      // _retrieveData(
      //   STORAGE_LOGIN_EMAIL
      // ).then(res => {
      //   console.log('Res 1:', res);
      //   console.log('Tipo Res 1:', typeof res);
      //   setEm1(res);
      //   console.log('EM1:', em1);        
      // }).catch(err => {
      //   console.log('error in request', err);
      // });

      // _retrieveData(
      //   STORAGE_LOGIN_PASSWORD
      // ).then(res => {
      //   console.log('Res pass 1:', res);
      //   console.log('Tipo pass 1:', typeof res);
      //   setPass1(res);
      //   console.log('PASS!:', pass1);        
      // }).catch(err => {
      //   console.log('error in request', err);
      // });
      //console.log('EM2:', em1);
      
      // if (em !== null && pass !== null){
      // // if (em != 'fallo'){
      //   axios({
      //     method: 'post',
      //     url: `${apiUrl}/api/login`,
      //     data: {
      //         email: em,
      //         password: pass,
      //     }        
      //   }).then(res => {
      //       console.log(res.data);
      //       console.log('LA respuesta es:', res.data);
      //       //console.log('EM1:', em1._W);
      //       //console.log('PASS1:', pass1._W);
      //       if(res.data === 'success'){              
      //         screenHome();
      //       }else if(res.data === 'fail') {
      //         screenLogin();
      //         console.log('asdasada');
      //       }
            
      //   }).catch(err => {
      //       console.log('error in request', err);
      //       console.log(em);
      //   });
      // }else{
      //   console.log('no puedes logear');
      //   console.log('EM:', em);
      //   console.log('PASS:', pass);
      // }

      // var promise = new Promise(function(resolve, reject) {
      //   // call resolve if the method succeeds
      //   resolve(true);
      // })
      // //promise.then(bool => console.log('Bool is true'))
      // promise.then(res => { console.log('Bool es:', res) })

      // Promise.all([_retrieveData(STORAGE_LOGIN_EMAIL), _retrieveData(STORAGE_LOGIN_PASSWORD)])
      //   .then(result => {
      //     console.log(result);
      //     console.log('Tipo:', typeof result);          
      //     setEm1(result[0]);
      //     setPass1(result[1]);
          
      //   })
      //   .catch(error => console.log(`Error in promises ${error}`))

      
      _retrieveData2(STORAGE_LOGIN_EMAIL_PASSWORD).then((res) => {
        console.log('tututu:', res);
        const datos = JSON.parse(res);
        setEm1(datos.email);
        setPass1(datos.password);
        
      }).catch(err => {
        console.log(err);
      });

      // Promise.all([_retrieveData2(STORAGE_LOGIN_EMAIL_PASSWORD), login(em1, pass1)])
      //   .then(result => {
      //     console.log(result);
      //     console.log('Tipo:', typeof result);
          
      //     // setEm1(result[0]);
      //     // setPass1(result[1]);
      //     console.log('Result:', result[0]);
      //     console.log('Result tipo:', typeof result[0]);
      //     const datos = JSON.parse(result[0]);
      //     console.log('Datos:', datos);
      //     console.log('Datos tipo:', typeof datos);
      //     console.log('Email:', datos.email);

      //     setEm1(datos.email);
      //     setPass1(datos.password);

      //     // setEm(e);
      //     // setPass(p);


          
      //   })
      //   .catch(error => console.log(`Error in promises ${error}`))
      

    },[])

    //datos();

    //_removeData(STORAGE_LOGIN_EMAIL);
    
    

    
    if(em1 !== '' && pass1 !== '') {
      
      
      console.log('Valor email final:', em1);
      console.log('Valor pass final:', pass1);

      login(em1, pass1);
      
      
    }

     _storeData2(STORAGE_LOGIN_EMAIL_PASSWORD, obj);

    // _retrieveData2(STORAGE_LOGIN_EMAIL_PASSWORD);


    

    return(
        <Loading loading={true}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
              onPress={() => {
                //datos();
                console.log('Valor de em1', em1);
                console.log('Valor de pass1', pass1);
              }}
              title="Presioname"
              color= '#841584'
            ></Button>
          </View>
        </Loading>
    )
}