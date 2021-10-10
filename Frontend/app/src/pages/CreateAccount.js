import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

import { useForm, Controller  } from "react-hook-form";
import AppButton from '../components/AppButton.js';
import styles from '../styles/FormStyles.js';

export default function CreateAccount({ navigation }) {
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
          firstName: '',
          lastName: '',
          password: '',
          confirmPassword: '',
        }
      });
      const onSubmit = data => {
        console.log(data);
        navigation.navigate("Homepage")
      };

      const onChange = arg => {
        return {
          value: arg.nativeEvent.text,
        };
      };

      console.log('errors', errors);

      return (
        <View style={styles.container}>
          <Text style={styles.createAccountLabel}>Create Account</Text>
          <Text style={styles.label}>First Name</Text>
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
            name="firstName"
            rules={{ required: true }}
          />
          <Text style={styles.label}>Last Name</Text>
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
            name="lastName"
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
        <Text style={styles.label}>Confirm Password</Text>

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
            name="confirmPassword"
            rules={{ required: true }}
          />

          <View style={styles.buttonContainer}>
            <AppButton
                    title="Sign Up"
                    onPress={handleSubmit(onSubmit)}
                    type="primary"
                />
          </View>
          <View style={styles.or_line_container}>
            <View style={styles.or_line} />
            <View>
                <Text style={styles.or_text}>or</Text>
            </View>
            <View style={styles.or_line} />
          </View>

        </View>
      );
    };

