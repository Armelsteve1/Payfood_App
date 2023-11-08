import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Screen from '../components/Screen';
import tailwind from 'tailwind-react-native-classnames';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/authSlice';
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import colors from '../configs/colors';

export default function EditProfileScreen({ navigation }) {
    const user = useSelector(selectUser);
    const [newName, setNewName] = useState(user?.name);
    const [newPhoneNumber, setNewPhoneNumber] = useState(user?.phoneNumber);
    const [newEmail, setNewEmail] = useState(user?.email);
    const auth = getAuth();

    const handleUpdateProfile = async () => {
        try {
            // Update profile information
            await updateProfile(auth.currentUser, {
                displayName: newName,
                phoneNumber: newPhoneNumber,
            });

            // Update the email if changed
            if (newEmail !== user.email) {
                await updateEmail(auth.currentUser, newEmail);
            }

            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <Screen style={tailwind`flex-1 bg-white`}>
            <View style={tailwind`flex-1 p-4`}>
                <View style={tailwind`flex-1`}>
                    <Text style={tailwind`text-2xl font-bold`}>Modification des informations</Text>
                    <TextInput
                        style={tailwind`border border-gray-300 rounded-md p-2 mt-4`}
                        placeholder="Nom et prénom"
                        value={newName}
                        onChangeText={(text) => setNewName(text)}
                    />
                    <TextInput
                        style={tailwind`border border-gray-300 rounded-md p-2 mt-2`}
                        placeholder="Numéro de téléphone"
                        placeholderTextColor="grey"
                        value={newPhoneNumber}
                        onChangeText={(text) => setNewPhoneNumber(text)}
                    />
                    <TextInput
                        style={tailwind`border border-gray-300 rounded-md p-2 mt-2`}
                        placeholder="Adresse email"
                        placeholderTextColor="grey"
                        value={newEmail}
                        onChangeText={(text) => setNewEmail(email)}
                    />
                </View>
                <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 5, marginTop: 4 }}
                        onPress={handleUpdateProfile}
                    >
                        <Text style={tailwind`text-white text-center`}>Sauvegarder le profil</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Screen>
    );
}
