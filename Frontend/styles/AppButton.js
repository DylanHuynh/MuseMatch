import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

export default StyleSheet.create({
    appButtonContainer: {
      width: 201,
      height: 36,
      elevation: 8,
      backgroundColor: "#6056D4",
      borderRadius: 20,
      paddingVertical: 15,
      paddingHorizontal: 20,
      justifyContent:"center",
      margin: 10

    },
    appButtonText: {
      fontSize: 17,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
  });