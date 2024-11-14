import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUser, usePutUser } from "../utils/APIs";
import { Button, notification } from "antd";

function Details({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  avatarSrc,
}) {
  return (
    <>
      <img
        src={avatarSrc}
        alt={firstName}
        className="rounded-full size-24 shadow-xl border-2 border-primary"
      />
      <input
        type="text"
        placeholder="First Name"
        className="w-full border-[1px] p-2 rounded-lg border-black shadow-lg"
        value={firstName == null ? "" : firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        className="w-full border-[1px] p-2 rounded-lg border-black shadow-lg"
        value={lastName == null ? "" : lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full border-[1px] p-2 rounded-lg border-black shadow-lg"
        value={email == null ? "" : email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </>
  );
}

export default function EditUser() {
  let { id } = useParams();
  const [user, getUserError, getUserLoading] = useGetUser(id);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [putUserData, putUserError, putUserLoading, setId, setBody] =
    usePutUser();

  useEffect(() => {
    if (user) {
      setFirstName(user.data.first_name);
      setLastName(user.data.last_name);
      setEmail(user.data.email);
      setAvatarSrc(user.data.avatar);
    }
  }, [user]);

  function handleSubmit() {
    setId(id);
    setBody({ first_name: firstName, last_name: lastName, email: email });
    openNotificationWithIcon("success");
  }

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, pauseOnHover) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" onClick={() => api.destroy(key)}>
        Close
      </Button>
    );
    api[type]({
      message: "Success",
      description: "User updated successfully",
      placement: "topRight",
      showProgress: true,
      pauseOnHover,
      btn,
      key,
      onClose: () => navigate("/users?page=1"),
    });
  };

  return (
    <>
      {contextHolder}
      <section className="w-full h-dvh flex justify-center items-center">
        <div className="flex flex-col border-2 p-5 items-center border-primary rounded-3xl gap-5 shadow-xl w-64">
          <h1 className="text-2xl font-bold underline decoration-primary ">
            User {id}
          </h1>
          {!getUserLoading && (
            <Details
              {...{
                firstName,
                setFirstName,
                lastName,
                setLastName,
                email,
                setEmail,
                avatarSrc,
              }}
            />
          )}
          <Button
            type="primary"
            loading={getUserLoading || putUserLoading}
            className="shadow-lg"
            onClick={handleSubmit}
            disabled={firstName == null || lastName == null || email == null}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          >
            Submit
          </Button>
        </div>
      </section>
    </>
  );
}
