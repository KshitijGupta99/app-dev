import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

export default function SearchBar({placeholder, value, onChangeText, onPress}: Props) {
  return (
    <View className="bg-gray-800 h-12 w-full rounded-full flex-row items-center px-4 py-5 mt-4">
      <Image source={icons.search} className="w-4 h-4" />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-white w-fill bg-blue"
        placeholderTextColor="#A8B5DB"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
