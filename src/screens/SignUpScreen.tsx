import React, { useState } from "react";
import { View, Text, TextInput, Alert, Pressable } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import PasswordStrengthBar from "../components/password";

const SignUpScreen = ({ navigation }: any) => {
  const [passwordStrength, setPasswordStrength] = useState("");

  const checkPasswordStrength = (password: string) => {
    if (password.length === 0) {
      setPasswordStrength("");
    }
   else if (
      password.length > 12 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      setPasswordStrength("Strong");
    }
   else if (
      password.length > 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password)
    ) {
      setPasswordStrength("Medium");
    }else if (password.length > 6) {
      setPasswordStrength("Weak");
    } else {
      setPasswordStrength("Weak"); 
    }
  };
  
  return (
    <View className="flex-1 justify-center">
      <View className="px-5 gap-10">
        <Text className="text-2xl font-bold">Sign Up</Text>
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={Yup.object({
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string().min(6, "Too short").required("Required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password")], "Passwords must match")
              .required("Required"),
          })}
          onSubmit={(values, { resetForm }) => {
            Alert.alert("Sign Up Successful", `Welcome, ${values.email}!`);
            resetForm();
            navigation.navigate("LoginScreen");
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View className="gap-4">
              <TextInput
                className="p-2 rounded-md shadow-md bg-white h-12"
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && <Text className="text-red-500 font-medium">{errors.email}</Text>}
              <TextInput
                className="p-2 rounded-md shadow-md bg-white h-12"
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => {
                  handleChange("password")(text);
                  checkPasswordStrength(text);
                }}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {values.password &&
              <View>
               {passwordStrength === "Weak" && (
        <Text className="font-medium text-red-500">
          Your password is too weak. Please include uppercase letters, numbers, and special characters.
        </Text>
      )}

      {passwordStrength === "Medium" && (
        <Text className="font-medium text-yellow-500">
          Your password is medium. Consider making it stronger by adding special characters.
        </Text>
      )}
              <PasswordStrengthBar password={passwordStrength}/>
             </View>
             }
              <TextInput
                className="p-2 rounded-md shadow-md bg-white h-12"
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
              />
              {values.password !== values.confirmPassword && values.confirmPassword &&
              <Text className="font-medium text-red-500">
                Password doesn't match
              </Text>
              }
              <View className="flex-row flex-1 gap-5 mt-5">
              <Pressable
                className="flex-1 bg-blue-500 h-12 rounded-md text-white justify-center"
                onPress={handleSubmit as any}
              >
              <Text className="text-white text-center font-bold">Sign Up</Text>
              </Pressable>
              <Pressable
                className="flex-1 bg-red-500 h-12 rounded-md text-white justify-center"
                onPress={() => navigation.navigate("LoginScreen")}
              >
              <Text className="text-white text-center font-bold">Login</Text>
              </Pressable>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default SignUpScreen;
