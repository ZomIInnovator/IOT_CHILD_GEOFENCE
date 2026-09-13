import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLocation } from "./apiGeolocation";
import { message } from "antd";

export function useUpdateLocation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => updateLocation(formData),
    onSuccess: () => {
      message.info(
        "Guardian information and geolocation was updated successfully!",
      );
      queryClient.invalidateQueries(["cachChild"]);
    },
    onError: (error) => {
      console.error("Error updating locations");
    },
  });
}
