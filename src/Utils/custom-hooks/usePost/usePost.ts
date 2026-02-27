import { useQuery } from "@tanstack/react-query";

export const usePost = (
  key: any[],
  fetchFn: () => Promise<any>,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: key,
    queryFn: fetchFn,
    enabled: enabled,
  });
};
