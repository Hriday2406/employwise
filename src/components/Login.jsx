import { useNavigate } from "react-router-dom";
import { usePostLogin } from "../utils/APIs";
import { useEffect, useState } from "react";
import { Button } from "antd";

export default function Login() {
  const navigate = useNavigate();
  const [data, error, isLoading, setApiEmail, setApiPassword] = usePostLogin();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/users");
  }, []);

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.token);
      navigate("/users");
    }
  }, [data]);

  function handleLogin() {
    setApiEmail(email);
    setApiPassword(password);
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
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
        <Button
          type="primary"
          loading={isLoading}
          className="shadow-lg"
          onClick={handleLogin}
          disabled={!email || !password}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        >
          Login
        </Button>
      </div>
    </section>
  );
}
