import { useNavigate } from "react-router-dom";
import { usePostLogin } from "../utils/APIs";
import { useState } from "react";
import { Button } from "antd";

export default function Login() {
  const navigate = useNavigate();
  // if (localStorage.getItem("token")) navigate("/users");

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin() {
    //   const [data, error, isLoading] = usePostLogin(email, password);
    //   setData(data);
    //   setError(error);
    //   setIsLoading(isLoading);
    //   if (data) {
    //     localStorage.setItem("token", data.token);
    //     navigate("/users");
    //   }
  }

  return (
    <section className="size-full flex justify-center items-center">
      <div className="flex flex-col border-2 p-5 items-center border-primary rounded-3xl gap-5 shadow-xl">
        <h1 className="text-2xl font-bold underline decoration-primary ">
          Login
        </h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full border-[1px] p-2 rounded-lg border-black shadow-lg"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border-[1px] p-2 rounded-lg border-black shadow-lg"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="primary"
          loading={isLoading}
          className="shadow-lg"
          onClick={handleLogin}
          disabled={!email || !password}
        >
          Login
        </Button>
      </div>
    </section>
  );
}
