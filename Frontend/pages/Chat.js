import React, {useState, useEffect} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebaseSDK from '../config/firebaseSDK';

// export default function Chat({ navigation }) {
//   const [messages,setMessages] = useState([]);
//   console.log(firebaseSDK)
//   console.log(firebaseSDK.refOff)
//   const user = {
//     name: "navigation.state.params.name",
//     email: "navigation.state.params.email",
//     id: firebaseSDK.uid,
//     _id: firebaseSDK.uid
//   };
//   useEffect(() => {
//     firebaseSDK.refOn(message =>
//       this.setState(previousState => ({
//         messages: GiftedChat.append(previousState.messages, message)
//       }))
//     );
//     return () => {
//       firebaseSDK.refOff();
//     }
//   }, []);
//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={firebaseSDK.send}
//       user={user}
//     />
//   );
// }
  // componentDidMount() {
  //   Firebase.refOn(message =>
  //     this.setState(previousState => ({
  //       messages: GiftedChat.append(previousState.messages, message)
  //     }))
  //   );
  // }
  // componentWillUnmount() {
  //   Firebase.refOff();
  // }
// }



export default class Chat extends React.Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: (navigation.state.params || {}).name || 'Chat!'
  // });

  state = {
    messages: []
  };
  get user() {
    return {
      name: "this.props.navigation.state.params.name",
      email: "this.props.navigation.state.params.email",
      id: firebaseSDK.uid,
      _id: firebaseSDK.uid
    };
  }
  get ref() { return firebaseSDK.database().ref('Messages'); } 

  refOn = callback => {
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={firebaseSDK.send}
        user={this.user}
      />
    );
  }
  componentDidMount() {
    console.log(firebaseSDK)
    firebaseSDK.refOn(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }))
    );
  }
  componentWillUnmount() {
    firebaseSDK.refOff();
  }
}