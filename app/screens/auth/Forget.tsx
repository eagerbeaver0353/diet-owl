import {Input} from '@rneui/themed';
import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Yup from 'yup';
import BaseLayout1 from '../../components/Base1';

import Card from '../../components/Card';
import Text from '../../components/Text';

interface ValuesType {
  email: string;
}

const initialValues: ValuesType = {
  email: '',
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
});

const ForgetPassword = ({navigation}) => {
  const onSubmit = () => {
    navigation.navigate('Otp');
  };

  return (
    <BaseLayout1>
      <Card style={styles.formWrapper}>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={{marginTop: 20, marginBottom: 0}}>
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 26,
                    lineHeight: 40.32,
                    color: 'rgba(18, 46, 51, 1)',
                  }}>
                  FORGOT PASSWORD
                </Text>
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
                containerStyle={{flex: 1}}
                label={
                  <Text
                    style={{
                      color: 'rgba(181, 181, 181, 1)',
                      fontSize: 16,
                    }}>
                    Enter your Email ID to reset the password.
                  </Text>
                }
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                errorMessage={errors.email && touched.email ? errors.email : ''}
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

export default ForgetPassword;

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
