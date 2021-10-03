import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

import { useForm, Controller  } from "react-hook-form";
import AppButton from '../components/AppButton.js';
// import {
//     GoogleSignin,
//     GoogleSigninButton,
//   } from '@react-native-google-signin/google-signin';

export default function Login() {
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
          <Text style={styles.label}>First name</Text>
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
          <Text style={styles.label}>Last name</Text>
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
        <Text style={styles.label}>Confirm Passwrod</Text>

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
          {/* <View style={styles.button}>
            <Button
              style={styles.buttonInner}
              color
              title="Reset"
              onPress={() => {
                reset({
                  firstName: 'Bill',
                  lastName: 'Luo'
                })
              }}
            />
          </View> */}

          <View style={styles.button}>
            <Button
              style={styles.buttonInner}
              color
              title="Sign Up"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
          <View style={styles.or_line_container}>
            <View style={styles.or_line} />
            <View>
                <Text style={styles.or_text}>or</Text>
            </View>
            <View style={styles.or_line} />
          </View>
          {/* <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn}
            disabled={this.state.isSigninInProgress}
            /> */}
        </View>
      );
    };

    const styles = StyleSheet.create({
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
    });