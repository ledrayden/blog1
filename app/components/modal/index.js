// Dependencies
import React from 'react';
import { View, Modal, TouchableOpacity, Image } from 'react-native';

// Styles
import { styles } from './styles';

import close from '../../assets/icons/close.png';

const Modal_Example = ({onDismiss = () => null, onShow = () => null, visible, children, onClose}) => {    
    return (        
        <Modal
            animationType="fade"
            // onDismiss: se ejecuta cada vez que se cierra el modal
            onDismiss={() => onDismiss}
            onShow={() => onShow}
            transparent
            visible={visible}
            
        >
            <View style={styles.container}>

                <View style={styles.subcontainer}>
                    <View style={styles.headercontainer}>
                        <TouchableOpacity onPress={onClose}>
                            <Image source={close} style={styles.btnClose}/>
                        </TouchableOpacity>
                        
                    </View>

                    {children}

                </View>
            </View>
        </Modal>

        
    )
}

export default Modal_Example;