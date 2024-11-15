import './styles/App.css';
import AuthForm from "./components/AuthFormView";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UploadView from "./components/UploadView";
import FeedView from "./components/FeedView";
import React from "react";
import Profile from "./components/ProfileView";
import {UserService} from "./logic/userService";

export const userService = new UserService();
const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthForm/>,
    },
    {
        path: "/upload",
        element: <UploadView/>,
    },
    {
      path: "/home",
      element: <FeedView/>
    },
    {
      path: "/profile",
      element: <Profile/>
    },
    {
        path: "/*",
        element: <AuthForm/>
    }
])

function App() {
  return (
      <RouterProvider router={router}/>
  );
}
export default App;
