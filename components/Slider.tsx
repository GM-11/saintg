// import React, { useState } from "react";
// import RangeSlider, { Slider } from "react-native-range-slider-expo";

// import { Text, View, StyleSheet } from "react-native";

// type props = {
//   min: number;
//   max: number;
// };

// function CustomSlider({ min, max }: props) {
//   const [fromValue, setFromValue] = useState(0);
//   const [toValue, setToValue] = useState(0);
//   const [value, setValue] = useState(0);

//   return (
//     <View>
//       <View>
//         <RangeSlider
//           fromValueOnChange={(value) => setFromValue(value)}
//           min={min}
//           max={max}
//           toValueOnChange={function (value: number): void {
//             throw new Error("Function not implemented.");
//           }}
//         />
//       </View>
//       <View>
//         <Slider
//           min={0}
//           max={40}
//           step={4}
//           valueOnChange={(value) => setValue(value)}
//           initialValue={12}
//           knobColor="red"
//           valueLabelsBackgroundColor="black"
//           inRangeBarColor="purple"
//           outOfRangeBarColor="orange"
//         />
//         <Text>value: {value}</Text>
//       </View>
//     </View>
//   );
// }

// export default CustomSlider;

// // const styles = StyleSheet.create({
