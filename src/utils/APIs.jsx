import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://reqres.in";

function usePostLogin({ showMessage }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    if (password == "cityslicka") {
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
          setTimeout(() => setData(response.data), 1000);
        } catch (error) {
          password &&
            showMessage({ type: "error", content: "Invalid Credentials" });
        } finally {
          setTimeout(() => setIsLoading(false), 1000);
        }
      })();
    } else {
      password &&
        showMessage({ type: "error", content: "Invalid Credentials" });
      setIsLoading(false);
    }
  }, [email, password]);

  return [data, isLoading, setEmail, setPassword];
}

function useGetUsers(page, showMessage) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/users?page=${page}`);
        showMessage({ type: "success", content: "Users fetched successfully" });
        setTimeout(() => setData(response.data), 1000);
      } catch (error) {
        showMessage({ type: "error", content: "Something went wrong" });
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    })();
  }, [page]);

  return [data, isLoading, setData];
}

function useGetUser(id) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/users/${id}`);
        setTimeout(() => setData(response.data), 1500);
      } catch (error) {
        setError(error);
      } finally {
        setTimeout(() => setIsLoading(false), 1500);
      }
    })();
  }, [id]);

  return [data, error, isLoading];
}

function usePutUser() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(-1);
  const [body, setBody] = useState({});

  useEffect(() => {
    id != -1 &&
      (async () => {
        try {
          setIsLoading(true);
          const response = await axios.put(`/api/users/${id}`, body);
          setTimeout(() => setData(response.data), 1000);
        } catch (error) {
          setError(error);
        } finally {
          setTimeout(() => setIsLoading(false), 1000);
        }
      })();
  }, [id, body]);

  return [data, error, isLoading, setId, setBody];
}

function useDeleteUser({ showMessage }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(-1);
  useEffect(() => {
    id != -1 &&
      (async () => {
        try {
          setIsLoading(true);
          const response = await axios.delete(`/api/users/${id}`);
          showMessage({
            type: "success",
            content: "User deleted successfully",
          });
          setTimeout(() => setData(response.data), 1000);
        } catch (error) {
          showMessage({ type: "error", content: "Unable to delete user" });
        } finally {
          setTimeout(() => setIsLoading(false), 1000);
        }
      })();
  }, [id]);

  return [data, isLoading, setId];
}

export { usePostLogin, useGetUsers, useGetUser, usePutUser, useDeleteUser };
