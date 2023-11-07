import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Screen from '../components/Screen';
import tailwind from 'tailwind-react-native-classnames';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/authSlice';
import { auth } from '../configs/firebase';
import { updateProfile } from "firebase";

const EditProfileScreen = ({ navigation }) => {
    const user = useSelector(selectUser);
    const [newName, setNewName] = useState(user?.name);
    const [newPhoneNumber, setNewPhoneNumber] = useState(user?.phoneNumber);

    const handleUpdateProfile = async () => {
        try {
            await updateProfile(user, {
                displayName: newName,
                displayPhoneNumber: newPhoneNumber,
            });
            Alert.alert('Success', 'Profile updated successfully');
            navigation.navigate('Account');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <Screen style={tailwind`flex-1 bg-white`}>
            <View style={tailwind`p-4`}>
                <Text style={tailwind`text-3xl font-bold`}>Edit Profile</Text>
                <TextInput
                    style={tailwind`border border-gray-300 rounded-md p-2 mt-4`}
                    placeholder="Name"
                    value={newName}
                    onChangeText={(text) => setNewName(text)}
                />
                <TextInput
                    style={tailwind`border border-gray-300 rounded-md p-2 mt-2`}
                    placeholder="Phone Number"
                    value={newPhoneNumber}
                    onChangeText={(text) => setNewPhoneNumber(text)}
                />
                <TouchableOpacity
                    style={tailwind`bg-blue-500 p-2 rounded-md mt-4`}
                    onPress={handleUpdateProfile}
                >
                    <Text style={tailwind`text-white text-center`}>Update Profile</Text>
                </TouchableOpacity>
            </View>
        </Screen>
    );
};

export default EditProfileScreen;
