import { StyleSheet } from "react-native"

export default StyleSheet.create({
    createAccountLabel: {
        color: 'black',
        margin: 20,
        marginLeft: 0,
        fontSize: 30,
      },
      or_line_container: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
        },
      or_line: {
          flex: 1,
          height: 1,
          backgroundColor: 'rgba(186, 186, 186,.4)',
        },
      or_text: {
          width: 50,
          textAlign: 'center',
          fontSize: 20,
          color: 'rgba(186, 186, 186,.4)',
        },
      label: {
        color: 'black',
        margin: 20,
        marginLeft: 0,
      },
      button: {
        marginTop: 40,
        color: 'white',
        height: 40,
        backgroundColor: '#6056D4',
        borderRadius: 4,
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        padding: 8,
        width: "90%",
        backgroundColor: '#FFFFFF',
      },
      input: {
        backgroundColor: 'rgba(186, 186, 186,.5)',
        height: 40,
        padding: 10,
        borderRadius: 4,
      },
      buttonContainer: {
          alignItems: "center",
          flex: 1,
          marginTop: 30,
      }
})