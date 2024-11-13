import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://reqres.in/api";

function usePostLogin(email, password) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await axios.post("/login", {
          email,
          password,
        });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return [data, error, isLoading];
}

export { usePostLogin };
