import { getCurrentUser } from "./apiAuth";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const { isLoading, data: authUser } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return {
    isLoading,
    authUser,
    isAuthenticated: authUser?.isAuthenticated || false,
  };
}
