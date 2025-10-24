import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import WelcomeScreen from './src/screens/WelcomeScreen';
import JobPostScreen from './src/screens/JobPostScreen';
import WorkerProfileScreen from './src/screens/WorkerProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="PostJob" 
          component={JobPostScreen}
          options={{ title: 'Post a Job' }}
        />
        <Stack.Screen 
          name="WorkerProfile" 
          component={WorkerProfileScreen}
          options={{ title: 'Create Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}