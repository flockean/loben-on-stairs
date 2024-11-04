import './styles/App.css';
import AuthForm from "./components/AuthFormView";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UploadView from "./components/UploadView";
import React from "react";
import Profile from "./components/ProfileView";


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
      path: "/profile",
      element: <Profile/>
    }
])

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
