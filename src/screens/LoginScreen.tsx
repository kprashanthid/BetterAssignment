import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import CheckBox from 'react-native-check-box';
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";

const LoginScreen = ({ navigation }: any) => {
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    (async () => {
      const savedEmail = await AsyncStorage.getItem("email");
      if (savedEmail) {
        setRememberMe(true);
      }
    })();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const savedEmail = await AsyncStorage.getItem("email");

    if (rememberMe) {
      await AsyncStorage.setItem("email", email);
    } else {
      await AsyncStorage.removeItem("email");
    }

    if (savedEmail === email) {
      Alert.alert("Login Successful", `Welcome back, ${email}!`);
    } else {
      Alert.alert("Login Successful", `Welcome, ${email}!`);
    }

    navigation.navigate("HomeScreen");
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
  });

  return (
    <View className="flex-1 justify-center px-4">
      <Text className="text-2xl font-bold mb-4">Login</Text>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleLogin(values.email, values.password)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View className="gap-4">
            <TextInput
              className="p-2 rounded-md shadow-md bg-white h-12"
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors.email && touched.email && (
              <Text className="text-red-500">{errors.email}</Text>
            )}
            
            <TextInput
              className="p-2 rounded-md shadow-md bg-white h-12"
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {errors.password && touched.password && (
              <Text className="text-red-500">{errors.password}</Text>
            )}
            
            <View className="flex-row items-center mb-2">
              <CheckBox
                isChecked={rememberMe} 
                onClick={() => setRememberMe(!rememberMe)}
              />
              <Text className="ml-2">Remember Me</Text>
            </View>
            <Pressable
              className="w-full bg-blue-500 h-12 rounded-md text-white justify-center"
              onPress={handleSubmit as any}
            >
              <Text className="text-white text-center font-bold">Login</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;
