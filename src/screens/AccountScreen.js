import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import Screen from '../components/Screen'
import tailwind from 'tailwind-react-native-classnames';
import AppHead from '../components/AppHead';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/authSlice'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, sendPasswordResetEmail, deleteUser } from "firebase/auth";
import EditProfileScreen from './EditProfileScreen';

import colors from '../configs/colors';

const AccountScreen = ({ navigation }) => {

    const [isEditProfileModalVisible, setIsEditProfileModalVisible] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;

    console.log("user", user)

    const toggleEditProfileModal = () => {
        setIsEditProfileModalVisible(!isEditProfileModalVisible);
    };

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

    const handleResetPassword = () => {

        sendPasswordResetEmail(auth, user.email)
            .then(() => {
                Alert.alert('Succès', 'Un e-mail de réinitialisation du mot de passe a été envoyé.');
                console.log("reset pwd email sent")
            })
            .catch((error) => {
                console.error('Password reset error:', error);
            });
    };

    const handleDelete = () => {

        Alert.alert('Attention', 'Voulez vous vraiment supprimer votre compte définitivement ?', [
            {
                text: 'Supprimer',
                onPress: () =>
                    deleteUser(user).then(() => {
                        console.log('delete pressed and account deleted successfully')
                    }).catch((error) => {
                        console.log('error while deleting account', error)
                    })
            },
            {
                text: 'Annuler',
                onPress: () => console.log('cancel pressed'),
                style: 'cancel',
            },
        ]);
    };


    return (
        <Screen style={tailwind`flex-1 bg-white`}>
            <AppHead title={`Mon compte`} icon="settings-outline" />
            <View style={tailwind`justify-center items-center`}>
                <View style={tailwind`rounded-full overflow-hidden w-40 h-40 mt-2`}>
                    <Image source={require('../assets/images/avatar.gif')} style={tailwind`w-40 h-40`} />
                </View>
                <View style={tailwind`mt-4 flex-row items-center`}>
                    <Text style={tailwind`text-3xl font-bold`}>{user?.displayName}</Text>
                    <TouchableOpacity onPress={toggleEditProfileModal} style={{ marginLeft: 10, textDecorationLine: 'none' }}>
                        <Text style={{ textDecorationLine: 'none' }}>
                            <AntDesign name="edit" size={24} color={colors.primary} />
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={tailwind`text-lg text-gray-600`}>{user?.email}</Text>
            </View >
            <ScrollView style={tailwind`flex-1`} showsVerticalScrollIndicator={true}>
                <View style={tailwind`mx-4 border-t border-t-2 mt-5 border-gray-100`}>
                    <Text style={tailwind`text-gray-800 mt-2 text-lg mb-2`}>Favoris</Text>
                    <SavedPlaces
                        title="Accueil"
                        text="Aller à l'accueil"
                        Icon={() => <AntDesign name="home" size={24} color={colors.primary} onPress={() => navigation.navigate('Accueil')} />}
                    />
                    <SavedPlaces
                        title="Mon porte monnaie"
                        text="Voir méthodes de paiement disponibles"
                        Icon={() => <Ionicons name="wallet" size={24} color={colors.primary} onPress={() => navigation.navigate('Portefeuille')} />}
                    />
                    <SavedPlaces
                        title="Mes préférences"
                        text="Gérer les paramètres de mon compte"
                        Icon={() => <Ionicons name="build" size={24} color={colors.primary} onPress={() => navigation.navigate('AccountSettingsScreen')} />}
                    />
                </View>
                <View style={tailwind`mx-4 border-t border-t-2 mt-5 border-gray-100`}>
                    <Text style={tailwind`text-gray-800 mt-2 text-lg`}>Autres options</Text>
                    <TouchableOpacity onPress={handleResetPassword}>
                        <Text style={{ ...tailwind`text-gray-900 mt-2`, color: colors.gray }}>Réinitialiser mon mot de passe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSignOut}>
                        <Text style={{ ...tailwind`text-gray-900 mt-2`, color: colors.gray }}>Se déconnecter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete}>
                        <Text style={{ ...tailwind`text-gray-900 mt-2`, color: colors.denger }}>Supprimer mon compte</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Modal
                isVisible={isEditProfileModalVisible}
                onBackdropPress={toggleEditProfileModal}
                backdropOpacity={0.7}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View style={{
                    width: 280,
                    height: 300,
                    backgroundColor: 'white',
                }}>
                    <EditProfileScreen onClose={toggleEditProfileModal} />
                </View>
            </Modal>
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
