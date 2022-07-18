import {View, Text, Alert, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../constants/theme';
import FormInput from '../components/shared/FormInput';
import FormButton from '../components/shared/FormButton';
import {signIn} from '../utils/Auth';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnSubmit = () => {
    if (email != '' && password != '') {
      signIn(email, password);
    } else {
      Alert.alert('Please do not leave blank');
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
      }}>
      <Text //SIGN IN
        style={{
          fontSize: 24,
          color: COLORS.black,
          fontWeight: 'bold',
          marginVertical: 32,
        }}>
        Sign In
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

      <FormButton //SIGNIN
        labelText="Sign In"
        handleOnPress={handleOnSubmit}
        style={{width: '100%'}}
      />

      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
        <Text style={{color: COLORS.grey}}>Don't have an account?</Text>
        <Text
          style={{marginLeft: 4, color: COLORS.primary}}
          onPress={() => navigation.navigate('SignUpScreen')}>
          Create Account
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
