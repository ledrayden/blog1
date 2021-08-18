// Dependencies
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Components
import Button from '../../components/button';
import Modal_Example from '../../components/modal';

// Styles
import { styles2 } from './styles2';

import close from '../../assets/icons/close.png';

const Modal_1 = () => {
    const [view, setView] = useState(false);
    return (
        <View style={styles2.container}>
            <TouchableOpacity style={styles2.touch_1} onPress={() => setView(true)}>
                <View>
                    <Text style={styles2.text_1}>Show</Text>
                </View>
            </TouchableOpacity>
            <Modal_Example
                visible={view}
                onClose={() => setView(false)}
            >
                <View style={{width: 30, height: 30, backgroundColor: 'red'}}></View>
            </Modal_Example>
        </View>
    );
}

export default Modal_1;