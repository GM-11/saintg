import textStyles from "@/styles/textStyles";
import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";

function story() {
  const [email, setEmail] = useState("");
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "white",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text style={{ ...textStyles.font, marginBottom: 40 }}>
          {" "}
          CONTACT US{" "}
        </Text>

        <Image
          style={{ marginBottom: 20 }}
          source={require("../../../../assets/images/story/chatmessage.png")}
        />

        <Text
          style={{
            fontSize: 16,
            lineHeight: 20,
            ...textStyles.font,
            width: "85%",
          }}
        >
          Need an ASAP answer? Contact us via chat, 24/7! For existing furniture
          orders, please call us.
        </Text>

        <Pressable
          style={{
            backgroundColor: "black",
            width: "40%",
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
            CHAT WITH US
          </Text>
        </Pressable>
        <Image
          style={{ marginBottom: 20, marginTop: 40 }}
          source={require("../../../../assets/images/story/addmessage.png")}
        />

        <Text
          style={{
            fontSize: 16,
            lineHeight: 20,
            ...textStyles.font,
            width: "85%",
          }}
        >
          You can text us at 800-309-2622 – or click on the “text us” link below
          on your mobile device. Please allow the system to acknowledge a simple
          greeting (even “Hi” will do!) before providing your question/order
          details. Consent is not required for any purchase. Message and data
          rates may apply. Text messaging may not be available via all carriers.
        </Text>

        <Pressable
          style={{
            backgroundColor: "black",
            width: "40%",
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
            TEXT US
          </Text>
        </Pressable>
        <Image
          style={{ marginBottom: 20, marginTop: 40 }}
          source={require("../../../../assets/images/story/twitter.png")}
        />

        <Text
          style={{
            fontSize: 16,
            lineHeight: 20,
            marginBottom: 40,
            ...textStyles.font,
            width: "85%",
          }}
        >
          To send us a private or direct message, like @Open Fashion on Facebook
          or follow us on Twitter. We’ll get back to you ASAP. Please include
          your name, order number, and email address for a faster response!
        </Text>
      </View>
    </ScrollView>
  );
}

export default story;
