import { StyleSheet } from "react-native"

export default StyleSheet.create({

    createAccountLabel: {
        color: 'black',
        margin: 20,
        marginLeft: 0,
        fontSize: 30,
        fontWeight: 'bold'
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
      safeAreaContainer: {
        flex:1
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        padding: 8,
        backgroundColor: '#FFFFFF',
      },
      input: {
        backgroundColor: 'rgba(255, 255, 255,.5)',
        height: 52,
        padding: 10,
        borderRadius: 4,
        borderColor: 'rgba(100,100,100,.35)',
        borderWidth: 1,
      },
      buttonContainer: {
          alignItems: "center",
          flex: 1,
          marginTop: 30,
      }
})