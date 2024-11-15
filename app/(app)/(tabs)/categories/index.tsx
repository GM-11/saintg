import CustomCarousel from "@/components/CustomCarousel";
import { BASE_URL } from "@/constants/constant";
import { IUser } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import axios, { AxiosResponse } from "axios";
import AntDesign from "@expo/vector-icons/AntDesign";

import React from "react";
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  Pressable,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";

const womanCats: catsType[] = [
  {
    name: "Woman's Footwear",
    // subtitle: "Heels, Sandals, Sneakers & Moccasins",
    image:
      "https://www.pngall.com/wp-content/uploads/13/Nike-Shoes-Jordan-PNG-Pic.png",
  },

  {
    name: "Woman's Boots",
    image:
      "https://www.pngall.com/wp-content/uploads/13/Nike-Shoes-Jordan-PNG-Pic.png",
  },
];

type catsType = {
  name: string;
  // subtitle: string;
  image: string;
};

function index() {
  const [categories, setCategories] = React.useState<catsType[]>([]);
  const [subCategories, setSubCategories] = React.useState<catsType[]>([]);
  const [loading, setLoading] = React.useState(true);

  async function getCategories() {
    setLoading(true);
    const userDetails = await AsyncStorage.getItem("userDetails");
    if (!userDetails) return;
    const user = JSON.parse(userDetails) as IUser;
    // let result: AxiosResponse<any, any>;

    try {
      const result = await axios.get(`${BASE_URL}categories/get`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
      });

      if (result.status === 404) {
        return;
      }
      const data = result.data.data;
      let cats: catsType[] = [];

      data.forEach(
        (val: {
          category_id: number;
          category_name: string;
          category_image: string;
        }) => {
          cats.push({
            name: val.category_name,
            image: val.category_image,
          });
        },
      );

      const res = await axios.get(`${BASE_URL}subcategories/get`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
      });
      const subcats = res.data.data;

      let womanCats: catsType[] = [];
      subcats.forEach(
        (val: {
          subcategory_id: number;
          subcategory_name: string;
          subcategory_image: string;
          category_id: number;
          category_name: string;
        }) => {
          if (val.category_id === 1) {
            womanCats.push({
              name: val.subcategory_name,
              image: val.subcategory_image,
            });
          }
        },
      );

      setCategories([...cats]);

      setSubCategories([...womanCats]);
    } catch (e) {
      // console.log(e);
      return;
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getCategories();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      {/* <View>
   <FlatList
     horizontal
     showsHorizontalScrollIndicator={false}
     pagingEnabled
     style={{
       width: "100%",
     }}
     data={data}
     renderItem={(val) => (
       <ImageBackground
         style={{
           flexDirection: "column-reverse",
           margin: 10,
           display: "flex",
           height: 100,

           width: 100,
         }}
         ///@ts-ignore
         source={{ uri: val.item.image }}
       >
         <View style={{ margin: 16 }}>
           <Text style={{ textAlign: "center" }}>{val.item.title}</Text>
         </View>
       </ImageBackground>
     )}
   />
 </View> */}

      <Text style={{ fontSize: 16, letterSpacing: 1.6, margin: 10 }}>
        SHOP BY CATEGORY
      </Text>

      <View>
        {categories.map((val) => (
          <ListElement
            image={val.image}
            name={val.name}
            subCats={subCategories}
            key={womanCats.indexOf(val)}
          />
        ))}
      </View>

      {/* <CustomCarousel
   data={summmerStyles}
   mainTitleStyle={{ textAlign: "flex-start", margin: 16 }}
   imageWidth="100%"
   imageHeight="300"
   title={"SUMMER STYLES"}
   additionalStyles={{ width: "100%" }}
 /> */}

      {/* <Text style={{ fontSize: 16, letterSpacing: 1.6, margin: 10 }}>
   CURATED STYLE STORE
 </Text>

 <View>
   {womanCats.slice(0, 3).map((val) => (
     <ListElement
       image={val.image}
       name={val.name}
       key={womanCats.indexOf(val)}
       subCats={subCategories}
     />
   ))}
 </View> */}
    </ScrollView>
  );

  // return (
  //   <View>
  //     {loading ? (
  //       <View
  //         style={{
  //           flex: 1,
  //           backgroundColor: "white",
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "center",
  //         }}
  //       >
  //         <ActivityIndicator color="black" size="large" />
  //       </View>
  //     ) :
  //     (

  //     )}
  //   </View>
  // );
}

// function sub(params:type) {

function SubListElement({ image, name }: { image: string; name: string }) {
  return (
    <View
      // key={key}
      style={{
        display: "flex",
        flexDirection: "row",
        width: "60%",
        marginHorizontal: 16,
        alignItems: "center",
      }}
    >
      <ImageBackground
        style={{
          width: 75,
          height: 75,
          flexDirection: "column-reverse",
          display: "flex",
        }}
        source={{ uri: image }}
      ></ImageBackground>

      <Pressable
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderBottomColor: "grey",
          borderBottomWidth: 1,
          paddingBottom: 10,
          width: "80%",
          justifyContent: "space-between",
        }}
        onPress={() => {
          router.push({
            pathname: "/(tabs)/categories/categoryListView",
            params: { name },
          });
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <View>
            <Text style={{ fontSize: 12 }}>{name}</Text>
          </View>
        </View>
        <AntDesign name="right" size={16} color="black" />
      </Pressable>
    </View>
  );
}
// }

function ListElement({
  image,
  name,
  subCats,
}: {
  image: string;
  name: string;
  subCats: catsType[];
}) {
  const [sublistOpen, setSublistOpen] = React.useState(false);
  return (
    <View>
      <View
        // key={key}
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          marginHorizontal: 16,
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 100,
            height: 100,
            flexDirection: "column-reverse",
            display: "flex",
            marginRight: 10,
          }}
          source={{ uri: image }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            paddingBottom: 10,
            width: "60%",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <View>
              <Text style={{ fontSize: 16 }}>{name}</Text>
              {/* <Text style={{ fontSize: 12 }}>{subtitle}</Text> */}
            </View>
          </View>
          <Pressable onPress={() => setSublistOpen(!sublistOpen)}>
            <Text>
              {sublistOpen ? (
                <AntDesign name="up" size={16} color="black" />
              ) : (
                <AntDesign name="down" size={16} color="black" />
              )}
            </Text>
          </Pressable>
        </View>
      </View>
      {sublistOpen ? (
        <View style={{ marginLeft: 110 }}>
          <View
            style={{
              borderBottomColor: "grey",
              borderBottomWidth: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 60,
            }}
          >
            <Text>SHOP ALL FOOTWEAR</Text>
            <AntDesign name="right" size={16} color="black" />
          </View>

          {subCats.map((val) => (
            <SubListElement
              image={val.image}
              name={val.name}
              // subtitle={val.subtitle}
              key={womanCats.indexOf(val)}
            />
          ))}
        </View>
      ) : (
        <View />
      )}
    </View>
  );
}

export default index;
