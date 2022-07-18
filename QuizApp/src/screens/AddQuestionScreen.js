import {View, Text, ToastAndroid, Image} from 'react-native';
import React, {useState} from 'react';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import {COLORS} from '../constants/theme';
import FormButton from '../components/shared/FormButton';
import FormInput from '../components/shared/FormInput';
import {createQuestion} from '../utils/database';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const AddQuestionScreen = ({navigation, route}) => {
  const [currentQuizId, setCurrentQuizId] = useState(
    route.params.currentQuizId,
  );
  const [currentQuizTitle, setCurrentQuizTitle] = useState(
    route.params.currentQuizTitle,
  );
  const [imageUri, setImageUri] = useState('');

  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [optionThree, setOptionThree] = useState('');
  const [optionFour, setOptionFour] = useState('');

  const handleQuestionSave = async () => {
    if (
      question == '' ||
      correctAnswer == '' ||
      optionTwo == '' ||
      optionThree == '' ||
      optionFour == ''
    ) {
      return;
    }
    let currentQuestionId = Math.floor(
      100000 + Math.random() * 9000,
    ).toString();

    let imageUrl = '';
    if (imageUri != '') {
      const reference = storage().ref(
        `/images/questions/${currentQuizId}_${currentQuestionId}`,
      );
      await reference.putFile(imageUri).then(() => {
        console.log('Image Uploaded');
      });
      imageUrl = await reference.getDownloadURL();
    }

    await createQuestion(currentQuizId, currentQuestionId, {
      question: question,
      correct_answer: correctAnswer,
      incorrect_answers: [optionTwo, optionThree, optionFour],
      imageUrl: imageUrl,
    });
    ToastAndroid.show('Question saved', ToastAndroid.SHORT);

    setQuestion('');
    setCorrectAnswer('');
    setOptionTwo('');
    setOptionThree('');
    setOptionFour('');
    setImageUri('');
  };

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, ({assets}) => {
      if (assets && assets.length > 0) {
        setImageUri(assets[0].uri);
      }
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={{padding: 20}}>
            <Text
              style={{fontSize: 20, textAlign: 'center', color: COLORS.black}}>
              ADD QUESTION
            </Text>
            <Text style={{textAlign: 'center', marginBottom: 15}}>
              FOR {currentQuizTitle}
            </Text>

            <FormInput //QUESTION
              labelText="Question"
              placeholderText="Enter question"
              onChangeText={value => setQuestion(value)}
              value={question}
            />

            {imageUri == '' ? (
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20,
                  backgroundColor: COLORS.primary + '20',
                }}
                onPress={selectImage}>
                <Text style={{opacity: 0.5, color: COLORS.primary}}>
                  + add image
                </Text>
              </TouchableOpacity>
            ) : (
              <Image
                source={{uri: imageUri}}
                resizeMode={'cover'}
                style={{width: '100%', height: 200, borderRadius: 5}}></Image>
            )}

            <View style={{marginTop: 20}}>
              <FormInput
                labelText="Correct Answer"
                onChangeText={value => setCorrectAnswer(value)}
                value={correctAnswer}
              />
              <FormInput
                labelText="Option 2"
                onChangeText={value => setOptionTwo(value)}
                value={optionTwo}
              />
              <FormInput
                labelText="Option 3"
                onChangeText={value => setOptionThree(value)}
                value={optionThree}
              />
              <FormInput
                labelText="Option 4"
                onChangeText={value => setOptionFour(value)}
                value={optionFour}
              />
            </View>
            <FormButton
              labelText="Save Question"
              handleOnPress={handleQuestionSave}
            />
            <FormButton
              labelText="Done & Go Home"
              isPrimary={false}
              handleOnPress={() => {
                setCurrentQuizId('');
                navigation.navigate('HomeScreen');
              }}
              style={{marginVertical: 20}}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddQuestionScreen;
