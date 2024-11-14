import { useNavigate, useSearchParams } from "react-router-dom";
import { useDeleteUser, useGetUsers } from "../utils/APIs";
import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { Flipped, Flipper, spring } from "react-flip-toolkit";

function UserCard({ user, setUsersList, ...rest }) {
  const [messageApi, contextHolder] = message.useMessage();
  const showMessage = ({ type, content }) => {
    messageApi.open({
      type,
      content,
    });
  };
  const navigate = useNavigate();
  const [data, isLoading, setId] = useDeleteUser({ showMessage });

  useEffect(() => {
    if (typeof data == "string") {
      setUsersList((prev) => {
        return {
          ...prev,
          data: prev.data.filter((item) => item.id != user.id),
        };
      });
    }
  }, [data]);

  function handleDelete() {
    setId(user.id);
  }
  function handleEdit() {
    navigate(`/users/${user.id}`);
  }
  return (
    <>
      {contextHolder}
      <div
        className="flex gap-2 p-3 flex-col px-5 border-2 bg-primary border-primary rounded-2xl w-64 items-center shadow-xl select-none"
        {...rest}
      >
        <img
          src={user.avatar}
          alt={user.first_name}
          className="rounded-full size-24 shadow-xl border-2 border-white"
        />
        <h1 className="text-xl text-white font-medium">
          {user.first_name} {user.last_name}
        </h1>
        <div className="flex gap-2">
          <Button className="font-medium" onClick={handleEdit}>
            Edit
          </Button>
          <Button className="font-medium" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}

export default function Users() {
  const [messageApi, contextHolder] = message.useMessage();
  const showMessage = ({ type, content }) => {
    messageApi.open({
      type,
      content,
    });
  };
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const [currentPageNo, setCurrentPageNo] = useState(page || 1);
  const [usersList, isLoading, setUsersList] = useGetUsers(
    currentPageNo,
    showMessage
  );
  const navigate = useNavigate();
  const flipKey = `${
    usersList != null && usersList.data.map((item) => item.id).join(",")
  }`;

  useEffect(() => {
    console.log(usersList);
  }, [usersList]);

  function onExit(element, index, removeElement) {
    spring({
      onUpdate: (value) => {
        element.style.opacity = `${1 - value}`;
      },
      onComplete: removeElement,
    });
  }

  return (
    <>
      {contextHolder}
      <section className="size-full flex flex-col gap-5 justify-center items-center mt-20 p-10 ">
        <h1 className="text-3xl font-bold self-start">Users</h1>
        <Flipper
          flipKey={flipKey}
          className="p-5  rounded-3xl flex gap-5 flex-wrap justify-center w-fit "
        >
          {usersList != null &&
            usersList.data.map((user) => (
              <Flipped key={user.id} flipId={user.id} onExit={onExit} stagger>
                {(props) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    setUsersList={setUsersList}
                    {...props}
                  />
                )}
              </Flipped>
            ))}
        </Flipper>
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
    </>
  );
}
