import { ProfileService } from "@/services/profile.service";
import { useQuery } from "@tanstack/react-query";

export const useProfile = (userId: string) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => {
      return ProfileService.getProfile(userId);
    },
    enabled: Boolean(userId),
  });
};
