import React from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import AppForm from "../components/forms/AppForm";
import Screen from "../components/Screen";
import colors from "../configs/colors";
import * as yup from "yup";
import AppFormFeilds from "../components/forms/AppFormFeilds";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import tailwind from 'tailwind-react-native-classnames';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Veuillez saisir une addresse mail valide")
    .required("Email obligatoire"),
  password: yup
    .string()
    .min(8, ({ min }) => `Mot de passe devrait être minimum ${min} caractères`)
    .required("Mot de passe obligatoire"),
});

function LoginScreenUser({ navigation }) {

  const LoginUser = ({ email, password }) => {

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        if (error.code === "auth/invalid-password") {
          Alert.alert("Erreur", "Mot de passe invalide !")
        }
        if (error.code === "auth/invalid-email") {
          Alert.alert("Erreur", "Email invalide !")
        }
        Alert.alert('Erreur: ', error.message);
      });
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.wrapper}>
        <View style={tailwind`py-4 rounded-2xl`}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </View>
        <Text style={styles.wellcomeTo}>
          Se connecter à Pay<Text style={styles.brand}>Food</Text>
        </Text>
        <View style={styles.form}>
          <AppForm
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => LoginUser(values)}
          >
            <AppFormFeilds
              name="email"
              placeholder="Email"
              keyboardType="email-address"
            />
            <AppFormFeilds
              name="password"
              placeholder="Mot de passe"
              autoCompleteType="off"
              password={true}
            />
            <AppSubmitButton title="Se connecter" />
          </AppForm>
        </View>

        <Text style={styles.join}>
          Vous n'avez pas encore de compte ?{" "}
          <Text
            onPress={() => navigation.navigate("Signup")}
            style={{ color: colors.primary }}
          >
            S'inscrire
          </Text>
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: 'center'
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

export default LoginScreenUser;
