import { AuthService } from "@/services/Auth.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useSuggestions = (limit: number, search: string) => {
  return useInfiniteQuery({
    queryKey: ["suggestions", search],
    queryFn: ({ pageParam = 1 }) =>
      AuthService.getSuggestions(limit, pageParam, search),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentPageUsers =
        lastPage?.data?.suggestions || lastPage?.data?.users || [];
      return currentPageUsers.length < limit ? undefined : allPages.length + 1;
    },
    staleTime: 1000 * 60 * 5,
  });
};
