import {View, Text} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/theme';
import {TextInput} from 'react-native-gesture-handler';

const FormInput = ({
  labelText = '',
  placeholderText = '',
  onChangeText = null,
  value = null,
  ...more
}) => {
  return (
    <View style={{width: '100%', marginBottom: 20}}>
      <Text style={{color: COLORS.grey}}>{labelText}</Text>
      <TextInput
        style={{
          padding: 10,
          borderColor: COLORS.black,
          borderWidth: 1,
          color: COLORS.black,
          width: '100%',
          borderRadius: 10,
          marginTop: 10,
        }}
        placeholder={placeholderText}
        placeholderTextColor={COLORS.grey}
        onChangeText={onChangeText}
        value={value}
        {...more}></TextInput>
    </View>
  );
};

export default FormInput;
