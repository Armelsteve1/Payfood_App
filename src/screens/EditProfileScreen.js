import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Screen from '../components/Screen';
import tailwind from 'tailwind-react-native-classnames';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/authSlice';
import { auth, app } from "../configs/firebase";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import colors from '../configs/colors';
import { getFirestore, collection, doc, setDoc, updateDoc } from "firebase/firestore";

export default function EditProfileScreen({ navigation }) {

    const auth = getAuth();
    const firestore = getFirestore(app);

    const user = useSelector(selectUser);

    const usersRef = collection(firestore, "users");
    const userDoc = doc(usersRef, auth.currentUser.uid);

    const [newName, setNewName] = useState(user?.name);
    const [newPhoneNumber, setNewPhoneNumber] = useState(user?.phoneNumber);
    const [newEmail, setNewEmail] = useState(user?.email);

    const handleUpdateProfile = async () => {

        try {
            await updateProfile(auth.currentUser, {
                displayName: newName,
                phoneNumber: newPhoneNumber,
            });

            if (newPhoneNumber !== user.phoneNumber && newPhoneNumber) {

                await updateDoc(userDoc, {
                    phoneNumber: newPhoneNumber,
                });
            }

            if (newEmail !== user.email) {
                await updateEmail(auth.currentUser, newEmail);
            }

            Alert.alert('Succès', 'Mis à jour du profil réussie.');
        } catch (error) {
            Alert.alert('Erreur', error.message);
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
                        keyboardType={'phone-pad'}
                        onChangeText={(number) => setNewPhoneNumber(number)}
                    />
                    <TextInput
                        style={tailwind`border border-gray-300 rounded-md p-2 mt-2`}
                        placeholder="Adresse email"
                        placeholderTextColor="grey"
                        value={newEmail}
                        onChangeText={(email) => setNewEmail(email)}
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
