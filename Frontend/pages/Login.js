import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

import { useForm, Controller  } from "react-hook-form";
import AppButton from '../components/AppButton.js';
import styles from '../styles/FormStyles.js';

export default function Login({ navigation }) {
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
          username: '',
          password: '',
        }
      });
      const onSubmit = data => {
        console.log(data);
        navigation.navigate("SwipeView")
      };

      const onChange = arg => {
        return {
          value: arg.nativeEvent.text,
        };
      };

      return (
        <View style={styles.container}>
          <Text style={styles.createAccountLabel}>Sign In</Text>

          <Text style={styles.label}>Username</Text>
          <Controller
            control={control}
            render={({field: { onChange, onBlur, value }}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="username"
            rules={{ required: true }}
          />

          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            render={({field: { onChange, onBlur, value }}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="password"
            rules={{ required: true }}
          />

          <View style={styles.buttonContainer}>
            <AppButton
                    title="Log In"
                    onPress={handleSubmit(onSubmit)}
                    type="primary"
                />
          </View>
        </View>
      );
    };

