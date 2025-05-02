import { Image, ScrollView, Text, View } from "react-native";
import { Link, router } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";


export default function Index() {
  return (
    <View
    className="bg-primary flex-1" >
      <Image source={images.bg} className= "absolute w-full z-0" />
      <ScrollView className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}>
        <Image source={icons.logo} className=" mt-20 mx-auto" />
        <SearchBar onPress={()=> router.push('/Search')} placeholder="Search for items"  />
      </ScrollView>

    </View>
  );
} 
