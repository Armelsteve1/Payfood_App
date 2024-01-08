import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AppForm from "../components/forms/AppForm";
import Screen from "../components/Screen";
import colors from "../configs/colors";
import * as yup from "yup";
import AppFormFeilds from "../components/forms/AppFormFeilds";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const ValidationSchema = yup.object().shape({
  name: yup.string().required("Nom et prénom obligatoire"),
  email: yup.string().email("Veuillez saisir une addresse mail valide").required("Email obligatoire"),
  password: yup.string().required("Mot de passe obligatoire"),
});

function SignupScreen({ navigation }) {
  const signUpUser = async ({ name, email, password }) => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
    } catch (error) {
      Alert.alert("Erreur:", error.message);
    }
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.wrapper}>
        {/* <Image style={styles.logo} source={require("../assets/logo.png")} /> */}
        <Text style={styles.wellcomeTo}>Rejoignez Pay<Text style={styles.brand}>Food</Text></Text>
        <View style={styles.form}>
          <AppForm
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={ValidationSchema}
            onSubmit={(values) => signUpUser(values)}
          >
            <AppFormFeilds name="name" placeholder="pseudo" />
            <AppFormFeilds name="email" placeholder="Email" keyboardType="email-address" />
            <AppFormFeilds name="password" placeholder="Mot de passe" autoCompleteType="off" password={true} />
            <AppSubmitButton title="S'inscrire" />
          </AppForm>
        </View>
        <Text style={styles.join}>
          Vous avez déjà un compte?{" "}
          <Text onPress={() => navigation.navigate("UserLogin")} style={{ color: colors.primary }}>Se connecter</Text>
        </Text>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  logo: {
    height: 160,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 30,
  },
  wellcomeTo: {
    fontSize: 23,
    fontWeight: "700",
    color: colors.secondary,
    marginTop: 20,
    textAlign: "center",
  },
  brand: {
    fontSize: 23,
    color: colors.primary,
    textAlign: "center",
    fontWeight: "500",
  },
  form: {
    marginTop: 10,
  },
  join: {
    marginTop: 16,
    textAlign: "center",
  },
  or: {
    color: colors.gray,
    textAlign: "center",
    marginVertical: 20,
  },
});

export default SignupScreen;
