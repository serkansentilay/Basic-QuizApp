import {View, Text, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../constants/theme';
import FormInput from '../components/shared/FormInput';
import FormButton from '../components/shared/FormButton';
import {createQuiz} from '../utils/database';

const QuizScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const handleQuizSave = async () => {
    const currentQuizId = Math.floor(100000 + Math.random() * 9000).toString();
    await createQuiz(currentQuizId, title, description); //save to firestore

    navigation.navigate('AddQuestionScreen', {
      currentQuizId: currentQuizId,
      currentQuizTitle: title,
    });

    setTitle('');
    setDescription('');
    ToastAndroid.show('Quiz Saved', ToastAndroid.SHORT);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 20,
      }}>
      <Text
        style={{
          fontSize: 20,
          textAlign: 'center',
          marginVertical: 20,
          fontWeight: 'bold',
          color: COLORS.black,
        }}>
        CREATE QUIZ
      </Text>
      <FormInput
        labelText="Title"
        placeholderText="Enter quiz title"
        onChangeText={value => setTitle(value)}
        value={title}
      />
      <FormInput
        labelText="Description"
        placeholderText="Enter quiz description"
        onChangeText={value => setDescription(value)}
        value={description}
      />

      <FormButton labelText="Save Quiz" handleOnPress={handleQuizSave} />
    </SafeAreaView>
  );
};

export default QuizScreen;
