import axios from "axios";
import httpStatus from "http-status";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../../environment";
import AuthContext from "./AuthContext";

const client = axios.create({
  baseURL: `${server}/api/v1/users`,
});

export const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState(authContext);
  const router = useNavigate();

  const handleRegister = async (name, username, password) => {
      const request = await client.post("/register", {
        name,
        username,
        password,
      });

      if (request.status === httpStatus.CREATED) {
        return request.data.message;
      }
  };

  const handleLogin = async (username, password) => {
      const request = await client.post("/login", {
        username,
        password,
      });

      if (request.status === httpStatus.OK) {
        localStorage.setItem("token", request.data.token);
        router("/home");
      }
  };

  const getHistoryOfUser = async () => {
      const request = await client.get("/get_all_activity", {
        params: {
          token: localStorage.getItem("token"),
        },
      });
      return request.data;
  };

  const addToUserHistory = async (meetingCode) => {
      const request = await client.post("/add_to_activity", {
        token: localStorage.getItem("token"),
        meeting_code: meetingCode,
      });
      return request;
  };

  const data = {
    userData,
    setUserData,
    addToUserHistory,
    getHistoryOfUser,
    handleRegister,
    handleLogin,
  };

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};
