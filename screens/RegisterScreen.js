import { StyleSheet, View, SafeAreaView, TextInput } from "react-native";
import React, { useState } from "react";
import { Button, Text } from "react-native-elements";
import { auth } from "../utils/firebase";

const RegisterScreen = ({ navigation }) => {
  const [loaderState, setLoaderState] = useState({
    register: false,
    login: false,
  });

  const [inputDetails, setInputDetails] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const onRegisterUser = () => {
    setLoaderState({ ...loaderState, register: true });
    auth
      .createUserWithEmailAndPassword(inputDetails.email, inputDetails.password)
      .then((userCredentials) => {
        let user = userCredentials.user;
        user
          .updateProfile({
            displayName: inputDetails.name,
            photoURL: inputDetails.avatar,
          })
          .then(() => {
            setInputDetails({
              name: "",
              avatar: "",
              email: "",
              password: "",
            });
            navigation.navigate("Login");
            setLoaderState({ ...loaderState, register: false });
            alert("Thank You For Registering with Us");
          })
          .catch((error) => {
            alert(error.message);
            setLoaderState({ ...loaderState, register: false });
          });
      })
      .catch((error) => {
        alert(error.message);
        setLoaderState({ ...loaderState, register: false });
      });
  };

  const onBackToLogin = () => {
    setLoaderState({ ...loaderState, login: true });
    navigation.navigate("Login");
    setLoaderState({ ...loaderState, login: false });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={{ textAlign: "center" }} h2>
          Register
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={inputDetails.name}
            onChangeText={(text) =>
              setInputDetails({ ...inputDetails, name: text })
            }
            style={styles.input}
            placeholder="Name"
          />
          <TextInput
            value={inputDetails.avatar}
            onChangeText={(text) =>
              setInputDetails({ ...inputDetails, avatar: text })
            }
            style={styles.input}
            placeholder="Profile Pic (URL)"
          />
          <TextInput
            value={inputDetails.email}
            onChangeText={(text) =>
              setInputDetails({ ...inputDetails, email: text })
            }
            style={styles.input}
            placeholder="Email Address"
          />
          <TextInput
            value={inputDetails.password}
            onChangeText={(text) =>
              setInputDetails({ ...inputDetails, password: text })
            }
            style={styles.input}
            placeholder="Password"
            secureTextEntry
          />
          <Button
            loading={loaderState.register}
            title="Sign Up"
            type="solid"
            onPress={onRegisterUser}
            titleStyle={{ color: "#fff", marginHorizontal: 20 }}
            buttonStyle={{ backgroundColor: "#000" }}
            containerStyle={{ marginTop: 10 }}
            loadingProps={{
              size: "small",
              color: "#fff",
            }}
            disabled={
              !inputDetails.name ||
              !inputDetails.email ||
              !inputDetails.password
            }
          />
          <Button
            loading={loaderState.login}
            title="Back to Login"
            type="outline"
            titleStyle={{ color: "#000", marginHorizontal: 20 }}
            buttonStyle={{ backgroundColor: "#fff", borderColor: "#fff" }}
            containerStyle={{ marginTop: 3 }}
            loadingProps={{
              size: "small",
              color: "#000",
            }}
            onPress={onBackToLogin}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  loginContainer: {
    backgroundColor: "#fff",
    padding: 45,
    borderRadius: 20,
    width: "85%",
  },
  inputContainer: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "whitesmoke",
    paddingLeft: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: "110%",
  },
});
