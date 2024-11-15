import { Pressable, Image } from "react-native";

export default function Eye({
  condition,
  func,
  rightMargin,
}: {
  condition: boolean;
  func: () => void;
  rightMargin: number;
}) {
  return (
    <Pressable
      style={{
        marginRight: rightMargin,
      }}
      onPress={func}
    >
      <Image
        source={
          condition
            ? require("../assets/images/password/eye_close.png")
            : require("../assets/images/password/eye_open.png")
        }
      />
    </Pressable>
  );
}
