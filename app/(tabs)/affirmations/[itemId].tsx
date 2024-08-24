import { View, Text, ImageBackground, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { GalleryPreviewData } from "@/constants/models/AffirmationCategory";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import AppGradient from "@/components/AppGradient";
import AntDesign from "@expo/vector-icons/AntDesign";

const AffirmationPractice = () => {
  const { itemId } = useLocalSearchParams();
  const [affirmations, setAffirmations] = useState<GalleryPreviewData>();
  const [sentences, setSentences] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
      const affirmationData = AFFIRMATION_GALLERY[idx]?.data;

      // Ensure affirmationData is valid
      if (!affirmationData) continue;

      const affirmationToStart = affirmationData.find((a) => a.id === Number(itemId));

      // Ensure affirmationToStart is valid before using it
      if (affirmationToStart) {
        setAffirmations(affirmationToStart);

        const affirmationsArray = affirmationToStart?.text?.split(".");

        // Check if affirmationsArray is valid before modifying it
        if (affirmationsArray && affirmationsArray[affirmationsArray.length - 1] === "") {
          affirmationsArray.pop();
        }

        setSentences(affirmationsArray || []);
        return; // Exit the loop after finding and setting the affirmation
      }
    }
  }, [itemId]);


  return (
    <View className="flex-1">
      <ImageBackground source={affirmations?.image} resizeMode="cover" className="flex-1">
        <AppGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.9)"]}>
          <Pressable onPress={() => router.back()} className="absolute top-16 left-6 z-10">
            <AntDesign name="leftcircleo" size={50} color="white" />
          </Pressable>
          <ScrollView className="mt-20" showsVerticalScrollIndicator={false}>
            <View className="h-full justify-center">
              <View className="h-4/5 justify-center">
                {sentences?.map((sentence, idx) => (
                  <Text key={idx} className="text-3xl text-gray-100 mb-12 font-bold">
                    {sentence}.
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default AffirmationPractice;
