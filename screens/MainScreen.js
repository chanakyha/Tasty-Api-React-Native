import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, Image, Avatar, Button } from "react-native-elements";

const autoCompleteData = {
  results: [
    {
      display: "chicken noodle soup",
      search_value: "chicken noodle soup",
      type: "ingredient",
    },
    {
      display: "chicken soup",
      search_value: "chicken soup",
      type: "ingredient",
    },
    {
      type: "ingredient",
      display: "chicken tortilla soup",
      search_value: "chicken tortilla soup",
    },
  ],
};

const sampleData = [
  {
    thumbnail_url:
      "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/cea2dc5050b64cdcb67186dd002dc558.jpeg",
    name: "New Year’s Champagne And Citrus Punch As Made By Marley's Menu",
    yields: "Servings: 4",
  },
];

const MainScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");

  const onSearch = (text) => {
    setSearch(text);
  };

  const onAutoSearch = (e) => {
    setSearch(result);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search..."
          value={search}
          onChangeText={onSearch}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "whitesmoke",
            marginBottom: 15,
          }}
        />
        <View style={styles.searchResults}>
          {autoCompleteData.results ? (
            autoCompleteData.results.map((items) => (
              <Text
                style={{ color: "grey" }}
                onPress={() => {
                  setResult(items.display);
                  onAutoSearch();
                }}
              >
                {items.display}
              </Text>
            ))
          ) : (
            <></>
          )}
        </View>
      </View>
      <ScrollView style={styles.recipies}>
        {sampleData ? (
          sampleData.map((items) => (
            <View style={styles.eachItemContainer}>
              <Avatar
                source={{ uri: items.thumbnail_url }}
                avatarStyle={{ borderRadius: 8 }}
                size={164}
              />
              <Text
                style={{
                  backgroundColor: "whitesmoke",
                  padding: 10,
                  margin: 8,
                  borderRadius: 20,
                }}
              >
                {items.yields}
              </Text>
              <Text h4>{items.name}</Text>
              <Button
                onPress={() => navigation.navigate("Item")}
                title="View More.."
                type="outline"
                titleStyle={{
                  color: "grey",
                  marginHorizontal: 20,
                }}
                buttonStyle={{ backgroundColor: "#fff", borderColor: "#fff" }}
                containerStyle={{ marginTop: 3 }}
              />
            </View>
          ))
        ) : (
          <Text>Loading..</Text>
        )}
        <View style={{ height: 200 }}></View>
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {},
  searchContainer: {
    padding: 10,
    paddingHorizontal: 15,
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 4,
  },
  searchResults: {},
  recipies: {},
  eachItemContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
});
