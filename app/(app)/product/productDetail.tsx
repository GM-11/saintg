import WhyChooseUs from "@/components/home/WhyUs";
import { BASE_URL } from "@/constants/constant";
import { IUser } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
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
  size: string[];
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

  const { searchKeyWord, productId, price, currency } = useLocalSearchParams();

  async function buyNow() {
    addInCart();
    // if (!product) return;
    // const item = `
    //   ${product.title}SEP${product.subtitle}SEP${product.price}SEP${selectedSize}SEP${product.image}SEP${product.estimatedDelivery}SEP${product.quantity}SEP`;

    router.push({
      pathname: "/(app)/checkout/",
      // params: {
      //   items: [item],
      // },
    });
  }

  async function getProductDetails() {
    console.log("a;ksdfj");
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
                info.label === "Manufactured By",
            )?.content || "not available",
          manufacturerAddress: "not available",
          customerCareNo: "not available",
          email: "not available",
          marketedBy: "not available",
          specs: specs,
          colors: product.product_colors.map(
            (color: { color_code: string }) => color.color_code,
          ),
          estimatedDelivery: [todayString, afterSevenDaysString],
          productId: product.product_id,
          size: product.product_size.map(
            (size: { label: string }) => size.label,
          ),
          quantity: 1,
        };
      },
    );

    console.log(convertedProducts);

    setProduct(convertedProducts[parseInt(productId as string) - 1]);

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
        }),
      });
      const data = await result.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
        <Text style={{ color: "gray", fontSize: 18, marginRight: 10 }}>
          Add to Wishlist
        </Text>
        <Pressable onPress={addInWishlist}>
          <Image
            source={require("../../../assets/images/account/heart.png")}
            style={{ width: 20, height: 20, marginVertical: 20 }}
          />
        </Pressable>
      </View>

      <Image
        style={{ width: 260, height: 260, alignSelf: "center" }}
        source={{ uri: product.image }}
      />

      <View style={{ margin: 20 }}>
        <Text
          style={{
            letterSpacing: 4,
            fontSize: 16,
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          {product.title}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          {product.subtitle}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 600 }}>
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

          {product.size.map((size: string) => (
            <Pressable
              key={size}
              onPress={() => setSelectedSize(size)}
              style={{
                width: 30,
                height: 30,
                borderRadius: 100,
                backgroundColor: selectedSize === size ? "gray" : "white",
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
                  color: selectedSize === size ? "white" : "black",
                }}
              >
                {size}
              </Text>
            </Pressable>
          ))}
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
            <Text style={{ color: "white", fontSize: 12, letterSpacing: 4 }}>
              BUY NOW
            </Text>
          </Pressable>
        </View>

        <Text style={{ fontWeight: 700, marginVertical: 16 }}>
          Estimated Delivery Between {product.estimatedDelivery[0]} -
          {product.estimatedDelivery[1]}
        </Text>
      </View>

      <Pressable
        onPress={() => setShowDetails(!showDetails)}
        style={styles.details}
      >
        <Text style={styles.title}>DETAILS & DESCRIPTION</Text>
        <Text style={{ color: "white" }}>{showDetails ? "A" : "V"}</Text>
      </Pressable>

      {showDetails ? (
        <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
          <Text style={{ fontSize: 16, lineHeight: 24 }}>
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
        <Text style={{ color: "white" }}>{showSpecs ? "A" : "V"}</Text>
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
            <Text style={{ marginTop: 8 }}>Material</Text>
            {/* <Text style={{ marginTop: 8 }}>Sole Material</Text>
            <Text style={{ marginTop: 8 }}>Heel Height</Text>
            <Text style={{ marginTop: 8 }}>Heel Type</Text>
            <Text style={{ marginTop: 8 }}>Occasion</Text>
            <Text style={{ marginTop: 8 }}>Toe Type</Text>
            <Text style={{ marginTop: 8 }}>Pack Contains</Text> */}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ marginTop: 8 }}>: {product.specs.material}</Text>
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
        <Text style={{ color: "white" }}>{showCare ? "A" : "V"}</Text>
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
            <Text style={{ marginLeft: 16 }}>Do Not Bleach</Text>
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
            <Text style={{ marginLeft: 16 }}>Do Not Tumble Dry</Text>
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
            <Text style={{ marginLeft: 16 }}>Do Not Wash</Text>
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
            <Text style={{ marginLeft: 16 }}>Door To Door Delivery</Text>
          </View>
        </View>
      ) : (
        <View />
      )}
      <Pressable
        onPress={() => setShowShipping(!showShipping)}
        style={styles.details}
      >
        <Text style={styles.title}>SHIPPING & EXCHANGE</Text>
        <Text style={{ color: "white" }}>{showShipping ? "A" : "V"}</Text>
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
            <Text style={{ fontSize: 14 }}>Shipped With Care</Text>
            <Text style={{ color: "gray", marginTop: 4 }}>
              Estimated Delivery By
            </Text>
            <Text style={{ color: "gray", marginTop: 4 }}>
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
        <Text style={{ color: "white" }}>{showMoreInfo ? "A" : "V"}</Text>
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
            <Text style={{ marginTop: 8 }}>Manufactured By</Text>
            <Text style={{ marginTop: 8 }}>Manufacturer Address</Text>
            <Text style={{ marginTop: 8 }}>Customer Care No.</Text>
            <Text style={{ marginTop: 8 }}>Email ID</Text>
            <Text style={{ marginTop: 8 }}>Marketed By</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ marginTop: 8 }}>: {product.manufacturer}</Text>
            <Text style={{ marginTop: 8 }}>
              : {product.manufacturerAddress}
            </Text>
            <Text style={{ marginTop: 8 }}>: {product.customerCareNo}</Text>
            <Text style={{ marginTop: 8 }}>: {product.email}</Text>
            <Text style={{ marginTop: 8 }}>: {product.marketedBy}</Text>
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
  title: { color: "white", fontSize: 16, letterSpacing: 2 },
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
