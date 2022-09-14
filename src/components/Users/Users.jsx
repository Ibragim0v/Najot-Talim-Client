import { useEffect, useState } from "react";
import "./Users.scss";
import { useAuth } from "../../hooks/useAuth";
import EditIcon from "@mui/icons-material/Edit";

export const Users = () => {
  const [user, setUser] = useState([]);
  const { token } = useAuth(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/user`, {
      headers: {
        access_token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data?.data))
      .catch((err) => console.error(err));
  }, [token]);
  return (
    <div className="users">
      <div className="users__wrapper">
        <h4 className="users__title">Username: {user?.username}</h4>
        <p className="users__phone">PN: {user?.phone}</p>
        <button className="users__btn--update">
          <EditIcon />
        </button>
      </div>
    </div>
  );
};
