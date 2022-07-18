import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AddQuestionScreen,
  HomeScreen,
  PlayQuizScreen,
  QuizScreen,
} from '../screens';

const Stack = createStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
      <Stack.Screen name="QuizScreen" component={QuizScreen}></Stack.Screen>
      <Stack.Screen
        name="AddQuestionScreen"
        component={AddQuestionScreen}></Stack.Screen>
      <Stack.Screen
        name="PlayQuizScreen"
        component={PlayQuizScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
