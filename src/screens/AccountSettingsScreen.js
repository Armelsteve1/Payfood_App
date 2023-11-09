import React, { useState } from 'react';
import { View, StyleSheet, Switch, Text } from 'react-native';
import { getAuth } from 'firebase/auth';
import AppButton from '../components/AppButton';

function AccountSettingsScreen({ navigation }) {

    const auth = getAuth();
    const [newsletter, setNewsletter] = useState(true);
    const [privacySettings, setPrivacySettings] = useState(true);

    const savePreferences = async () => {
        try {
            const user = auth.currentUser;
        } catch (error) {
            console.error('Error updating user settings:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.preferenceItem}>
                <Text>S'abonner à la newsletter</Text>
                <Switch
                    value={newsletter}
                    onValueChange={(value) => setNewsletter(value)}
                />
            </View>

            <View style={styles.preferenceItem}>
                <Text>
                    Paramètres de confidentialité
                </Text>
                <Switch
                    value={privacySettings}
                    onValueChange={(value) => setPrivacySettings(value)}
                />
            </View>
            <AppButton title="Enregistrer mes préférences" onPress={() => savePreferences()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    preferenceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default AccountSettingsScreen;
