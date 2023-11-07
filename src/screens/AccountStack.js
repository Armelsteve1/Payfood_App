import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen';
import LoginScreenUser from '../screens/LoginScreenUser';
import SignUpScreen from '../screens/SignupScreen';


const Stack = createStackNavigator();

function AccountStack() {
    return (
        <Stack.Navigator initialRouteName="Account">
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="LoginScreenUser" component={LoginScreenUser} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </Stack.Navigator>
    );
}

export default AccountStack;
