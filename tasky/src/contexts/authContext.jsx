import { useState, createContext } from "react";
import { login, signup } from "../api/tasky-api";
//login, signup → functions that talk to my backend (your Express API)

export const AuthContext = createContext(null); //eslint-disable-line

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken); //eslint-disable-line
  const [userName, setUserName] = useState("");

  //existingToken → checks if a token already exists in the browser
// isAuthenticated → true/false (is user logged in?)
// authToken → stores the JWT token
// userName → stores the logged-in username

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }
//  Saves the JWT token in:
// localStorage (so it persists after refresh)
// state (so React can use it immediately)

  const authenticate = async (username, password) => {
    const result = await login(username, password);        // Calls my API with username + password
    if (result.token) {
      setToken(result.token)                              // stores user
      setIsAuthenticated(true);                           // marks as logged in
      setUserName(username);                               //saves username
    }
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    return result.success;
  };
//Calls signup API
// Returns whether it worked (true or false)


  const signout = () => {
    setTimeout(() => setIsAuthenticated(false), 100);
  }
  //Logs the user out by setting isAuthenticated to false

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName
      }}
    >
      {props.children} {/* eslint-disable-line */}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
