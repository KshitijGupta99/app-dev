// hooks/useProtectedRoute.ts
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/AuthStore";
import { InteractionManager } from "react-native";

export const useProtectedRoute = () => {
  const { authUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      if (!authUser ) {
        router.replace("/login");
      }
    });

    return () => task.cancel();
  }, [authUser]);
};
