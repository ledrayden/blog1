// Dependencies
import React, { Component } from 'react';
import {
	View, TextInput, 
	Text, Image, TouchableOpacity, CheckBox,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import auth from '@react-native-firebase/auth';

// Components
// import Loading from '../../components/loading';
import Button from '../../components/button';
import Input from '../../components/input';
import printHOC from '../../hoc/print';
import Loading from '../../components/loading';

// Styles
import { styles } from './styles';


import userImg from '../../assets/icons/usuario.png'
import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Email: null,
			Password: null,
			loading: true,
		};
	}

	componentDidMount() {
		// Tema HOC
		// const { print } = this.props;
		// print('Login...');

		// auth()
		// 	.onAuthStateChanged((usr) => {
		// 		console.log({ usr })
		// 		if (usr) {
		// 			this.setState(
		// 				() => ({ loading: false }),
		// 				() => this.props.navigation.navigate('Home'),
		// 			)
		// 		} else {
		// 			this.setState({ loading: false });
		// 		}
		// 	})
	}

	render() {
		const { Email, Password, loading } = this.state;
		const apiUrl = 'http://192.168.1.88:8000';
		return (
			<Loading loading={false}>
				<View style={styles.container}>					
					<View style={styles.subcontainer}>
						<Image
							source={userImg}
							style={styles.img}
						/>
					</View>

					<View style={styles.subcontainer}>						
						<Input 
							title="Email"
							custom={{
								value:Email,
								onChangeText: em => this.setState({ Email: em }),								
							}}
						/>		

						<Input 
							title="Password"
							custom={{
								value:Password,
								onChangeText: psw => this.setState({ Password: psw }),
								secureTextEntry: true,
							}}
						/>					

						{/* <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateUser')}> */}
						{/* navigate recibe dos parametros: primeramente la ruta o la etiqueta hacia que pantalla va y como segundo parametro es un objeto que queramos mandar, 
							por ejemplo parametros que va a recibir nuestro otro componente */}
						{/* <TouchableOpacity style={styles.btn} onPress={ () => this.props.navigation.navigate('CreateUser', { ID: 1 })}>
							<Text style={{ color: '#FFF', fontWeight: 'bold', marginTop: 10 }}>Create An Account</Text>
						</TouchableOpacity> */}
						<Button 
							title="Login" 
							action={ () => { 
								//console.log(Email, Password);
								//this.props.navigation.navigate('CreateUser', { ID: 1 })
								axios({
									method: 'post',
									url: `${apiUrl}/api/login`,
									data: {
										email: this.state.Email,
										password: this.state.Password,
									}
								}).then(res => {
									console.log(res.data);
								}).catch(err => {
									console.log('error in request', err);
								});
							}}
						>							
						</Button>
						<View style={styles.checkboxContainer}>
							<CheckBox
								value={}
							/>
						</View>
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate('CreateUser')}
						>
							<Text style={{ color: '#FFF', fontWeight: 'bold', marginTop: 10 }}>Create An Account</Text>
						</TouchableOpacity>
					</View>					
				</View>
			</Loading>
			
		);
	}
}

//export default printHOC(Login);
export default Login;