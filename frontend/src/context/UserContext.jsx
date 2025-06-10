import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const BACKEND_API =
    import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  const [user, setUser] = useState(null);
  const [allUser, setAllUser] = useState([]);
  const [otherUser, setOtherUser] = useState(null);

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_API}/user/get-user`, {
        withCredentials: true,
      });
      setUser(data);
    } catch (error) {
      return error.response.data;
    }
  };

  const getAllUser = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_API}/user/get-all-user`, {
        withCredentials: true,
      });
      setAllUser(data);
    } catch (error) {
      return error.response.data;
    }
  };

  const getOtherUser = async (userId) => {
    try {
      const { data } = await axios.get(
        `${BACKEND_API}/user/get-other-user/${userId}`,
        {
          withCredentials: true,
        }
      );

      setOtherUser(data);
    } catch (error) {
      return error.response.data;
    }
  };

  useEffect(() => {
    getUser();
    getAllUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ getOtherUser, otherUser, user, allUser, getUser, getAllUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
