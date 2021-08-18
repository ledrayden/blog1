{/*
    Higher-Order Components
    Supongamos que en nuestras dos pantallas que son login y createUser vamos a estar utlizando funciones o 
    procesos similares, como podria ser una funcion en particular que necesitemos ejecutar en ambos lados, nosotros
    podemos encapsular todas esas funciones que vamos a usar en esos lados en un componente de alto orden.
    Este componente lo que nos ayuda es que encapsulamos toda la informacion ahi, la mandamos a los demas componentes
    que necesitamos y ya podemos hacer uso en esos componentes. 
    Los componentes de alto orden son funciones que retornan un componente
*/}

// Dependencies
import React from 'react';

// HOC(Higher-Order Components)
function printHOC(WrappedComponent) {
    return class NewComponent extends React.Component{
        print = param => console.log({ param });

        render() {
            return <WrappedComponent print={this.print}/> //{...this.props}/> Esto es para pasarle los props que le estamos mandando desde el padre y no nos salga undefined
        }
    }
}


export default printHOC;