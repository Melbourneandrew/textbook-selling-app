import {useState} from 'react';
import {StyleSheet,View,Text,TextInput,Image, TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
import AppTextInput from './AppTextInput';
import AppButton from './AppButton';
import LinkButton from './LinkButton';
import LoginToSignup from './LoginToSignup';
import {Formik} from 'formik';
import ErrorMessage from './ErrorMessage';
import {Entypo} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
    email: yup.string().email('Please enter valid Email').required('Email address is required'),
    password: yup.string().min(8,({min}) => 'password must be atleast 8 characters').required('Password is a required field')
})

function LoginCard({onChangeText, formPress}){
    const [showPassword,setShowPassword] = useState(true);

    return(
        <View style={styles.container}>
            <Image source={require('../assets/login_icon.png')} style={styles.image}/>
            <Formik
                validationSchema={loginValidationSchema}
                initialValues={{email:'', password: ''}}
                onSubmit={Values => console.log(Values)}
            >
                {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                    <View style={styles.smaller_container}>
                        <AppTextInput
                            onChangeText={handleChange('email')}
                            placeHolder={'Email'}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType={'email-address'}
                        />
                        <ErrorMessage error={errors.email} visible={touched.email}/>
                        <View style={styles.spacer}></View>
                        <AppTextInput
                            onChangeText={handleChange('password')}
                            placeHolder={'Password'}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={showPassword}
                            icon={
                                <TouchableOpacity onPress={() => {setShowPassword((prev) => !prev)}} style={{paddingLeft:4}}>
                                    {showPassword ? <Entypo name="eye-with-line" size={22} color="black" />  : <Entypo name="eye" size={22} color="black" />}
                                </TouchableOpacity>
                            }
                        />
                        <ErrorMessage error={errors.password} visible={touched.password}/>
                        <View style={{flexDirection:'row-reverse', width:'100%'}}>
                            <LinkButton
                                text={'Forgot Password?'}
                            />
                        </View>
                        <View style={styles.spacer}></View>
                        <AppButton
                            text={'LOGIN'}
                            onPress={handleSubmit}
                        />
                        <View style={styles.signupTextContainer}>
                            <LoginToSignup
                                text={"Don't have an account?"}
                            />
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        shadowOpacity: 0.4,
        shadowRadius: 20,
        width:'80%',
        height:'50%',
        backgroundColor:'white',
        alignItems:'center'

    },
    smaller_container: {
        width:'75%',
        height:'65%',
        marginTop: 20,

    },
    image: {
        width:140,
        height:110,

    },
    spacer: {
        marginTop: 20
    },
    signupTextContainer: {
        marginTop:15,
    },
    forgotPasswordContainer: {
        flexDirection:'row-reverse'
    }

})

export default LoginCard;