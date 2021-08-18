import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_LOGIN_EMAIL = '@MyStorageLoginEmail:key';
const STORAGE_LOGIN_PASSWORD = '@MyStorageLoginPassword:key';
const STORAGE_LOGIN_EMAIL_PASSWORD = '@MyStorageLoginEmailPassword:key';


    const _storeData = async (key, value) => {
        try {
          await AsyncStorage.setItem(
            key,
            value
          );
        } catch (error) {
          // Error saving data
          console.log(error);
        }
    };

    const _storeData2 = async (key, value) => {
      try {
        await AsyncStorage.setItem(
          key,
          JSON.stringify(value)
        );
      } catch (error) {
        // Error saving data
        console.log(error);
      }
    };
    
    const _retrieveData = async (key) => {
        try {
          const value = await AsyncStorage.getItem(key);
          
          if (value !== null) {
            // We have data!!
            console.log('Retri:', value);
            console.log('Tipo:', typeof value);
            
            return value;            
          }
          else{
            const value2 = 'fallo';
              console.log('No existe esa key');
              // console.log('tipo:', typeof value);
              // console.log('Values:', value);
              // //return value;
              // console.log('asda:', typeof '');
              console.log('Values:', value2);
              console.log('Tipo:', typeof value2);
              return value2;
          }
        } catch (error) {
          // Error retrieving data          
          console.log(error);
        }
    };

    const _retrieveData2 = async (key) => {
      try {
        const value = await AsyncStorage.getItem(key);
        
        if (value !== null) {
          // We have data!!
          console.log('Retri:', value);
          console.log('Tipo2:', typeof value);
          datos = JSON.parse(value);          
          console.log('Tipo datos:', typeof datos);
          console.log('Name:', datos.email);
          console.log('Password:', datos.password);
          for (const property in datos){
            console.log(`${property}: ${datos[property]}`);
          }
            
          return value;            
        }
        else{
          // const value2 = 'fallo';
          // console.log("Kameka:", value);
          // console.log('No existe esa key');
          // // console.log('tipo:', typeof value);
          // // console.log('Values:', value);
          // // //return value;
          // // console.log('asda:', typeof '');
          // console.log('Values3:', value2);
          // console.log('Tipo3:', typeof value2);
          // return value2;
          return value;
        }
      } catch (error) {
        // Error retrieving data          
        console.log(error);
      }
    };
    
    const _removeData = async (key) => {
        try {
          await AsyncStorage.removeItem(key);
          console.log('Key eliminada');
        } catch (error) {          
          console.log(error);
        }
    };

    const resta = (key, value) => {
        return key - value;
    }

    const suma = (key, value) => {
        return key + value;
    }

    export { _storeData, _retrieveData, _removeData, STORAGE_LOGIN_EMAIL, STORAGE_LOGIN_PASSWORD, STORAGE_LOGIN_EMAIL_PASSWORD, _storeData2, _retrieveData2 } ;

