import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import Screen from '../components/Screen'
import tailwind from 'tailwind-react-native-classnames';
import AppHead from '../components/AppHead';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/authSlice'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../configs/firebase';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import EditProfileScreen from './EditProfileScreen';
import colors from '../configs/colors';

const AccountScreen = ({ navigation }) => {

    const [isEditProfileModalVisible, setIsEditProfileModalVisible] = useState(false);
    const [isResetPasswordAlertVisible, setIsResetPasswordAlertVisible] = useState(false);
    const user = useSelector(selectUser);

    const toggleEditProfileModal = () => {
        setIsEditProfileModalVisible(!isEditProfileModalVisible);
    };

    const toggleResetPasswordAlert = () => {
        setIsResetPasswordAlertVisible(!isResetPasswordAlertVisible);
    };

    const auth = getAuth();

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

        const email = user.email;
        sendPasswordResetEmail(auth, user.email)
            .then(() => {
                Alert.alert('Succès', 'Un e-mail de réinitialisation du mot de passe a été envoyé à ', email);
                console.log("reset pwd email sent")
            })
            .catch((error) => {
                console.error('Password reset error:', error);
            });
    };


    return (
        <Screen style={tailwind`flex-1 bg-white`}>
            <AppHead title={`Mon compte`} icon="settings-outline" />
            <View style={tailwind`justify-center items-center`}>
                <View style={tailwind`rounded-full overflow-hidden w-48 h-48 mt-4`}>
                    <Image source={require('../assets/images/avatar.gif')} style={tailwind`w-48 h-48`} />
                </View>
                <View style={tailwind`mt-4 flex-row items-center`}>
                    <Text style={tailwind`text-3xl font-bold`}>{user?.name}</Text>
                    <TouchableOpacity onPress={toggleEditProfileModal} style={{ marginLeft: 10, textDecorationLine: 'none' }}>
                        <Text style={{ textDecorationLine: 'none' }}>
                            <AntDesign name="edit" size={24} color={colors.primary} />
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={tailwind`text-lg text-gray-600`}>{user?.email}</Text>
            </View >
            <View style={tailwind`mx-4 border-t border-t-2 mt-5 border-gray-100`}>
                <Text style={tailwind`text-gray-800 mt-2 text-lg mb-2`}>Favoris</Text>
                <SavedPlaces
                    title="Accueil"
                    text="Aller à l'accueil"
                    Icon={() => <AntDesign name="home" size={24} color={colors.primary} onPress={() => navigation.navigate('Home')} />}
                />
                <SavedPlaces
                    title="Mon porte monnaie"
                    text="Voir méthodes de paiement disponibles"
                    Icon={() => <Ionicons name="md-briefcase-outline" size={24} color={colors.primary} onPress={() => navigation.navigate('Wallet')} />}
                />
            </View>
            <View style={tailwind`mx-4 border-t border-t-2 mt-5 border-gray-100`}>
                <Text style={tailwind`text-gray-800 mt-2 text-lg`}>Autres options</Text>
                <TouchableOpacity onPress={handleResetPassword}>
                    <Text style={{ ...tailwind`text-gray-900 mt-2`, color: colors.primary }}>Réinitialiser le mot de passe</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignOut}>
                    <Text style={{ ...tailwind`text-gray-900 mt-2`, color: colors.primary }}>Se déconnecter</Text>
                </TouchableOpacity>
            </View>

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
