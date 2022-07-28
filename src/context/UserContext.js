import React, { useState ,useEffect, useContext} from "react";
import axios from "axios"

var UserDispatchContext = React.createContext();
let loggedId=""; 
let loggedRole="";
// function userReducer(state, action) {
//   switch (action.type) {
//     case "LOGIN_SUCCESS":
//       return { ...state, isAuthenticated: true , admins: loggedId , roles : loggedRole};
//     case "SIGN_OUT_SUCCESS":
//       return { ...state, isAuthenticated: false ,admins: null ,roles :null };
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`);
//     }
//   }
// }
function userReducer(state, action) {
  console.log(action.admins)
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true , admins: action.admins , roles : action.roles};
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false ,admins: null ,roles :null };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
const INITIAL_STATE = {
  isAuthenticated: !!localStorage.getItem("admin_token"),
  admins : null,
  roles : !!localStorage.getItem("roles")
}
export const UserStateContext = React.createContext(INITIAL_STATE);
function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, INITIAL_STATE);
  console.log(state.admins)
  return (

    <UserStateContext.Provider value={{
      isAuthenticated: state.isAuthenticated,
      admins : state.admins ,
      roles : state.roles
  }}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

 async function loginUser(dispatch, email, password, history, setIsLoading, setError) {
//  console.log(email)
  setError(false);
  setIsLoading(true);
  const config = {
    header: {
        "Content-Type": "application/json"
    }
  }
  try{
      const {data} = await axios.post("/api/v1/signin", {email : email ,password: password } , config);
      console.log(data)
      loggedId =data.admin._id;
      loggedRole = data.admin.role;
      console.log(data.admin._id)
      console.log(data.admin.role)
      console.log(data.token)
      localStorage.setItem('admin_token', data.token)
      localStorage.setItem('roles', data.admin.role)
      setError(null)
      setIsLoading(false)
      dispatch({ type: 'LOGIN_SUCCESS' , admins : data.admin._id  ,roles : data.admin.role })
      history.push('/app/dashboard')
    }
    catch(err) {
      console.log(err)
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
  // const res = await axios.get("/api/v1/getadmins", config);
  // console.log(res)
  //     if (res) {
  //         dispatch({ type: "LOGIN_SUCCESS", admins: res.admins });
  //     } else {
  //         dispatch({ type: "LOGIN_FAILURE" });
  //     }

}
 
 
 
function signOut(dispatch, history) {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("roles");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
