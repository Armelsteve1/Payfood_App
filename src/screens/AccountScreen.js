import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Screen from '../components/Screen'
import tailwind from 'tailwind-react-native-classnames';
import AppHead from '../components/AppHead';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/authSlice'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../configs/firebase'
import { useNavigation } from '@react-navigation/native';

const AccountScreen = ({ navigation }) => {

    const user = useSelector(selectUser)

    console.log('auth', auth);
    console.log('user', user);

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.navigate('UserLogin');
            })
            .catch((error) => {
                console.error('Sign-out error:', error);
            });
    };

    return (
        <Screen style={tailwind`flex-1 bg-white`}>
            <AppHead title={`Account`} icon="settings-outline" />
            <View style={tailwind`justify-center items-center`}>
                <View style={tailwind`rounded-full overflow-hidden w-48 h-48 mt-4`}>
                    <Image source={require('../assets/images/avatar.gif')} style={tailwind`w-48 h-48`} />
                </View>
                <Text style={tailwind`mt-4 text-3xl font-bold`}>{user?.name}</Text>
                <Text style={tailwind`text-lg text-indigo-900`}>{user?.email}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("EditProfileScreen")} style={tailwind`mt-2 ml-2`}>
                    <AntDesign name="edit" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={tailwind`mx-4 border-t border-t-2 mt-5 border-gray-100`}>
                <Text style={tailwind`text-gray-800 mt-2 text-lg mb-2`}>Saved places</Text>
                <SavedPlaces
                    title="Home"
                    text="Add home"
                    Icon={() => <AntDesign name="home" size={24} color="black" />}
                />
                <SavedPlaces
                    title="Word"
                    text="Add work"
                    Icon={() => <Ionicons name="md-briefcase-outline" size={24} color="black" />}
                />
            </View>
            <View style={tailwind`mx-4 border-t border-t-2 mt-5 border-gray-100`}>
                <Text style={tailwind`text-gray-800 mt-2 text-lg`}>Other options</Text>
                <TouchableOpacity onPress={handleSignOut}>
                    <Text style={tailwind`text-green-900 mt-2`}>Sign out</Text>
                </TouchableOpacity>
            </View>
        </Screen >
    );
}

const SavedPlaces = ({ title, text, Icon }) => (
    <TouchableOpacity style={tailwind`flex-row items-center my-3`}>
        <Icon />
        <View style={tailwind`ml-5`}>
            <Text style={tailwind`text-gray-800`}>{title}</Text>
            <Text style={tailwind`text-gray-600 text-xs mt-1`}>{text}</Text>
        </View>
    </TouchableOpacity>
)

export default AccountScreen;

