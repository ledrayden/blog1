import React, { Component, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
//import axios from 'axios';
//import test from '../../api/test';
import createUser from '../../api/user';

import printHOC from '../../hoc/print';



class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Email: null,
            Password: null,
            Phone: null,
        };
    }

    componentDidMount() {
        // Tema de HOC
        //const { print } = this.props;
		//print('CreateUser...');


        // Recibir parametros desde navigate:
        console.log(this.props.route);

        //test.get().then(res => console.log({ res }));
        // const _path = 'https://pokemon-go1.p.rapidapi.com/pokemon_stats.json'
        // const _pathInst = 'https://pokemon-go1.p.rapidapi.com/'
        // const _headers = {
        //     "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
        //     "x-rapidapi-key": "cfa115aad1msh305ef3ffc77f4c4p15fe57jsn6029c6a90445",
        //     "useQueryString": true,
        // };

        // // Tres formas de trabajar con axios y hacer una peticion get()
        // // 1.- Recibe con primer parametro una url y como segundo parametro una configuracion en este caso seria _headers
        // // esto retorna una Promise(promesa) asi que puedo usar las funciones then para obtener los resultados de esa Promise
        // axios.get(_path, {
        //     headers: _headers,
        // }).then(res1 => console.log({ res1 }));

        // // 2.- Ahora lo ejecutaremos como una funcion a axios
        // // Primero le pasamos unas configuraciones: dentro recibira method(por defecto si no se pone method es get)
        // axios({
        //     method: 'get',
        //     headers: _headers,
        //     url: _path,
        // }).then(res2 => console.log({ res2 }));

        // // 3.- Forma mas importante de usar
        // // creamos una constante que va a ser una instancia de axios con el metodo create() que crea una instancia 
        // // de axios, que recibe un objeto de configuracion
        // const instAxios = axios.create({
        //     baseURL: _pathInst,
        //     headers: _headers,
        // });

        // // a la instancia de axios le pasamos como funcion como tal una configuracion
        // instAxios({
        //     method: 'get',
        //     url: 'pokemon_stats.json',
        // }).then(res3 => console.log({ res3 }));
    }

    render() {
       const { Email, Password, Phone } = this.state;
//function CreateUser () {
    // useState: yo puedo estar trabajando estados que son propios de react en componentes de funcion
    // El arreglo tienes dos valores: el Email que va a ser el valor del estado y setEmail que sera la funcion que va a modificar ese estado.
    // useState te va a devolver un arreglo con esos dos valos. Tambien podemos inicializar ese estado con useState('Hello') 
    // const [Email, setEmail] = useState('Hello');
    // const [Password, setPassword] = useState();
    // const [Phone, setPhone] = useState();
        return (
            <View style={styles.container} >
                <Text style={styles.title}>Email:</Text>
                <TextInput 
                    style={styles.text} 
                    value={Email} 
                    onChangeText={val => this.setState({ Email: val })}
                    //onChangeText={val => setEmail(val)}
                />
                <Text style={styles.title}>Password:</Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.text} 
                    value={Password} 
                    onChangeText={val => this.setState({ Password: val })}
                    //onChangeText={val => setPassword(val)}
                />
                <Text style={styles.title}>Phone:</Text>
                <TextInput 
                    style={styles.text} 
                    value={Phone} 
                    onChangeText={val => this.setState({ Phone: val })}
                    //onChangeText={val => setPhone(val)}
                />

                <TouchableOpacity style={styles.btn} onPress={() => {console.log({Email, Password, Phone}); createUser.post();}}>
                    <Text style={styles.title}>Save:</Text>
                </TouchableOpacity>
            </View>
        );   
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34495e',
        paddingVertical: 20,
        paddingHorizontal: 30,
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
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',       
    },
});

//export default printHOC(CreateUser);
export default CreateUser;