import { View, Text, Button, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "expo-router";

const login = () => {
  const authStore = useAuthStore((state) => state);
  const { authUser, login, initializeAuth } = authStore;
  const router = useRouter(); // Call useRouter at the top level
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = async () => {
    console.log("Login clicked", authUser);
    const data = {
      email: "rahul@mail.com",
      password: "123456",
    };
    await login(data);
    router.replace("/(tabs)"); // Use the router object here
  };

  useEffect(() => {
    initializeAuth(); // Initialize auth on component mount
    if (authUser) {
      console.log("User just logged in:", authUser.email);
      // Redirect to home page after login
    }
  }, [authUser]);

  return (
    <View>
      <Text>Login Page</Text>
      <TextInput  className="h-5 w-5 border-gray-100"  style= {{borderWidth: 1, height: 10}} />


      <Button onPress={handleClick} title="Login" color="#841584" />
    </View>
  );
};

export default login;
