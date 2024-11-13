import { useNavigate } from "react-router-dom";
import { usePostLogin } from "../utils/APIs";

export default function Login() {
  const navigate = useNavigate();
  if (localStorage.getItem("token")) navigate("/users");
  const [data, error, isLoading] = usePostLogin(
    "eve.holt@reqres.in",
    "cityslicka"
  );
  if (data) localStorage.setItem("token", data.token);

  return (
    <>
      <h1>Login</h1>
    </>
  );
}
