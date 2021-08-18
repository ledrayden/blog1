import axios from 'axios';
import { Service } from 'axios-middleware';


const base = 'http://192.168.1.115:8000/';
//const base = 'https://pokemon-go1.p.rapidapi.com/';
// const headers = {
//     "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
//     "x-rapidapi-key": "cfa115aad1msh305ef3ffc77f4c4p15fe57jsn6029c6a90445",
//     "useQueryString": true,
// };


class Register {
    constructor() {
        // Patron singlenton: lo que hace es crear solamente una instancia de una clase(un objeto)
        // dentro de toda la aplicacion o dentro de todo nuestro contexto global de la aplicacion o del proyecto
        // Aca es bastante necesario usar este patron ya que solamente necesito un Register para toda la aplicacion

        // verificamos si la clase ya ha sido creada o instanciada
        // si la instancia es de tipo objeto entonces retornamos esa misma instancia
        if(typeof Register.instance === 'object') return Register.instance;

        // si no existe entonces pasamos el valor de la instancia y lo igualamos a this
        // que vendria siendo el objeto instanciado de esa misma clase
        Register.instance = this;
    }

    onResponse(response) {
        const res = JSON.parse(response.data);
        return res;
    }
}

class Request {
    constructor(url, baseURL) {
        this.url = url;
        this.baseURL = baseURL || base;
        this.request = axios.create({ baseURL: this.baseURL});
        const service = new Service(this.request);

        // Aca instanciamos la clase Register, de esta manera tenemos nuestro objeto creado dentro de nuestro register.
        // para poder registrar como tal el middleware tenemos que hacer un service.register(), esto nos creara 
        // automaticamente un registro de ese middleware que estamos utilizando.
        // Lo que recibe service.register() es un objeto con algunos metodos que son propios de la libreria.
        // onResponse() metodo que nos ayudara a capturar la informacion que recibimos de axios y solamente 
        // devolver a la aplicacion lo de data
        service.register(new Register());        
        
    }

    get() {
        return this.request({ url: this.url });
    }

    getOne(id) {
        return this.request({ url: this.url + '/' + id });
    }

    post(value) {
        return this.request({ url: this.url, data: value, method: 'post' });
    }

    put(value, id) {
        return this.request({ url: this.url + '/' + id, data: value, method: 'put' });
    }

    delete(id) {
        return this.request({ url: this.url + '/' + id, method: 'delete' });
        // return this.request({ url: this.url + '?=id' + id, method: 'delete' });
    }
}

export default Request;