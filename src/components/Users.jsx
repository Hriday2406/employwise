import { useSearchParams } from "react-router-dom";
import { useGetUsers } from "../utils/APIs";

export default function Users() {
  let [searchParams] = useSearchParams();
  const currentPageNo = searchParams.get("page");
  const [data, error, isLoading] = useGetUsers(currentPageNo);
  console.log(data);

  return (
    <>
      <h1>Users</h1>
    </>
  );
}
