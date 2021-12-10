import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

export default StyleSheet.create({
    primaryAppButtonContainer: {
      padding: 20,
      height: 36,
      elevation: 4,
      backgroundColor: "#6056D4",
      borderRadius: 20,
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
      padding: 20,
      height: 36,
      elevation: 4,
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
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
      padding: 20,
      height: 36,
      elevation: 4,
      backgroundColor: "rgba(201, 76, 76, 0.0)",
      borderRadius: 20,
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