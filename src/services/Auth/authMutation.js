import { useQueryClient, useMutation } from "@tanstack/react-query";
//import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { apiAccess, apiLogin, apiLogout, apiSignUp } from "./apiAuth";
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

export function useAccess() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: mutateAccess, isLoading: isLoadingAccess } = useMutation({
    mutationFn: (code) => apiAccess(code),
    onSuccess: (access) => {
      if (access.length === 0) {
        message.error("Acccess code is not registered!");
      } else {
        queryClient.setQueriesData(["userAccess"], access.code);
        message.success("Access code granted successfully!");
        navigate("/", { replace: true });
      }
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { mutateAccess, isLoadingAccess };
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

export function useSignUp() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: apiSignUp,
    onSuccess: () => {
      message.info("Account successfully created");
    },
  });
  return { signup, isLoading };
}
