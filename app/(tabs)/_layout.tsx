import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useAuthStore } from "@/store/AuthStore";

const SelectedTab = ({ focused, icon, title }: any) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
      >
        <Image
          source={icon}
          style={{ tintColor: "#151312", width: 20, height: 20 }}
        />
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      </ImageBackground>
    );
  } else {
    return (
      <View>
        <Image
          source={icon}
          className="size-5 items-center justify-center overflow-hidden mt-5"
        />
        <Text className="text-secondary text-base font-semibold size-5">
          {title}
        </Text>
      </View>
    );
  }
};

const TabsLayout = () => {
  useProtectedRoute(); // ✅ Handles redirect if not authenticated

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <SelectedTab focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <SelectedTab focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <SelectedTab focused={focused} icon={icons.search} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="Saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <SelectedTab focused={focused} icon={icons.save} title="Saved" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
