import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

import { useForm, Controller  } from "react-hook-form";
import AppButton from '../components/AppButton.js';
import styles from '../styles/FormStyles.js';
import Firebase from '../config/firebase';
import LoginErrorMessage from '../components/LoginErrorMessage.js';

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const auth = Firebase.auth();



export default function CreateAccount({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [signupError, setSignupError] = useState('');
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
          firstName: '',
          lastName: '',
          password: '',
          confirmPassword: '',
        }
      });
      const onHandleSignup = async () => {
        try {
          if (email !== '' && password !== '') {
            await auth.createUserWithEmailAndPassword(email, password);
            await auth.signInWithEmailAndPassword(email, password); //Added this so it creates then signs in
            navigation.navigate("Homepage")
          }
        } catch (error) {
          setSignupError(error.message);
        }
      };
      const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
          setRightIcon('eye-off');
          setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
          setRightIcon('eye');
          setPasswordVisibility(!passwordVisibility);
        }
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
          <Text style={styles.label}>Email</Text>

          <Controller
            control={control}
            render={({field: { onChange, onBlur, value }}) => (
              <TextInput
                placeholder='Enter email'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                style={styles.input}
                onBlur={onBlur}
                onChangeText={text => setEmail(text)}
                value={email}
              />
            )}
            name="email"
            rules={{ required: true }}
          />
        <Text style={styles.label}>Password</Text>

          <Controller
            control={control}
            render={({field: { onChange, onBlur, value }}) => (
              <TextInput
                placeholder='Enter password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType='password'
                style={styles.input}
                onBlur={onBlur}
                value={password}
                onChangeText={text => setPassword(text)}
                handlePasswordVisibility={handlePasswordVisibility}
              />
            )}
            name="password"
            rules={{ required: true }}
          />
          {signupError ? <LoginErrorMessage error={signupError} visible={true} /> : null}

          <View style={styles.buttonContainer}>
            <AppButton
                    title="Sign Up"
                    onPress={onHandleSignup}
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

