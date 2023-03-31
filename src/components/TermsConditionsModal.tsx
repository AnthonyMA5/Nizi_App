/* eslint-disable prettier/prettier */
// CustomModal.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

interface CustomModalProps {
  title: string;
  info: string;
  color: string;
  btn: string;
  isVisible: boolean;
  loop: boolean;
  onClose: () => void;
}

const TermsConditionsModal = (props: CustomModalProps) => {

    return (
    <Modal backdropOpacity={0.5} style={styles.main_container} isVisible={props.isVisible}
        animationInTiming={300}
        animationOutTiming={600}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={600}>
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title_text}>Términos y Condiciones</Text>
                <Text style={styles.info_text}>
                    Bienvenido/a a la aplicación móvil Nizi (en adelante, la "Aplicación"),
                    que tiene como finalidad facilitar la distribución y uso de tarjetas de pago.{'\n'}{'\n'}
                    Antes de utilizar la Aplicación, por favor lea detenidamente estos Términos y Condiciones,
                    ya que su uso implica la aceptación de los mismos.{'\n'}
                </Text>
                <Text style={styles.title_text}>1. Uso de la Aplicación</Text>
                <Text style={styles.info_text}>El uso de la Aplicación está sujeto a las siguientes condiciones:{'\n'}</Text>
                <Text style={styles.info_text}>a. La Aplicación es de uso exclusivo para personas mayores de edad.{'\n'}{'\n'}
                    b. La Aplicación está diseñada para su uso en dispositivos móviles.{'\n'}{'\n'}
                    c. El uso de la Aplicación se limita a la distribución y uso de tarjetas de pago.{'\n'}{'\n'}
                    d. El usuario es responsable de mantener la confidencialidad de su información personal y de su dispositivo móvil.{'\n'}{'\n'}
                    e. La Aplicación no se hace responsable del mal uso de las tarjetas de pago distribuidas por los usuarios.{'\n'}{'\n'}
                    f. La Aplicación se reserva el derecho de cancelar o restringir el acceso a la misma en cualquier momento y sin previo aviso.{'\n'}
                </Text>

                <Text style={styles.title_text}>2. Información personal y privacidad</Text>
                <Text style={styles.info_text}>La Aplicación recopila información personal del usuario,
                    como su ubicación y datos de contacto, con el fin de facilitar la distribución de las tarjetas de pago.
                    Esta información será utilizada exclusivamente para estos fines y no será compartida con terceros con fines de lucro.{'\n'}
                </Text>
                <Text style={styles.info_text}>El usuario puede solicitar en cualquier momento la eliminación de sus datos
                    personales de la Aplicación. Para ello, deberá enviar una solicitud a través de los canales de
                    contacto de la Aplicación.{'\n'}
                </Text>

                <Text style={styles.title_text}>3. Propiedad intelectual</Text>
                <Text style={styles.info_text}>Todos los derechos de propiedad intelectual relacionados con la Aplicación,
                    incluyendo su diseño, código fuente, contenidos y marcas, son propiedad exclusiva de Nizi.
                    Queda prohibida su reproducción, distribución o uso no autorizado.{'\n'}
                </Text>

                <Text style={styles.title_text}>4. Responsabilidad</Text>
                <Text style={styles.info_text}>La Aplicación no se hace responsable por daños o perjuicios que puedan derivarse
                    del uso de la misma, incluyendo la distribución y uso de las tarjetas de pago. El usuario asume toda la
                    responsabilidad por el uso que haga de la Aplicación y de las tarjetas de pago distribuidas a través de la misma.{'\n'}
                </Text>

                <Text style={styles.title_text}>5. Modificaciones</Text>
                <Text style={styles.info_text}>La Aplicación se reserva el derecho de modificar en cualquier momento estos
                    Términos y Condiciones, así como cualquier aspecto relacionado con el funcionamiento de la misma.
                    Las modificaciones serán efectivas a partir de su publicación en la Aplicación.{'\n'}
                </Text>

                <Text style={styles.title_text}>6. Ley aplicable y jurisdicción</Text>
                <Text style={styles.info_text}>Estos Términos y Condiciones se regirán e interpretarán de acuerdo con la
                    legislación de México.{'\n'}Cualquier controversia que pudiera derivarse del uso de la Aplicación será sometida
                    a los tribunales competentes de México.{'\n'}
                </Text>

                <Text style={styles.info_text}>Al utilizar la Aplicación, el usuario acepta los presentes Términos y Condiciones en
                    su totalidad y se compromete a cumplir con ellos en todo momento.{'\n'}{'\n'}Si el usuario no está de acuerdo con alguno
                    de los términos y condiciones, deberá dejar de utilizar la Aplicación de inmediato.
                    {'\n'}{'\n'}Si tienes alguna duda o consulta sobre estos Términos y Condiciones, por favor no dudes en contactar con nosotros a través de los canales de contacto que ponemos a tu disposición en la Aplicación.
                    {'\n'}{'\n'}Gracias por utilizar Nizi.
                </Text>

                <Pressable style={styles.button} onPressOut={props.onClose} android_ripple={{ color: 'lightgray' }}>
                    <Text style={styles.button_text}>He leído los Términos y Condiciones</Text>
                </Pressable>
            </ScrollView>
        </View>
    </Modal>
    );
};

const styles = StyleSheet.create({

    main_container:{
    },

    container:{
        width: '100%',
        height: '55%',
        padding: 18,
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
        color:'#0500FF',
        fontSize: 13,
        marginBottom: 8,
    },

    info_text:{
        fontFamily: 'DMSans-Regular',
        color:'#6A6A6A',
        fontSize: 12,
        textAlign: 'justify',
    },

    button:{
        padding: 10,
        width:'100%',
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#3733EF',
    },

    button_text:{
        fontFamily: 'DMSans-Medium',
        color: '#FFF',
        fontSize: 15,
        textAlign: 'center',
    },

});

export default TermsConditionsModal;
