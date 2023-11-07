import React, { useState, useEffect } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import AppForm from "../components/forms/AppForm";
import Screen from "../components/Screen";
import colors from "../configs/colors";
import * as yup from "yup";
import AppFormFeilds from "../components/forms/AppFormFeilds";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import { auth, app } from "../configs/firebase";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import tailwind from 'tailwind-react-native-classnames';

const ValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, ({ min }) => `Name must be at least ${min} characters`)
    .max(50, ({ max }) => `Name must be less than ${max} characters`)
    .required("Name is Required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

function SignupScreen({ navigation }) {
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    // Check if Firebase auth is initialized
    if (auth) {
      setAuthInitialized(true);
    } else {
      // Firebase auth is not yet initialized
      console.log("Firebase auth is not ready");
    }
  }, []);

  console.log("auth", auth);
  console.log("authInitialized", authInitialized);


  const signUpUser = async ({ name, email, password }) => {
    const auth = getAuth();
    const firestore = getFirestore(app);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // After successful sign-up, update the user's profile with the name
      await updateProfile(user, { displayName: name });

      // Save user data to Firestore
      const usersRef = collection(firestore, "users");
      const userDoc = doc(usersRef, user.uid);

      await setDoc(userDoc, {
        name: name,
        email: email,
      });

      console.log("User data saved to Firestore");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error", "That email address is already in use!");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Error", "That email address is invalid!");
      }
      Alert.alert("ERROR:", error.message);
    }
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.wrapper}>
        <View style={tailwind`py-4 rounded-2xl`}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </View>
        <Text style={styles.wellcomeTo}>
          Join Pay<Text style={styles.brand}>Food</Text>
        </Text>
        <View style={styles.form}>
          <AppForm
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={ValidationSchema}
            onSubmit={(values) => signUpUser(values)}
          >
            <AppFormFeilds
              name="name"
              placeholder="Your name"
            />
            <AppFormFeilds
              name="email"
              placeholder="Your email"
              keyboardType="email-address"
            />
            <AppFormFeilds
              name="password"
              placeholder="Password"
              autoCompleteType="off"
              password={true}
            />
            <AppSubmitButton title="Sign Up" />
          </AppForm>
        </View>

        <Text style={styles.join}>
          Already a member?{" "}
          <Text
            onPress={() => navigation.navigate("UserLogin")}
            style={{ color: colors.primary }}
          >
            Log In
          </Text>
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
    color: colors.black,
  },
  or: {
    color: colors.gray,
    textAlign: "center",
    marginVertical: 20,
  },
});

export default SignupScreen;
