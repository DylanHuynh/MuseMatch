import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        height: '100%',
        width: '100%'
    },
    label: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
        color: 'white'
    },
    bodyContainer: {
        flex: 1,
        width: '60%',
        justifyContent: 'center',
    },
    footer: {
        height:100,
    },
    image: {        
          alignItems:'center',
          justifyContent:'center',
          top: 50,
          width:250,
          height:250,
    }
})