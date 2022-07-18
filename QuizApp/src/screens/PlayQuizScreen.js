import {
  View,
  Text,
  StatusBar,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getQuestionsByQuizId, getQuizById} from '../utils/database';
import {COLORS} from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FormButton from '../components/shared/FormButton';
import ResultModal from '../components/playQuizScreen/ResultModal';

const PlayQuizScreen = ({navigation, route}) => {
  const [currentQuizId, setCurrentQuizId] = useState(route.params.quizId);
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setInCorrectCount] = useState(0);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const getQuizAndQuestionDetails = async () => {
    let currentQuiz = await getQuizById(currentQuizId);
    currentQuiz = currentQuiz.data();
    setTitle(currentQuiz.title);

    const questions = await getQuestionsByQuizId(currentQuizId);

    let tempQuestions = [];
    await questions.docs.forEach(async res => {
      let question = res.data();

      question.allOptions = shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]);
      await tempQuestions.push(question);
    });
    setQuestions([...tempQuestions]);
  };

  useEffect(() => {
    getQuizAndQuestionDetails();
  }, []);

  const getOptionBgColor = (currentQuestion, currentOption) => {
    if (currentQuestion.selectedOption) {
      if (currentOption == currentQuestion.selectedOption) {
        if (currentOption == currentQuestion.correct_answer) {
          return COLORS.success;
        } else {
          return COLORS.error;
        }
      } else {
        return COLORS.white;
      }
    } else {
      return COLORS.white;
    }
  };

  const getOptionTextColor = (currentQuestion, currentOption) => {
    if (currentQuestion.selectedOption) {
      if (currentOption == currentQuestion.selectedOption) {
        return COLORS.white;
      } else {
        return COLORS.black;
      }
    } else {
      return COLORS.black;
    }
  };

  return (
    <SafeAreaView style={{flex: 1, position: 'relative'}}>
      <StatusBar
        backgroundColor={COLORS.white}
        barStyle={'dark-content'}></StatusBar>

      <View //TOP
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: COLORS.white,
          elevation: 4,
        }}>
        <Icon
          name="arrow-back"
          size={24}
          color={COLORS.black}
          onPress={() => navigation.goBack()}></Icon>
        <Text style={{fontSize: 16, marginLeft: 10, color: COLORS.black}}>
          {title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View //CORRECT
            style={{
              backgroundColor: COLORS.success,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}>
            <Icon name="check" size={14} style={{color: COLORS.white}}></Icon>
            <Text style={{color: COLORS.white, marginLeft: 6}}>
              {correctCount}
            </Text>
          </View>
          <View //INCORRECT
            style={{
              backgroundColor: COLORS.error,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <Icon name="close" size={14} style={{color: COLORS.white}}></Icon>
            <Text style={{color: COLORS.white, marginLeft: 6}}>
              {incorrectCount}
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={questions}
        style={{flex: 1, backgroundColor: COLORS.background}}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.question}
        renderItem={({item, index}) => (
          <View
            style={{
              marginTop: 14,
              marginHorizontal: 10,
              backgroundColor: COLORS.white,
              elevation: 2,
              borderRadius: 2,
            }}>
            <View style={{padding: 20}}>
              <Text style={{fontSize: 16, color: COLORS.black}}>
                {index + 1}.{item.question}
              </Text>
              {item.imageUrl != '' ? (
                <Image
                  source={{uri: item.imageUrl}}
                  resizeMode={'contain'}
                  style={{
                    width: '80%',
                    height: 150,
                    marginTop: 20,
                    marginLeft: '10%',
                    borderRadius: 5,
                  }}></Image>
              ) : null}
            </View>
            {item.allOptions.map((option, optionIndex) => {
              return (
                <TouchableOpacity
                  key={optionIndex}
                  style={{
                    color: COLORS.black,
                    paddingVertical: 14,
                    paddingHorizontal: 20,
                    borderTopWidth: 1,
                    backgroundColor: getOptionBgColor(item, option),
                    borderColor: COLORS.border,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                  onPress={() => {
                    if (item.selectedOption) {
                      return null;
                    }
                    if (option == item.correct_answer) {
                      setCorrectCount(correctCount + 1);
                    } else {
                      setInCorrectCount(incorrectCount + 1);
                    }

                    let tempQuestions = [...questions];
                    tempQuestions[index].selectedOption = option;
                    setQuestions([...tempQuestions]);
                  }}>
                  <Text
                    style={{
                      width: 25,
                      height: 25,
                      color: getOptionTextColor(item, option),
                      padding: 2,
                      borderWidth: 1,
                      borderColor: COLORS.border,
                      textAlign: 'center',
                      marginRight: 16,
                      borderRadius: 25,
                    }}>
                    {optionIndex + 1}
                  </Text>
                  <Text style={{color: getOptionTextColor(item, option)}}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        ListFooterComponent={() => (
          <FormButton
            labelText="Submit"
            style={{margin: 10}}
            handleOnPress={() => {
              setIsResultModalVisible(true);
            }}
          />
        )}></FlatList>

      <ResultModal
        isModalVisible={isResultModalVisible}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        totalCount={questions.length}
        handleOnClose={() => {
          setIsResultModalVisible(false);
        }}
        handleRetry={() => {
          setCorrectCount(0);
          setInCorrectCount(0);
          getQuizAndQuestionDetails();
          setIsResultModalVisible(false);
        }}
        handleHome={() => {
          navigation.goBack();
          setIsResultModalVisible(false);
        }}></ResultModal>
    </SafeAreaView>
  );
};

export default PlayQuizScreen;
