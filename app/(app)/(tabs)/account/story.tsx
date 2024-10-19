import textStyles from "@/styles/textStyles";
import React, { useState } from "react";
import { Text, ScrollView, Image, Pressable, TextInput } from "react-native";

function story() {
  const [email, setEmail] = useState("");
  return (
    <ScrollView
      style={{
        backgroundColor: "white",
        flex: 1,
        // justifyContent: "center",
        // paddingBottom: 80,
        // display: "flex",
        // alignItems: "center",
      }}
    >
      <Text
        style={{ ...textStyles.font, marginVertical: 40, textAlign: "center" }}
      >
        {" "}
        OUR STORY{" "}
      </Text>

      <Text
        style={{
          fontSize: 16,
          lineHeight: 20,
          ...textStyles.font,
          width: "90%",
        }}
      >
        Open Fashion - Free Ecommerce UI Kit is a free download UI kit. You can
        open Open Fashion - Free Ecommerce UI Kit file by Figma.{"\n\n"}
        Create stunning shop with bulletproof guidelines and thoughtful
        components. Its library contains more than 50+ components supporting
        Light & Dark Mode and 60+ ready to use mobile screens.
      </Text>

      <Image
        ///@ts-ignore
        style={{ width: 400, marginVertical: 40 }}
        source={require("../../../../assets/images/our-story.png")}
      />

      <Pressable>
        <Text style={{ ...textStyles.font, fontSize: 16 }}>SIGN UP</Text>
      </Pressable>

      <Text
        ///@ts-ignore
        style={{
          ...textStyles.font,
          marginTop: 12,
          fontSize: 14,
          lineHeight: 22,
          color: "rgba(136,36,136,1)",
          textAlign: "center",
          width: "90vw",
        }}
      >
        Receive early access to new arrivals, sales, exclusive content, events
        and much more!
      </Text>

      <TextInput
        value={email}
        placeholder="Email address"
        style={{
          borderBottomColor: "grey",
          borderBottomWidth: 1,
          width: "90%",
          padding: 12,
          marginTop: 24,
        }}
        placeholderTextColor={"grey"}
      />

      <Pressable
        style={{
          backgroundColor: "black",
          width: "100%",
          marginTop: 36,
          padding: 16,
          bottom: 0,
        }}
      >
        <Text
          style={{
            color: "white",
            alignSelf: "center",
            textAlign: "center",
            fontSize: 16,
            fontFamily: "Lato-Regular",
          }}
        >
          SUBMIT
        </Text>
      </Pressable>
    </ScrollView>
  );
}

export default story;
