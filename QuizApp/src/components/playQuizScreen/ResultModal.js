import {TouchableOpacity, View, Text, Modal} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ResultModal = ({
  isModalVisible,
  correctCount,
  incorrectCount,
  totalCount,
  handleOnClose,
  handleRetry,
  handleHome,
}) => {
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleOnClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black + '90',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{backgroundColor: COLORS.white, width: '90%'}}>
          <Text style={{color: COLORS.black}}>Results</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{alignItems: 'center', padding: 20}}>
              <Text style={{color: COLORS.success, fontSize: 30}}>
                {correctCount}
              </Text>
              <Text style={{fontSize: 16, color: COLORS.black}}>Correct</Text>
            </View>
            <View style={{alignItems: 'center', padding: 20}}>
              <Text style={{color: COLORS.error, fontSize: 30}}>
                {incorrectCount}
              </Text>
              <Text style={{fontSize: 16, color: COLORS.black}}>Incorrect</Text>
            </View>
          </View>
          <Text
            style={{
              opacity: 0.8,
              color: COLORS.black,
            }}>
            {totalCount - (incorrectCount + correctCount)} Unattampted
          </Text>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
              width: '100%',
              backgroundColor: COLORS.primary,
              marginTop: 20,
              borderRadius: 50,
            }}
            onPress={handleRetry}>
            <Icon name="replay" style={{color: COLORS.white}}></Icon>
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.white,
                marginLeft: 10,
              }}>
              Try Again
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
              width: '100%',
              backgroundColor: COLORS.primary + '50',
              marginTop: 20,
              borderRadius: 50,
            }}
            onPress={handleHome}>
            <Icon name="home" style={{color: COLORS.primary}}></Icon>
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.white,
                marginLeft: 10,
              }}>
              Go Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ResultModal;
