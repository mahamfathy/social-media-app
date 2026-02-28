import { useQuery, type QueryKey } from "@tanstack/react-query";

export const usePost = <T>(
  key: QueryKey,
  fetchFn: () => Promise<T>,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: key,
    queryFn: fetchFn,
    enabled: enabled,
  });
};
