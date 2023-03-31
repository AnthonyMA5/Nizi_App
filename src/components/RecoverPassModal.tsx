/* eslint-disable prettier/prettier */
// CustomModal.tsx
import React from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

const RecoverPassModal = (props: CustomModalProps) => {

    return (
    <Modal backdropOpacity={0.5} style={styles.main_container} isVisible={props.isVisible}
        animationInTiming={250}
        animationOutTiming={600}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={600}>
        <View style={styles.container}>
          <TouchableOpacity onPressOut={props.onClose}>
            <Image source={require('../img/x.png')} style={styles.exit_icon}/>
          </TouchableOpacity>

          <Text style={styles.title_text}>{props.title}</Text>
          <Text style={styles.info_text}>{props.info}</Text>

          <LottieView source={props.icon} style={styles.icon}
          autoPlay
          loop={props.loop}/>

          <View style={styles.sectionStyle}>
            <TextInput style={styles.input} placeholder= "ejemplo@tucorreo.com" placeholderTextColor={'#878787'}/>
          </View>

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
        backgroundColor: '#FFF',
        borderRadius: 12,
    },

    exit_icon:{
        width: 20,
        height: 20,
        marginTop: 5,
        marginBottom: 15,
        alignSelf: 'flex-end',
    },

    icon:{
        width: 180,
        height: 180,
        alignSelf: 'center',
    },

    title_text:{
        fontFamily: 'DMSans-Bold',
        color:'#000',
        fontSize: 19,
        marginBottom: 15,
        textAlign: 'center',
    },

    info_text:{
        fontFamily: 'DMSans-Regular',
        color:'#6A6A6A',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
    },

    button:{
        padding: 15,
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

    sectionStyle: {
        borderWidth: 0.4,
        borderRadius: 10,
        borderColor: '#6A6A6A',
        marginTop: 15,
    },

    input: {
        fontFamily: 'DMSans-Medium',
        fontSize: 15,
        marginLeft: 5,
        color: '#000000',
        marginStart: 10,
    },

});

export default RecoverPassModal;
