/* eslint-disable prettier/prettier */
// CustomModal.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

interface CustomModalProps {
  isVisible: boolean;
}

const LoadingModal = (props: CustomModalProps) => {

    return (
    <Modal backdropOpacity={0.5} style={styles.main_container} isVisible={props.isVisible}>
        <View style={styles.container}>
          <LottieView source={require('../animations/loading.json')} style={styles.icon}
          autoPlay
          loop={true}/>
          <Text style={styles.title_text}>Cargando</Text>
        </View>
    </Modal>
    );
};

const styles = StyleSheet.create({

    main_container:{
        justifyContent: 'center',
        alignItems:'center',
    },

    container:{
        width: '100%',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
    },

    icon:{
        width: 200,
        height: 200,
    },

    title_text:{
        fontFamily: 'DMSans-Medium',
        color:'#3C3C3C',
        fontSize: 20,
        marginBottom: 30,
        textAlign: 'center',
    },

});

export default LoadingModal;
