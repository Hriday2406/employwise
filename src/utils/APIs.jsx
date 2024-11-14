import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://reqres.in";

function usePostLogin() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    email &&
      password == "cityslicka" &&
      (async () => {
        try {
          setIsLoading(true);
          const response = await axios.post(
            "/api/login",
            {
              email,
              password,
            },
            {
              "Content-Type": "application/json",
            }
          );
          setData(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setTimeout(() => setIsLoading(false), 1000);
        }
      })();
  }, [email, password]);

  return [data, error, isLoading, setEmail, setPassword];
}

function useGetUsers(page) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/users?page=${page}`);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    })();
  }, [page]);

  return [data, error, isLoading];
}

export { usePostLogin, useGetUsers };
