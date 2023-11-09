import React, { useState } from 'react';
import { View, StyleSheet, Switch, Text, ScrollView, Alert, TouchableOpacity, Modal } from 'react-native';
import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import AppButton from '../components/AppButton';
import AppHead from '../components/AppHead';
import Screen from '../components/Screen';
import tailwind from 'tailwind-react-native-classnames';
import colors from '../configs/colors';
import { Ionicons } from '@expo/vector-icons';

function AccountSettingsScreen({ navigation }) {
    const auth = getAuth();
    const firestore = getFirestore();

    const user = auth.currentUser;
    const userDoc = doc(firestore, 'users', user.uid);

    const [newsletter, setNewsletter] = useState(true);
    const [notifSms, setNotifSms] = useState(true);
    const [notifEmail, setNotifEmail] = useState(true);

    const [privacySettings, setPrivacySettings] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [helpModalVisible, setHelpModalVisible] = useState(false);

    const toggleHelpModal = () => {
        setHelpModalVisible(!helpModalVisible);
    };

    const savePreferences = async () => {
        try {
            await updateDoc(userDoc, {
                newsletter: newsletter,
                notifSms: notifSms,
                notifEmail: notifEmail,
                privacySettings: privacySettings,
            });

            await updateProfile(auth.currentUser, {
            });

            Alert.alert('Succès', 'Préférences enregistrées avec succès.');
        } catch (error) {
            console.error('Error updating user preferences:', error.message);
            Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'enregistrement des préférences.');
        }
    };

    return (
        <Screen style={tailwind`flex-1 bg-white`}>
            <AppHead title={`Mes préférences`} icon="build-outline" />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                    >
                        <View style={styles.preferenceItem}>
                            <Text>Paramètres de confidentialité</Text>
                            <Ionicons name="information-circle" size={24} color={colors.primary} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.checkbox}>
                        <View style={styles.preferenceItem}>
                            {/* <Ionicons name="notifications-outline" size={24} color={colors.black} /> */}
                            <Text>S'abonner à notre newsletter</Text>
                            <Switch
                                value={newsletter}
                                onValueChange={(value) => setNewsletter(value)}
                            />
                        </View>
                        <View style={styles.preferenceItem}>
                            {/* <Ionicons name="call" size={24} color={colors.black} /> */}
                            <Text>Recevoir les notifications par sms</Text>
                            <Switch
                                value={notifSms}
                                onValueChange={(value) => setNotifSms(value)}
                            />
                        </View>
                        <View style={styles.preferenceItem}>
                            {/* <Ionicons name="mail-outline" size={24} color={colors.black} /> */}
                            <Text>Recevoir les notifications par email</Text>
                            <Switch
                                value={notifEmail}
                                onValueChange={(value) => setNotifEmail(value)}
                            />
                        </View>
                    </View>
                    <TouchableOpacity onPress={toggleHelpModal}>
                        <View style={styles.preferenceItem}>
                            <Text>Aide et Support</Text>
                            <Ionicons name="help-circle-outline" size={24} color={colors.primary} />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                <AppButton title="Enregistrer mes préférences" onPress={() => savePreferences()} />
            </View >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Paramètres de confidentialité</Text>
                        <View style={styles.preferenceItemText}>
                            <Text style={{ textAlign: 'justify' }}>Payfood utilise les cookies pour améliorer son application.
                                Certains sont nécessaires au bon fonctionnement de l'application et des services, tandis que d'autres sont facultatifs et destinés à personnaliser votre expérience, comme les cookies publicitaires ou d'analytics.
                                Vous pouvez accepter tous les cookies, refuser tous les cookies facultatifs, ou paramétrer les cookies en fonction de vos préférences.
                                En l'absence de sélection, les paramètres de cookies par défaut s'appliqueront.
                                Vous pouvez modifier vos préférences à tout moment.
                                Pour en savoir plus, consultez la politique relative aux cookies de Payfood.
                            </Text>
                            <View style={styles.preferenceItem}>
                                <Text>Accepter les cookies</Text>
                                <Switch
                                    value={privacySettings}
                                    onValueChange={(value) => setPrivacySettings(value)}
                                />
                            </View>
                        </View>
                        <AppButton
                            title="Fermer"
                            onPress={() => setModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={helpModalVisible}
                onRequestClose={() => setHelpModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Aide et Support</Text>
                        {/* Add your contact form components here */}
                        <AppButton
                            title="Fermer"
                            onPress={toggleHelpModal}
                        />
                    </View>
                </View>
            </Modal>
        </Screen >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    preferenceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default AccountSettingsScreen;
