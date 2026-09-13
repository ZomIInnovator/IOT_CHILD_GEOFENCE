import { useQueryClient, useMutation } from "@tanstack/react-query";
//import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { apiLogin, apiLogout } from "./apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: mutateLogin, isLoading: isLoadingLogin } = useMutation({
    mutationFn: async (userForm) => apiLogin(userForm),
    onSuccess: (user) => {
      
      queryClient.setQueryData(["user"], user.user);
      message.success("Login successful!");
      if (user.user) {
        navigate("/", { replace: true });
      }
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { mutateLogin, isLoadingLogin };
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: mutateLogout, isLoading: isLoadingLogout } = useMutation({
    mutationFn: apiLogout,
    onSuccess: () => {
      queryClient.removeQueries(["user"]);

      navigate("/landing", { replace: true });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { mutateLogout, isLoadingLogout };
}
