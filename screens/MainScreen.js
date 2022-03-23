import { StyleSheet, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "react-native-elements";

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

const MainScreen = () => {
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
      <View style={styles.recipies}></View>
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
  recipies: {
    backgroundColor: "#fff",
  },
});
