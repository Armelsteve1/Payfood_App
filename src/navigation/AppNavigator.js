import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser, selectUser } from '../redux/slices/authSlice';
import AuthNavigator from './AuthNavigator';
import { auth } from '../configs/firebase';
import HomeNavigator from './HomeNavigator';
import { LogBox } from 'react-native';
import { ActivityIndicator, View } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);

export default function AppNavigator() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unlisten = auth.onAuthStateChanged(authUser => {
            if (authUser) {
                const user = {
                    name: authUser.displayName,
                    image: authUser.photoURL,
                    email: authUser.email
                }
                dispatch(loginUser(user))
            }
            else {
                dispatch(logoutUser())
            }
            setLoading(false);
        })
        return () => {
            unlisten();
        }
    }, [])
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? (
                <HomeNavigator />
            ) : (
                <AuthNavigator />
            )}
        </NavigationContainer>
    )
}