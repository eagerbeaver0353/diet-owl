/* eslint-disable react-native/no-inline-styles */
import {Input} from '@rneui/themed';
import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Yup from 'yup';
import BaseLayout1 from '../../components/Base1';

import Card from '../../components/Card';
import Text from '../../components/Text';

import {useDispatch} from 'react-redux';
import {updateUser} from '../../store/userSlice';

import {login} from '../../services';
import {transformToFormikErrors} from '../../utils/form';
import {setSecureValue} from '../../utils/keyChain';

interface ValuesType {
  newPassword: string;
  confirmPassword: string;
}

const initialValues: ValuesType = {
  newPassword: '',
  confirmPassword: '',
};

const LoginSchema = Yup.object().shape({
  newPassword: Yup.string().min(5, 'Too Short!').required('Required'),
  confirmPassword: Yup.string()
    .min(5, 'Too Short!')
    .required('Required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});

const ResetPassword = ({}) => {
  const dispatch = useDispatch();

  const handleLogin = (values: ValuesType, {setErrors}: any) => {
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
              <View style={{marginTop: 20, marginBottom: 20}}>
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 26,
                    lineHeight: 40.32,
                    color: 'rgba(18, 46, 51, 1)',
                  }}>
                  RESET PASSWORD
                </Text>
              </View>
              <Input
                placeholder="Enter your New Password"
                leftIcon={
                  <MaterialCommunityIcon
                    name="lock-outline"
                    size={24}
                    color="black"
                  />
                }
                inputContainerStyle={styles.inputContainerStyle}
                label={<Text>New Password</Text>}
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                value={values.newPassword}
                secureTextEntry
                errorMessage={
                  errors.newPassword && touched.newPassword
                    ? errors.newPassword
                    : ''
                }
              />
              <Input
                placeholder="Enter your New Password"
                leftIcon={
                  <MaterialCommunityIcon
                    name="lock-outline"
                    size={24}
                    color="black"
                  />
                }
                inputContainerStyle={styles.inputContainerStyle}
                containerStyle={{flex: 1}}
                label={<Text>Confirm Password</Text>}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secureTextEntry
                errorMessage={
                  errors.confirmPassword && touched.confirmPassword
                    ? errors.confirmPassword
                    : ''
                }
              />

              <TouchableOpacity onPress={handleSubmit}>
                <Text style={styles.loginButton}>Submit</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </Card>
    </BaseLayout1>
  );
};

export default ResetPassword;

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
    marginTop: 15,
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
    marginBottom: 20,
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
