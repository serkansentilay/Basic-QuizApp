import {View, Text, Alert, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../constants/theme';
import FormInput from '../components/shared/FormInput';
import FormButton from '../components/shared/FormButton';
import {signUp} from '../utils/Auth';
const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOnSubmit = () => {
    if (email != '' && password != '' && confirmPassword != '') {
      if (password == confirmPassword) {
        signUp(email, password);
      } else {
        Alert.alert('Passwords did not match');
      }
    } else {
      Alert.alert('Please do not leave blank');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
      }}>
      <Text //SIGN UP
        style={{
          fontSize: 24,
          color: COLORS.black,
          fontWeight: 'bold',
          marginVertical: 32,
        }}>
        Sign Up
      </Text>

      <FormInput //EMAIL
        labelText="Email"
        placeholderText="enter your email"
        onChangeText={value => setEmail(value)}
        value={email}
        keyboardType={'email-address'}></FormInput>

      <FormInput //PASSWORD
        labelText="Password"
        placeholderText="enter your password"
        onChangeText={value => setPassword(value)}
        value={password}
        secureTextEntry={true}
      />

      <FormInput //CONFIRM PASSWORD
        labelText="CONFIRM Password"
        placeholderText="enter your password again"
        onChangeText={value => setConfirmPassword(value)}
        value={confirmPassword}
        secureTextEntry={true}
      />

      <FormButton //SIGNIN
        labelText="Sign Up"
        handleOnPress={handleOnSubmit}
        style={{width: '100%'}}
      />

      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
        <Text style={{color: COLORS.grey}}>Already have an account?</Text>
        <Text
          style={{marginLeft: 4, color: COLORS.primary}}
          onPress={() => navigation.navigate('SignInScreen')}>
          Sign In
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
