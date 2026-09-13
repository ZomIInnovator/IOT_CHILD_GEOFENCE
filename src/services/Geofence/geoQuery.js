import { useQuery } from "@tanstack/react-query";
import { getLocation } from "./apiGeolocation";

export function useCatchLocation() {
  return useQuery({
    queryKey: ["cachChild"],
    queryFn: getLocation,
    refetchInterval: 8000,
  });
}
