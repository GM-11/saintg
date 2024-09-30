import { Stack } from "expo-router";
import React from "react";
import { View, Pressable, Image, TextInput } from "react-native";

function _layout() {
  const [search, setSearch] = React.useState("");
  const [showResults, setShowResults] = React.useState(false);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="search"
        initialParams={{ search, setSearch, showResults, setShowResults }}
        // options={{
        //   header(props) {
        //     return (
        //       <View
        //         style={{
        //           borderBottomColor: "gray",
        //           borderBottomWidth: 1,
        //           padding: 10,
        //           margin: 20,
        //           display: "flex",
        //           justifyContent: "space-between",
        //           flexDirection: "row",
        //         }}
        //       >
        //         <Pressable onPress={() => setShowResults(true)}>
        //           <Image
        //             source={require("../../../assets/images/icons/search.png")}
        //           />
        //         </Pressable>
        //         <TextInput
        //           style={{ width: "100%", paddingHorizontal: 10 }}
        //           value={search}
        //           onChangeText={(val) => {
        //             setSearch(val);
        //             setShowResults(false);
        //           }}
        //           placeholder="Search By Products, Brands & More"
        //           placeholderTextColor={"gray"}
        //         />
        //         <Image
        //           source={require("../../../assets/images/icons/search.png")}
        //         />
        //       </View>
        //     );
        //   },
        // }}
      />
      <Stack.Screen name="filter" />
      <Stack.Screen name="searchView" />
    </Stack>
  );
}

export default _layout;
