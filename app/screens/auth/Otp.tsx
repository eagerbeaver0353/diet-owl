/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import OTPTextView from 'react-native-otp-textinput';

import BaseLayout1 from '../../components/Base1';
import Card from '../../components/Card';
import Text from '../../components/Text';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Otp = ({navigation}) => {
  let otpInput = useRef(null);

  const handleSubmit = () => {
    navigation.navigate('ResetPassword');
  };

  return (
    <BaseLayout1>
      <Card style={styles.formWrapper}>
        <View style={{marginTop: 20, marginBottom: 0}}>
          <Text
            style={{
              fontWeight: 500,
              fontSize: 26,
              lineHeight: 40.32,
              color: 'rgba(18, 46, 51, 1)',
            }}>
            ENTER OTP
          </Text>
        </View>
        <Text
          style={{
            color: 'rgba(181, 181, 181, 1)',
            fontSize: 16,
            marginTop: 5,
          }}>
          Code sent to the your email address, please verify and change
          password.
        </Text>
        <OTPTextView
          ref={otpInput}
          handleTextChange={f => f}
          inputCount={4}
          textInputStyle={{
            borderRadius: 10,
            borderWidth: 4,
            width: 50,
            height: 50,
            elevation: 5,
            backgroundColor: 'white',
          }}
          containerStyle={{
            width: '80%',
            marginTop: 30,
            alignSelf: 'center',
            justifyContent: 'space-around',
          }}
          keyboardType="numeric"
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <MaterialCommunityIcon
            name="clock-time-four-outline"
            size={16}
            color={'black'}
          />
          <Text>{'  '}00:59</Text>
        </View>

        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.loginButton}>Submit</Text>
        </TouchableOpacity>
      </Card>
    </BaseLayout1>
  );
};

export default Otp;

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
