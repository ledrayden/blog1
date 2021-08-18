// Dependencies
import index from 'axios-middleware';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components
import Button from '../../components/button';

// Styles
import { styles } from './styles';

// useEffect(es un hook): nos dice que vamos a utilizar un efecto colateral que lo vamos a estar cachando con esta funcion(useEffect). 
// Los efectos colaterales son cualquiera que modifique el estado de nuestra aplicacion o que modifique algo que esta dentro de nuestro componente
// useEffect() recibe como primer parametro una funcion. Cuando no recibe un segundo parametro se comporta como un componentDidMount() y un componentDidUpdate() .
// Si recibe un segundo parametro solo se comporta como un componentDidMount() siempre y cuando su parametro no cambie de valor.
// Podemos tener cuantos useEffect queramos.

const Posts = () => {
    const [state, setState] = useState(0);
    const [count, setCount] = useState(0);
    // const arr = [
    //     {name: 'name 1'},
    //     {name: 'name 2'},
    //     {name: 'name 3'},
    //     {name: 'name 4'},
    //     {name: 'name 5'},
    //     {name: 'name 6'},
    //     {name: 'name 7'},
    //     {name: 'name 8'},
    //     {name: 'name 9'},
    //     {name: 'name 10'},
    //     {name: 'name 11'},
    //     {name: 'name 12'},
    // ]

    const [arr, setArr] = useState([]);
    const [data, setData] = useState([]);
    const [counter, setCounter] = useState(0);
    const [refreshing, setRefresh] = useState(false);
    
    const getData = () => {
        const end = counter + 30;
        const slice = data.slice(counter, end);
        setArr([...arr, ...slice]);
        setCounter(end);
    }
    
    
    // componentDidMount() - componentDidUpdate()
    useEffect(() => {
        console.log('update');

        // Si se retorna una funcion, esta siempre se va a ejecutar antes de que se haga un update del estado
        return () => console.log('prev');
    });

    // componentDidMount()
    useEffect(() => {
        console.log('mount');
    }, []);

    // componentDidMount() - componentDidUpdate()
    useEffect(() => {
        console.log('update state');        
    }, [state]);

    useEffect(() => {
        const _arr = [];
        for (let index = 0; index < 100; index++) {
            _arr.push({ name: `name ${index}` });            
        }
        //console.log({_arr});
        setData(_arr);        
        const end = counter + 30;
        const slice = _arr.slice(counter, end);
        setArr(slice);
        setCounter(end);
    }, [])

    return(
        <View style={styles.container}>
            {/* <Button title="use" action={() => {setState(1 + state)}}></Button>
            <Button title="count" action={() => {setCount(1 + count)}}></Button> */}
            {/* <FlatList
                data={arr}
                renderItem={({ item, index}) => (
                    <Button title={item.name} action={() => console.log(item.name)}/>
                )}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 10, width: '100%', backgroundColor: 'black' }}/>
                )}
                ListEmptyComponent={() => (
                    <View style={{ flex: 1, marginTop: 30 }}>
                        <Text>Empy</Text>
                    </View>
                )}
                onEndReached={getData}
                refreshing={refreshing}
                onRefresh={() => {
                    setArr([]);
                    setCounter(0);
                    console.log('Refresh OK!');
                }}
                
            /> */}
                
            
            {/* <ScrollView>
                {
                    // El método map() crea un nuevo array con los resultados de la llamada a la función indicada 
                    // aplicados a cada uno de sus elementos.
                    arr.map(i => (
                        <Button title={i.name} action={() => console.log(i.name)}/>
                    ))
                }
            </ScrollView> */}
            <Button
                title="Save"
                action={() => { 
                    const obj = {
                        id: 1,
                        name: 'Cloud',
                        number: 100020,
                    };
                    AsyncStorage.setItem('user', JSON.stringify(obj));
                    AsyncStorage.setItem('user_2', JSON.stringify(obj));
                    console.log('Objeto agregado');
                }}
            />
            <Button
                title="Read"
                action={() => {
                    AsyncStorage.getItem('user')
                    .then((res) => {
                        console.log({ res: JSON.parse(res) })
                    });
                }}
            />
            <Button
                title="Delete"
                action={() => { 
                    AsyncStorage.removeItem('user');
                    console.log('Objeto eliminado');
                }}
            />
            <Button
                title="Merge"
                action={() => { 
                    const obj2 = { id: 2, status: 1 };
                    AsyncStorage.mergeItem('user', JSON.stringify(obj2));
                    console.log('Informacion agregada');
                }}
            />
            <Button
                title="Get Keys"
                action={() => { 
                    AsyncStorage.getAllKeys()
                        .then(arr => console.log({arr}))
                    console.log('Numero de keys');
                }}
            />
            <Button
                title="Clear"
                action={() => { 
                    AsyncStorage.clear();
                    console.log('Keys elinimadas');
                }}
            />
            <Button
                title="Mul save"
                action={() => { 
                    const obj1 = { name: 'ejemplo 1' };
                    const obj2 = { name: 'ejemplo 1' };

                    const save1 = ['ejemplo_1', JSON.stringify(obj1)];
                    const save2 = ['ejemplo_2', JSON.stringify(obj2)];

                    AsyncStorage.multiSet([save1, save2]);
                    console.log('Objetos agreagados!');
                }}
            />
            <Button
                title="Mul read"
                action={() => { 
                    AsyncStorage.multiGet(['ejemplo_1', 'ejemplo_2'])
                        .then((res) => {
                            console.log({res});
                        })
                    console.log('Objetjos leidos');
                }}
            />
            <Button
                title="Mul merge"
                action={() => {
                    const obj1 = { name: 'ejemplo 1.1', status: 1 };
                    const obj2 = { name: 'ejemplo 2.2', status: 2 };

                    const save1 = ['ejemplo_1', JSON.stringify(obj1)];
                    const save2 = ['ejemplo_2', JSON.stringify(obj2)];

                    AsyncStorage.multiMerge([save1, save2]);
                    console.log('Informacion agregada');
                }}
            />
            <Button
                title="Mul remove"
                action={() => { 
                    AsyncStorage.multiRemove(['ejemplo_1', 'ejemplo_2']);
                    console.log('Keys elinimadas');
                }}
            />
        </View>
    );
}

export default Posts;