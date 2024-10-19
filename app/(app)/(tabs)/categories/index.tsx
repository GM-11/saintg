import CustomCarousel from "@/components/CustomCarousel";
import { BASE_URL } from "@/constants/constant";
import { IUser } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import axios, { AxiosResponse } from "axios";
import React from "react";
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  Pressable,
  ScrollView,
  Image,
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

const data = [
  {
    image:
      "https://www.pngall.com/wp-content/uploads/13/Nike-Shoes-Jordan-PNG-Pic.png",
    title: "Shoes",
  },
  {
    image:
      "https://www.pngall.com/wp-content/uploads/13/Nike-Shoes-Jordan-PNG-Pic.png",
    title: "Shoes",
  },
  {
    image:
      "https://www.pngall.com/wp-content/uploads/13/Nike-Shoes-Jordan-PNG-Pic.png",
    title: "Shoes",
  },
  {
    image:
      "https://www.pngall.com/wp-content/uploads/13/Nike-Shoes-Jordan-PNG-Pic.png",
    title: "Shoes",
  },
];

const summmerStyles = [
  {
    id: "1",
    title: "NEW SEASON",
    subtitle: "Latest styles for your summer refresh",
    image: {
      uri: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
  },
  {
    id: "2",
    title: "WINTER COLLECTION",
    subtitle: "Cozy and stylish for the cold weather",
    image: {
      uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    },
  },
  {
    id: "3",
    title: "SPRING BLOSSOMS",
    subtitle: "Fresh looks for the new season",
    image: {
      uri: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    },
  },
  {
    id: "4",
    title: "FALL FAVORITES",
    subtitle: "Warm and comfortable outfits",
    image: {
      uri: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a",
    },
  },
  {
    id: "5",
    title: "CASUAL WEAR",
    subtitle: "Comfort meets style in casual wear",
    image: {
      uri: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
    },
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

  async function getCategories() {
    const userDetails = await AsyncStorage.getItem("userDetails");
    if (!userDetails) return;
    const user = JSON.parse(userDetails) as IUser;
    let result: AxiosResponse<any, any>;

    try {
      const result = await axios.get(`${BASE_URL}categories/get`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
      });

      if (result.status === 404) {
        // console.log(result.statusText);
      }
      const data = result.data.data;
      // console.log("Categories");
      // console.log(data);
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

      const res = await axios.get(
        `http://13.126.237.254:8080/subcategories/get`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": user.token,
          },
        },
      );
      const subcats = res.data.data;

      // console.log("Subcategories");
      // console.log(subcats);

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

      // console.log(womanCats);
      setCategories([...cats]);

      setSubCategories([...womanCats]);
    } catch (e) {
      // console.log(e);
      return;
    }
  }

  React.useEffect(() => {
    // console.log("useEffect");
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
        <Text>{">"}</Text>
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
            <Text>{sublistOpen ? "A" : "V"}</Text>
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
            <Text>{">"}</Text>
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
