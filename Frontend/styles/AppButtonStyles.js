import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

export default StyleSheet.create({
    primaryAppButtonContainer: {
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
    primaryAppButtonText: {
      fontSize: 17,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
    },
    secondaryAppButtonContainer: {
      width: 201,
      height: 36,
      elevation: 8,
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      paddingVertical: 15,
      paddingHorizontal: 20,
      justifyContent:"center",
      margin: 10

    },
    secondaryAppButtonText: {
      fontSize: 13,
      color: "#1E37A5",
      fontWeight: "bold",
      alignSelf: "center",
    },
    transparentAppButtonContainer: {
      width: 201,
      height: 45,
      elevation: 8,
      backgroundColor: "rgba(201, 76, 76, 0.0)",
      borderRadius: 20,
      paddingVertical: 15,
      paddingHorizontal: 20,
      justifyContent:"center",
      margin: 10

    },
    transparentAppButtonText: {
      fontSize: 12,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center"
    }
  });