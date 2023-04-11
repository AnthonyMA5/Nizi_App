/* eslint-disable prettier/prettier */
// CustomModal.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

interface CustomModalProps {
  title: string;
  info: string;
  successColor: string;
  cancelColor: string;
  icon: any,
  successBtn: string;
  cancelBtn: string;
  isVisible: boolean;
  successEvent: () => void;
  cancelEvent: () => void;
}

const DesitionModal = (props: CustomModalProps) => {

    return (
    <Modal backdropOpacity={0.5} style={styles.main_container} isVisible={props.isVisible}
        animationInTiming={250}
        animationOutTiming={600}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={600}>
        <View style={styles.container}>
          <LottieView source={props.icon} style={styles.icon}
          autoPlay
          loop={true}/>
          <Text style={styles.title_text}>{props.title}</Text>
          <Text style={styles.info_text}>{props.info}</Text>

          <Pressable style={[styles.success_button, {borderColor: props.successColor}]} onPressOut={props.successEvent} android_ripple={{ color: 'lightgray' }}>
            <Text style={styles.success_button_text}>{props.successBtn}</Text>
          </Pressable>

          <Pressable style={[styles.button, {backgroundColor: props.cancelColor}]} onPressOut={props.cancelEvent} android_ripple={{ color: 'lightgray' }}>
            <Text style={styles.button_text}>{props.cancelBtn}</Text>
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
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
    },

    info_text:{
        fontFamily: 'DMSans-Regular',
        color:'#6A6A6A',
        fontSize: 16,
        textAlign: 'center',
    },

    button:{
        padding: 10,
        width:'100%',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
    },

    success_button:{
        padding: 10,
        width:'100%',
        borderRadius: 10,
        marginTop: 30,
        marginBottom: 10,
        backgroundColor: '#FFF',
        borderWidth: 0.5,
    },

    button_text:{
        fontFamily: 'DMSans-Medium',
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center',
    },

    success_button_text:{
        fontFamily: 'DMSans-Medium',
        color: '#000',
        fontSize: 16,
        textAlign: 'center',
    },

});

export default DesitionModal;
