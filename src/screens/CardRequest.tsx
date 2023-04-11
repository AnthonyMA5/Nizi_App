/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import CheckBox from '@react-native-community/checkbox';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import CustomModal from '../components/CustomModal';
import { NavigationProp, RouteProp } from '@react-navigation/native';


interface Props {
    navigation: NavigationProp<any, any>;
    route: RouteProp<any, any>;
}

const CardRequest: React.FC<Props> = ({navigation, route}) => {

    const { userInfo } = route.params;

    const View1 = ({onSubmit}) => {

        const [name, setName] = useState(userInfo.nombre);
        const [apellido_p, setApellidoP] = useState(userInfo.apellido_paterno);
        const [apellido_m, setApellidoM] = useState(userInfo.apellido_materno);
        const [telephone, setTelephone] = useState(userInfo.telefono);
        const [email, setEmail] = useState(userInfo.email);
        const editable = false;

        function validarCorreo(correo: string): boolean {
            const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // Expresión regular para validar el correo
            return regex.test(correo); // Devuelve true si el correo es válido, false en caso contrario
        }

        const handleSubmit = () => {
            if ([name, apellido_p, apellido_m, telephone, email].includes('')) {
                handleInputs();
            } else if (telephone.length < 12 || telephone.length > 12) {
                handleInvalidPhone();
            } else if (!email.trim()) {
                handleWarningEmail();
            } else if (!validarCorreo(email)) {
                handleInvalidEmail();
            } else {
                onSubmit({name, apellido_p, apellido_m, telephone, email});
                setTitle('Domicilio');
                setSubtitle('Ingresa los datos de tu domicilio, es ahí donde enviaremos tu tarjeta.');
            }
        };

        return (
          <View style={styles.information_main_container}>

            <View style={styles.information_container}>
                <Text style={styles.label}>Nombre(s)</Text>
                <View style={styles.sectionStyle}>
                    <TextInput style={styles.input} value={name} onChangeText={setName}/>
                </View>
            </View>

            <View style={styles.information_container}>
                <Text style={styles.label}>Apellido Paterno</Text>
                <View style={styles.sectionStyle}>
                    <TextInput style={styles.input} value={apellido_p} onChangeText={setApellidoP}/>
                </View>
            </View>

            <View style={styles.information_container}>
                <Text style={styles.label}>Apellido Materno</Text>
                <View style={styles.sectionStyle}>
                    <TextInput style={styles.input} value={apellido_m} onChangeText={setApellidoM}/>
                </View>
            </View>

            <View style={styles.information_container}>
                <Text style={styles.label}>Número telefónico</Text>
                <View style={[styles.sectionStyle, !editable && styles.sectionDisabledStyle]}>
                    <TextInput style={styles.input} value={telephone} onChangeText={setTelephone}
                    keyboardType="number-pad" editable={editable}/>
                </View>
            </View>

            <View style={styles.information_container}>
                <Text style={styles.label}>Correo electrónico</Text>
                <View style={[styles.sectionStyle, !editable && styles.sectionDisabledStyle]}>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail}
                    keyboardType="email-address" editable={editable}/>
                </View>
            </View>

            <View style={styles.button_container}>
                <View style={styles.button_left} />
                <View style={styles.button_right}>
                    <TouchableOpacity style={styles.next_button} onPress={handleSubmit}>
                        <CustomModal
                        title={functionData.title}
                        info={functionData.info}
                        color={functionData.color}
                        icon={functionData.icon}
                        isVisible={isModalVisible}
                        onEvent={handleCloseModal}
                        btn={functionData.btn}
                        loop={inLoop}/>
                        <Text style={styles.text_next_button}>Continuar</Text>
                        <Image style={styles.button_icon_right} source={require('../img/next_white_icon.png')} />
                    </TouchableOpacity>
                </View>
            </View>

          </View>
        );
    };

    const View2 = ({onSubmit}) => {

        const [calle, setCalle] = useState('');
        const [numExt, setNumExt] = useState('');
        const [numInt, setNumInt] = useState('');
        const [colonia, setColonia] = useState('');
        const [ciudad, setCiudad] = useState('');
        const [cp, setCP] = useState('');
        const [estado, setEstado] = useState('');

        const handleSubmit = () => {
            if ([calle, numExt, colonia, ciudad, cp, estado].includes('')) {
                handleInputs();
            } else {
                onSubmit({calle, numExt, numInt, colonia, ciudad, cp, estado});
                setTitle('Términos y Condiciones');
                setSubtitle('Desliza hacia abajo para visualizar todo el contenido.');
            }
        };

        return (
          <View style={styles.information_main_container}>

            <View style={styles.information_container}>
                <Text style={styles.label}>Calle</Text>
                <View style={styles.sectionStyle}>
                    <TextInput style={styles.input} value={calle} onChangeText={setCalle}/>
                </View>
            </View>

            <View style={styles.address_container}>
                <View style={styles.address_left}>
                    <View style={styles.information_container}>
                        <Text style={styles.label}>Número Exterior</Text>
                        <View style={styles.sectionStyle}>
                            <TextInput style={styles.input} value={numExt} onChangeText={setNumExt}
                            keyboardType="number-pad"/>
                        </View>
                    </View>
                </View>

                <View style={styles.address_right}>
                    <View style={styles.information_container}>
                        <Text style={styles.label}>Número Interior</Text>
                        <View style={styles.sectionStyle}>
                            <TextInput style={styles.input} placeholder="Opcional" placeholderTextColor={'#969696'} value={numInt} onChangeText={setNumInt}
                            keyboardType="number-pad"/>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.information_container}>
                <Text style={styles.label}>Colonia o Fraccionamiento</Text>
                <View style={styles.sectionStyle}>
                    <TextInput style={styles.input} value={colonia} onChangeText={setColonia}/>
                </View>
            </View>

            <View style={styles.information_container}>
                <Text style={styles.label}>Ciudad o Municipio</Text>
                <View style={styles.sectionStyle}>
                    <TextInput style={styles.input} value={ciudad} onChangeText={setCiudad}/>
                </View>
            </View>

            <View style={styles.address_container}>
                <View style={styles.address_left}>
                    <View style={styles.information_container}>
                        <Text style={styles.label}>Código Postal</Text>
                        <View style={styles.sectionStyle}>
                            <TextInput style={styles.input} maxLength={5} value={cp} onChangeText={setCP}
                            keyboardType="number-pad"/>
                        </View>
                    </View>
                </View>

                <View style={styles.address_right}>
                    <View style={styles.information_container}>
                        <Text style={styles.label}>Estado</Text>
                        <View style={styles.sectionStyle}>
                            <TextInput style={styles.input} value={estado} onChangeText={setEstado}/>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.button_container}>
                <View style={styles.button_left} />
                <View style={styles.button_right}>
                    <TouchableOpacity style={styles.next_button} onPress={handleSubmit}>
                        <CustomModal
                        title={functionData.title}
                        info={functionData.info}
                        color={functionData.color}
                        icon={functionData.icon}
                        isVisible={isModalVisible}
                        onEvent={handleCloseModal}
                        btn={functionData.btn}
                        loop={inLoop}/>
                        <Text style={styles.text_next_button}>Continuar</Text>
                        <Image style={styles.button_icon_right} source={require('../img/next_white_icon.png')} />
                    </TouchableOpacity>
                </View>
            </View>

          </View>
        );
    };

    const View3 = ({onSubmit}) => {
        const [toggleCheckBox, setToggleCheckBox] = useState(false);

        const handleSubmit = () => {
            if (toggleCheckBox === false) {
                handleTermsConditions();
            } else {
                onSubmit({});
                setTitle('Recordatorio');
                setSubtitle('Antes de finalizar tu solicitud queda un paso por completar.');
            }
        };

        const handleTermsConditions = () => {
            setFunctionData({
              title: 'Falta un paso más',
              info: 'Para continuar es necesario que aceptes los términos y condiciones.',
              color: '#80D5FF',
              icon: require('../animations/warning_icon.json'),
              btn: 'Entendido',
            });
            setInLoop(false);
            setIsModalVisible(true);
        };

        return (
          <View style={styles.information_main_container}>

            <View style={styles.tc_container}>

                <ScrollView nestedScrollEnabled={true}>
                    <Text style={styles.title_text}>Términos y Condiciones de Uso de la Tarjeta</Text>
                    <Text style={styles.info_text}>
                    Bienvenido/a a Nizi nuestra aplicación de pago móvil. Al solicitar y utilizar una tarjeta de pago en
                    nuestra aplicación, aceptas los siguientes términos y condiciones:{'\n'}
                    </Text>
                    <Text style={styles.title_text}>1. Tarjeta de Pago</Text>
                    <Text style={styles.info_text}>La tarjeta de pago es una forma de pago que te permite realizar compras en
                    establecimientos de comida y otros comercios participantes que acepten pagos a través de nuestra aplicación.
                    La tarjeta es emitida por nuestro proveedor de servicios de pago y está sujeta a los términos y condiciones del
                    proveedor.{'\n'}</Text>

                    <Text style={styles.title_text}>2. Registro</Text>
                    <Text style={styles.info_text}>Para solicitar y utilizar una tarjeta de pago, debes registrarte en nuestra
                    aplicación y proporcionar la información requerida, incluyendo tus datos personales y financieros.
                    La información que proporcionas debe ser precisa y completa. Al registrarte, aceptas recibir comunicaciones
                    de nuestra parte, incluyendo correos electrónicos y notificaciones push.
                    </Text>

                    <Text style={styles.title_text}>3. Uso de la Tarjeta</Text>
                    <Text style={styles.info_text}>Al utilizar la tarjeta de pago, aceptas pagar el monto total de la transacción a
                    través de nuestra aplicación. Debes asegurarte de tener suficientes fondos en tu cuenta de la aplicación para
                    cubrir el monto de la transacción. La tarjeta no se puede utilizar para fines ilegales o fraudulentos.{'\n'}
                    </Text>

                    <Text style={styles.title_text}>4. Responsabilidad</Text>
                    <Text style={styles.info_text}>Eres responsable de cualquier uso no autorizado de tu tarjeta de pago.
                    Debes notificarnos inmediatamente si sospechas que alguien ha utilizado tu tarjeta de forma fraudulenta o
                    sin autorización. No seremos responsables por ningún daño que surja como resultado del uso no autorizado
                    de tu tarjeta.{'\n'}
                    </Text>

                    <Text style={styles.title_text}>5. Cancelación</Text>
                    <Text style={styles.info_text}>Podemos cancelar tu tarjeta de pago en cualquier momento y por cualquier
                    motivo, incluyendo si sospechamos que la tarjeta se ha utilizado de forma fraudulenta o para fines
                    ilegales. También puedes solicitar la cancelación de tu tarjeta en cualquier momento.{'\n'}
                    </Text>

                    <Text style={styles.title_text}>6. Modificaciones</Text>
                    <Text style={styles.info_text}>Podemos modificar estos términos y condiciones en cualquier momento y
                    sin previo aviso. Cualquier modificación será efectiva inmediatamente después de su publicación en
                    nuestra aplicación. Si continúas utilizando la tarjeta de pago después de la modificación de los
                    términos y condiciones, se considerará que aceptas los términos modificados.{'\n'}
                    </Text>

                    <Text style={styles.title_text}>7. Ley Aplicable</Text>
                    <Text style={styles.info_text}>Estos términos y condiciones se regirán e interpretarán de acuerdo
                    con las leyes del lugar en el que se emitió tu tarjeta de pago.{'\n'}
                    </Text>

                    <Text style={styles.info_text}>Al solicitar y utilizar una tarjeta de pago en nuestra aplicación,
                    aceptas estos términos y condiciones en su totalidad. En caso de que alguno de nuestros términos y
                    condiciones no sean de tu agrado, te sugerimos no utilizar nuestra aplicación y evitar solicitar
                    una tarjeta de pago.{'\n'}{'\n'}Queremos que tu experiencia con nosotros sea satisfactoria, por lo que te
                    recomendamos revisar nuestros términos y condiciones con detenimiento antes de decidir utilizar
                    nuestros servicios.
                    </Text>

                </ScrollView>

            </View>

            <View style={{alignContent: 'center', flexDirection: 'row', marginTop: 20}}>
                <CheckBox style={styles.checkTerms}
                                    disabled={false}
                                    value={toggleCheckBox}
                                    onValueChange={(newValue: boolean | ((prevState: boolean) => boolean)) => setToggleCheckBox(newValue)}
                                    tintColors = {{ true: '#0500FF' , false: '#000000' }}/>
                <Text style={styles.textTerms}>He leído y acepto los Términos y Condiciones</Text>
            </View>

            <View style={styles.button_container}>
                <View style={styles.button_left} />
                <View style={styles.button_right}>
                    <TouchableOpacity style={styles.next_button} onPress={handleSubmit}>
                        <CustomModal
                        title={functionData.title}
                        info={functionData.info}
                        color={functionData.color}
                        icon={functionData.icon}
                        isVisible={isModalVisible}
                        onEvent={handleCloseModal}
                        btn={functionData.btn}
                        loop={inLoop}/>
                        <Text style={styles.text_next_button}>Continuar</Text>
                        <Image style={styles.button_icon_right} source={require('../img/next_white_icon.png')} />
                    </TouchableOpacity>
                </View>
            </View>

          </View>
        );
    };

    const View4 = ({onSubmit}) => {

        const handleSubmit = () => {
          onSubmit({});
          setTitle('¡Ya casi es tuya!');
          setSubtitle('Haz completado toda tu información, presiona el botón inferior y tu solicitud será enviada.');
        };

        return (
          <View style={styles.information_main_container}>

            <Text style={styles.reminder_title_text}>Al momento de enviar tu solicitud...</Text>
            <Text style={styles.reminder_info_text}>
                    Recuerda que primero será evaluada por nuestro equipo en un periodo máximo de 2 días hábiles.
            </Text>

            <Text style={styles.reminder_title_text}>Respuesta a tu solicitud</Text>
            <Text style={styles.reminder_info_text}>
                    Una vez que ha sido evaluada recibirás una notificación vía correo electrónico indicando
                    la respuesta a tu solicitud, es decir, si fue aceptada o rechazada.
            </Text>

            <Text style={styles.reminder_title_text}>Dudas</Text>
            <Text style={styles.reminder_info_text}>
                    Si concluyeron los 2 días hábiles y no recibiste una respuesta por parte de nosotros o en caso
                de que tengas alguna inquietud sobre tu solicitud (estado, solicitud de cancelación, etc.) puedes
                ponerte en contacto con nosotros en los medios especificados en el apartado "Atención al Cliente".
            </Text>

            <View style={styles.button_container}>
                <View style={styles.button_left} />
                <View style={styles.button_right}>
                    <TouchableOpacity style={styles.next_button} onPress={handleSubmit}>
                        <CustomModal
                        title={functionData.title}
                        info={functionData.info}
                        color={functionData.color}
                        icon={functionData.icon}
                        isVisible={isModalVisible}
                        onEvent={handleCloseModal}
                        btn={functionData.btn}
                        loop={inLoop}/>
                        <Text style={styles.text_next_button}>Continuar</Text>
                        <Image style={styles.button_icon_right} source={require('../img/next_white_icon.png')} />
                    </TouchableOpacity>
                </View>
            </View>

          </View>
        );
    };

    const View5 = ({name, apellido_p, apellido_m, telephone, email, calle, numExt, numInt, colonia, ciudad, cp, estado}) => {

        const crear_solicitud = () => {
            const documentLog = JSON.stringify({
                idUsuario: userInfo._id,
                username: userInfo.username,
                password: userInfo.password,
                nombre: name,
                apellido_paterno: apellido_p,
                apellido_materno: apellido_m,
                telefono: telephone,
                email: email,
                calle: calle,
                numeroExterior: numExt,
                numeroInterior: numInt,
                colonia: colonia,
                municipio: ciudad,
                codigoPostal: cp,
                estadoDireccion: estado,
                estado: 'En espera',
            });
            fetch('http://192.168.0.3:3000/solicitud_tarjeta',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: documentLog,
            })
            .then((response) => {
                if (response.status === 201) {
                  handleData();
                } else {
                  handleError();
                }
              })
              .catch((error) => {
                console.log(error);
                handleServerError();
              });
          };

        return (
          <View style={styles.final_container}>

            <Text style={styles.final_text}>{name}</Text>
            <Text style={styles.final_title_text}>nos pondremos en contacto contigo vía:{'\n'}</Text>

            <Text style={styles.final_title_text}>Teléfono: </Text>
            <Text style={styles.final_text}>+{telephone}{'\n'}</Text>

            <Text style={styles.final_title_text}>Correo electrónico: </Text>
            <Text style={styles.final_text}>{email}{'\n'}</Text>

            <Text style={styles.final_title_text}>De la misma manera te indicamos que tu tarjeta
            será enviada a la siguiente dirección:{'\n'}</Text>
            <Text style={styles.final_text}>{calle} {numExt}, {colonia}, {cp}, {ciudad}, {estado}.</Text>

            <TouchableOpacity style={styles.finish_button} onPressOut={crear_solicitud}>
                <CustomModal
                title={functionData.title}
                info={functionData.info}
                color={functionData.color}
                icon={functionData.icon}
                isVisible={isModalVisible}
                onEvent={handleCloseModal}
                btn={functionData.btn}
                loop={inLoop}/>
                <Text style={styles.text_next_button}>Enviar solicitud</Text>
            </TouchableOpacity>

          </View>
        );
    };

    const handleError = () => {
        setFunctionData({
          title: '¡Lo sentimos!',
          info: 'No fue posible generar tu solicitud.',
          color: '#C71D1D',
          icon: require('../animations/sorry_icon.json'),
          btn: 'Entendido',
        });
        setInLoop(false);
        setIsModalVisible(true);
    };

    const handleServerError = () => {
        setFunctionData({
          title: 'Error',
          info: 'Ocurrió un error en la comunicación con el servidor',
          color: '#C71D1D',
          icon: require('../animations/error_icon.json'),
          btn: 'Entendido',
        });
        setInLoop(false);
        setIsModalVisible(true);
    };

    const handleInputs = () => {
        setFunctionData({
          title: '¡Ups!',
          info: 'Algunos campos se encuentran vacíos, por favor completalos.',
          color: '#80D5FF',
          icon: require('../animations/warning_icon.json'),
          btn: 'Entendido',
        });
        setInLoop(true);
        setIsModalVisible(true);
    };

    const handleWarningEmail = () => {
        setFunctionData({
          title: '¡Ups!',
          info: 'La dirección de correo electrónico no debe contener espacios.',
          color: '#80D5FF',
          icon: require('../animations/warning_icon.json'),
          btn: 'Entendido',
        });
        setInLoop(true);
        setIsModalVisible(true);
    };

    const handleInvalidEmail = () => {
        setFunctionData({
          title: 'Correo electrónico no válido',
          info: 'Por favor ingresa una dirección de correo electrónico válida\nVerifica que sea real y/o que no contenga espacios.',
          color: '#C71D1D',
          icon: require('../animations/error_icon.json'),
          btn: 'Entendido',
        });
        setInLoop(false);
        setIsModalVisible(true);
    };

    const handleData = () => {
        setFunctionData({
          title: 'Tu solicitud ha sido enviada',
          info: 'Hemos recibido tu solicitud, pronto tendrás una respuesta.',
          color: '#42E18B',
          icon: require('../animations/success_icon.json'),
          btn: 'Entendido',
        });
        setInLoop(false);
        setIsModalVisible(true);

    };

    const handleCloseModal = () => {
        if (functionData.title === 'Tu solicitud ha sido enviada') {
            setIsModalVisible(false);
            navigation.navigate('Home', {userInfo: userInfo._id});
        } else {
            setIsModalVisible(false);
        }
    };

    const [functionData, setFunctionData] = useState({
        title: '',
        info: '',
        color: '',
        icon: null,
        btn: '',
    });

    const [inLoop, setInLoop] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentView, setCurrentView] = useState(0);
    const [previousView, setPreviousView] = useState(-1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({});
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState('Datos Personales');
    const [subtitle, setSubtitle] = useState('Verifica y completa la información solicitada.');

    const views = [
        <View1 onSubmit={data => handleViewSubmit(data, 1)} />,
        <View2 onSubmit={data => handleViewSubmit(data, 2)} />,
        <View3 onSubmit={data => handleViewSubmit(data, 3)} />,
        <View4 onSubmit={data => handleViewSubmit(data, 4)} />,
        <View5 {...formData} />,
    ];

    const handleViewSubmit = (data, nextViewIndex) => {
        setIsSubmitting(true);
        setFormData(prevData => ({...prevData, ...data}));
        console.log(data);
        setTimeout(() => {
          setPreviousView(currentView);
          setCurrentView(nextViewIndex);
          setIsSubmitting(false);
          setProgress(prevProgress => prevProgress + 25);
        }, 750);
    };

    return (
        <SafeAreaView style={styles.main_container}>
            <ScrollView
                style={styles.scroll_container}
                showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                    <View style={styles.head}>
                        <View style={styles.menu_container}>
                            <TouchableOpacity onPressOut={()=>navigation.navigate('Home', {userID: userInfo._id})}>
                                <Image style={styles.iconMenu} source={require('../img/x.png')}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.title_container}>
                            <Text style={styles.section_title}>Solicitud de tarjeta</Text>
                        </View>
                    </View>

                    <View style={styles.container_content}>

                        <View style={styles.top_container}>
                            <View style={styles.top_left}>
                                <Text style={styles.step_title}>
                                    {title}
                                </Text>
                                <Text style={styles.step_subtitle}>
                                    {subtitle}
                                </Text>
                            </View>
                            <View style={styles.top_right}>
                                <CircularProgress
                                    value={progress}
                                    subtitle="Completado"
                                    subtitleStyle={styles.title_progress}
                                    progressValueStyle={{ fontSize: 25, color: 'yellow' }}
                                    activeStrokeColor={'#20BDFF'}
                                    activeStrokeSecondaryColor={'#64FFA6'}
                                    inActiveStrokeColor={'#e9e9e9'}
                                    inActiveStrokeOpacity={0.8}
                                    activeStrokeWidth={10}
                                    inActiveStrokeWidth={10}
                                    progressValueColor={'#000'}
                                    valueSuffix={'%'}
                                    valueSuffixStyle={{fontSize: 25}}
                                    duration={1500}
                                />
                            </View>
                        </View>

                        {views[currentView]}

                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    scroll_container: {
        flex: 1,
        width: '100%',
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 35,
        marginRight: 35,
        backgroundColor: '#FFFFFF',
        marginBottom: 50,
    },

    head:{
        flexDirection: 'row',
        marginTop: 35,
        alignItems: 'center',
    },

    menu_container:{
        alignItems: 'flex-start',
    },

    iconMenu:{
        width: 22,
        height: 22,
    },

    title_container:{
        flex: 0.9,
        marginLeft: 14,
    },

    section_title:{
        fontFamily: 'DMSans-Bold',
        fontSize: 21,
        color: '#000000',
    },

    container_content:{
        flex: 1,
        marginTop: 42,
    },

    top_container:{
        flex: 1,
        flexDirection: 'row',
    },

    top_left:{
        flex: 0.7,
        alignItems: 'flex-start',
        marginEnd: 60,
    },

    top_right:{
        flex: 0.3,
        alignItems: 'flex-end',
    },

    title_progress:{
        fontFamily: 'DMSans-Medium',
        fontSize: 12,
        color: '#000',
    },

    step_title:{
        fontFamily: 'DMSans-Medium',
        fontSize: 20,
        color: '#000',
    },

    step_subtitle:{
        fontFamily: 'DMSans-Regular',
        fontSize: 15,
        color: '#000',
        marginTop: 10,
    },

    information_main_container:{
        flex: 1,
    },

    information_container:{
      marginTop: 20,
    },

    label: {
      fontSize: 14,
      fontFamily: 'DMSans-Medium',
      color: '#3B3B3B',
    },

    sectionStyle: {
        justifyContent: 'center',
        borderWidth: 0.2,
        borderRadius: 5,
        borderColor: '#000000',
        backgroundColor: '#FFF',
        marginTop: 10,
    },

    sectionDisabledStyle: {
        justifyContent: 'center',
        borderWidth: 0.2,
        borderRadius: 5,
        borderColor: '#000000',
        backgroundColor: '#E5E5E5',
        marginTop: 10,
    },

    input: {
        fontFamily: 'DMSans-Medium',
        color: '#000',
        fontSize: 15,
        marginLeft: 15,
    },

    button_container:{
        flex: 1,
        flexDirection: 'row',
        marginTop: 25,
        marginBottom: 50,
    },

    back_button:{
        backgroundColor:'#FFF',
        padding: 15,
        marginTop: 20,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },

    next_button:{
        backgroundColor:'#60CD8F',
        padding: 15,
        marginTop: 20,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },

    button_left:{
        flex: 0.5,
        alignItems: 'flex-start',
    },

    button_right:{
        flex: 0.5,
        alignItems: 'flex-end',
    },

    button_icon_left:{
        marginEnd: 5,
        width: 22,
        height: 22,
    },

    button_icon_right:{
        marginStart: 5,
        width: 22,
        height: 22,
    },

    text_next_button:{
        marginLeft: 5,
        fontFamily: 'DMSans-Bold',
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
    },

    text_back_button:{
        marginRight: 5,
        fontFamily: 'DMSans-Bold',
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },

    address_container:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    address_left:{
        flex: 0.5,
        marginEnd: 10,
    },

    address_right:{
        flex: 0.5,
        marginStart: 10,
    },

    tc_container:{
        marginTop: 20,
        flex: 1,
        height: 400,
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

    checkTerms: {
        width: 20,
        height: 20,
    },

    textTerms: {
        marginLeft: 12,
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
        color: '#000000',
    },

    reminder_title_text:{
        fontFamily: 'DMSans-Medium',
        color:'#0500FF',
        fontSize: 16,
        marginBottom: 8,
        marginTop: 20,
    },

    reminder_info_text:{
        fontFamily: 'DMSans-Regular',
        color:'#1E1E1E',
        fontSize: 14,
        textAlign: 'justify',
    },

    final_container:{
        flexDirection: 'column',
        marginTop: 50,
    },

    final_title_text:{
        fontFamily: 'DMSans-Regular',
        fontSize: 15,
        color: '#000',
    },

    final_text:{
        fontFamily: 'DMSans-Medium',
        fontSize: 15,
        color: '#000',
    },

    finish_button:{
        backgroundColor:'#60CD8F',
        padding: 15,
        marginTop: 50,
        borderRadius: 10,
        alignItems: 'center',
    },

});

export default CardRequest;
