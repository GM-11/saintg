import WhyChooseUs from "@/components/home/WhyUs";
import { BASE_URL } from "@/constants/constant";
import { IUser } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

import React from "react";
import {
  Image,
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";

type productType = {
  image: string;
  title: string;
  subtitle: string;
  price: number;
  currency: string;
  manufacturer: string;
  manufacturerAddress: string;
  customerCareNo: string;
  email: string;
  marketedBy: string;
  specs: specs;
  colors: string[];
  estimatedDelivery: string[];
  productId: number;
  size: { size_id: string; product_id: number }[];
  quantity: number;
};

type specs = {
  material: string;
  saleMaterial: string;
  HeelHeight: number[];
  HeelType: string;
  ToeType: string;
  PackContains: string;
  occasion: string;
};

function productDetail() {
  const [selectedColor, setSelectedColor] = React.useState("#000000");
  const [selectedSize, setSelectedSize] = React.useState("32");
  const [showDetails, setShowDetails] = React.useState(true);
  const [showSpecs, setShowSpecs] = React.useState(true);
  const [showCare, setShowCare] = React.useState(true);
  const [showShipping, setShowShipping] = React.useState(true);
  const [showMoreInfo, setShowMoreInfo] = React.useState(true);
  const [product, setProduct] = React.useState<productType>();
  const [showMore, setShowMore] = React.useState<productType[]>();
  const [selectedSizeId, setSelectedSizeId] = React.useState<number>();

  const { searchKeyWord, productId, price, currency } = useLocalSearchParams();

  async function buyNow() {
    const userDetails = await AsyncStorage.getItem("userDetails");
    if (!userDetails) return;
    const user = JSON.parse(userDetails) as IUser;

    if (user.token === "") {
      router.push({
        pathname: "/(app)/auth/signin",
        params: { regionId: user.regionId },
      });
    } else {
      console.log("here");
      addInCart();
      router.push({
        pathname: "/(app)/checkout/",
      });
    }
  }

  async function getProductDetails() {
    const userDetails = await AsyncStorage.getItem("userDetails");
    if (!userDetails) return;

    const user = JSON.parse(userDetails) as IUser;
    const response = await axios.get(
      `${BASE_URL}products/search?keyword=${searchKeyWord}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
      },
    );

    console.log(response.data.data);

    const today = new Date();
    const afterSevenDays = new Date(today);
    afterSevenDays.setDate(today.getDate() + 7);

    const todayString = today.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const afterSevenDaysString = afterSevenDays.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const convertedProducts: productType[] = response.data.data.map(
      (product: any) => {
        const specs: specs = {
          material:
            product.product_specifications.find(
              (spec: any) => spec.label === "Material",
            )?.content || "not available",
          saleMaterial: "not available",
          HeelHeight: [0, 0],
          HeelType: "not available",
          ToeType: "not available",
          PackContains: "not available",
          occasion: "not available",
        };

        return {
          image: product.product_images[0].image_url,
          title: product.product_name,
          subtitle: product.description,
          price,
          currency,
          // orginalPrice: product.original_price || 0,
          // discountPercentage: product.discount || 0,
          manufacturer:
            product.product_more_info.find(
              (info: { label: string; content: string }) =>
                info.label === "Manufactured By".toUpperCase(),
            )?.content || "not available".toUpperCase(),
          manufacturerAddress: "not available".toUpperCase(),
          customerCareNo: "not available".toUpperCase(),
          email: "not available".toUpperCase(),
          marketedBy: "not available".toUpperCase(),
          specs: specs,
          colors: product.product_colors.map(
            (color: { color_code: string }) => color.color_code,
          ),
          estimatedDelivery: [todayString, afterSevenDaysString],
          productId: product.product_id,
          size: product.product_size.map(
            (s: { size_id: string; product_id: string }) => {
              return {
                size_id: s.size_id,
                product_id: s.product_id,
              };
            },
          ),
          quantity: 1,
        };
      },
    );

    console.log(convertedProducts[0]);

    setProduct(convertedProducts[0]);

    setShowMore(
      convertedProducts.filter(
        (_, index) => index !== parseInt(productId as string) - 1,
      ),
    );
  }
  //   });
  // }
  async function addInCart() {
    try {
      const userDetails = await AsyncStorage.getItem("userDetails");
      if (!userDetails) return;

      if (!product) return;

      const user = JSON.parse(userDetails) as IUser;
      const result = await fetch(`${BASE_URL}cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
        body: JSON.stringify({
          productId: product.productId,
          // color: selectedColor,
          // size: selectedSize,
          quantity: 1,
          productSizeId: selectedSizeId,
        }),
      });

      console.log(result);
    } catch (error) {
      console.error("Error adding in cart:", error);
    }
  }

  async function addInWishlist() {
    const userDetails = await AsyncStorage.getItem("userDetails");
    if (!userDetails) return;

    const user = JSON.parse(userDetails) as IUser;

    const result = await fetch(`${BASE_URL}wishlist/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify({
        productId: parseInt(productId as string),
      }),
    });
    const data = await result.json();
    // console.log(data);
  }

  React.useEffect(() => {
    getProductDetails();
  }, []);

  if (!product) return <></>;

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <Image
        source={require("../../../assets/offers/deals_banner.png")}
        style={{ width: "100%", marginVertical: 20 }}
      />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginRight: 24,
        }}
      >
        <Text style={{ color: "gray", fontSize: 12, marginRight: 10 }}>
          ADD TO WISHLIST
        </Text>
        <Pressable onPress={addInWishlist}>
          <Image
            source={require("../../../assets/images/account/heart.png")}
            style={{ width: 15, height: 15, marginVertical: 20 }}
          />
        </Pressable>
      </View>

      <Image
        style={{ width: 260, height: 260, alignSelf: "center" }}
        source={{ uri: product.image }}
      />

      <View style={{ marginVertical: 20, marginHorizontal: 12 }}>
        <Text
          style={{
            letterSpacing: 1,
            fontSize: 16,
            marginBottom: 8,
            fontWeight: 600,
            fontFamily: "Lato-Regular",
          }}
        >
          {product.title.toUpperCase()}
        </Text>
        <Text
          style={{
            fontSize: 10,
            marginBottom: 8,
            lineHeight: 14,
            fontFamily: "Lato-Regular",
            color: "rgba(0, 0, 0, 0.5)",
          }}
        >
          {product.subtitle.toUpperCase()}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
              fontFamily: "Lato-Regular",
            }}
          >
            {product.price} {"/-"} {product.currency}
          </Text>
          {/* <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginHorizontal: 10,
              textDecorationLine: "line-through",
            }}
          >
            ${product.orginalPrice}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginRight: 20,
              color: "green",
            }}
          >
            {product.discountPercentage}% off
          </Text> */}
        </View>
        <View
          style={{
            marginVertical: 12,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ marginRight: 12 }}>Color</Text>
          {product.colors.map((color: string) => (
            <Pressable
              key={color}
              onPress={() => setSelectedColor(color)}
              style={{
                width: 30,
                height: 30,
                borderRadius: 100,
                backgroundColor: color,
                margin: 5,
                borderWidth: selectedColor === color ? 5 : 0,
                borderColor: "gray",
                padding: 1,
              }}
            />
          ))}
        </View>

        <View
          style={{
            marginVertical: 12,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ marginRight: 12 }}>Size</Text>

          {product.size.map(
            ({
              size_id,
              product_id,
            }: {
              size_id: string;
              product_id: number;
            }) => (
              <Pressable
                key={size_id}
                onPress={() => {
                  setSelectedSize(size_id);
                  setSelectedSizeId(product_id);
                }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                  backgroundColor: selectedSize === size_id ? "gray" : "white",
                  margin: 5,
                  borderColor: "gray",
                  padding: 1,
                  borderWidth: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: selectedSize === size_id ? "white" : "black",
                  }}
                >
                  {size_id}
                </Text>
              </Pressable>
            ),
          )}
        </View>

        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",

            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "black",
              display: "flex",
              flex: 1,
              marginRight: 8,
              paddingHorizontal: 12,
              paddingVertical: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              addInCart();
              Toast.show({ text1: "Added to cart" });
            }}
          >
            <Text style={{ fontSize: 12, letterSpacing: 4 }}>ADD TO CART</Text>
          </TouchableOpacity>
          <Pressable
            onPress={buyNow}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 16,
              flex: 1,
              display: "flex",
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* MAKE THIS HOVER */}
            <Text style={{ color: "white", fontSize: 12, letterSpacing: 4 }}>
              BUY NOW
            </Text>
          </Pressable>
        </View>

        <Text
          style={{
            fontWeight: 700,
            marginVertical: 16,
            fontFamily: "Lato-Regular",
          }}
        >
          Estimated Delivery Between {product.estimatedDelivery[0]} -
          {product.estimatedDelivery[1]}
        </Text>
      </View>

      <Pressable
        onPress={() => setShowDetails(!showDetails)}
        style={styles.details}
      >
        <Text style={styles.title}>DETAILS & DESCRIPTION</Text>
        <AntDesign name={showDetails ? "up" : "down"} size={16} color="white" />
      </Pressable>

      {showDetails ? (
        <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              fontFamily: "Lato-Regular",
              textTransform: "uppercase",
            }}
          >
            We work with monitoring programmes to ensure compliance with safety,
            health and quality standards for our products.
          </Text>
        </View>
      ) : (
        <View />
      )}

      <Pressable
        onPress={() => setShowSpecs(!showSpecs)}
        style={styles.details}
      >
        <Text style={styles.title}>PRODUCT SPECIFICATIONS</Text>
        <AntDesign name={showSpecs ? "up" : "down"} size={16} color="white" />
      </Pressable>

      {showSpecs ? (
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ marginTop: 8, fontFamily: "Lato-Regular" }}>
              Material
            </Text>
            {/* <Text style={{ marginTop: 8 }}>Sole Material</Text>
            <Text style={{ marginTop: 8 }}>Heel Height</Text>
            <Text style={{ marginTop: 8 }}>Heel Type</Text>
            <Text style={{ marginTop: 8 }}>Occasion</Text>
            <Text style={{ marginTop: 8 }}>Toe Type</Text>
            <Text style={{ marginTop: 8 }}>Pack Contains</Text> */}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ marginTop: 8, fontFamily: "Lato-Regular" }}>
              : {product.specs.material}
            </Text>
            {/* <Text style={{ marginTop: 8 }}>: {product.specs.saleMaterial}</Text>
            <Text style={{ marginTop: 8 }}>
              : {product.specs.HeelHeight.join(" - ")} Inches
            </Text>
            <Text style={{ marginTop: 8 }}>: {product.specs.HeelType}</Text>
            <Text style={{ marginTop: 8 }}>: {product.specs.occasion}</Text>
            <Text style={{ marginTop: 8 }}>: {product.specs.ToeType}</Text>
            <Text style={{ marginTop: 8 }}>: {product.specs.PackContains}</Text> */}
          </View>
        </View>
      ) : (
        <View />
      )}
      <Pressable onPress={() => setShowCare(!showCare)} style={styles.details}>
        <Text style={styles.title}>CARE & MAINTENANCE</Text>
        <AntDesign name={showCare ? "up" : "down"} size={16} color="white" />
      </Pressable>
      {showCare ? (
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <Image source={require("../../../assets/images/icons/bell.png")} />
            <Text style={{ marginLeft: 16, fontFamily: "Lato-Regular" }}>
              Do Not Bleach
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <Image source={require("../../../assets/images/icons/bell.png")} />
            <Text style={{ marginLeft: 16, fontFamily: "Lato-Regular" }}>
              Do Not Tumble Dry
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <Image source={require("../../../assets/images/icons/bell.png")} />
            <Text style={{ marginLeft: 16, fontFamily: "Lato-Regular" }}>
              Do Not Wash
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <Image source={require("../../../assets/images/icons/bell.png")} />
            <Text style={{ marginLeft: 16, fontFamily: "Lato-Regular" }}>
              Door To Door Delivery
            </Text>
          </View>
        </View>
      ) : (
        <View />
      )}
      <Pressable
        onPress={() => setShowShipping(!showShipping)}
        style={styles.details}
      >
        <Text style={styles.title}>{"SHIPPING & EXCHANGE"}</Text>
        <AntDesign
          name={showShipping ? "up" : "down"}
          size={16}
          color="white"
        />
      </Pressable>

      {showShipping ? (
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1 }}>
            <Image source={require("../../../assets/images/icons/bell.png")} />
          </View>
          <View style={{ flex: 7 }}>
            <Text style={{ fontSize: 14, fontFamily: "Lato-Regular" }}>
              Shipped With Care
            </Text>
            <Text
              style={{
                color: "gray",
                marginTop: 4,
                fontFamily: "Lato-Regular",
              }}
            >
              Estimated Delivery By
            </Text>
            <Text
              style={{
                color: "gray",
                marginTop: 4,
                fontFamily: "Lato-Regular",
              }}
            >
              {product.estimatedDelivery.join("-")}
            </Text>
          </View>
        </View>
      ) : (
        <View />
      )}

      <Pressable
        onPress={() => setShowMoreInfo(!showMoreInfo)}
        style={styles.details}
      >
        <Text style={styles.title}>MORE INFORMATION</Text>
        <AntDesign
          name={showMoreInfo ? "up" : "down"}
          size={16}
          color="white"
        />
      </Pressable>

      {showMoreInfo ? (
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ marginTop: 12, fontFamily: "Lato-Regular" }}>
              Manufactured By
            </Text>
            <Text style={{ marginTop: 12, fontFamily: "Lato-Regular" }}>
              Manufacturer Address
            </Text>
            <Text style={{ marginTop: 12, fontFamily: "Lato-Regular" }}>
              Customer Care No.
            </Text>
            <Text style={{ marginTop: 12, fontFamily: "Lato-Regular" }}>
              Email ID
            </Text>
            <Text style={{ marginTop: 12, fontFamily: "Lato-Regular" }}>
              Marketed By
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ marginTop: 12, fontFamily: "Lato-Regular" }}>
              : {product.manufacturer}
            </Text>
            <Text style={{ marginTop: 12, fontFamily: "Lato-Regular" }}>
              : {product.manufacturerAddress}
            </Text>
            <Text style={{ marginTop: 12, fontFamily: "Lato-Regular" }}>
              : {product.customerCareNo}
            </Text>
            <Text style={{ marginTop: 12, fontFamily: "Lato-Regular" }}>
              : {product.email}
            </Text>
            <Text style={{ marginTop: 12, fontFamily: "Lato-Regular" }}>
              : {product.marketedBy}
            </Text>
          </View>
        </View>
      ) : (
        <View />
      )}

      {/* <Text style={{ fontSize: 16, letterSpacing: 1.6, margin: 16 }}>
        SIMILAR PRODUCTS
      </Text>

      <FlatList
        style={{ width: "100%" }}
        data={Array(10).fill({
          image: "https://via.placeholder.com/150",
          title: "SAINTG",
          subtitle: "Recycle Boucle Knit Cardigan Pink",
          price: 120,
          originalPrice: 240,
          discountPercentage: 50,
        })}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={(val) => (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 10,
            }}
          >
            <Image
              source={{ uri: val.item.image }}
              style={{ width: 200, height: 200 }}
            />
            <Text style={{ fontWeight: 300, marginVertical: 2 }}>
              {val.item.title}
            </Text>
            <Text style={{ fontWeight: 300, marginVertical: 2 }}>
              {val.item.subtitle}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text
                style={{ fontWeight: 500, marginVertical: 2, marginRight: 8 }}
              >
                ${val.item.price}
              </Text>
              <Text
                style={{
                  textDecorationLine: "line-through",
                  fontWeight: 300,
                  marginVertical: 2,
                  marginRight: 8,
                }}
              >
                ${val.item.originalPrice}
              </Text>
              <Text
                style={{
                  color: "green",
                  fontWeight: 300,
                  marginVertical: 2,
                  marginRight: 8,
                }}
              >
                {val.item.discountPercentage}% off
              </Text>
            </View>
          </View>
        )}
      />
      <Text style={{ fontSize: 16, letterSpacing: 1.6, margin: 16 }}>
        RECENTLY VIEWED
      </Text>
      <FlatList
        style={{ width: "100%" }}
        data={Array(10).fill({
          image: "https://via.placeholder.com/150",
          title: "SAINTG",
          subtitle: "Recycle Boucle Knit Cardigan Pink",
          price: 120,
          originalPrice: 240,
          discountPercentage: 50,
        })}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={(val) => (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 10,
            }}
          >
            <Image
              source={{ uri: val.item.image }}
              style={{ width: 200, height: 200 }}
            />
            <Text style={{ fontWeight: 300, marginVertical: 2 }}>
              {val.item.title}
            </Text>
            <Text style={{ fontWeight: 300, marginVertical: 2 }}>
              {val.item.subtitle}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text
                style={{ fontWeight: 500, marginVertical: 2, marginRight: 8 }}
              >
                ${val.item.price}
              </Text>
              <Text
                style={{
                  textDecorationLine: "line-through",
                  fontWeight: 300,
                  marginVertical: 2,
                  marginRight: 8,
                }}
              >
                ${val.item.originalPrice}
              </Text>
              <Text
                style={{
                  color: "green",
                  fontWeight: 300,
                  marginVertical: 2,
                  marginRight: 8,
                }}
              >
                {val.item.discountPercentage}% off
              </Text>
            </View>
          </View>
        )}
      /> */}
      <Text style={{ fontSize: 16, letterSpacing: 1.6, margin: 16 }}>
        More from {searchKeyWord}
      </Text>
      {showMore && showMore.length > 0 ? (
        <FlatList
          style={{ width: "100%" }}
          data={showMore}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={(val) => (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                margin: 10,
              }}
            >
              <Image
                source={{ uri: val.item.image }}
                style={{ width: 200, height: 200 }}
              />
              <Text
                style={{ fontWeight: 300, marginVertical: 2, width: "50%" }}
              >
                {val.item.title}
              </Text>
              {/* <Text style={{ fontWeight: 300, marginVertical: 2 }}>
                {val.item.subtitle}
              </Text> */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text
                  style={{ fontWeight: 500, marginVertical: 2, marginRight: 8 }}
                >
                  ${val.item.price}
                </Text>
                {/* <Text
                  style={{
                    textDecorationLine: "line-through",
                    fontWeight: 300,
                    marginVertical: 2,
                    marginRight: 8,
                  }}
                >
                  ${val.item.orginalPrice}
                </Text>
                <Text
                  style={{
                    color: "green",
                    fontWeight: 300,
                    marginVertical: 2,
                    marginRight: 8,
                  }}
                >
                  {val.item.discountPercentage}% off
                </Text> */}
              </View>
            </View>
          )}
        />
      ) : (
        <Text> No similar produtcts </Text>
      )}

      <WhyChooseUs />

      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          padding: 12,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "black",
            display: "flex",
            flex: 1,
            marginRight: 8,
            paddingHorizontal: 12,
            paddingVertical: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            addInCart();
            Toast.show({ text1: "Added to cart" });
          }}
        >
          <Text style={{ fontSize: 12, letterSpacing: 4 }}>ADD TO CART</Text>
        </TouchableOpacity>
        <Pressable
          onPress={buyNow}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 16,
            flex: 1,
            display: "flex",
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 12, letterSpacing: 4 }}>
            BUY NOW
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default productDetail;

const styles = StyleSheet.create({
  details: {
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    fontSize: 12,
    letterSpacing: 2,
    fontFamily: "Lato-Regular",
  },
});

// function detailsView({
//   title,
//   condition,
//   func,
// }: {
//   title: string;
//   condition: boolean;
//   func: React.Dispatch<React.SetStateAction<boolean>>;
// }) {
//   return (
//     <>
//       <Pressable style={styles.details} onPress={() => func}>
//         <Text style={styles.title}>{title}</Text>
//         <Text style={{ color: "white" }}>{condition ? "A" : "V"}</Text>
//       </Pressable>
//       {
//         condition && ()
//       }
//     </>
//   );
// }
