import {Input} from '@rneui/themed';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Yup from 'yup';
import BaseLayout1 from '../../components/Base1';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Card from '../../components/Card';
import Text from '../../components/Text';
import moment from 'moment';

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
  name: string;
  email: string;
  password: string;
  height: number;
  weight: number;
  birth: string;
}

const formatDate = (date: any = undefined) => {
  console.log(moment(date));
  return moment(date).format('YYYY-MM-DD');
};

const initialValues: ValuesType = {
  name: '',
  email: '',
  password: '',
  height: 0,
  weight: 0,
  birth: formatDate(),
};

const LoginSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email().required('Required'),
  password: Yup.string().min(5, 'Too Short!').required('Required'),
  height: Yup.number().required('Required'),
  weight: Yup.number().required('Required'),
  birth: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Format doesn't match")
    .required('Required'),
});

const Signup = () => {
  const dispatch = useDispatch();
  const [showPassword, toggleShowPassword] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleSignup = (values: ValuesType, {setErrors}: any) => {
    // Add grant_type value to obj
    let reqObj: any = Object.assign({}, values, {grant_type: 'password'});
    // Service request
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
          onSubmit={handleSignup}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={{marginBottom: 20}}>
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 32,
                    lineHeight: 40.32,
                    color: 'rgba(18, 46, 51, 1)',
                  }}>
                  SIGN UP
                </Text>
              </View>
              <Input
                placeholder="Enter your name"
                leftIcon={
                  <MaterialCommunityIcon
                    name="account-outline"
                    size={24}
                    color="black"
                  />
                }
                inputContainerStyle={styles.inputContainerStyle}
                label={<Text>Name</Text>}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                keyboardType="name-phone-pad"
                errorMessage={errors.name && touched.name ? errors.name : ''}
              />
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
                secureTextEntry={showPassword}
                errorMessage={
                  errors.password && touched.password ? errors.password : ''
                }
                rightIcon={
                  <MaterialCommunityIcon
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    onPress={() => toggleShowPassword(!showPassword)}
                  />
                }
              />

              <View style={{flexDirection: 'row'}}>
                <Input
                  placeholder="Height"
                  leftIcon={
                    <MaterialCommunityIcon
                      name="ruler"
                      size={24}
                      color="black"
                    />
                  }
                  containerStyle={styles.halfContainerStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  label={<Text>Height</Text>}
                  onChangeText={handleChange('height')}
                  onBlur={handleBlur('height')}
                  value={values.height}
                  keyboardType="number-pad"
                  errorMessage={
                    errors.height && touched.height ? 'Wrong format!!!' : ''
                  }
                />
                <Input
                  placeholder="Weight"
                  leftIcon={
                    <MaterialCommunityIcon
                      name="weight-kilogram"
                      size={24}
                      color="black"
                    />
                  }
                  containerStyle={styles.halfContainerStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  label={<Text>Weight</Text>}
                  onChangeText={handleChange('weight')}
                  onBlur={handleBlur('weight')}
                  value={values.weight}
                  keyboardType="number-pad"
                  errorMessage={
                    errors.weight && touched.weight ? 'Wrong format!!!' : ''
                  }
                />
              </View>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={date => {
                  hideDatePicker();
                  setFieldValue('birth', formatDate(date));
                }}
                onCancel={hideDatePicker}
                date={new Date(values.birth)}
              />

              <Input
                placeholder="Enter your Date of Birth"
                leftIcon={
                  <MaterialCommunityIcon
                    name="cake-variant-outline"
                    size={24}
                    color="black"
                  />
                }
                inputContainerStyle={styles.inputContainerStyle}
                label={<Text>Date of Birth</Text>}
                onChangeText={(...other) => {
                  handleChange('birth')(...other);
                  console.log('TTT');
                }}
                onBlur={handleBlur('birth')}
                onFocus={isDatePickerVisible ? f => f : showDatePicker}
                value={values.birth}
                keyboardType="default"
                errorMessage={errors.birth && touched.birth ? errors.birth : ''}
              />

              <TouchableOpacity onPress={handleSubmit}>
                <Text style={styles.loginButton}>Sign up</Text>
              </TouchableOpacity>

              <View>
                <Image source={loginWithImage} style={styles.loginWithImage} />
                <View
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
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={f => f}>
                  <Text style={{fontWeight: 'bold'}}>Login</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </Card>
    </BaseLayout1>
  );
};

export default Signup;

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
  halfContainerStyle: {
    flexGrow: 1,
    flexBasis: 0,
  },
});
