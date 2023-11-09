import React, { useState } from 'react';
import { View, StyleSheet, Switch, Text, ScrollView, Alert } from 'react-native';
import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import AppButton from '../components/AppButton';
import AppHead from '../components/AppHead';
import Screen from '../components/Screen';
import tailwind from 'tailwind-react-native-classnames';
import colors from '../configs/colors';

function AccountSettingsScreen({ navigation }) {
    const auth = getAuth();
    const firestore = getFirestore();

    const user = auth.currentUser;
    const userDoc = doc(firestore, 'users', user.uid);

    const [newsletter, setNewsletter] = useState(true);
    const [privacySettings, setPrivacySettings] = useState(true);

    const savePreferences = async () => {
        try {
            await updateDoc(userDoc, {
                newsletter: newsletter,
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
                    <View style={styles.checkbox}>
                        <View style={styles.preferenceItem}>
                            <Text>S'abonner à la newsletter</Text>
                            <Switch
                                value={newsletter}
                                onValueChange={(value) => setNewsletter(value)}
                            />
                        </View>

                        <View style={styles.preferenceItem}>
                            <Text>Paramètres de confidentialité</Text>
                            <Switch
                                value={privacySettings}
                                onValueChange={(value) => setPrivacySettings(value)}
                            />
                        </View>
                    </View>
                </ScrollView>

                <AppButton title="Enregistrer mes préférences" onPress={() => savePreferences()} />
            </View>
        </Screen>
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
    checkbox: {},
    preferenceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default AccountSettingsScreen;
