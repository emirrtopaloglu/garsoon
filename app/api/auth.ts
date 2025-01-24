import { createMutation } from "react-query-kit";
import api from "../services/api";

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    role: string;
  };
}

interface LoginVariables {
  username: string;
  password: string;
}

export const useLogin = createMutation<LoginResponse, LoginVariables>({
  mutationKey: ["login"],
  mutationFn: (variables) => {
    return api
      .post<LoginResponse>("/auth/login", variables)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  },
});
