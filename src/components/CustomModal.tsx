/* eslint-disable prettier/prettier */
// CustomModal.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

interface CustomModalProps {
  title: string;
  info: string;
  color: string;
  icon: any;
  btn: string;
  isVisible: boolean;
  loop: boolean;
  onClose: () => void;
}

const CustomModal = (props: CustomModalProps) => {

    return (
    <Modal backdropOpacity={0.5} style={styles.main_container} isVisible={props.isVisible}
        animationInTiming={250}
        animationOutTiming={600}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={600}>
        <View style={styles.container}>
          <LottieView source={props.icon} style={styles.icon}
          autoPlay
          loop={props.loop}/>
          <Text style={styles.title_text}>{props.title}</Text>
          <Text style={styles.info_text}>{props.info}</Text>

          <Pressable style={[styles.button, {backgroundColor: props.color}]} onPressOut={props.onClose}>
            <Text style={styles.button_text}>{props.btn}</Text>
          </Pressable>
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
        padding: 15,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
    },

    icon:{
        width: 75,
        height:75,
        marginBottom: 10,
    },

    title_text:{
        fontFamily: 'DMSans-Medium',
        color:'#000',
        fontSize: 22,
        marginBottom: 15,
        textAlign: 'center',
    },

    info_text:{
        fontFamily: 'DMSans-Regular',
        color:'#000',
        fontSize: 17,
        textAlign: 'center',
    },

    button:{
        padding: 10,
        width:'100%',
        borderRadius: 10,
        marginTop: 30,
        marginBottom: 10,
    },

    button_text:{
        fontFamily: 'DMSans-Medium',
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center',
    },

});

export default CustomModal;
