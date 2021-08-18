import React, { Component, useState, useEffect } from 'react';
//import CreateUser from './app/views/createUser';
import { View, Text, Button, TextInput, Alert, StyleSheet } from 'react-native';
import Login from './app/views/login';
import AppStack from './app/navigator/stack';
import Principal from './app/views/posts/drawer_ejemplo';
import axios from 'axios';


export default function App() {
  const [ listaLibros, setListaLibros ] = useState([])
  const [ nam, setName ] = useState('')
  const [ ema, setEmail ] = useState('') 
  const [ pass, setPass ] = useState('')

  const apiUrl = 'http://192.168.1.88:8000';  

  return (
    //<Login></Login>
    <AppStack/>
  )
}
