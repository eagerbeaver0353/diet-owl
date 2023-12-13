import {Input} from '@rneui/themed';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Yup from 'yup';
import BaseLayout1 from '../../components/Base1';

import Card from '../../components/Card';
import Text from '../../components/Text';

const loginLabel = require('../../assets/images/login-label.png');
const loginWithImage = require('../../assets/images/login-with-image.png');
const loginWithApple = require('../../assets/images/logo-apple.png');
const loginWithFacebook = require('../../assets/images/logo-facebook.png');
const loginWithGoogle = require('../../assets/images/logo-google.png');

import {useDispatch} from 'react-redux';
import {updateUser} from '../../store/userSlice';

import {login} from '../../services';
import {transformToFormikErrors} from '../../utils/form';
import {setSecureValue} from '../../utils/keyChain';

interface ValuesType {
  email: string;
  password: string;
}

const initialValues: ValuesType = {email: '', password: ''};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
  password: Yup.string().min(5, 'Too Short!').required('Required'),
});

const Login = ({navigation, ...other}) => {
  const dispatch = useDispatch();
  const [passwordVisible, togglepasswordVisible] = useState(false);

  const goToSignUp = () => {
    console.log(other);
    navigation.push('Signup');
  };

  const handleLogin = (values: ValuesType, {setErrors}: any) => {
    // Add grant_type value to obj
    let reqObj: any = Object.assign({}, values, {grant_type: 'password'});
    // Service request
    dispatch(
      updateUser({
        name: values.name,
        email: values.email,
        token: 'hello world',
      }),
    );
    login(new URLSearchParams(reqObj))
      .then(res => {
        if (res.data?.user?.access_token) {
          const {name, email, access_token, refresh_token} = res.data.user;
          dispatch(updateUser({name, email, token: access_token}));
          setSecureValue('token', access_token);
          setSecureValue('refresh_token', refresh_token);
        }
      })
      .catch(e => {
        if (e.response?.data?.errors) {
          let result = transformToFormikErrors(e.response.data.errors);
          setErrors(result);
        }
      });
  };

  return (
    <BaseLayout1>
      <Card style={styles.formWrapper}>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={{marginBottom: 20}}>
                <Image source={loginLabel} />
              </View>
              <Input
                placeholder="Enter Email ID"
                leftIcon={
                  <MaterialCommunityIcon
                    name="email-outline"
                    size={24}
                    color="black"
                  />
                }
                inputContainerStyle={styles.inputContainerStyle}
                label={<Text>Email</Text>}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                errorMessage={errors.email && touched.email ? errors.email : ''}
              />
              <Input
                placeholder="Enter your Password"
                leftIcon={
                  <MaterialCommunityIcon
                    name="lock-outline"
                    size={24}
                    color="black"
                  />
                }
                inputContainerStyle={styles.inputContainerStyle}
                label={<Text>Password</Text>}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={!passwordVisible}
                errorMessage={
                  errors.password && touched.password ? errors.password : ''
                }
                rightIcon={
                  <MaterialCommunityIcon
                    name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    onPress={() => togglepasswordVisible(!passwordVisible)}
                  />
                }
              />

              <TouchableOpacity
                onPress={() => navigation.navigate('ForgetPassword')}
                style={styles.buttonForgetPassword}>
                <Text>Forget password?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSubmit}>
                <Text style={styles.loginButton}>Login</Text>
              </TouchableOpacity>

              <View>
                <Image source={loginWithImage} style={styles.loginWithImage} />
                <View
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20,
                  }}>
                  <View style={styles.loginThirdParty}>
                    <Image source={loginWithApple} />
                  </View>
                  <View style={styles.loginThirdParty}>
                    <Image source={loginWithFacebook} />
                  </View>
                  <View style={styles.loginThirdParty}>
                    <Image source={loginWithGoogle} />
                  </View>
                </View>
              </View>

              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Text>Don’t have an account? </Text>
                <TouchableOpacity onPress={goToSignUp}>
                  <Text style={{fontWeight: 'bold'}}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </Card>
    </BaseLayout1>
  );
};

export default Login;

const styles = StyleSheet.create({
  formWrapper: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 0,
    paddingTop: 40,
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: '#112D3333',
    borderStyle: 'solid',
    borderRadius: 10,
    marginTop: 8,
    paddingHorizontal: 10,
    elevation: 5,
    backgroundColor: 'white',
    // boxShadow: '0px 2px 12px 0px rgba(43, 98, 109, 0.1)',
  },
  buttonForgetPassword: {
    alignSelf: 'flex-end',
    marginTop: -10,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: 'rgba(243, 205, 37, 1)',
    fontFamily: 'Outfit-Regular',
    fontSize: 20,
    alignSelf: 'center',
    paddingVertical: 10,
    width: '36%',
    textAlign: 'center',
    borderRadius: 6,
  },
  loginWithImage: {
    alignSelf: 'center',
    marginTop: 30,
    width: '90%',
  },
  loginThirdParty: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(17, 45, 51, 0.1)',
    padding: 10,
    marginHorizontal: 20,
  },
});
