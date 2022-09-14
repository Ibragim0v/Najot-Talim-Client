import { useContext } from "react";
import { LogOutContext } from "../context/LogOut";

export const useLogout = (settrOnly) => {
  const { logout, setLogout } = useContext(LogOutContext);

  return settrOnly ? { logout } : { logout, setLogout };
};
