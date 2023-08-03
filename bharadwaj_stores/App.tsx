/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import IndexScreen from './src/containers/IndexScreen/IndexScreen';
import LoginScreen from './src/containers/LoginScreen/LoginScreen';
import SignUpScreen1 from './src/containers/SignUpScreen1/SignUpScreen1';
import SignUpScreen2 from './src/containers/SignUpScreen2/SignUpScreen2';
import SignUpScreen3 from './src/containers/SignUpScreen3/SignUpScreen3';
import appStyles from './appStyles';
import OTPScreen from './src/containers/OTPScreen/OTPScreen';
import HomeScreen from './src/containers/HomeScreen/HomeScreen';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from './src/services/getAccessToken';
import Loading from './src/components/Loading/Loading';
import ForgotPasswordScreen from './src/containers/ForgotPasswordScreen/ForgotPasswordScreen';
// import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

const App = () => {
  const { myTheme, styles } = appStyles();
  const { isLoggedIn, loading } = useSelector((state: any): any => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    getAccessToken(dispatch);
  }, []);

  if (loading) {
    return <Loading />;
  }
  console.log("isLoggedIn:", isLoggedIn);
  return (
    <NavigationContainer theme={myTheme}>
      <Stack.Navigator initialRouteName='Index Screen'>
        {!isLoggedIn ?
          (
            <Stack.Group screenOptions={{
              headerStyle: styles.header,
              headerTitleStyle: styles.headerTitle,
              headerShown: false
            }}>
              <Stack.Screen name="Index Screen" component={IndexScreen} />
              <Stack.Screen name="Login Screen" component={LoginScreen} />
              <Stack.Screen name="SignUp Screen 1" component={SignUpScreen1} />
              <Stack.Screen name="SignUp Screen 2" component={SignUpScreen2} />
              <Stack.Screen name="SignUp Screen 3" component={SignUpScreen3} />
              <Stack.Screen options={{ headerShown: true, title: "Email Verification", headerLeft: () => null }} name="OTP Screen" component={OTPScreen} />
              <Stack.Screen options={{ headerShown: true, title: "Forgot Password", headerLeft: () => null }} name="Forgot Password Screen" component={ForgotPasswordScreen} />
            </Stack.Group>
          ) :
          (
            <Stack.Group screenOptions={{
              headerStyle: styles.header,
              headerTitleStyle: styles.headerTitle,
              headerShown: true
            }}>
              <Stack.Screen options={{ headerShown: true, headerLeft: () => null }} name='Home Screen' component={HomeScreen} />
            </Stack.Group>
          )
        }
      </Stack.Navigator>
    </NavigationContainer >
  )
};

export default App;
