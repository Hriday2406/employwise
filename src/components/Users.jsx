import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetUsers } from "../utils/APIs";
import { Button } from "antd";
import { useState } from "react";

function UserCard({ user }) {
  return (
    <div className="flex gap-2 p-3 flex-col px-5 border-2 bg-primary border-primary rounded-2xl w-64 items-center shadow-xl select-none">
      <img
        src={user.avatar}
        alt={user.first_name}
        className="rounded-full size-24 shadow-xl border-2 border-white"
      />
      <h1 className="text-xl text-white font-medium">
        {user.first_name} {user.last_name}
      </h1>
    </div>
  );
}

export default function Users() {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const [currentPageNo, setCurrentPageNo] = useState(page || 1);
  const [usersList, error, isLoading] = useGetUsers(currentPageNo);
  const navigate = useNavigate();

  return (
    <section className="size-full flex flex-col gap-5 justify-center items-center mt-20 p-10 ">
      <h1 className="text-3xl font-bold self-start">Users</h1>
      <div className="p-5  rounded-3xl flex gap-5 flex-wrap justify-center w-fit ">
        {usersList != null &&
          usersList.data.map((user) => <UserCard key={user.id} user={user} />)}
      </div>
      <div className="flex items-center gap-5 sm:self-end sm:mr-10">
        <p className="font-medium">Page : </p>
        <Button
          className={`font-bold ${
            currentPageNo == 1 && "bg-primary text-white"
          } `}
          onClick={() => {
            if (currentPageNo != 1) {
              navigate(`/users?page=1`);
              setCurrentPageNo(1);
            }
          }}
        >
          1
        </Button>
        <Button
          className={`font-bold ${
            currentPageNo == 2 && "bg-primary text-white"
          } `}
          onClick={() => {
            if (currentPageNo != 2) {
              navigate(`/users?page=2`);
              setCurrentPageNo(2);
            }
          }}
        >
          2
        </Button>
      </div>
    </section>
  );
}
