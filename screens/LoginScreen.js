import { StyleSheet, View, SafeAreaView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Text } from "react-native-elements";
import { auth } from "../utils/firebase";

const LoginScreen = ({ navigation }) => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
  }, []);

  const [loaderState, setLoaderState] = useState({
    login: false,
    register: false,
  });

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  onUserLogin = () => {
    setLoaderState({ ...loaderState, login: true });
    auth
      .signInWithEmailAndPassword(userInput.email, userInput.password)
      .then((userCredentials) => {
        let user = userCredentials.user;
        setUserInput({ email: "", password: "" });
        setLoaderState({ ...loaderState, login: false });
      })
      .catch((error) => {
        alert(error.message);
        setLoaderState({ ...loaderState, login: false });
      });
  };

  const onRegisterBtn = () => {
    setLoaderState({ ...loaderState, register: true });
    navigation.navigate("Register");
    setLoaderState({ ...loaderState, register: false });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={{ textAlign: "center" }} h2>
          Login
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={userInput.email}
            onChangeText={(text) => setUserInput({ ...userInput, email: text })}
            style={styles.input}
            placeholder="Email Address"
          />
          <TextInput
            value={userInput.password}
            onChangeText={(text) =>
              setUserInput({ ...userInput, password: text })
            }
            style={styles.input}
            placeholder="Password"
            secureTextEntry
          />
          <Button
            loading={loaderState.login}
            title="Login"
            type="solid"
            onPress={onUserLogin}
            titleStyle={{ color: "#fff", marginHorizontal: 20 }}
            buttonStyle={{ backgroundColor: "#000" }}
            containerStyle={{ marginTop: 10 }}
            loadingProps={{
              size: "small",
              color: "#fff",
            }}
            disabled={!userInput.email || !userInput.password}
          />
          <Button
            loading={loaderState.register}
            title="Register"
            type="outline"
            titleStyle={{ color: "#000", marginHorizontal: 20 }}
            buttonStyle={{ backgroundColor: "#fff", borderColor: "#fff" }}
            containerStyle={{ marginTop: 3 }}
            loadingProps={{
              size: "small",
              color: "#000",
            }}
            onPress={onRegisterBtn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    width: "75%",
  },
  inputContainer: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  input: {
    backgroundColor: "whitesmoke",
    paddingLeft: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 8,
    width: "110%",
  },
});
