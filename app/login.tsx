import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "expo-router";

const login = () => {
  const authStore = useAuthStore((state) => state);
  const { authUser, login } = authStore;
  const router = useRouter(); // Call useRouter at the top level

  const handleClick = async () => {
    console.log("Login clicked");
    const data = {
      email: "rahul@mail.com",
      password: "123456",
    };
    await login(data);
    router.replace("/"); // Use the router object here
  };

  useEffect(() => {
    if (authUser) {
      console.log("User just logged in:", authUser.email);
      // Redirect to home page after login
    }
  }, [authUser]);

  return (
    <View>
      <Text>Login Page</Text>
      <Button onPress={handleClick} title="Login" color="#841584" />
    </View>
  );
};

export default login;
