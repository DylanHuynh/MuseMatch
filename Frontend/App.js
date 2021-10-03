import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

import { useForm, Controller  } from "react-hook-form";
import Login from './pages/Login.js';

export default function App() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);


  return (
    <View style={styles.container}>
      <Login>

      </Login>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
