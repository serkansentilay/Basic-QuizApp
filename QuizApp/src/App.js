import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from './navigators/AuthStackNavigator';
import AppStackNavigator from './navigators/AppStackNavigator';
import {HomeScreen} from './screens';
import auth from '@react-native-firebase/auth';

const App = () => {
  const [currentUser, setcurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onAuthStateChanged = async user => {
    await setcurrentUser(user);
    setIsLoading(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      {currentUser ? (
        <AppStackNavigator></AppStackNavigator>
      ) : (
        <AuthStackNavigator />
      )}
    </NavigationContainer>
  );
};

export default App;
